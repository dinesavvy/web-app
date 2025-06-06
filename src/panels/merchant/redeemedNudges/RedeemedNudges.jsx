import React, { useEffect, useState } from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import { useDispatch, useSelector } from "react-redux";
import { businessNudgesListHandler } from "../../../redux/action/businessAction/businessNudgesList";
import Loader from "../../../common/Loader/Loader";
import noImageFound from "../../../assets/images/noImageFound.png";
import arrowRight from "../../../assets/images/arrowRight.svg";
import RedeemedNudgeFollowerList from "./RedeemedNudgeFollowerList";
import InfiniteScroll from "react-infinite-scroll-component";
// import { businessNudgeDetailsHandler } from "../../../redux/action/businessAction/businessNudgeDetails";

const RedeemedNudges = ({ redeemedNudges, setRedeemedNudges }) => {
  const dispatch = useDispatch();

  const [redeemedNudgeList, setRedeemedNudgeList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [redeemedFollowerList, setRedeemedFollowerList] = useState(false);
const [page, setPage] = useState(1);
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

  useEffect(() => {
    if (businessNudgesListSelector?.data?.data) {
      const newNudgeData = businessNudgesListSelector?.data?.data;

      setRedeemedNudgeList((prev) =>
        page === 1 ? newNudgeData : [...prev, ...newNudgeData]
      );

      // If returned records are less than limit, stop fetching
      if (newNudgeData?.length < 10) {
        setHasMore(false);
      }
    }
  }, [businessNudgesListSelector]);

  const fetchNudgeRedeemedData = (currentPage, reset = false) => {
    let payload = {
      page: currentPage,
      limit: 10,
      locationId: getSelectedBusiness?._id,
      isActive: true,
    };
    dispatch(businessNudgesListHandler(payload));
    if (reset) setRedeemedNudgeList([]);
  };

  const loadMoreRedeemedList = () => {
    if (!hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNudgeRedeemedData(nextPage);
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
          <InfiniteScroll
            dataLength={redeemedNudgeList?.length}
            next={loadMoreRedeemedList}
            hasMore={hasMore}
            scrollableTarget="scrollableDiv"
          >
            {redeemedNudgeList?.length > 0 ? (
              <>
                {redeemedNudgeList?.map((item, index) => {
                  return (
                    <div
                      className="card16 d-flex  gap-12 mb-20"
                      key={index}
                      // onClick={()=>{setRedeemedFollowerList(true);setRedeemedFollowerItem(item)}}
                      onClick={() => nudgeDetails(item)}
                    >
                      <div className="imageHeight100">
                        <img
                          src={item?.image || noImageFound}
                          alt={item?.title}
                          className="w-100 h-100"
                        />
                      </div>
                      <div className="w-100 d-flex flexColumn justify-between gap-20">
                        <div>
                          <div className="fs-16 fw-700  mb-8">
                            {item?.title}
                          </div>
                          <div className="fs-14 fw-500 ">
                            {/* Unlock a 20% discount on our signature dishes this week. */}
                            {item?.description}
                          </div>
                        </div>
                        <div className="d-flex gap-8 justify-between align-center w-100">
                          <div className="d-flex gap-8 align-center ">
                            <div className="position-relative d-flex">
                              {item?.acceptedFollowerList?.map(
                                (
                                  acceptedFollowerList,
                                  acceptedFollowerIndex
                                ) => {
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
                            <div className="fs-14 fw-700 gc">
                              {item?.acceptedFollowerList?.length} people
                              accepted
                            </div>
                          </div>
                          <div className="h24">
                            <img src={arrowRight} alt="" className="h-100" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="noDataFound">No data available</div>
            )}
          </InfiniteScroll>
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
