import React from "react";
import "../../../assets/css/Login.css";
import login from "../../../assets/images/login.jpg";
import logo from "../../../assets/images/logo.svg";
import emailInput from "../../../assets/images/emailInput.svg";
import passwordInput from "../../../assets/images/passwordInput.svg";

const Login = () => {
  return (
    <>
      <div className="loginFlex pc">
        <div className="w-50 h-100 position-relative mobileHide fixLeft">
          <img src={login} alt="" className="w-100 h-100 object-cover" />
        </div>
        <div className="d-flex align-center justify-center w-lg-50 loginside overflowy">
          <div className="mx-450 mx-auto">
                <div className="logo mb-30 text-center"><img src={logo} alt="" /></div>
                <div className="fs-28 text-center fw-500 mb-40">
                Welcome back
                </div>
                <div className="mb-30">
                    <label className="fs-14 fw-500 mb-10" htmlFor="email">Email</label>
                    <div className="line">
                      <input type="email" name="email" id="email" placeholder="Enter your email address" />
                      <img src={emailInput} alt=""  className="absoluteImage"/>
                    </div>
                    <div className="mt-10 fw-500 fs-14 error">
                    Please enter a Valid email address
                    </div>
                </div>
                <div className="mb-60">
                    <label className="fs-14 fw-500 mb-10" htmlFor="password">Password</label>
                    <div className="line">
                      <input type="password" name="password" id="password" placeholder="Enter your password" />
                      <img src={passwordInput} alt=""  className="absoluteImage"/>
                    </div>
                    <div className="mt-10 fw-500 fs-14 error">
                    Please enter a Valid password
                    </div>
                </div>
                <div className="btn">
                Enter your Email address
                </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
