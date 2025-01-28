import React, { useEffect } from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import dish2 from "../../../assets/images/dish2.png";
import arrowRight from "../../../assets/images/arrowRight.svg";
// import restaurantCard from "../../../assets/images/restaurantCard.png";
import Loader from "../../../common/Loader/Loader";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ActiveNudge = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  return (
    <>
      {isOpen && <div className="overlay2" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <div className={`rightSidebar ${isOpen ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">Active Nudge Details</div>
          <div className="closeSidebar" onClick={toggleSidebar}>
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowSidebar">
          <img className="w-100 merchantImg br10 mb-6" src={dish2} alt="" />
          <div className="fs-16 fw-600">Free drink</div>
          <div className="fs-14 mb-20">
            {/* Free drink on Happy Hours! From 07:00 PM to 08:00 PM */}
            Free drink on Happy Hours! From 07:00 PM to 08:00 PM
          </div>
          <div className="nudgeGrid3">
            <div className="nudgeCard">
              <div className="fs-14 mb-4">Total</div>
              <div className="fs-20 fw-700 pc">100</div>
            </div>
            <div className="nudgeCard">
              <div className="fs-14 mb-4">Redeemed</div>
              <div className="fs-20 fw-700 pc">52</div>
            </div>
            <div className="nudgeCard">
              <div className="fs-14 mb-4">Left</div>
              <div className="fs-20 fw-700 pc">48</div>
            </div>
          </div>
          <div className="divider2"></div>
          <div className="fs-16 fw-700 mb-10">I want it</div>
          <div className="d-flex justify-between align-center gap-10">
            <div className="d-flex gap-8 align-center ">
              <div className="position-relative d-flex">
                <div className="imageCollaps">
                  <img src={dish2} alt="" className="w-100 h-100" />
                </div>
                <div className="imageCollaps">
                  <img src={dish2} alt="" className="w-100 h-100" />
                </div>
                <div className="imageCollaps">
                  <img src={dish2} alt="" className="w-100 h-100" />
                </div>
                <div className="imageCollaps">
                  <img src={dish2} alt="" className="w-100 h-100" />
                </div>
                <div className="imageCollaps">
                  <img src={dish2} alt="" className="w-100 h-100" />
                </div>
              </div>
              <div className="fs-14 pc cursor-pointer">+44 People</div>
            </div>
            <div className="fs-14">52 people</div>
          </div>
          <div className="divider2"></div>
          <div className="fs-16 fw-700 mb-10">Maybe</div>
          <div className="d-flex justify-between align-center gap-10">
            <div className="d-flex gap-8 align-center ">
              <div className="position-relative d-flex">
                <div className="imageCollaps">
                  <img src={dish2} alt="" className="w-100 h-100" />
                </div>
                <div className="imageCollaps">
                  <img src={dish2} alt="" className="w-100 h-100" />
                </div>
                <div className="imageCollaps">
                  <img src={dish2} alt="" className="w-100 h-100" />
                </div>
                <div className="imageCollaps">
                  <img src={dish2} alt="" className="w-100 h-100" />
                </div>
                <div className="imageCollaps">
                  <img src={dish2} alt="" className="w-100 h-100" />
                </div>
              </div>
              <div className="fs-14 pc cursor-pointer">+44 People</div>
            </div>
            <div className="fs-14">52 people</div>
          </div>
          <div className="divider2"></div>
          <div className="fs-16 fw-700 mb-10">Not for me</div>
          <div className="d-flex justify-between align-center gap-10">
            <div className="d-flex gap-8 align-center ">
              <div className="position-relative d-flex">
                <div className="imageCollaps">
                  <img src={dish2} alt="" className="w-100 h-100" />
                </div>
                <div className="imageCollaps">
                  <img src={dish2} alt="" className="w-100 h-100" />
                </div>
                <div className="imageCollaps">
                  <img src={dish2} alt="" className="w-100 h-100" />
                </div>
                <div className="imageCollaps">
                  <img src={dish2} alt="" className="w-100 h-100" />
                </div>
                <div className="imageCollaps">
                  <img src={dish2} alt="" className="w-100 h-100" />
                </div>
              </div>
              <div className="fs-14 pc cursor-pointer">+44 People</div>
            </div>
            <div className="fs-14">52 people</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveNudge;
