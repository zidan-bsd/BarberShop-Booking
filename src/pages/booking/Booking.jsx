import React, { useState, useEffect } from "react";
import styles from "./Booking.module.scss";
import Footer from "../../components/organisms/Footer";
import FormOne from "./components/FormOne";
import FormTwo from "./components/FormTwo";
import FormThree from "./components/FormThree";
import Logo from "../../assets/Logo.png";
import { Collapse } from "../../components/atoms/Icons";

const Booking = () => {
  const [activeElement, setActiveElement] = useState("formOne");
  const [showElementMobile, setShowElementMobile] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [savedBarber, setSavedBarber] = useState("");
  const [savedDate, setSavedDate] = useState("");
  const [savedTime, setSavedTime] = useState("");
  const [savedInformation, setSavedInformation] = useState({
    nama: "",
    noHp: "",
    note: "",
  });

  const showElement = (element) => setActiveElement(element);

  const toggleElementMobile = () => {
    setShowElementMobile(!showElementMobile);
  };

  const handleCheckboxChange = (item) => {
    const updatedItems = selectedItems.some(
      (selectedItem) => selectedItem.id === item.id
    )
      ? selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      : [...selectedItems, item];

    setSelectedItems(updatedItems);
    localStorage.setItem("LocalDataBooking", JSON.stringify(updatedItems));
  };

  useEffect(() => {
    const savedItems = localStorage.getItem("LocalDataBooking");
    const storedBarber = localStorage.getItem("SavedBarber");
    const storedDate = localStorage.getItem("SavedDate");
    const storedTime = localStorage.getItem("SavedTime");
    const dataInformation = localStorage.getItem("SavedInformation") || {};
    setSavedInformation(dataInformation);

    if (savedItems) setSelectedItems(JSON.parse(savedItems));
    if (storedBarber) setSavedBarber(storedBarber);
    if (storedDate) {
      setSavedDate(formatDateToWIB(new Date(storedDate)));
    }
    if (storedTime) setSavedTime(storedTime);
  }, []);

  const handleInformationChange = (updatedData) => {
    setSavedInformation(updatedData);
  };

  const formatDateToWIB = (date) => {
    const offset = 7 * 60 * 60 * 1000;
    const wibDate = new Date(date.getTime() + offset);
    return wibDate.toISOString().split("T")[0];
  };

  const formatPrice = (price) => {
    const formatted = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

    return formatted.replace(/^[^0-9]*([0-9,.]+)\s*IDR$/i, "$1 IDR");
  };

  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.price,
    0
  );

  const formattedTotalPrice = formatPrice(totalPrice);

  const totalTime = selectedItems.reduce((total, item) => total + item.time, 0);

  const formatTime = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours > 0 ? `${hours}j ` : ""}${minutes}m`;
  };

  const formattedTotalTime = formatTime(totalTime);

  const itemList = selectedItems
    .map((item, index) => `${index + 1}. ${item.name}`)
    .join("\n");

  const message = `
Halo ${savedInformation.name}, berikut detail reservasi Anda:

Kang Cukur: ${savedBarber}
Tanggal: ${savedDate}
Jam: ${savedTime}

Pesanan:
${itemList}

Total Harga: Rp${totalPrice}
Total Waktu: ${formattedTotalTime}

Catatan: ${savedInformation.note}
Kontak Anda: ${savedInformation.noHp}
  `.trim();

  const handleSend = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/6285225325674/?text=${encodedMessage}`,
      "_blank"
    );
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <div className={styles.booking}>
        <div className={styles.booking__information}>
          <div className={styles.booking__information__box}>
            <p>Aturan Booking</p>
          </div>
        </div>

        <div className={styles.booking__content}>
          <div className={styles.form__box}>
            <form className={styles.form__box__form}>
              {activeElement === "formOne" && (
                <FormOne
                  selectedItems={selectedItems}
                  handleCheckboxChange={handleCheckboxChange}
                />
              )}
              {activeElement === "formTwo" && (
                <FormTwo
                  dataBarber={setSavedBarber}
                  dataDate={setSavedDate}
                  dataTime={setSavedTime}
                />
              )}
              {activeElement === "formThree" && (
                <FormThree onInformationChange={handleInformationChange} />
              )}
            </form>

            <div className={styles.form__action}>
              {activeElement === "formOne" && (
                <div>
                  <button onClick={() => showElement("formTwo")}>Lanjut</button>
                </div>
              )}
              {activeElement === "formTwo" && (
                <div>
                  <button onClick={() => showElement("formOne")}>
                    Kembali
                  </button>
                  <button onClick={() => showElement("formThree")}>
                    Lanjut
                  </button>
                </div>
              )}
              {activeElement === "formThree" && (
                <div>
                  <button onClick={() => showElement("formTwo")}>
                    Kembali
                  </button>
                  <button onClick={handleSend}>Kirim</button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.booking__content__info}>
            <div className={styles.booking__info}>
              <img
                className={styles.booking__info__logo}
                src={Logo}
                alt="Logo"
              />
              <p className={styles.booking__info__title}>D'cut Barber Studio</p>

              {savedDate && (
                <div className={styles.booking__info__date}>
                  <p>Tanggal</p>
                  <p>{savedDate}</p>
                </div>
              )}
              {savedTime && (
                <div className={styles.booking__info__time}>
                  <p>Jam</p>
                  <p>{savedTime}</p>
                </div>
              )}
              {savedBarber && (
                <div className={styles.booking__info__barber}>
                  <p>Kang Cukur</p>
                  <p>{savedBarber}</p>
                </div>
              )}

              <ul className={styles.booking__info__desc}>
                {selectedItems.map((item) => (
                  <li key={item.id}>
                    <p>{item.name}</p>
                    <p>{item.price.toLocaleString()} IDR</p>
                  </li>
                ))}
              </ul>

              {selectedItems.length > 0 && (
                <div className={styles.booking__info__total}>
                  <p>{formattedTotalTime}&nbsp;-&nbsp;</p>
                  <p> {formattedTotalPrice}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <div className={styles["information"]}>
        <div className={styles["information__header"]}>
          <div className={styles["information__header__left"]}>
            <p>Rp{totalPrice}</p>
            <p>-</p>
            <p>{formattedTotalTime}</p>
          </div>
          <div className={styles["information__header__right"]}>
            <Collapse showElementMobile={toggleElementMobile} />
          </div>
        </div>
        <div className={styles["information__divider"]}></div>
        {showElementMobile && (
          <div className={styles["information__content"]}>
            {savedDate && (
              <div className={styles["information__content__date"]}>
                <p>Tanggal</p>
                <p>{savedDate}</p>
              </div>
            )}
            {savedTime && (
              <div className={styles["information__content--time"]}>
                <p>Jam</p>
                <p>{savedTime}</p>
              </div>
            )}
            {savedBarber && (
              <div className={styles["information__content--barber"]}>
                <p>Kang Cukur</p>
                <p>{savedBarber}</p>
              </div>
            )}
            <ul className={styles["information__content--menu"]}>
              {selectedItems.map((item) => (
                <li key={item.id}>
                  <p>{item.name}</p>
                  <p>{item.price} IDR</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Booking;
