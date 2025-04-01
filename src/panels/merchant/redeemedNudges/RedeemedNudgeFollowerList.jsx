import React, { useEffect } from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import noImageFound from "../../../assets/images/noImageFound.png";
import moment from "moment";
import redeem from "../../../assets/images/redeem.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  nudgeRedeemedAction,
  nudgeRedeemedHandler,
} from "../../../redux/action/businessAction/nudgeRedeemed";
import Loader from "../../../common/Loader/Loader";
import { businessNudgeDetailsHandler } from "../../../redux/action/businessAction/businessNudgeDetails";

const RedeemedNudgeFollowerList = ({
  redeemedFollowerList,
  setRedeemedFollowerList,
  businessNudgesListSelector,
  redeemedFollowerItem,
  businessNudgeDetailSelector,
}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const nudgeRedeemedSelector = useSelector((state) => state?.nudgeRedeemed);

  console.log(businessNudgeDetailSelector, "businessNudgeDetailSelector");

  const redeemedNudge = (item) => {
    let payload = {
      nudgeId: redeemedFollowerItem?._id,
      userId: item?.userInfo?.id,
    };
    dispatch(nudgeRedeemedHandler(payload));
  };

  useEffect(() => {
    if (redeemedFollowerList) {
      let payload = {
        nudgeId: redeemedFollowerItem?._id,
      };
      dispatch(businessNudgeDetailsHandler(payload));
      dispatch(nudgeRedeemedAction.nudgeRedeemedReset());
    }
  }, [redeemedFollowerList, nudgeRedeemedSelector]);

  return (
    <>
      {nudgeRedeemedSelector?.isLoading && <Loader />}
      {redeemedFollowerList && (
        <div
          className="overlay2"
          onClick={() => setRedeemedFollowerList(false)}
        ></div>
      )}

      <div className={`rightSidebar ${redeemedFollowerList ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">
            {businessNudgeDetailSelector?.data?.data?.title}
          </div>
          <div
            className="closeSidebar"
            onClick={() => setRedeemedFollowerList(false)}
          >
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowSidebar" id="scrollableDiv">
          {/* <InfiniteScroll
                  // dataLength={notifications.length}
                  next={loadMoreNotifications}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>No more notifications</b>
                    </p>
                  }
                  scrollableTarget="scrollableDiv"
                > */}
          {businessNudgeDetailSelector?.data?.data?.acceptedUserList?.length >
          0 ? (
            <>
              {businessNudgeDetailSelector?.data?.data?.acceptedUserList?.map(
                (item, index) => {
                  return (
                    <>
                      <div
                        className="historyFlex"
                        // onClick={() => {
                        //   navigate("/merchant/followers");
                        // }}
                      >
                        <div className="d-flex align-center gap-8">
                          <div className="initialName fs-16">
                            {item?.userInfo?.displayName
                              ?.slice(0, 2)
                              .toUpperCase() || ""}
                          </div>
                          <div>
                            <div className="fs-14 lightBlack">
                              {item?.userInfo?.displayName
                                ?.charAt(0)
                                .toUpperCase() +
                                item?.userInfo?.displayName?.slice(1)}
                            </div>
                            <div className="fs-14 fw-500">
                              {moment(item?.acceptedAt).format("MMMM,DD YYYY")}
                            </div>
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            if (item?.nudgeStatus !== "Redeemed") {
                              redeemedNudge(item);
                            }
                          }}
                          className={item?.nudgeStatus === "Redeemed"
                            ? "RedeemedTag RedeemTag"
                            : "RedeemTag"}
                        >
                          <img src={redeem} alt="" />
                          {item?.nudgeStatus === "Redeemed"
                            ? "Redeemed"
                            : "Pending"}

                        </div>
                      </div>
                    </>
                  );
                }
              )}
            </>
          ) : (
            <div className="noDataFound">No data available</div>
          )}

          {/* </InfiniteScroll> */}
        </div>
      </div>
    </>
  );
};

export default RedeemedNudgeFollowerList;
