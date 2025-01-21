import React, { useState, useEffect } from "react";
import styles from "../Booking.module.scss";
import { Next, Previous } from "../../../components/atoms/Icons";

const FormTwo = ({ dataBarber, dataDate, dataTime }) => {
  const [selectedBarber, setSelectedBarber] = useState(null);

  useEffect(() => {
    const storedBarber = localStorage.getItem("SavedBarber");
    if (storedBarber) setSelectedBarber(storedBarber);
  }, [dataBarber]);

  const handleBarber = (e) => {
    const value = e.target.value;
    setSelectedBarber(value);
    localStorage.setItem("SavedBarber", value);
    if (dataBarber) dataBarber(value);
  };
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const todayStartOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  useEffect(() => {
    const storedDate = localStorage.getItem("SavedDate");
    if (storedDate) {
      const parsedDate = new Date(storedDate);
      setSelectedDate(parsedDate);
      setCurrentMonth(parsedDate.getMonth());
      setCurrentYear(parsedDate.getFullYear());
    }
  }, []);
  const handleDateClick = (day) => {
    const selected = new Date(currentYear, currentMonth, day);

    const wibOffset = 7 * 60 * 60 * 1000;
    const selectedInWIB = new Date(selected.getTime() + wibOffset);

    if (selectedInWIB >= todayStartOfDay) {
      setSelectedDate(selectedInWIB);

      const formattedDate = selectedInWIB.toISOString().split("T")[0];

      localStorage.setItem("SavedDate", formattedDate);
      if (dataDate) dataDate(formattedDate);
    }
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };

  const previousMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const [selectedTime, setSelectedTime] = useState(null);

  const time = [
    {
      name: "normal",
      time: [
        { id: "a1", clock: "12.00" },
        { id: "a2", clock: "13.00" },
        { id: "a3", clock: "14.00" },
        { id: "a4", clock: "16.00" },
        { id: "a5", clock: "17.00" },
        { id: "a6", clock: "19.00" },
        { id: "a7", clock: "20.00" },
        { id: "a8", clock: "21.00" },
      ],
    },
    {
      name: "jumat",
      time: [
        { id: "b1", clock: "13.00" },
        { id: "b2", clock: "14.00" },
        { id: "b3", clock: "16.00" },
        { id: "b4", clock: "17.00" },
        { id: "b5", clock: "19.00" },
        { id: "b6", clock: "20.00" },
        { id: "b7", clock: "21.00" },
      ],
    },
  ];

  const handleTimePick = (e) => {
    const selectedValue = e.target.value;
    setSelectedTime(selectedValue);
    localStorage.setItem("SavedTime", selectedValue);
    if (dataTime) dataTime(selectedValue);
  };

  useEffect(() => {
    const storedTime = localStorage.getItem("SavedTime");
    if (storedTime) setSelectedTime(storedTime);
  }, [dataTime]);

  const selectedTimeDate =
    selectedDate && time[selectedDate.getDay() === 5 ? 1 : 0];

  return (
    <div className={styles["form--two"]}>
      <div className={styles["form--two__calendar"]}>
        <div className={styles["calendar"]}>
          <div className={styles["calendar__header"]}>
            <p>
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
              })}{" "}
              {currentYear}
            </p>
            <div className={styles["calendar__header__action"]}>
              <button
                onClick={previousMonth}
                disabled={
                  currentYear === today.getFullYear() &&
                  currentMonth === today.getMonth()
                }
                type="button"
              >
                <Previous />
              </button>
              <button type="button" onClick={nextMonth}>
                <Next />
              </button>
            </div>
          </div>
          <div className={styles["calendar__grid"]}>
            {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
              <p className={styles["calendar__grid__days"]} key={day}>
                {day}
              </p>
            ))}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={i}></div>
            ))}
            {days.map((day) => {
              const isDisabled =
                new Date(currentYear, currentMonth, day) < todayStartOfDay;
              const isSelected =
                selectedDate &&
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === currentMonth &&
                selectedDate.getFullYear() === currentYear;

              return (
                <button
                  className={styles["calendar__grid__date"]}
                  key={day}
                  onClick={() => handleDateClick(day)}
                  disabled={isDisabled}
                  type="button"
                  style={{
                    backgroundColor: isDisabled ? "" : "",
                    outline: isSelected ? "1px solid #0a390f" : "",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles["form--two__more"]}>
        <div className={styles["barber"]}>
          <p className={styles["barber__header"]}>Kang Cukur</p>
          <div className={styles["barber__options"]}>
            <div className={styles["barber__options__select"]}>
              <input
                className={styles["barber--input"]}
                type="checkbox"
                id="apeng"
                value="Apeng"
                onChange={handleBarber}
                checked={selectedBarber === "Apeng"}
              />
              <label className={styles["barber--label"]} htmlFor="apeng">
                <p className={styles["barber--label__name"]}>Apeng</p>
              </label>
            </div>
            <div className={styles["barber__options__select"]}>
              <input
                className={styles["barber--input"]}
                type="checkbox"
                id="akrom"
                value="Akrom"
                onChange={handleBarber}
                checked={selectedBarber === "Akrom"}
              />
              <label className={styles["barber--label"]} htmlFor="akrom">
                <p className={styles["barber--label__name"]}>Akrom</p>
              </label>
            </div>
          </div>
        </div>

        <div className={styles["time"]}>
          <p className={styles["time__header"]}>Jam</p>
          {selectedDate && selectedTimeDate && (
            <div className={styles["time__options"]}>
              {selectedTimeDate.time.map((item) => (
                <div className={styles["time__options__box"]} key={item.id}>
                  <input
                    className={styles["box__input"]}
                    type="radio"
                    id={item.id}
                    name="time"
                    value={item.clock}
                    onChange={handleTimePick}
                    checked={selectedTime === item.clock}
                  />
                  <label
                    className={`${styles["box__label"]} ${
                      selectedTime === item.clock
                        ? styles["box__label--selected"]
                        : ""
                    }`}
                    htmlFor={item.id}
                  >
                    <p>{item.clock}</p>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormTwo;
