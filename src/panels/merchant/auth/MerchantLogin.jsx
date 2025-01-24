/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "../../../assets/css/Login.css";
import login from "../../../assets/images/login.jpg";
import logo from "../../../assets/images/logo.svg";
import phoneInput from "../../../assets/images/phoneInput.svg";
import passwordInput from "../../../assets/images/passwordInput.svg";
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
import RequestedCode from "./RequestedCode";
import { businessLoginAction, businessLoginHandler } from "../../../redux/action/businessAction/businessLoginSlice";

const MerchantLogin = () => {
  const messageApi = useCommonMessage();
  const businessLoginSelector = useSelector((state) => state?.businessLogin);
  const [requestLogin, setRequestLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(businessLoginSelector,"businessLoginSelector")

  const handleFormSubmit = (values) => {
    let payload = {
      phoneNumber: values?.phoneNumber,
      otp:"987654",
      deviceType:"Ios",
      deviceId:"deviceId"
    };
    dispatch(businessLoginHandler(payload));
  };

  useEffect(() => {
    if (businessLoginSelector?.data?.statusCode===200) {
      messageApi.open({
        type: "success",
        content: businessLoginSelector?.data?.message,
      });
    // setRequestLogin(true);

      // navigate("/admin/merchant/dashboard");
      dispatch(businessLoginAction.businessLoginSliceReset());
    } else if (businessLoginSelector?.message?.status===400) {
      messageApi.open({
        type: "error",
        content: businessLoginSelector?.message?.message,
      });
      dispatch(businessLoginAction.businessLoginSliceReset());
    }
  }, [businessLoginSelector]);

  return (
    <>
      {requestLogin ? (
        <RequestedCode />
      ) : (
        <>
          {businessLoginSelector?.isLoading && <Loader />}
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
                      <div className="mb-30">
                        <label className="fs-14 fw-500 mb-10" htmlFor="email">
                          Phone number*
                        </label>
                        <div className="line">
                          <Field
                            type="text"
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            id="phone"
                          />
                          <img
                            src={phoneInput}
                            alt=""
                            className="absoluteImage"
                          />
                        </div>
                        <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          className="mt-10 fw-500 fs-14 error"
                        />
                      </div>
                      <button
                        className="btn w-100"
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
