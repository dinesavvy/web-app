import React, { useEffect } from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import loactionIcon from "../../../assets/images/loactionIcon.svg";
import arrowRight from "../../../assets/images/arrowRight.svg";
// import restaurantCard from "../../../assets/images/restaurantCard.png";
import Loader from "../../../common/Loader/Loader";
import moment from "moment";

const NudgeDetail = ({ isOpen, toggleSidebar, nudgeDetailsMainSelector }) => {
  return (
    <>
      {/* Overlay */}
      {nudgeDetailsMainSelector?.isLoading ? (
        <Loader />
      ) : (
        <>
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
                <div class="initialName">
                  {nudgeDetailsMainSelector?.data?.data?.title.slice(0, 2)}
                </div>
                {/* <div className="text-end">
                  <div className="fs-14 mb-4">Nudge ID</div>
                  <div className="fs-14 fw-600">#123456</div>
                </div> */}
              </div>
              <div className="fs-18 fw-600 mb-2">
                {nudgeDetailsMainSelector?.data?.data?.title}
              </div>
              <div className="d-flex align-center fs-14 gap-10 mb-20">
                <img src={loactionIcon} alt="loactionIcon" />
                {nudgeDetailsMainSelector?.data?.data?.locationDetails?.address
                  ?.addressLine1 +
                  nudgeDetailsMainSelector?.data?.data?.locationDetails?.address
                    ?.addressLine2 +
                  nudgeDetailsMainSelector?.data?.data?.locationDetails?.address
                    ?.administrativeDistrictLevel1 +
                  nudgeDetailsMainSelector?.data?.data?.locationDetails?.address
                    ?.country +
                  nudgeDetailsMainSelector?.data?.data?.locationDetails?.address
                    ?.postalCode}
              </div>
              <div className="lightBlack fs-14 o5">
                {/* Get 20% off on all large pizzas today! Limited time offer. */}
                {nudgeDetailsMainSelector?.data?.data?.message}
              </div>
              <div className="divider2"></div>
              <div className="d-flex justify-between align-center gap-20 mb-10">
                <div className="fs-14 lightBlack ">Sent date</div>
                <div className="fs-14 fw-500">
                  {moment(
                    nudgeDetailsMainSelector?.data?.data?.createdAt
                  ).format("DD,MMMM YYYY")}
                </div>
              </div>
              <div className="d-flex justify-between align-center gap-20">
                <div className="fs-14 lightBlack ">Expiration date</div>
                <div className="fs-14 fw-500">
                  {moment(
                    nudgeDetailsMainSelector?.data?.data?.deactivateAt
                  ).format("DD,MMMM YYYY")}
                </div>
              </div>
              <div className="divider2"></div>
              <img
                className="w-100 merchantImg br10 mb-6"
                src={nudgeDetailsMainSelector?.data?.data?.photoURL}
                alt=""
              />
              <div className="fs-16 fw-600">
                {nudgeDetailsMainSelector?.data?.data?.title}
              </div>
              <div className="fs-14 mb-20">
                {/* Free drink on Happy Hours! From 07:00 PM to 08:00 PM */}
                {nudgeDetailsMainSelector?.data?.data?.message}
              </div>
              {/* <div className="lightBlack fs-14 mb-10">Brand</div>
              <div className="brandFlex">
                <div>Wine</div>
                <div>Drinks</div>
              </div> */}
              <div className="divider2"></div>
              <div className="grid2 mb-20">
                <div>
                  <div className="fs-14 mb-4 lightBlack">Recipients:</div>
                  <div className="fs-14 fw-600">
                    {nudgeDetailsMainSelector?.data?.data?.recipientCount}
                  </div>
                </div>
                <div>
                  <div className="fs-14 mb-4 lightBlack">Accepted:</div>
                  <div className="fs-14 fw-600 gc">
                    {
                      nudgeDetailsMainSelector?.data?.data
                        ?.totalAcceptedFollowerList
                    }
                    /
                    {(
                      (nudgeDetailsMainSelector?.data?.data
                        ?.totalAcceptedFollowerList /
                        nudgeDetailsMainSelector?.data?.data?.recipientCount) *
                      100
                    ).toFixed(0)}
                    %
                  </div>
                </div>
                <div>
                  <div className="fs-14 mb-4 lightBlack">Declined:</div>
                  <div className="fs-14 fw-600 rc">
                    {nudgeDetailsMainSelector?.data?.data?.disLikeUserList}/
                    {(
                      (nudgeDetailsMainSelector?.data?.data?.disLikeUserList /
                        nudgeDetailsMainSelector?.data?.data?.recipientCount) *
                      100
                    ).toFixed(0)}
                    %
                  </div>
                </div>
                <div>
                  <div className="fs-14 mb-4 lightBlack">No Response</div>
                  <div className="fs-14 fw-600 greyColor">
                    {nudgeDetailsMainSelector?.data?.data?.recipientCount -
                      (nudgeDetailsMainSelector?.data?.data
                        ?.totalAcceptedFollowerList +
                      nudgeDetailsMainSelector?.data?.data?.disLikeUserList)}
                    /
                    {(((nudgeDetailsMainSelector?.data?.data?.recipientCount -
                      (nudgeDetailsMainSelector?.data?.data
                        ?.totalAcceptedFollowerList +
                      nudgeDetailsMainSelector?.data?.data?.disLikeUserList)) /
                      nudgeDetailsMainSelector?.data?.data?.recipientCount) *
                      100).toFixed(2)}
                    %
                  </div>
                </div>
              </div>
              <div className="btn">Resend</div>
              <div className="divider2"></div>
              {/* Nudge Detail */}
              <div className="fs-18 fw-600 mb-16">Redeemtion History</div>
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
              <div className="pc fs-16 fw-700 cursor-pointer text-center">
                Show More
              </div>
              {/* Nudge Sidebar */}
              {/* <div className="d-flex justify-between align-center gap-20">
                <div className="fs-14 lightBlack ">Redeemed on</div>
                <div className="fs-14 fw-500">Mar 26, 2024</div>
              </div>
              <div className="divider2"></div>

              <div className="historyFlex mb-50">
                <div>
                  <div className="fs-14 lightBlack">Select your audience</div>
                  <div className="fs-14 fw-500">
                    By default all your followers will be sent this Nudge.
                  </div>
                </div>
                <div>
                  <img src={arrowRight} alt="arrowRight" />
                </div>
              </div> */}
              {/* <div className="btn">Resend</div> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NudgeDetail;
