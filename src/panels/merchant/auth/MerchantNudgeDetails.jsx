import React, { useEffect, useState } from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import dish2 from "../../../assets/images/dish2.png";
import deleteModal from "../../../assets/images/deleteModal.svg";
// import Loader from "../../../common/Loader/Loader";
// import moment from "moment";
import { useNavigate } from "react-router-dom";
import CommonModal from "./CommonModal";
import MerchantNudgeFollowers from "./MerchantNudgeFollowers";
import { useDispatch } from "react-redux";
import { businessNudgeDetailAction } from "../../../redux/action/businessAction/businessNudgeDetails";
import { relaunchNudgeHandler } from "../../../redux/action/businessAction/relaunchNudge";

const MerchantNudgeDetails = ({
  isSidebarOpen,
  toggleSidebar,
  setIsSidebarOpen,
  activeTab,
  businessNudgeDetailsSelector,
  endNudgeItem,
  // relaunchNudgeFn,
}) => {
  const dispatch = useDispatch();
  const [modal2Open, setModal2Open] = useState(false);
  const [nudgeType, setNudgeType] = useState("");

  const navigate = useNavigate();
  const [isMercahntNudgeFollowers, setIsMercahntNudgeFollowers] =
    useState(false);

  const toggleSidebarNudgeFollower = (item) => {
    setNudgeType(item);
    setIsMercahntNudgeFollowers((prevState) => !prevState);
  };

  // Relaunch Nudge
  const relaunchNudgeFn = () => {
    let payload = {
      nudgeId: businessNudgeDetailsSelector?.data?.data?._id,
    };
    dispatch(relaunchNudgeHandler(payload));
    // dispatch(businessNudgeDetailAction.businessNudgeDetailsReset());
  };

  useEffect(() => {
    if (!isSidebarOpen) {
      dispatch(businessNudgeDetailAction.businessNudgeDetailsReset());
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    if (isMercahntNudgeFollowers) {
      document.body.classList.add("overflow-Hidden");
    } else {
      document.body.classList.remove("overflow-Hidden");
    }
    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-Hidden");
    };
  }, [isMercahntNudgeFollowers]);

  return (
    <>
      {isSidebarOpen && (
        <div
          className="overlay2"
          onClick={() => {
            setIsSidebarOpen(false);
            dispatch(businessNudgeDetailAction.businessNudgeDetailsReset());
          }}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`rightSidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">
            {activeTab === "active" ? "Active" : "Declined"} Nudge Details
          </div>
          <div
            className="closeSidebar"
            onClick={() => {
              setIsSidebarOpen(false);
              dispatch(businessNudgeDetailAction.businessNudgeDetailsReset());
            }}
          >
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowSidebar">
          <img
            className="w-100 merchantImg br10 mb-6"
            src={businessNudgeDetailsSelector?.data?.data?.photoURL}
            alt={businessNudgeDetailsSelector?.data?.data?.title}
          />
          <div className="fs-16 fw-600">
            {businessNudgeDetailsSelector?.data?.data?.title}
          </div>
          <div className="fs-14 mb-20">
            {businessNudgeDetailsSelector?.data?.data?.description}
          </div>
          <div className="nudgeGrid3">
            <div className="nudgeCard">
              <div className="fs-14 mb-4">Total</div>
              <div className="fs-20 fw-700 pc">
                {businessNudgeDetailsSelector?.data?.data?.totalQuantity}
              </div>
            </div>
            <div className="nudgeCard">
              <div className="fs-14 mb-4">Redeemed</div>
              <div className="fs-20 fw-700 pc">
                {
                  businessNudgeDetailsSelector?.data?.data
                    ?.totalRedeemedFollowerCount
                }
              </div>
            </div>
            <div className="nudgeCard">
              <div className="fs-14 mb-4">Left</div>
              <div className="fs-20 fw-700 pc">
                {businessNudgeDetailsSelector?.data?.data?.totalQuantity -
                  businessNudgeDetailsSelector?.data?.data
                    ?.totalRedeemedFollowerCount}
              </div>
            </div>
          </div>
          <div className="divider2"></div>
          <div className="fs-16 fw-700 mb-10">I want it</div>
          <div className="d-flex justify-between align-center gap-10">
            <div className="d-flex gap-8 align-center cursor-pointer">
              <div
                className="position-relative d-flex"
                onClick={() => toggleSidebarNudgeFollower("i_want_it")}
              >
                {businessNudgeDetailsSelector?.data?.data?.acceptedUserList?.map(
                  (item) => {
                    return (
                      <>
                        <div className="imageCollaps">
                          <img
                            src={item?.userInfo?.photoURL}
                            alt={item?.userInfo?.displayName}
                            className="w-100 h-100"
                          />
                        </div>
                      </>
                    );
                  }
                )}
              </div>
              {/* When follower length > 5 then and then show people data */}
              <div className="fs-14 pc cursor-pointer">
                {businessNudgeDetailsSelector?.data?.data?.acceptedUserList
                  ?.length > 5 && (
                  <>
                    +
                    {
                      businessNudgeDetailsSelector?.data?.data?.acceptedUserList
                        ?.length
                    }{" "}
                    People
                  </>
                )}
              </div>
            </div>
            {businessNudgeDetailsSelector?.data?.data?.acceptedUserList
              ?.length > 0 && (
              <div className="fs-14">
                {
                  businessNudgeDetailsSelector?.data?.data?.acceptedUserList
                    ?.length
                }{" "}
                people
              </div>
            )}
          </div>
          <div className="divider2"></div>
          <div className="fs-16 fw-700 mb-10">Maybe</div>
          <div className="d-flex justify-between align-center gap-10">
            <div className="d-flex gap-8 align-center cursor-pointer">
              <div
                className="position-relative d-flex"
                onClick={() => toggleSidebarNudgeFollower("maybe")}
              >
                {/* <div className="imageCollaps">
                  <img src={dish2} alt="" className="w-100 h-100" />
                </div> */}
                {businessNudgeDetailsSelector?.data?.data?.maybeLaterUserList?.map(
                  (item) => {
                    return (
                      <>
                        <div className="imageCollaps">
                          <img
                            src={item?.userInfo?.photoURL}
                            alt={item?.userInfo?.displayName}
                            className="w-100 h-100"
                          />
                        </div>
                      </>
                    );
                  }
                )}
              </div>
              <div
                className="fs-14 pc cursor-pointer"
                onClick={() => toggleSidebarNudgeFollower("maybe")}
              >
                {businessNudgeDetailsSelector?.data?.data?.maybeLaterUserList?.length>5 && (
                  <>
                  +{businessNudgeDetailsSelector?.data?.data?.maybeLaterUserList?.length} People 
                  </>
                )}
              </div>
            </div>
            {businessNudgeDetailsSelector?.data?.data?.maybeLaterUserList?.length>0 && (
            <div className="fs-14">{businessNudgeDetailsSelector?.data?.data?.maybeLaterUserList?.length} people</div>
            )}
          </div>
          <div className="divider2"></div>
          <div className="fs-16 fw-700 mb-10">Not for me</div>
          <div
            className="d-flex justify-between align-center gap-10"
            onClick={() => toggleSidebarNudgeFollower("not_for_me")}
          >
            <div className="d-flex gap-8 align-center cursor-pointer">
              <div className="position-relative d-flex">
                {businessNudgeDetailsSelector?.data?.data?.disLikeUserList?.map(
                  (item) => {
                    return (
                      <>
                        <div className="imageCollaps">
                          <img
                            src={item?.userInfo?.photoURL}
                            alt={item?.userInfo?.displayName}
                            className="w-100 h-100"
                          />
                        </div>
                      </>
                    );
                  }
                )}
              </div>
              <div
                className="fs-14 pc cursor-pointer"
                onClick={() => toggleSidebarNudgeFollower()}
              >
                {businessNudgeDetailsSelector?.data?.data?.disLikeUserList
                  ?.length > 5 && (
                  <>
                    +
                    {
                      businessNudgeDetailsSelector?.data?.data?.disLikeUserList
                        ?.length
                    }{" "}
                    People
                  </>
                )}
              </div>
            </div>
            {businessNudgeDetailsSelector?.data?.data?.disLikeUserList?.length >
              0 && (
              <div className="fs-14">
                {
                  businessNudgeDetailsSelector?.data?.data?.disLikeUserList
                    ?.length
                }{" "}
                people
              </div>
            )}
          </div>
          <div className="divider2"></div>
          {activeTab === "active" ? (
            <div
              className="btn deleteBtnfull w-100"
              onClick={() => setModal2Open(true)}
            >
              End Nudge
            </div>
          ) : (
            <div
              className="btn w-100"
              onClick={() => relaunchNudgeFn()}
            >
              Relaunch
            </div>
          )}
        </div>
      </div>
      {modal2Open && (
      <CommonModal
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
        modal2Open={modal2Open}
        setModal2Open={setModal2Open}
        modalImage={deleteModal}
        endNudgeItem={endNudgeItem}
      />
      )}
      <MerchantNudgeFollowers
        toggleSidebarNudgeFollower={toggleSidebarNudgeFollower}
        isMercahntNudgeFollowers={isMercahntNudgeFollowers}
        nudgeType={nudgeType}
        businessNudgeDetailsSelector={businessNudgeDetailsSelector}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </>
  );
};

export default MerchantNudgeDetails;
