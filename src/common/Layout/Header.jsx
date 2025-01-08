import React from "react";
import burgerMenu from "../../assets/images/burgerMenu.svg";
import notification from "../../assets/images/notification.svg";
import "../../assets/css/header.css";

const Header = ({ handleTrigger }) => {
  return (
    <>
      <header className="d-flex align-center justify-between gap-20">
      <div className="d-flex align-center gap-20">
        <div onClick={handleTrigger} className="burgerMenu">
          <img src={burgerMenu} alt="" />
        </div>
        <div className="fs-24 fw-600">Dine Savvy Dashboard</div>
      </div>
        <div className="notification">
          <img src={notification} alt="" />
        </div>
      </header>
    </>
  );
};

export default Header;
