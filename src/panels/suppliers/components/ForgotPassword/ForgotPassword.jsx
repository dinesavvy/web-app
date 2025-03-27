/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "../../../../assets/css/Login.css";
import login from "../../../../assets/images/login.jpg";
import logo from "../../../../assets/images/logo.svg";
import emailInput from "../../../../assets/images/emailInput.svg";
import passwordInput from "../../../../assets/images/passwordInput.svg";

const ForgotPassword = () => {
  const [sendLink, setSendLink] = useState(false);
  return (
    <>
      <div className="loginFlex ">
        <div className="w-50 h-100 position-relative mobileHide fixLeft">
          <img src={login} alt="" className="w-100 h-100 object-cover" />
        </div>
        <div className="d-flex align-center justify-center w-lg-50 loginside overflowy">
          <div className="mx-450 mx-auto">
            {sendLink === true ? (
              <>
                <div className="fs-24 fw-700 mb-8">Check your email</div>
                <div className="tabGrey">
                  We’ve sent a password reset link to your email
                </div>
                <div className="divider"></div>
                <button className="btn w-100 mb-30" type="submit">
                  Open Gmail
                </button>
                <div className="tabGrey text-center fs-14">
                Didn't receive email?  &nbsp;
                  <span className="text-black fw-500" >
                   Request again in 01:59
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="fs-24 fw-700 mb-8">Forgot Password</div>
                <div className="tabGrey">
                  No problem! Just enter your email, and we'll send you a reset
                  link
                </div>
                <div className="divider"></div>
                <div className="mb-30">
                  <label className="fs-14 fw-500 mb-10" htmlFor="email">
                    Email*
                  </label>
                  <div className="line">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      id="email"
                    />
                    <img src={emailInput} alt="" className="absoluteImage" />
                  </div>
                </div>
                <button
                  className="btn w-100"
                  type="submit"
                  // disabled={isSubmitting}
                  onClick={() => setSendLink(true)}
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
