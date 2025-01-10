import React from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import apple from "../../../assets/images/apple.svg";
import google from "../../../assets/images/google.svg";
import restaurantCard from "../../../assets/images/restaurantCard.png";

const PromotionCart = ({ isOpen, toggleCart }) => {
  return (
    <>
      {isOpen && <div className="overlay2" onClick={toggleCart}></div>}

      <div className={`rightSidebar rightSidebar2 ${isOpen ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">Cart</div>
          <div className="closeSidebar" onClick={toggleCart}>
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowCart overflowCart3">
          <div className="">
            <div className="mb-20">
              <img
                className="w-100 merchantImg br10 mb-6"
                src={restaurantCard}
                alt=""
              />
              <div className="fs-16 fw-600">Free drink</div>
              <div className="fs-14 mb-16">
                Free drink on Happy Hours! From 07:00 PM to 08:00 PM
              </div>
              <div className="d-flex  align-center gap-10 mb-16">
                <div className="w-100">
                  <div className="fs-14  mb-5">From</div>
                  <div className="fs-14 fw-600">DD/MM/YYYY</div>
                </div>
                <div className="w-100">
                  <div className="fs-14  mb-5">To</div>
                  <div className="fs-14 fw-600">DD/MM/YYYY</div>
                </div>
              </div>
              <div className="d-flex justify-between align-center gap-20 mb-4">
                <div className="fs-14  ">Promotion Amount</div>
                <div className="fs-14 fw-600">$200</div>
              </div>
              <div className="d-flex justify-between align-center gap-20 mb-4">
                <div className="fs-14  ">Nudge credits</div>
                <div className="fs-14 fw-600">256</div>
              </div>
              <div className="d-flex justify-between align-center gap-20 mb-4">
                <div className="fs-14  ">Quantity</div>
                <div className="fs-14 fw-600">200</div>
              </div>
            </div>
            <div className="mb-20">
              <img
                className="w-100 merchantImg br10 mb-6"
                src={restaurantCard}
                alt=""
              />
              <div className="fs-16 fw-600">Free drink</div>
              <div className="fs-14 mb-16">
                Free drink on Happy Hours! From 07:00 PM to 08:00 PM
              </div>
              <div className="d-flex  align-center gap-10 mb-16">
                <div className="w-100">
                  <div className="fs-14  mb-5">From</div>
                  <div className="fs-14 fw-600">DD/MM/YYYY</div>
                </div>
                <div className="w-100">
                  <div className="fs-14  mb-5">To</div>
                  <div className="fs-14 fw-600">DD/MM/YYYY</div>
                </div>
              </div>
              <div className="d-flex justify-between align-center gap-20 mb-4">
                <div className="fs-14  ">Promotion Amount</div>
                <div className="fs-14 fw-600">$200</div>
              </div>
              <div className="d-flex justify-between align-center gap-20 mb-4">
                <div className="fs-14  ">Nudge credits</div>
                <div className="fs-14 fw-600">256</div>
              </div>
              <div className="d-flex justify-between align-center gap-20 mb-4">
                <div className="fs-14  ">Quantity</div>
                <div className="fs-14 fw-600">200</div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixedBottom">
          <div className="divider2"></div>
          <div className="d-flex justify-between align-center gap-20 mb-10">
            <div className="fs-14  ">Promotion Total</div>
            <div className="fs-18 fw-500">$600</div>
          </div>
          <div className="d-flex justify-between align-center gap-20 mb-10">
            <div className="fs-14  ">Credit Balance</div>
            <div className="fs-18 fw-500">$300</div>
          </div>
          <div className="d-flex justify-between align-center gap-20 mb-10">
            <div className="fs-14  ">Additional Credit required</div>
            <div className="fs-18 fw-500">$300</div>
          </div>
          <div className="d-flex justify-between align-center gap-20 mb-10">
            <div className="fs-14  ">Redemption Reserve</div>
            <div className="fs-18 fw-500">$120</div>
          </div>
          <div className="divider2"></div>

          <div className="d-flex justify-between align-center gap-20 mb-20 ">
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

export default PromotionCart;
