import React from "react";

import Styles from "./Organisms.module.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={Styles["container-footer"]}>
      <p>&copy; {currentYear} D'cut Barber Studio. All rights reserved.</p>
    </div>
  );
};

export default Footer;
