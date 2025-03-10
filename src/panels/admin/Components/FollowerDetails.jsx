import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import breadCrumbIcon from "../../../assets/images/breadCrumb.svg";
import backButton from "../../../assets/images/backButton.svg";
import dish from "../../../assets/images/dish.png";
import map from "../../../assets/images/map.jpg";
import chart from "../../../assets/images/chart.jpg";
import { useDispatch, useSelector } from "react-redux";
import { followerDetailsHandler } from "../../../redux/action/followersDetails";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../common/Loader/Loader";
import moment from "moment";
import { listByUserIdHandler } from "../../../redux/action/listByUserId";

const FollowerDetail = () => {
  const [activeNudgeClass, setActiveNudgeClass] = useState("Received");
  const [activeTab, setActiveTab] = useState(true);
  const { state } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const followerDetailsSelector = useSelector(
    (state) => state?.followerDetails
  );
  const listByUserIdSelector = useSelector((state) => state?.listByUserId);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCardClick = (cardType) => {
    setActiveNudgeClass(cardType);
  };

  useEffect(() => {
    if (state) {
      let payload = {
        followerId: state?._id,
      };
      dispatch(followerDetailsHandler(payload));
    }
  }, [state]);

  useEffect(() => {
    if (activeNudgeClass) {
      let payload = {
        page: 1,
        limit: 10,
        userId: followerDetailsSelector?.data?.data?.userId,
        nudgeType: activeNudgeClass, // "Received", "Accepted", "Denied", "NoAnswer", "Redeemed",
        isActive: activeNudgeClass === "Received" ? activeTab : true,
      };

      dispatch(listByUserIdHandler(payload));
    }
  }, [activeNudgeClass, followerDetailsSelector, activeTab]);

  return (
    <>
      {(followerDetailsSelector?.isLoading ||
        listByUserIdSelector?.isLoading) && <Loader />}
      <div className="dashboard">
        <div className="tabPadding mb-30">
          <div className="d-flex align-center justify-between gap-20 mb-30 flexrightsm">
            <div className="d-flex align-center gap-20 w-100">
              <img
              className="cursor-pointer backButton"
                src={backButton}
                alt=""
                // onClick={() => setViewDetail(false)}
                onClick={() => navigate("/admin/merchant/followers")}
              />
              <div>
                <div className="fs-24 fw-600 mb-4">Followers</div>
                <Breadcrumb
                  className="cursor-pointer"
                  separator={<img src={breadCrumbIcon} />}
                  items={[
                    {
                      title: "Merchants",
                      onClick: () => navigate("/admin/merchant/list"),
                    },
                    {
                      title: "Followers",
                      onClick: () => navigate("/admin/merchant/followers"),
                    },
                    {
                      title: "Follower Details",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="inputGrid grid3">
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Follower name
              </label>
              <div className="fs-20">
                {/* {followerDetailsSelector?.data?.data?.userInfo?.displayName} */}
                {followerDetailsSelector?.data?.data?.userInfo?.displayName
      ? followerDetailsSelector.data.data.userInfo.displayName
          .charAt(0)
          .toUpperCase() + 
        followerDetailsSelector.data.data.userInfo.displayName.slice(1)
      : "N/A"}
              </div>
            </div>
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Began following
              </label>
              <div className="fs-20">
                {moment(followerDetailsSelector?.data?.data?.createdAt).format(
                  "MMMM,YYYY"
                )}
              </div>
            </div>
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Restaurants following
              </label>
              <div className="fs-20">
                {followerDetailsSelector?.data?.data?.totalFollowingCount}
              </div>
            </div>
            {/* {followerDetailsSelector?.data?.data?.userInfo?.email &&( */}
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Email address
              </label>
              <div className="fs-20">
                {followerDetailsSelector?.data?.data?.userInfo?.email || "N/A"}
              </div>
            </div>
            {/* )} */}
          </div>
        </div>
        <div className="tabPadding mb-30">
          <div className="fs-20 fw-700 mb-20">Nudges Info</div>
          <div className="grid5">
            <div
              className={
                activeNudgeClass === "Received" ? "card activeNudge" : "card"
              }
              onClick={() => handleCardClick("Received")}
            >
              <div className="grey mb-10 fs-16 fw-500">
                Nudges <br />
                received
              </div>
              <div className="fs-22 fw-500">
                {followerDetailsSelector?.data?.data?.nudge?.totalNudge}
              </div>
            </div>
            <div
              className={
                activeNudgeClass === "Redeemed" ? "card activeNudge" : "card"
              }
              onClick={() => {
                handleCardClick("Redeemed");
                setActiveTab(false);
              }}
            >
              <div className="grey mb-10 fs-16 fw-500">
                Nudges <br />
                Redeemed
              </div>
              <div className="fs-22 fw-500">
                {followerDetailsSelector?.data?.data?.nudge?.redeemedNudge}
              </div>
            </div>
            <div
              className={
                activeNudgeClass === "Accepted" ? "card activeNudge" : "card"
              }
              onClick={() => {
                handleCardClick("Accepted");
                setActiveTab(false);
              }}
            >
              <div className="grey mb-10 fs-16 fw-500">
                Nudges <br />
                accepted
              </div>
              {/* <div className="fs-22 fw-500">{followerDetailsSelector?.data?.data?.nudge?.acceptNudge}</div> */}
              <div className="fs-22 fw-500">
                {followerDetailsSelector?.data?.data?.nudge?.totalNudge
                  ? `${
                      followerDetailsSelector?.data?.data?.nudge?.acceptNudge ||
                      0
                    }/${
                      followerDetailsSelector?.data?.data?.nudge?.totalNudge
                    } (${(
                      (followerDetailsSelector?.data?.data?.nudge?.acceptNudge /
                        followerDetailsSelector?.data?.data?.nudge
                          ?.totalNudge) *
                      100
                    ).toFixed(2)}%)`
                  : 0}
              </div>
            </div>
            <div
              className={
                activeNudgeClass === "Denied" ? "card activeNudge" : "card"
              }
              onClick={() => {
                handleCardClick("Denied");
                setActiveTab(false);
              }}
            >
              <div className="grey mb-10 fs-16 fw-500">
                Nudges <br />
                declined
              </div>
              <div className="fs-22 fw-500">
                {/* {followerDetailsSelector?.data?.data?.nudge?.declinedNudge}/
                {(
                  (followerDetailsSelector?.data?.data?.nudge?.declinedNudge /
                    followerDetailsSelector?.data?.data?.nudge?.totalNudge) *
                  100
                ).toFixed(2)}
                % */}
                {followerDetailsSelector?.data?.data?.nudge?.totalNudge > 0
                  ? `${
                      followerDetailsSelector?.data?.data?.nudge
                        ?.declinedNudge || 0
                    }/${(
                      (followerDetailsSelector?.data?.data?.nudge
                        ?.declinedNudge /
                        followerDetailsSelector?.data?.data?.nudge
                          ?.totalNudge) *
                      100
                    ).toFixed(2)}%`
                  : 0}
              </div>
            </div>
            <div
              onClick={() => {
                handleCardClick("NoAnswer");
                setActiveTab(false);
              }}
              className={
                activeNudgeClass === "NoAnswer" ? "card activeNudge" : "card"
              }
            >
              <div className="grey mb-10 fs-16 fw-500">
                Nudges with <br />
                no action
              </div>
              <div className="fs-22 fw-500">
                {/* {followerDetailsSelector?.data?.data?.nudge?.totalNudge -
                  (followerDetailsSelector?.data?.data?.nudge?.acceptNudge +
                    followerDetailsSelector?.data?.data?.nudge?.declinedNudge)}
                /
                {(
                  ((followerDetailsSelector?.data?.data?.nudge?.totalNudge -
                    (followerDetailsSelector?.data?.data?.nudge?.acceptNudge +
                      followerDetailsSelector?.data?.data?.nudge
                        ?.declinedNudge)) /
                    followerDetailsSelector?.data?.data?.nudge?.totalNudge) *
                  100
                ).toFixed(2)}
                % */}
                {followerDetailsSelector?.data?.data?.nudge?.totalNudge > 0
                  ? `${
                      followerDetailsSelector?.data?.data?.nudge?.totalNudge -
                      ((followerDetailsSelector?.data?.data?.nudge
                        ?.acceptNudge || 0) +
                        (followerDetailsSelector?.data?.data?.nudge
                          ?.declinedNudge || 0))
                    }/${(
                      ((followerDetailsSelector?.data?.data?.nudge?.totalNudge -
                        ((followerDetailsSelector?.data?.data?.nudge
                          ?.acceptNudge || 0) +
                          (followerDetailsSelector?.data?.data?.nudge
                            ?.declinedNudge || 0))) /
                        followerDetailsSelector?.data?.data?.nudge
                          ?.totalNudge) *
                      100
                    ).toFixed(2)}%`
                  : 0}
              </div>
            </div>
          </div>
          <div className="divider2"></div>
          <div className="fs-20 fw-700 mb-20">
            {{
              Received: "Nudges Received",
              Redeemed: "Nudges Redeemed",
              Accepted: "Nudges Accepted",
              Denied: "Nudges Declined",
              NoAnswer: "Nudges with no action",
            }[activeNudgeClass] || ""}
          </div>
          {activeNudgeClass === "Received" && (
            <div className="tabs-container tab3 tabing mb-20">
              <div className="tabs">
                <button
                  className={`tab-button ${activeTab === true ? "active" : ""}`}
                  onClick={() => handleTabClick(true)}
                >
                  Active
                </button>
                <button
                  className={`tab-button ${
                    activeTab === false ? "active" : ""
                  }`}
                  onClick={() => handleTabClick(false)}
                >
                  Inactive
                </button>
              </div>
            </div>
          )}

          <div className="grid2 gap-20">
            {listByUserIdSelector?.data?.data?.records?.length > 0 ? (
              listByUserIdSelector?.data?.data?.records?.map((item, index) => {
                return (
                  <div
                    className="card16 d-flex align-center gap-16"
                    key={index}
                  >
                    <div className="image80">
                      <img src={item?.photoURL ?? dish} alt="dish" />
                    </div>
                    <div>
                      <div className="fs-16 fw-500 grey mb-5">
                        {item?.title}
                      </div>
                      <div className="fs-16 fw-500">{item?.message}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="noDataFound">No Data Available</div>
            )}
          </div>
          {/* <div className="grid2 gap-20">
              <div className="card16 d-flex align-center gap-16">
                <div className="image80">
                  <img src={dish} alt="dish" />
                </div>
                <div>
                  <div className="fs-16 fw-500 grey mb-5">Taste the Magic</div>
                  <div className="fs-16 fw-500">
                    Unlock a 20% discount on our signature dishes this week.
                  </div>
                </div>
              </div>
              <div className="card16 d-flex align-center gap-16">
                <div className="image80">
                  <img src={dish} alt="dish" />
                </div>
                <div>
                  <div className="fs-16 fw-500 grey mb-5">Taste the Magic</div>
                  <div className="fs-16 fw-500">
                    Unlock a 20% discount on our signature dishes this week.
                  </div>
                </div>
              </div>
              <div className="card16 d-flex align-center gap-16">
                <div className="image80">
                  <img src={dish} alt="dish" />
                </div>
                <div>
                  <div className="fs-16 fw-500 grey mb-5">Taste the Magic</div>
                  <div className="fs-16 fw-500">
                    Unlock a 20% discount on our signature dishes this week.
                  </div>
                </div>
              </div>
              <div className="card16 d-flex align-center gap-16">
                <div className="image80">
                  <img src={dish} alt="dish" />
                </div>
                <div>
                  <div className="fs-16 fw-500 grey mb-5">Taste the Magic</div>
                  <div className="fs-16 fw-500">
                    Unlock a 20% discount on our signature dishes this week.
                  </div>
                </div>
              </div>
              <div className="card16 d-flex align-center gap-16">
                <div className="image80">
                  <img src={dish} alt="dish" />
                </div>
                <div>
                  <div className="fs-16 fw-500 grey mb-5">Taste the Magic</div>
                  <div className="fs-16 fw-500">
                    Unlock a 20% discount on our signature dishes this week.
                  </div>
                </div>
              </div>
            </div> */}
        </div>
        <div className="tabPadding mb-30">
          <div className="fs-20 fw-700 mb-10">Sharing</div>
          {/* <div className="grid3">
            <div className="card">
              <div className="grey mb-10 fs-16 fw-500">Number of Sharing</div>
              <div className="fs-22 fw-500">25k</div>
            </div>
            <div className="card">
              <div className="grey mb-10 fs-16 fw-500">
                Sharing invitations sent
              </div>
              <div className="fs-22 fw-500">1.25k</div>
            </div>
            <div className="card">
              <div className="grey mb-10 fs-16 fw-500">
                Sharing invitations accepted
              </div>
              <div className="fs-22 fw-500">2.25k</div>
            </div>
          </div> */}
          No data found
        </div>
        <div className="tabPadding mb-30">
          <div className="fs-20 fw-700 mb-20">Merchants</div>
          <div className="flexTag2">
            {/* <div>Garden Grove Café & Bistro</div>
              <div>The Rolling Pin Bakery</div>
              <div>Firefly Lounge & Bar</div>
              <div>Golden Harvest Farmhouse</div>
              <div>Sage & Stone Fine</div>
              <div>Pine & Cedar Grille House</div>
              <div>Blue Horizon Coastal Grill</div>
              <div>Sweet Basil Wine Bar</div>
              <div>Red Oak Smokehouse BBQ</div>
              <div>See more</div> */}
            No data found
          </div>
        </div>
        <div className="tabPadding mb-30">
          <div className="fs-20 fw-700 mb-20">Items favorited</div>
          {/* <div className="flexTagFull">
              <div>French dip</div>
              <div>Cioppino</div>
              <div>Avocado toast</div>
              <div>Mac and Cheese Pizza</div>
              <div>Burrito</div>
              <div>Mission burrito</div>
            </div> */}
          No data found
        </div>
        <div className="tabPadding mb-30">
          <div className="fs-20 fw-700 mb-20">Preferences</div>
          {/* <div className="flexTagFull"> */}
          {/* <div>Casual Dining</div>
              <div>Weight Watchers</div>
              <div>Drinks</div>
              <div>Steak, Bar</div>
              <div>Wine</div> */}
          {followerDetailsSelector?.data?.data?.customerPreferenceData
            ?.personalPreference?.length > 0 ? (
            followerDetailsSelector?.data?.data?.customerPreferenceData?.personalPreference.map(
              (item, index) => {
                return <div key={index}>{item}</div>;
              }
            )
          ) : (
            <div className="d-flex gap-30 flexWrap">No data found</div>
          )}
          {/* </div> */}
        </div>
        <div className="tabPadding mb-30">
          <div className="fs-20 fw-700 mb-20">Dine Savvy Application Usage</div>
          <div className="d-flex gap-30 flexWrap">
            {/* <div className="card w-100">
                <div>
                  <img src={chart} className="w-100" alt="" />
                </div>
                <div className="divider2"></div>
                <div className="fw-600 text-center">User opens Dine Savvy</div>
              </div>
              <div className="card w-100">
                <div>
                  <img src={chart} className="w-100" alt="" />
                </div>
                <div className="divider2"></div>
                <div className="fw-600 text-center">
                  User spends in Dine Savvy
                </div>
              </div> */}
            No data found
          </div>
        </div>
        {/* <div className="tabPadding mb-30">
            <div className="fs-20 fw-700 mb-20">Locations</div>
            <div className="divider2"></div>
            <div className="fw-500 text-center mb-20">Weekly</div>
            <div className="w-100 mh400 ">
              <img src={map} className="w-100 h-100" alt="" />
            </div>
            <div className="divider2"></div>
            <div className="overflow">
              <table className="w-100 fs-14 text-start">
                <thead>
                  <tr>
                    <th style={{ minWidth: "200px" }}>Date/Day</th>
                    <th style={{ minWidth: "200px" }}>Time</th>
                    <th style={{ minWidth: "400px", width: "60%" }}>
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sunday</td>
                    <td>12:23 pm</td>
                    <td>8502 Preston Rd. Inglewood, Maine 98380</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>12:23 pm</td>
                    <td>8502 Preston Rd. Inglewood, Maine 98380</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>12:23 pm</td>
                    <td>8502 Preston Rd. Inglewood, Maine 98380</td>
                  </tr>
                  <tr>
                    <td>Monday</td>
                    <td>12:23 pm</td>
                    <td>8502 Preston Rd. Inglewood, Maine 98380</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */}
        <div className="tabPadding mb-30">
          <div className="fs-20 fw-700 mb-20">Most common time used</div>
          <div className="flexTagFull">
            {/* <div>12:00 to 01:00 PM</div>
              <div>06:00 to 07:30 PM</div> */}
            No data found
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowerDetail;
