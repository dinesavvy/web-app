/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "../../../../assets/css/Login.css";
import login from "../../../../assets/images/login.jpg";
import emailInput from "../../../../assets/images/emailInput.svg";
import password from "../../../../assets/images/password.svg";
import passwordInput from "../../../../assets/images/passwordInput.svg";
import nopassword from "../../../../assets/images/nopassword.svg";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  return (
    <>
      <div className="loginFlex ">
        <div className="w-50 h-100 position-relative mobileHide fixLeft">
          <img src={login} alt="" className="w-100 h-100 object-cover" />
        </div>
        <div className="d-flex align-center justify-center w-lg-50 loginside overflowy">
          <div className="mx-450 mx-auto">
            <div className="fs-24 fw-700 mb-8">Create New Password</div>
            <div className="tabGrey">
            Set a strong password and you're good to go!
            </div>
            <div className="divider"></div>
            <div className="mb-30">
              <label className="fs-14 fw-500 mb-10" htmlFor="password">
                Password
              </label>
              <div className="line">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  id="password"
                />

                <img src={passwordInput} alt="" className="absoluteImage" />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolutePassword"
                >
                  {showPassword ? (
                    <img src={password} />
                  ) : (
                    <img src={nopassword} />
                  )}
                </div>
              </div>
            </div>
            <div className="mb-30">
              <label className="fs-14 fw-500 mb-10" htmlFor="password">
              Confirm Password
              </label>
              <div className="line">
                <input
                  type={showPassword2 ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  id="password"
                />

                <img src={passwordInput} alt="" className="absoluteImage" />
                <div
                  onClick={() => setShowPassword2(!showPassword2)}
                  className="absolutePassword"
                >
                  {showPassword2 ? (
                    <img src={password} />
                  ) : (
                    <img src={nopassword} />
                  )}
                </div>
              </div>
            </div>
            <button
              className="btn w-100"
              type="submit"
              // disabled={isSubmitting}
            >
              Set new password
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
