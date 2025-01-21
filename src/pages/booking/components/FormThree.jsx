import React, { useState } from "react";
import styles from "../Booking.module.scss";

const FormThree = ({ onInformationChange }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("SavedInformation");
    return savedData ? JSON.parse(savedData) : { name: "", noHp: "", note: "" };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const savedData =
      JSON.parse(localStorage.getItem("SavedInformation")) || {};
    const updatedData = { ...savedData, [name]: value };
    localStorage.setItem("SavedInformation", JSON.stringify(updatedData));

    onInformationChange(updatedData);
  };

  return (
    <div className={styles["form--three"]}>
      <p className={styles["form--three__header"]}>Isi Identitas</p>
      <div className={styles["form--three__input"]}>
        <label>
          Nama<span style={{ color: "tomato" }}>*</span>
        </label>
        <input
          type="text"
          name="name"
          placeholder="nama"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className={styles["form--three__input"]}>
        <label>
          No Hp<span style={{ color: "tomato" }}>*</span>
        </label>
        <input
          type="text"
          name="noHp"
          placeholder="no hp"
          value={formData.noHp}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className={styles["form--three__input"]}>
        <label>Catatan</label>
        <input
          type="text"
          name="note"
          placeholder="catatan"
          value={formData.note}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

export default FormThree;
