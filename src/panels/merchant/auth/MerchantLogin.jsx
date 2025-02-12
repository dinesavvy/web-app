/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "../../../assets/css/Login.css";
import login from "../../../assets/images/login.jpg";
import logo from "../../../assets/images/logo.svg";
// import passwordInput from "../../../assets/images/passwordInput.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCommonMessage } from "../../../common/CommonMessage";
import "react-phone-number-input/style.css";
import { useEffect } from "react";
// import { validationSchema } from "./merchantLoginValidation";
import Loader from "../../../common/Loader/Loader";
import RequestedCode from "./RequestedCode";
import {
  businessSendOtpAction,
  businessSendOtpHandler,
} from "../../../redux/action/businessAction/businessSendOtp";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const MerchantLogin = () => {
  const messageApi = useCommonMessage();
  const businessSendOtpSelector = useSelector(
    (state) => state?.businessSendOtp
  );
  const [requestLogin, setRequestLogin] = useState(false);
  const [loginValue, setLoginValue] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [country, setCountry] = useState("in"); // Stores the country code like "pk", "us"

  const handlePhoneChange = (value, data) => {
    const dialCode = `${data?.dialCode}`;
    let number = value.replace(dialCode, "").trim(); // Remove country code
  
    if (!number) {
      // If the number is empty, reset country code
      setCountry("");
      setCountryCode("");
      return
    } else {
      setCountry(data.countryCode);
      setCountryCode(dialCode);
    }
    
    setPhone(number);
  };
    

  const handleFormSubmit = (values) => {
    setLoginValue(values);
    let payload = {
      phoneNumber: "+" + countryCode + " " + phone,
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
      setRequestLogin(true);

      // navigate("/admin/merchant/dashboard");
      dispatch(businessSendOtpAction.businessSendOtpSliceReset());
    } else if (businessSendOtpSelector?.message?.status === 400) {
      messageApi.open({
        type: "error",
        content: businessSendOtpSelector?.message?.message,
      });
      dispatch(businessSendOtpAction.businessSendOtpSliceReset());
    }
  }, [businessSendOtpSelector]);

  return (
    <>
      {requestLogin ? (
        <RequestedCode
          loginValue={loginValue}
          requestLogin={requestLogin}
          setRequestLogin={setRequestLogin}
          countryCode={countryCode}
          phone={phone}
        />
      ) : (
        <>
          {businessSendOtpSelector?.isLoading && <Loader />}
          <div className="loginFlex ">
            <div className="w-50 h-100 position-relative mobileHide fixLeft">
              <img src={login} alt="" className="w-100 h-100 object-cover" />
            </div>
            <div className="d-flex align-center justify-center w-lg-50 loginside overflowy">
              <div className="mx-450 mx-auto">
                <div className="logo mb-30 text-center">
                  <img src={logo} alt="" className="h-100" />
                </div>
                <div className="fs-28 text-center fw-500 mb-40">
                  Welcome back
                </div>
                <Formik
                  initialValues={{
                    phoneNumber: "",
                  }}
                  // validationSchema={validationSchema}
                  onSubmit={(values, formikBag) => {
                    handleFormSubmit(values, formikBag);
                  }}
                >
                  {({
                    isSubmitting,
                    values,
                    setFieldValue,
                    /* and other goodies */
                  }) => (
                    <Form>
                      <div className="mb-30">
                        <label className="fs-14 fw-500 mb-10" htmlFor="email">
                          Phone number*
                        </label>
                        <div className="">
                          {/* <Field
                            type="text"
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            id="phone"
                          />
                          <img
                            src={phoneInput}
                            alt=""
                            className="absoluteImage"
                          /> */}
                          <PhoneInput
                            country={country} // Set country dynamically when user types a code
                            value={countryCode + phone} // Show full value but keep them separate in state
                            onChange={handlePhoneChange}
                            disableCountryGuess={false} // Allow auto-detection of typed country code
                            placeholder="Enter phone number"
                            className="phoneInput"
                          />
                        </div>
                        {/* <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          className="mt-10 fw-500 fs-14 error"
                        /> */}
                      </div>
                      <button
                        className={
                          phone?.length > 0 ? "btn w-100" : "btn w-100 disabled"
                        }
                        type="submit"
                        // disabled={isSubmitting}
                        // onClick={()=>navigate('/requested-code')}
                        // onClick={()=>}
                      >
                        Request Code
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MerchantLogin;
