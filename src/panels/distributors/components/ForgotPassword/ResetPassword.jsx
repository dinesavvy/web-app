/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "../../../../assets/css/Login.css";
import login from "../../../../assets/images/login.jpg";
import emailInput from "../../../../assets/images/emailInput.svg";
import password from "../../../../assets/images/password.svg";
import passwordInput from "../../../../assets/images/passwordInput.svg";
import nopassword from "../../../../assets/images/nopassword.svg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { resetPasswordvalidationSchema } from "./forgotPasswordValidation";
import {
  resetPasswordAction,
  resetPasswordHandler,
} from "../../../../redux/action/supplierActions/resetPassword";
import Loader from "../../../../common/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCommonMessage } from "../../../../common/CommonMessage";
import {
  resetPasswordDistributorAction,
  resetPasswordDistributorHandler,
} from "../../../../redux/action/distributorsAction/resetPasswordDistributor";
import {
  checkResetPasswordAction,
  checkResetPasswordLinkHandler,
} from "../../../../redux/action/distributorsAction/checkResetPasswordLink";
import backToLogin from "../../../../assets/images/backToLogin.svg";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const messageApi = useCommonMessage();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetPasswordSelector = useSelector(
    (state) => state?.resetPasswordDistributor
  );

  const checkResetPasswordSelector = useSelector(
    (state) => state?.checkResetPassword
  );

  const handleFormSubmit = (values) => {
    let payload = {
      email: location?.pathname?.split("/")?.[4],
      password: values?.password,
      resetToken: location?.pathname?.split("/")?.[3],
    };
    dispatch(resetPasswordDistributorHandler(payload));
  };

  useEffect(() => {
    if (resetPasswordSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: resetPasswordSelector?.data?.message,
      });
      dispatch(resetPasswordDistributorAction.resetPasswordDistributorReset());
      navigate("/");
    } else if (resetPasswordSelector?.message) {
      messageApi.open({
        type: "error",
        content: resetPasswordSelector?.message,
      });
      dispatch(resetPasswordDistributorAction.resetPasswordDistributorReset());
    }
  }, [resetPasswordSelector, location]);

  useEffect(() => {
    if (location) {
      let payload = {
        email: location?.pathname?.split("/")?.[4],
        resetToken: location?.pathname?.split("/")?.[3],
      };
      dispatch(checkResetPasswordLinkHandler(payload));
    }
  }, [location]);

  useEffect(() => {
    if (checkResetPasswordSelector?.message?.data?.statusCode === 400) {
      navigate("/distributors/expire-link", {
        state: { email: location?.pathname?.split("/")?.[4] },
      });
      dispatch(checkResetPasswordAction.checkResetPasswordReset());
    }
  }, [checkResetPasswordSelector]);

  return (
    <>
      {(resetPasswordSelector?.isLoading ||
        checkResetPasswordSelector?.isLoading) && <Loader />}
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

            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={resetPasswordvalidationSchema}
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
                    <label className="fs-14 fw-500 mb-10" htmlFor="password">
                      Password
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
                  <div className="mb-30">
                    <label className="fs-14 fw-500 mb-10" htmlFor="password">
                      Confirm Password
                    </label>
                    <div className="line">
                      {/* <input
                        type={showPassword2 ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        id="password"
                      /> */}
                      <Field
                        type={showPassword2 ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Enter your password"
                        id="password"
                      />
                      <img
                        src={passwordInput}
                        alt=""
                        className="absoluteImage"
                      />
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
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    />
                  </div>
                  <button
                    className="btn w-100"
                    type="submit"
                    // disabled={isSubmitting}
                  >
                    Set new password
                  </button>
                  <div className="back-to-login" onClick={()=>navigate("/")}>
                    <span className="back-icon">
                      {" "}
                      <img src={backToLogin} alt="" />
                    </span>{" "}
                    Back to login
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

export default ResetPassword;
