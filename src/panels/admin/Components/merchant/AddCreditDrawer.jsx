import React, { useEffect } from "react";
import closeRightSidebar from "../../../../assets/images/closeRightSidebar.svg";
import loactionIcon from "../../../../assets/images/loactionIcon.svg";
import Loader from "../../../../common/Loader/Loader";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  addCreditAction,
  addCreditHandler,
} from "../../../../redux/action/addCreditsSlice";
import { useCommonMessage } from "../../../../common/CommonMessage";

const AddNudgeCredit = ({
  isOpen,
  toggleSidebar,
  nudgeDetailsMainSelector,
  activeTab,
  nudgeId,
  addNudgeCredit,
  setAddNudgeCredit,
  numberOfCredits,
  setNumberOfCredits,
  merchantDetailsSelector,
  addCreditSelector,
  nudgeAnalyticSelector,
}) => {
  const messageApi = useCommonMessage();

  const dispatch = useDispatch();

  const merchantId = localStorage.getItem("merchantId");

  const addCreditFn = () => {
    let payload = {
      nudgeCredit: numberOfCredits,
      nudgeAmount: numberOfCredits,
      currency: "INR",
      locationId: merchantId,
      businessId: merchantDetailsSelector?.data?.data?.businessId,
    };
    dispatch(addCreditHandler(payload));
  };

  useEffect(() => {
    if (addCreditSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: addCreditSelector?.data?.message,
      });
      dispatch(addCreditAction.addCreditReset());
      setAddNudgeCredit(false);
      setNumberOfCredits("");
    }
  }, [addCreditSelector]);

  const nudgeCreditBalance =
    nudgeAnalyticSelector?.data?.data?.nudgeCredit -
    (nudgeAnalyticSelector?.data?.data?.followerAddedToday +
      nudgeAnalyticSelector?.data?.data?.promotionNudgeCreditAddedToday);

      const totalNudgeCredit = 
      (nudgeCreditBalance === 0 ? 0 : Number(nudgeCreditBalance)) + Number(numberOfCredits);
    
  return (
    <>
      {/* Overlay */}
      {nudgeDetailsMainSelector?.isLoading ? (
        <Loader />
      ) : (
        <>
          {addNudgeCredit && (
            <div
              className="overlay2"
              onClick={() => setAddNudgeCredit(false)}
            ></div>
          )}

          {/* Sidebar */}
          <div className={`rightSidebar ${addNudgeCredit ? "open" : ""}`}>
            <div className="d-flex justify-between align-center">
              <div className="fs-20 fw-600">Nudge Details</div>
              <div
                className="closeSidebar"
                onClick={() => setAddNudgeCredit(false)}
              >
                <img src={closeRightSidebar} alt="closeRightSidebar" />
              </div>
            </div>
            <div className="divider2"></div>
            <div className="overflowSidebar">
              <div className="payment-container">
                <div className="payment-header">
                  <h2>Payment</h2>
                  {/* <span className="close-btn">&#215;</span> */}
                </div>
                <div className="credit-summary">
                  <div className="credit-row">
                    <span>Nudge Credit Balance</span>
                    <span className="credit-value">
                      {nudgeAnalyticSelector?.data?.data?.nudgeCredit -
                        (nudgeAnalyticSelector?.data?.data?.followerAddedToday +
                          nudgeAnalyticSelector?.data?.data
                            ?.promotionNudgeCreditAddedToday)}
                    </span>
                  </div>
                  <div className="credit-row">
                    <span>Nudge Credit you’re adding</span>
                    <span className="credit-value positive">
                      {numberOfCredits}
                    </span>
                  </div>
                  <div className="credit-row total">
                    <span>Total Nudge Credit</span>
                    <span className="credit-value">{totalNudgeCredit}</span>
                  </div>
                </div>
                {/* <div className="credit-details">
                  <div className="credit-row">
                    <span>Nudge Credit you’re adding</span>
                    <span className="credit-value">{numberOfCredits}</span>
                  </div>
                  <div className="credit-row">
                    <span>1 Nudge credit cost</span>
                    <span className="credit-value">$1</span>
                  </div>
                </div> */}
                <button className="add-credit-btn" onClick={addCreditFn}>
                  Add Credit
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddNudgeCredit;
