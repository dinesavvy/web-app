/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "../../../assets/css/Login.css";
import "../../../app.css";
import login from "../../../assets/images/login.jpg";
import logo from "../../../assets/images/logo.svg";
import phoneInput from "../../../assets/images/phoneInput.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCommonMessage } from "../../../common/CommonMessage";
import {
  loginHandler,
  loginSliceAction,
} from "../../../redux/action/loginSlice";
import { useEffect } from "react";
import { validationSchema } from "./merchantLoginValidation";
import Loader from "../../../common/Loader/Loader";

const RequestedCode = () => {
  const messageApi = useCommonMessage();
  const loginSelector = useSelector((state) => state?.loginSliceDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input field if a value is entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = ""; // Clear the current field
      setOtp(newOtp);

      if (index > 0 && !otp[index]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = otp.map((_, i) => pasteData[i] || "");
    setOtp(newOtp);

    // Focus the appropriate input after paste
    const lastIndex = Math.min(pasteData.length - 1, otp.length - 1);
    inputRefs.current[lastIndex].focus();
  };

  const handleFocus = (e) => e.target.select();


  const handleFormSubmit = (values) => {
    let payload = {
      email: values?.email,
      password: values?.password,
    };
    dispatch(loginHandler(payload));
  };

  useEffect(() => {
    if (loginSelector?.data) {
      messageApi.open({
        type: "success",
        content: loginSelector?.data?.message,
      });
      // navigate("/admin/merchant/dashboard");
      dispatch(loginSliceAction.loginDetailsSliceReset());
    } else if (loginSelector?.message) {
      messageApi.open({
        type: "error",
        content: loginSelector?.message,
      });
      dispatch(loginSliceAction.loginDetailsSliceReset());
    }
  }, [loginSelector]);

  return (
    <>
      {loginSelector?.isLoading && <Loader />}
      <div className="loginFlex ">
        <div className="w-50 h-100 position-relative mobileHide fixLeft">
          <img src={login} alt="" className="w-100 h-100 object-cover" />
        </div>
        <div className="d-flex align-center justify-center w-lg-50 loginside overflowy">
          <div className="mx-450 mx-auto">
            <div className="logo mb-30 text-center">
              <img src={logo} alt="" className="h-100" />
            </div>
            <div className="fs-28 text-center fw-500 mb-40">Welcome back</div>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, formikBag) => {
                handleFormSubmit(values, formikBag);
              }}
            >
              {({
                isSubmitting,
                /* and other goodies */
              }) => (
                <Form>
                  <div className="fs-24 fw-700 mb-8">Verification</div>
                  <div className="grey fs-18">
                    Enter the 6 digit code sent to your phone number
                  </div>
                  <div className="divider3"></div>
                  <div
                    onPaste={handlePaste}
                    className="d-flex gap-10 align-center mb-16 otpFlex"
                  >
                    {otp.map((digit, index) => (
                      <input
                      key={index}
                      type="text"
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onFocus={handleFocus}
                      ref={(el) => (inputRefs.current[index] = el)}
                      maxLength={1} // Ensure only one character per input

                    />
                    ))}
                  </div>
                  <div className="fs-14 mb-30 fw-500 sc text-end cursor-pointer">
                  Edit phone number
                  </div>
                  <button
                    className="btn w-100 mb-30"
                    type="submit"
                    // disabled={isSubmitting}
                    onClick={() => navigate("/merchant/dashboard")}
                  >
                    Verify
                  </button>
                  <div className="fs-14 text-center">
                    <span className="grey">Didn't receive code? </span><span className="fw-500 cursor-pointer">Request again in 01:59</span>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestedCode;