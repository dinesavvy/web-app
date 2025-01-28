import React, { useEffect, useState } from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import dish2 from "../../../assets/images/dish2.png";
import deleteModal from "../../../assets/images/deleteModal.svg";
import arrowRight from "../../../assets/images/arrowRight.svg";
// import restaurantCard from "../../../assets/images/restaurantCard.png";
import Loader from "../../../common/Loader/Loader";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CommonModal from "./CommonModal";

const MerchantNudgeFollowers = ({
  isMercahntNudgeFollowers,
  toggleSidebarNudgeFollower,
}) => {
  const navigate = useNavigate();
  return (
    <>
      {isMercahntNudgeFollowers && (
        <div className="overlay2" onClick={toggleSidebarNudgeFollower}></div>
      )}

      {/* Sidebar */}
      <div className={`rightSidebar ${isMercahntNudgeFollowers ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">I want it</div>
          <div className="closeSidebar" onClick={toggleSidebarNudgeFollower}>
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowSidebar">
          <div className="historyFlex">
            <div className="d-flex align-center gap-8">
              <div class="initialName fs-16">dr</div>
              <div>
                <div className="fs-14 lightBlack">John Cooper</div>
                <div className="fs-14 fw-500">December 19, 2024</div>
              </div>
            </div>
            <div>
              <img src={arrowRight} alt="arrowRight" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MerchantNudgeFollowers;
