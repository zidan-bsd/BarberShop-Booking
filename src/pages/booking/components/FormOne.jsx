import React from "react";
import styles from "../Booking.module.scss";
import { Plus, Check } from "../../../components/atoms/Icons";

const FormOne = ({ selectedItems, handleCheckboxChange }) => {
  const sections = [
    {
      title: "HairCut",
      items: [
        {
          id: "one",
          name: "Anak",
          time: 45,
          price: 18000,
        },

        {
          id: "two",
          name: "Dewasa",
          price: 23000,
          time: 45,
        },

        {
          id: "three",
          name: "Cukur Jenggot",
          price: 10000,
          time: 45,
        },

        {
          id: "four",
          name: "Botak Plontos",
          price: 30000,
          time: 45,
        },
      ],
    },

    {
      title: "Colouring",
      items: [
        {
          id: "full-bleach",
          name: "Full Bleach",
          price: 100000,
          time: 45,
        },

        {
          id: "highlight",
          name: "Highlight",
          price: 70000,
          time: 45,
        },

        {
          id: "basic-color",
          name: "Basic Color",
          price: 50000,
          time: 45,
        },
      ],
    },

    {
      title: "Treatment",
      items: [
        {
          id: "massage",
          name: "Massage",
          price: 40000,
          time: 45,
        },

        {
          id: "creambath",
          name: "Creambath",
          price: 40000,
          time: 45,
        },

        {
          id: "vitamin",
          name: "Vitamin",
          price: 5000,
          time: 45,
        },
      ],
    },
  ];

  return (
    <>
      {sections.map((section) => (
        <div className={styles["form"]} key={section.title}>
          <div className={styles["form__header"]}>
            <p> {section.title}</p>
          </div>
          {section.items.map((item) => {
            const isSelected = selectedItems.some(
              (selectedItem) => selectedItem.id === item.id
            );

            return (
              <div className={styles["form__item"]} key={item.id}>
                <input
                  className={styles["form__item__input"]}
                  type="checkbox"
                  id={item.id}
                  checked={isSelected}
                  onChange={() => handleCheckboxChange(item)}
                />
                <label className={styles["form__item__desc"]} htmlFor={item.id}>
                  <div className={styles["form__item__info"]}>
                    <p> {item.name}</p>
                    <p>
                      {item.time}- {item.price.toLocaleString()} IDR
                    </p>
                  </div>
                  <div className={styles["form__item__icon"]}>
                    {isSelected ? <Check /> : <Plus />}
                  </div>
                </label>
                <div className={styles["form__divider"]}></div>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};

export default FormOne;
