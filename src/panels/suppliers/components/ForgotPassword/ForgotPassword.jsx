/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "../../../../assets/css/Login.css";
import login from "../../../../assets/images/login.jpg";
import logo from "../../../../assets/images/logo.svg";
import emailInput from "../../../../assets/images/emailInput.svg";
import passwordInput from "../../../../assets/images/passwordInput.svg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { forgotPasswordValidation } from "./forgotPasswordValidation";
import {
  forgotPasswordSupplierAction,
  forgotPasswordSupplierHandler,
} from "../../../../redux/action/supplierActions/forgotPasswordSupplier";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../common/Loader/Loader";
import { useCommonMessage } from "../../../../common/CommonMessage";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [sendLink, setSendLink] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const messageApi = useCommonMessage();

  const forgotPasswordSupplierSelector = useSelector(
    (state) => state?.forgotPasswordSupplier
  );

  const handleFormSubmit = (values) => {
    console.log(values, "values");

    let payload = {
      email: values?.email,
    };
    dispatch(forgotPasswordSupplierHandler(payload));
  };

  useEffect(() => {
    if (forgotPasswordSupplierSelector?.message) {
      messageApi.open({
        type: "error",
        content: forgotPasswordSupplierSelector?.message,
      });
      dispatch(forgotPasswordSupplierAction.forgotPasswordSupplierReset());
    } else if (forgotPasswordSupplierSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: forgotPasswordSupplierSelector?.data?.message,
      });
      setSendLink(true);
      dispatch(forgotPasswordSupplierAction.forgotPasswordSupplierReset());
    }
  }, [forgotPasswordSupplierSelector]);

  return (
    <>
      {forgotPasswordSupplierSelector?.isLoading && <Loader />}
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
                <button
                  className="btn w-100 mb-30"
                  type="submit"
                  // onClick={() => (window.location.href = "mailto:")}
                  onClick={() => navigate("/")}
                >
                  Go back to login
                </button>
                {/* <div className="tabGrey text-center fs-14">
                  Didn't receive email? &nbsp;
                  <span className="text-black fw-500">
                    Request again in 01:59
                  </span>
                </div> */}
              </>
            ) : (
              <>
                <div className="fs-24 fw-700 mb-8">Forgot Password</div>
                <div className="tabGrey">
                  No problem! Just enter your email, and we'll send you a reset
                  link
                </div>
                <div className="divider"></div>
                <Formik
                  initialValues={{
                    email: "",
                  }}
                  validationSchema={forgotPasswordValidation}
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
                          Email*
                        </label>
                        <div className="line">
                          <Field
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            id="email"
                          />
                          <img
                            src={emailInput}
                            alt=""
                            className="absoluteImage"
                          />
                        </div>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="mt-10 fw-500 fs-14 error"
                        />
                      </div>
                      <button
                        className="btn w-100"
                        type="submit"
                        // disabled={isSubmitting}
                        // onClick={() => setSendLink(true)}
                      >
                        Submit
                      </button>
                    </Form>
                  )}
                </Formik>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
