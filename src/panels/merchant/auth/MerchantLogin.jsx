/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "../../../assets/css/Login.css";
import login from "../../../assets/images/login.jpg";
import logo from "../../../assets/images/logo.svg";
import phoneInput from "../../../assets/images/phoneInput.svg";
import passwordInput from "../../../assets/images/passwordInput.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCommonMessage } from "../../../common/CommonMessage";
import { loginHandler, loginSliceAction } from "../../../redux/action/loginSlice";
import { useEffect } from "react";
import { validationSchema } from "./merchantLoginValidation";
import Loader from "../../../common/Loader/Loader";

const MerchantLogin = () => {
  const messageApi = useCommonMessage();
  const loginSelector = useSelector((state) => state?.loginSliceDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
                  <div className="mb-30">
                    <label className="fs-14 fw-500 mb-10" htmlFor="email">
                    Phone number*
                    </label>
                    <div className="line">
                      <Field
                        type="number"
                        name="phone"
                        placeholder="Enter your phone number"
                        id="phone"
                      />
                      <img src={phoneInput} alt="" className="absoluteImage" />
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
                    onClick={()=>navigate('/requested-code')}
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
  );
};

export default MerchantLogin;