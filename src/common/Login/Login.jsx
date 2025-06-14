/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "../../assets/css/Login.css";
import login from "../../assets/images/login.jpg";
import logo from "../../assets/images/logo.svg";
import emailInput from "../../assets/images/emailInput.svg";
import passwordInput from "../../assets/images/passwordInput.svg";
import password from "../../assets/images/password.svg";
import nopassword from "../../assets/images/nopassword.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCommonMessage } from "../CommonMessage";
import { loginHandler, loginSliceAction } from "../../redux/action/loginSlice";
import { useEffect } from "react";
import { validationSchema } from "./loginValidation";
import Loader from "../Loader/Loader";

const Login = () => {
  const messageApi = useCommonMessage();
  const loginSelector = useSelector((state) => state?.loginSliceDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = (values) => {
    let payload = {
      email: values?.email.toLowerCase(),
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
      navigate("/admin/dashboard");
      dispatch(loginSliceAction.loginDetailsSliceReset());
    } else if (loginSelector?.message?.status === 400) {
      messageApi.open({
        type: "error",
        content: loginSelector?.message?.message,
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
                      <img src={emailInput} alt="" className="absoluteImage" />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    />
                  </div>
                  <div className="mb-40">
                    <label className="fs-14 fw-500 mb-10" htmlFor="password">
                      Password*
                    </label>
                    <div className="line">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        id="password"
                      />
                      <img
                        src={passwordInput}
                        alt=""
                        className="absoluteImage"
                      />
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
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    />
                  </div>
                  <button
                    className="btn w-100"
                    type="submit"
                    // disabled={isSubmitting}
                  >
                    Continue
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
