/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "../../../../assets/css/Login.css";
import login from "../../../../assets/images/login.jpg";
import logo from "../../../../assets/images/logo.svg";
import emailInput from "../../../../assets/images/emailInput.svg";
import passwordInput from "../../../../assets/images/passwordInput.svg";
import { useNavigate } from "react-router-dom";

const ExpireLink = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="loginFlex ">
        <div className="w-50 h-100 position-relative mobileHide fixLeft">
          <img src={login} alt="" className="w-100 h-100 object-cover" />
        </div>
        <div className="d-flex align-center justify-center w-lg-50 loginside overflowy">
          <div className="mx-450 mx-auto">
            <div className="fs-24 fw-700 mb-8 text-center">Oops, Your link has expired</div>
            <div className="tabGrey text-center">
            No worries, you can easily request a new one!
            Click the button below to get a new link.
            </div>
            <div className="divider"></div>
            <button className="btn w-100 mb-30" >
            Request New Link
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpireLink;
