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
import Loader from "../../../common/Loader/Loader";
import {
  businessLoginAction,
  businessLoginHandler,
} from "../../../redux/action/businessAction/businessLoginSlice";
import {
  businessSendOtpAction,
  businessSendOtpHandler,
} from "../../../redux/action/businessAction/businessSendOtp";

const RequestedCode = ({ loginValue,requestLogin,setRequestLogin }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const messageApi = useCommonMessage();
  const businessLoginSelector = useSelector((state) => state?.businessLogin);
  const businessSendOtpSelector = useSelector((state) => state?.businessSendOtp);
  console.log(businessSendOtpSelector, "businessSendOtpSelector");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  console.log(loginValue, "loginValue");
  const inputRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // Allow only single digits

    // Update the OTP array at the specific index
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input field if a value is entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
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

  const onSubmit = (values) => {
    event.preventDefault();
    let payload = {
      phoneNumber: loginValue?.phoneNumber,
      otp: otp?.join(""),
      deviceType: "Ios",
      deviceId: "deviceId",
    };
    dispatch(businessLoginHandler(payload));
  };

  useEffect(() => {
    if (businessLoginSelector?.data) {
      messageApi.open({
        type: "success",
        content: businessLoginSelector?.data?.message,
      });
      navigate("/merchant/dashboard");
      dispatch(businessLoginAction.businessLoginSliceReset());
    } else if (businessLoginSelector?.message) {
      messageApi.open({
        type: "error",
        content: businessLoginSelector?.message,
      });
      dispatch(businessLoginAction.businessLoginSliceReset());
    }
  }, [businessLoginSelector]);

  const resendOTP = () => {
    // setSeconds(60);
    let payload = {
      phoneNumber: loginValue?.phoneNumber,
      appSignature: "TlVIT4Yl0sS",
    };
    dispatch(businessSendOtpHandler(payload));
  };

  useEffect(() => {
    if (businessSendOtpSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: businessSendOtpSelector?.data?.message,
      });
      dispatch(businessSendOtpAction.businessSendOtpSliceReset());
    } else if (businessSendOtpSelector?.data?.statusCode === 400) {
      messageApi.open({
        type: "error",
        content: businessSendOtpSelector?.message?.message,
      });
      dispatch(businessSendOtpAction.businessSendOtpSliceReset());
    }
  }, [businessSendOtpSelector]);

  return (
    <>
      {(businessLoginSelector?.isLoading ||businessSendOtpSelector?.isLoading) && <Loader />}
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
            <form onSubmit={onSubmit}>
              <div className="fs-24 fw-700 mb-8">Verification</div>
              <div className="grey fs-18">
                Enter the 6 digit code sent to your phone number {loginValue?.phoneNumber}
              </div>
              <div className="divider3"></div>
              <div
                onPaste={handlePaste}
                className="d-flex gap-10 align-center mb-16 otpFlex"
              >
                {otp?.map((digit, index) => (
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
                style={{
                  cursor: otp.every((value) => value.trim() !== "")
                    ? "pointer"
                    : "not-allowed",
                }}
                disabled={!otp.every((value) => value.trim() !== "")}
                // disabled={isSubmitting}
                // onClick={() => navigate("/merchant/dashboard")}
              >
                Verify
              </button>
              <div className="fs-14 text-center">
                <span className="fw-500 cursor-pointer">
                  {seconds > 0 || minutes > 0 ? (
                    <p>
                      Request again in :{" "}
                      {minutes < 10 ? `0${minutes}` : minutes}:
                      {seconds < 10 ? `0${seconds}` : seconds}
                    </p>
                  ) : (
                    <>
                      <p>
                        <p className="grey">
                          Didn't receive code? (&nbsp;
                          <span className="span-primary" onClick={resendOTP}>
                            Resend OTP
                          </span>
                          &nbsp;)
                        </p>
                      </p>
                    </>
                  )}
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestedCode;
