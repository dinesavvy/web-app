/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "../../../../assets/css/Login.css";
import login from "../../../../assets/images/login.jpg";
// import logo from "../../../../assets/images/logo.svg";
// import emailInput from "../../../../assets/images/emailInput.svg";
// import passwordInput from "../../../../assets/images/passwordInput.svg";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../../common/Loader/Loader";
import { forgotPasswordAction, forgotPasswordHandler } from "../../../../redux/action/distributorsAction/forgotPassword";
import { useDispatch, useSelector } from "react-redux";
import { useCommonMessage } from "../../../../common/CommonMessage";

const ExpireLink = () => {
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const messageApi = useCommonMessage();
  
  const forgotPasswordDistributor = useSelector(
    (state) => state?.forgotPassword
  );

  const { state } = useLocation();

  const requestNewLink = () => {
    let payload = {
      email: state?.email.toLowerCase(),
    };
    dispatch(forgotPasswordHandler(payload));
  };

  useEffect(() => {
    if (forgotPasswordDistributor?.message) {
      messageApi.open({
        type: "error",
        content: forgotPasswordDistributor?.message,
      });
      dispatch(forgotPasswordAction.forgotPasswordReset());
    } else if (forgotPasswordDistributor?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: forgotPasswordDistributor?.data?.message,
      });
      navigate("/")
      dispatch(forgotPasswordAction.forgotPasswordReset());
    }
  }, [forgotPasswordDistributor]);

  return (
    <>
    {forgotPasswordDistributor?.isLoading && <Loader />}
      <div className="loginFlex ">
        <div className="w-50 h-100 position-relative mobileHide fixLeft">
          <img src={login} alt="" className="w-100 h-100 object-cover" />
        </div>
        <div className="d-flex align-center justify-center w-lg-50 loginside overflowy">
          <div className="mx-450 mx-auto">
            <div className="fs-24 fw-700 mb-8 text-center">Oops, Your link has expired</div>
            <div className="tabGrey text-center">
            No worries, you can easily request a new one!
            Click the button below to get a new link.
            </div>
            <div className="divider"></div>
            <button className="btn w-100 mb-30" type = "submit" onClick={requestNewLink}>
            Request New Link
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpireLink;
