import React, { useEffect } from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import dish from "../../../assets/images/dish.png";
// import restaurantCard from "../../../assets/images/restaurantCard.png";
import Loader from "../../../common/Loader/Loader";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { businessListByUserIdHandler } from "../../../redux/action/businessAction/businessListByUserId";
import { useDispatch, useSelector } from "react-redux";

const FollowerDetails = ({ isOpen, toggleSidebar, followerDetails }) => {
  const navigate = useNavigate();
// console.log(followerDetails,"followerDetails")

const businessListByUserIdSelector = useSelector((state)=>state?.businessListByUserId)
console.log(followerDetails,"followerDetails")

const dispatch = useDispatch()

  useEffect(() => {
    if (followerDetails) {
      let payload = {
        page: 1,
        limit: 10,
        userId: followerDetails?.userId?._id,
        nudgeType: "Accepted", // "Received", "Accepted", "Denied", "NoAnswer", "Redeemed"
      };
      dispatch(businessListByUserIdHandler(payload))
    }
  }, [followerDetails]);

  return (
    <>
      {isOpen && <div className="overlay2" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <div className={`rightSidebar ${isOpen ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">Follower Details</div>
          <div className="closeSidebar" onClick={toggleSidebar}>
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowSidebar">
          <div className="d-flex  align-center mb-10 gap-12">
            {/* <div class="initialName">JJ</div> */}
            <div class="initialName">
              {" "}
              {followerDetails?.userId?.displayName
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase())
                .join("")
                .slice(0, 2)}{" "}
            </div>
            {/* <div className="text-end">
                  <div className="fs-14 mb-4">Nudge ID</div>
                  <div className="fs-14 fw-600">#123456</div>
                </div> */}
            {/* <div className="fs-16 fw-600">{followerDetails?.userId?.displayName}</div> */}
            <div className="fs-16 fw-600">
              {" "}
              {followerDetails?.userId?.displayName?.charAt(0).toUpperCase() +
                followerDetails?.userId?.displayName?.slice(1)}{" "}
            </div>
          </div>
          <div className="divider2"></div>
          <div className="fs-14 mb-6">Preferences</div>
          <div className="flexTag mb-20 fs-14">
            {/* <div>Wine</div>
            <div>Steak, Bar</div>
            <div>Drinks</div>
            <div>Weight Watchers</div>
            <div>Casual Dining</div> */}
            {followerDetails?.customerPreferenceData?.map((item, index) => {
              return item?.filterData?.length > 0 ? (
                item.filterData.map((item1, subIndex) => (
                  <div key={`${index}-${subIndex}`}>{item1}</div>
                ))
              ) : (
                <div key={index}>No data available</div>
              );
            })}
          </div>
          <div className="fs-14 mb-6">What they love</div>
          <div className="flexTagHfull mb-20 fs-14">
            {/* <div>
              I appreciate menus that offer something different. Creative takes
              on classic dishes or entirely new flavors. I’m always excited to
              try something I haven't had before.
            </div> */}
            {followerDetails?.customerPreferenceData?.map((item, index) => {
              return item?.personalPreference?.length > 0 ? (
                item.personalPreference.map((item1, subIndex) => (
                  <div key={`${index}-${subIndex}`}>{item1}</div>
                ))
              ) : (
                <div key={index}>No data available</div>
              );
            })}
          </div>
          <div className="fs-14 mb-16">Accepted Nudges</div>
          <div className=" d-flex align-center gap-16">
            <div className="image70">
              <img src={dish} alt="dish" />
            </div>
            <div>
              <div className="fs-16 fw-700  mb-5">Free drink</div>
              <div className="fs-14">
                Free drink on Happy Hours! From 07:00 PM to 08:00 PM
              </div>
            </div>
          </div>
          <div className="divider2"></div>
          <div className="pc fs-16 fw-700 cursor-pointer text-center mb-20">
            Show More
          </div>
          <div className="fs-14 mb-16">Declined Nudges</div>
          <div className=" d-flex align-center gap-16">
            <div className="image70">
              <img src={dish} alt="dish" />
            </div>
            <div>
              <div className="fs-16 fw-700  mb-5">Free drink</div>
              <div className="fs-14">
                Free drink on Happy Hours! From 07:00 PM to 08:00 PM
              </div>
            </div>
          </div>
          <div className="divider2"></div>
          <div className="pc fs-16 fw-700 cursor-pointer text-center mb-20">
            Show More
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowerDetails;
