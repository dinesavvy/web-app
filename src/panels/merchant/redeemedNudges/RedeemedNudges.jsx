import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import { useDispatch, useSelector } from "react-redux";
import { businessNudgesListHandler } from "../../../redux/action/businessAction/businessNudgesList";
import Loader from "../../../common/Loader/Loader";
import noImageFound from "../../../assets/images/noImageFound.png";
import RedeemedNudgeFollowerList from "./RedeemedNudgeFollowerList";
// import { businessNudgeDetailsHandler } from "../../../redux/action/businessAction/businessNudgeDetails";

const RedeemedNudges = ({ redeemedNudges, setRedeemedNudges }) => {
  const dispatch = useDispatch();

  const [redeemedFollowerList, setRedeemedFollowerList] = useState(false);

  const [redeemedFollowerItem, setRedeemedFollowerItem] = useState({});

  const businessNudgesListSelector = useSelector(
    (state) => state?.businessNudgesList
  );

  const getSelectedBusiness = JSON.parse(
    localStorage.getItem("selectedBusiness")
  );

  const acceptedNudgeList = () => {
    let payload = {
      page: 1,
      limit: 10,
      locationId: getSelectedBusiness?._id,
      isActive: true,
    };
    dispatch(businessNudgesListHandler(payload));
  };

  useEffect(() => {
    acceptedNudgeList();
  }, []);

  const businessNudgeDetailSelector = useSelector(
    (state) => state?.businessNudgeDetails
  );

  const nudgeDetails = (item) => {
    setRedeemedFollowerItem(item);
    setRedeemedFollowerList(true);
  };


  return (
    <>
      {(businessNudgesListSelector?.isLoading ||
        businessNudgeDetailSelector?.isLoading) && <Loader />}
      {redeemedNudges && (
        <div
          className="overlay2"
          onClick={() => setRedeemedNudges(false)}
        ></div>
      )}

      <div className={`rightSidebar ${redeemedNudges ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">Accepted Nudges</div>
          <div
            className="closeSidebar"
            onClick={() => setRedeemedNudges(false)}
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
          {businessNudgesListSelector?.data?.data?.length > 0 ? (
            <>
              {businessNudgesListSelector?.data?.data?.map((item, index) => {
                return (
                  <div
                    className="card16 d-flex align-center gap-16"
                    key={index}
                    // onClick={()=>{setRedeemedFollowerList(true);setRedeemedFollowerItem(item)}}
                    onClick={() => nudgeDetails(item)}
                  >
                    <div className="image80">
                      <img
                        src={item?.image || noImageFound}
                        alt={item?.title}
                      />
                    </div>
                    <div>
                      <div className="fs-16 fw-500 grey mb-5">
                        {item?.title}
                      </div>
                      <div className="fs-16 fw-500">
                        {/* Unlock a 20% discount on our signature dishes this week. */}
                        {item?.description}
                      </div>
                      <div className="d-flex gap-8 align-center mb-12">
                        <div className="position-relative d-flex">
                          {item?.acceptedFollowerList?.map(
                            (acceptedFollowerList, acceptedFollowerIndex) => {
                              return (
                                <div
                                  className="imageCollaps"
                                  key={acceptedFollowerIndex}
                                >
                                  <img
                                    src={
                                      acceptedFollowerList?.photoURL ||
                                      noImageFound
                                    }
                                    alt={acceptedFollowerList?.displayName}
                                    className="w-100 h-100"
                                  />
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                      <div className="fs-14 fw-700 gc">
                        {item?.acceptedFollowerList?.length} people accepted
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="noDataFound">No data available</div>
          )}

          {/* </InfiniteScroll> */}
        </div>
      </div>
      {/* {businessNudgeDetailSelector && ( */}
        <RedeemedNudgeFollowerList
          setRedeemedFollowerList={setRedeemedFollowerList}
          redeemedFollowerList={redeemedFollowerList}
          redeemedFollowerItem={redeemedFollowerItem}
          businessNudgeDetailSelector={businessNudgeDetailSelector}
        />
      {/* )} */}
    </>
  );
};

export default RedeemedNudges;
