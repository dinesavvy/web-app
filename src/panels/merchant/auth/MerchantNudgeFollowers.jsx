import React, { useEffect, useState } from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
// import dish2 from "../../../assets/images/dish2.png";
// import deleteModal from "../../../assets/images/deleteModal.svg";
import arrowRight from "../../../assets/images/arrowRight.svg";
// import restaurantCard from "../../../assets/images/restaurantCard.png";
// import Loader from "../../../common/Loader/Loader";
// import moment from "moment";
import { useNavigate } from "react-router-dom";
import CommonModal from "./CommonModal";
import moment from "moment";
import { businessNudgeDetailAction } from "../../../redux/action/businessAction/businessNudgeDetails";
import { useDispatch } from "react-redux";

const MerchantNudgeFollowers = ({
  isMercahntNudgeFollowers,
  toggleSidebarNudgeFollower,
  nudgeType,
  businessNudgeDetailsSelector,
  setIsSidebarOpen,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  return (
    <>
      {isMercahntNudgeFollowers && (
        <div className="overlay2" onClick={toggleSidebarNudgeFollower}></div>
      )}

      {/* Sidebar */}
      <div className={`rightSidebar ${isMercahntNudgeFollowers ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">
            {nudgeType === "i_want_it"
              ? "I want it"
              : nudgeType === "maybe"
              ? "Maybe"
              : nudgeType === "not_for_me"
              ? "Not for me"
              : ""}
          </div>

          <div className="closeSidebar" onClick={toggleSidebarNudgeFollower}>
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowSidebar">
          {(nudgeType === "not_for_me"
            ? businessNudgeDetailsSelector?.data?.data?.disLikeUserList
            : nudgeType === "maybe"
            ? businessNudgeDetailsSelector?.data?.data?.maybeLaterUserList
            : businessNudgeDetailsSelector?.data?.data?.acceptedUserList
          )?.map((item, index) => {
            return (
              <>
                <div
                  className="historyFlex"
                  onClick={() => {
                    // navigate("/merchant/followers",{state:item})
                    navigate("/merchant/followers");
                    setIsSidebarOpen(false);
                    dispatch(businessNudgeDetailAction.businessNudgeDetailsReset());
                  }}
                >
                  <div className="d-flex align-center gap-8">
                    <div className="initialName fs-16">
                      {item?.userInfo?.displayName?.slice(0, 2).toUpperCase() ||
                        ""}
                    </div>
                    <div>
                      <div className="fs-14 lightBlack">
                        {item?.userInfo?.displayName?.charAt(0).toUpperCase() +
                          item?.userInfo?.displayName?.slice(1)}
                      </div>
                      <div className="fs-14 fw-500">
                        {moment(item?.acceptedAt).format("MMMM,DD YYYY")}
                      </div>
                    </div>
                  </div>
                  <div>
                    <img src={arrowRight} alt="arrowRight" />
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MerchantNudgeFollowers;
