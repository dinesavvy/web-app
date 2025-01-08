import React, { useEffect } from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import loactionIcon from "../../../assets/images/loactionIcon.svg";
import apple from "../../../assets/images/apple.svg";
import google from "../../../assets/images/google.svg";
import arrowRight from "../../../assets/images/arrowRight.svg";
import restaurantCard from "../../../assets/images/restaurantCard.png";

const NudgeCart = ({ isOpen, toggleCart }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="overlay2" onClick={toggleCart}></div>}

      {/* Sidebar */}
      <div className={`rightSidebar ${isOpen ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">Cart</div>
          <div className="closeSidebar" onClick={toggleCart}>
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowCart">
          <div className="">
            <div className="dividerbtn">
              <img
                className="w-100 merchantImg br10 mb-6"
                src={restaurantCard}
                alt=""
              />
              <div className="fs-16 fw-600">Free drink</div>
              <div className="fs-14 mb-10">
                Free drink on Happy Hours! From 07:00 PM to 08:00 PM
              </div>
              <div className="lightBlack fs-14 mb-4">Recipients:</div>
              <div className="d-flex justify-between align-center gap-20">
                <div className="fs-14 fw-600">200</div>
                <div className="fs-14 fw-600 darkBlack ">$200</div>
              </div>
            </div>
            <div className="dividerbtn">
              <img
                className="w-100 merchantImg br10 mb-6"
                src={restaurantCard}
                alt=""
              />
              <div className="fs-16 fw-600">Free drink</div>
              <div className="fs-14 mb-10">
                Free drink on Happy Hours! From 07:00 PM to 08:00 PM
              </div>
              <div className="lightBlack fs-14 mb-4">Recipients:</div>
              <div className="d-flex justify-between align-center gap-20">
                <div className="fs-14 fw-600">200</div>
                <div className="fs-14 fw-600 darkBlack ">$200</div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixedBottom">
              <div className="divider2"></div>
        <div className="d-flex justify-between align-center gap-20 mb-20">
            <div className="fs-14  ">Nudge Credit Balance</div>
            <div className="fs-18 fw-600">10</div>
          </div>
          <div className="d-flex justify-between align-center gap-20">
            <div className="fs-14  ">Additional Credits required</div>
            <div className="fs-18 fw-600">590</div>
          </div>
          <div className="divider2"></div>

          <div className="d-flex justify-between align-center gap-20 mb-20">
            <div className="fs-14  ">Total</div>
            <div className="fs-18 fw-600">$590</div>
          </div>
          <div className="d-flex align-center gap-10 mb-20">
            <div className="btn btnSecondary gap-10 w-100">
              <img src={google} alt="" /> Pay
            </div>
            <div className="btn btnSecondary gap-10 w-100">
              <img src={apple} alt="" /> Pay
            </div>
          </div>
          <div className="btn">Resend</div>
        </div>
      </div>
    </>
  );
};

export default NudgeCart;
