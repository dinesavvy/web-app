import React from "react";
import burgerMenu from "../../assets/images/burgerMenu.svg";
import notification from "../../assets/images/notification.svg";
import cartIcon from "../../assets/images/cartIcon.svg";
import "../../assets/css/header.css";

const Header = ({ handleTrigger }) => {
  return (
    <>
      <header className="d-flex align-center justify-between gap-20">
      <div className="d-flex align-center gap-20">
        <div onClick={handleTrigger} className="burgerMenu">
          <img src={burgerMenu} alt="icon" />
        </div>
        <div className="fs-24 fw-600">Dine Savvy Dashboard</div>
      </div>
      <div className="d-flex align-center gap-20">
        <div className="notification">
          <img src={cartIcon} alt="icon" className="h-100" />
          <div className="sup">
            4
          </div>
        </div>
        <div className="notification">
          <img src={notification} alt="icon" className="h-100" />
        </div>
        </div>
      </header>
    </>
  );
};

export default Header;
