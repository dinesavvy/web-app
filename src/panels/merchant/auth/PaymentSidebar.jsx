import React, { useEffect } from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import google from "../../../assets/images/google.svg";
import apple from "../../../assets/images/apple.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  businessAddNudgeCreditAction,
  businessAddNudgeCreditHandler,
} from "../../../redux/action/businessAction/businessAddNudgeCredit";
import { useCommonMessage } from "../../../common/CommonMessage";

const PaymentSidebar = ({
  isPaymentSidebar,
  togglePaymentSidebar,
  activeNudge,
}) => {
  const dispatch = useDispatch();
  const messageApi = useCommonMessage();

  const businessAddNudgeCreditSelector = useSelector(
    (state) => state?.businessAddNudgeCredit
  );
  const nudgePaymentGooglePay = () => {
    let payload = {
      nudgeCredit: activeNudge,
      nudgeAmount: activeNudge,
      currency: "INR",
    };
    dispatch(businessAddNudgeCreditHandler(payload));
  };

  useEffect(() => {
    if (businessAddNudgeCreditSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: businessAddNudgeCreditSelector?.data?.message,
      });
      dispatch(businessAddNudgeCreditAction.businessAddNudgCreditReset());
    } else if (businessAddNudgeCreditSelector?.message) {
      messageApi.open({
        type: "error",
        content: businessAddNudgeCreditSelector?.message,
      });
      dispatch(businessAddNudgeCreditAction.businessAddNudgCreditReset());
    }
  }, [businessAddNudgeCreditSelector]);

  return (
    <>
      {isPaymentSidebar && (
        <div className="overlay2" onClick={togglePaymentSidebar}></div>
      )}

      {/* Sidebar */}
      <div className={`rightSidebar ${isPaymentSidebar ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">Payment</div>
          <div className="closeSidebar" onClick={togglePaymentSidebar}>
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        {/* <div className="divider2"></div> */}
        <div className="overflowSidebar">
          <div className="divider2"></div>
          <div className="d-flex justify-between align-center gap-20 mb-20">
            <div className="fs-14  ">Nudge Credit you’re adding</div>
            <div className="fs-18 fw-600">{activeNudge}</div>
          </div>
          <div className="d-flex justify-between align-center gap-20">
            <div className="fs-14  ">1 Nudge credit cost</div>
            <div className="fs-18 fw-600">$1</div>
          </div>
          <div className="divider2"></div>

          <div className="d-flex justify-between align-center gap-20 mb-20">
            <div className="fs-14  ">Total</div>
            <div className="fs-18 fw-600">${activeNudge}</div>
          </div>
          <button className="add-credit-btn" onClick={nudgePaymentGooglePay}>
            Checkout
          </button>
          {/* <div className="d-flex align-center gap-10 mb-20">
            <div
              className="btn btnSecondary gap-10 w-100"
              onClick={nudgePaymentGooglePay}
            >
              <img src={google} alt="" /> Pay
            </div>
            <div className="btn btnSecondary gap-10 w-100">
              <img src={apple} alt="" /> Pay
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default PaymentSidebar;
