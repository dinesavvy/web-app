import React, { useEffect } from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import loactionIcon from "../../../assets/images/loactionIcon.svg";
import arrowRight from "../../../assets/images/arrowRight.svg";
import restaurantCard from "../../../assets/images/restaurantCard.png";

const NudgeDetail = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="overlay2" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <div className={`rightSidebar ${isOpen ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">Nudge Details</div>
          <div className="closeSidebar" onClick={toggleSidebar}>
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowSidebar">
          <div className="d-flex justify-between align-center mb-10">
            <div class="initialName">dr</div>
            <div className="text-end">
              <div className="fs-14 mb-4">Nudge ID</div>
              <div className="fs-14 fw-600">#123456</div>
            </div>
          </div>
          <div className="fs-18 fw-600 mb-2">Joe's Pizza</div>
          <div className="d-flex align-center fs-14 gap-10 mb-20">
            <img src={loactionIcon} alt="loactionIcon" />
            New York, NY
          </div>
          <div className="lightBlack fs-14 o5">
            Get 20% off on all large pizzas today! Limited time offer.
          </div>
          <div className="divider2"></div>
          <div className="d-flex justify-between align-center gap-20 mb-10">
            <div className="fs-14 lightBlack ">Sent date</div>
            <div className="fs-14 fw-500">Mar 19, 2024</div>
          </div>
          <div className="d-flex justify-between align-center gap-20">
            <div className="fs-14 lightBlack ">Expiration date</div>
            <div className="fs-14 fw-500">Mar 26, 2024</div>
          </div>
          <div className="divider2"></div>
          <img
            className="w-100 merchantImg br10 mb-6"
            src={restaurantCard}
            alt=""
          />
          <div className="fs-16 fw-600">Free drink</div>
          <div className="fs-14 mb-20">
            Free drink on Happy Hours! From 07:00 PM to 08:00 PM
          </div>
          <div className="lightBlack fs-14 mb-10">Brand</div>
          <div className="brandFlex">
            <div>Wine</div>
            <div>Drinks</div>
          </div>
          <div className="divider2"></div>
          <div className="grid2 mb-20">
            <div>
              <div className="fs-14 mb-4 lightBlack">Recipients:</div>
              <div className="fs-14 fw-600">500</div>
            </div>
            <div>
              <div className="fs-14 mb-4 lightBlack">Accepted:</div>
              <div className="fs-14 fw-600 gc">320/60%</div>
            </div>
            <div>
              <div className="fs-14 mb-4 lightBlack">Declined:</div>
              <div className="fs-14 fw-600 rc">180/40%</div>
            </div>
            <div>
              <div className="fs-14 mb-4 lightBlack">No Response</div>
              <div className="fs-14 fw-600 greyColor">$10.00</div>
            </div>
          </div>
          <div className="btn">
          Resend
          </div>
          <div className="divider2"></div>
          <div className="fs-18 fw-600 mb-16">Redeemtion History</div>
          <div className="historyFlex">
            <div className="d-flex align-center gap-8">
            <div class="initialName fs-16">dr</div>
               <div>
               <div className="fs-14 lightBlack">
                John Cooper
                </div>
                <div className="fs-14 fw-500">
                December 19, 2024
                </div>
               </div>
            </div>
            <div><img src={arrowRight} alt="arrowRight" /></div>
          </div>
          <div className="pc fs-16 fw-700 cursor-pointer text-center">
          Show More
          </div>
        </div>
      </div>
    </>
  );
};

export default NudgeDetail;
