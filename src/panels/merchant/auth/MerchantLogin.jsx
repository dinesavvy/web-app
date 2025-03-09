/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "../../../assets/css/Login.css";
import login from "../../../assets/images/login.jpg";
import logo from "../../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCommonMessage } from "../../../common/CommonMessage";
import "react-phone-number-input/style.css";
import { useEffect } from "react";
import Loader from "../../../common/Loader/Loader";
import RequestedCode from "./RequestedCode";
import {
  businessSendOtpAction,
  businessSendOtpHandler,
} from "../../../redux/action/businessAction/businessSendOtp";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getGeoInfo } from "../../../services/geoLocation";

const MerchantLogin = () => {
  const [loading, setLoading] = useState(true);
  const messageApi = useCommonMessage();
  const businessSendOtpSelector = useSelector(
    (state) => state?.businessSendOtp
  );
  const [requestLogin, setRequestLogin] = useState(false);
  const [loginValue, setLoginValue] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("91");

  const handlePhoneChange = (value, data) => {
    const dialCode = `${data?.dialCode}`;
    let number = value.replace(dialCode, "").trim(); 
  
    if (!number) {
      setCountryCode("");
      return
    } else {
      setCountryCode(dialCode);
    }
    
    setPhone(number);
  };

   // Fetch Geo location
    useEffect(() => {
      const fetchGeoInfo = async () => {
        setLoading(true);
        const data = await getGeoInfo();
        if (data) {
          setCountryCode(data?.country_calling_code);
        }
        setLoading(false);
      };
  
      fetchGeoInfo();
    }, []);
    

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
          {(businessSendOtpSelector?.isLoading||loading) && <Loader />}
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
                          <PhoneInput
                            // country={country} // Set country dynamically when user types a code
                            value={values?.phoneNumber || countryCode + phone} // Show full value but keep them separate in state
                            onChange={handlePhoneChange}
                            disableCountryGuess={false} // Allow auto-detection of typed country code
                            placeholder="Enter phone number"
                            className="phoneInput"
                            name="phoneNumber"
                          />
                        </div>
                      </div>
                      <button
                        className={
                          phone?.length > 0 ? "btn w-100" : "btn w-100 disabled"
                        }
                        type="submit"
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
