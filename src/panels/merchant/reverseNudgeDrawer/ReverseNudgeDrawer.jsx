import React, { useEffect, useState } from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { businessNudgeDetailAction } from "../../../redux/action/businessAction/businessNudgeDetails";
import moment from "moment";
import { reverseNudgeAction } from "../../../redux/action/businessAction/reverseNudgeDetails";
import {
  reverseNudgeStatusUpdateAction,
  reverseNudgeStatusUpdateHandler,
} from "../../../redux/action/businessAction/reverseNudgeStatusUpdate";
import Loader from "../../../common/Loader/Loader";
import FollowerDetails from "../auth/FollowerDetails";
import { followerDetailsHandler } from "../../../redux/action/businessAction/followerDetailsAPI";

const ReverseNudgeDrawer = ({
  isSidebarOpen,
  setIsSidebarOpen,
  businessNudgeDetailsSelector,
  reverseNudgeSelector,
  setReverseSidebar,
  reverseSideBar,
}) => {
  const dispatch = useDispatch();
  
  const [modal2Open, setModal2Open] = useState(false);
  const [nudgeType, setNudgeType] = useState("");
  const [checked, setChecked] = useState(false);
  const [isMercahntNudgeFollowers, setIsMercahntNudgeFollowers] =
    useState(false);

  const [checkedUsers, setCheckedUsers] = useState([]);

  const handleCheckboxChange = (userId) => {
    setCheckedUsers(
      (prev) =>
        prev.includes(userId)
          ? prev.filter((id) => id !== userId) // Remove if already checked
          : [...prev, userId] // Add if not checked
    );
  };

  const reverseNudgeStatusUpdateSelector = useSelector(
    (state) => state?.reverseNudgeStatusUpdate
  );

  const [followerDetailsDrawer, setFollowerDetailsDrawer] = useState(false);
  const [followerDetails, setFollowerDetails] = useState();
  const followerDetailsSelector = useSelector(
    (state) => state?.followerDetails
  );
  
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const navigate = useNavigate();

  const getSelectedBusiness = JSON.parse(
    localStorage.getItem("selectedBusiness")
  );

  //   const toggleSidebarNudgeFollower = (item) => {
  //     setNudgeType(item);
  //     setIsMercahntNudgeFollowers((prevState) => !prevState);
  //   };

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

  const nudgeStatusFn = (status) => {
    let payload = {
      nudgeId: reverseNudgeSelector?.data?.data?.nudgeData?._id,
      locationId: getSelectedBusiness?._id,
      userIds: checkedUsers,
      status: status,
    };
    dispatch(reverseNudgeStatusUpdateHandler(payload));
  };

  useEffect(() => {
    if (reverseNudgeStatusUpdateSelector?.data?.statusCode === 200) {
      setIsSidebarOpen(false);
      dispatch(reverseNudgeStatusUpdateAction.reverseNudgeStatusUpdateReset());
    }
  }, [reverseNudgeStatusUpdateSelector]);

  const toggleSidebar = (item) => {
    setFollowerDetailsDrawer((prevState) => !prevState);
    setFollowerDetails(item);
    let payload = {
      locationId: getSelectedBusiness?._id,
      userId: item?.userId?._id,
    };
    dispatch(followerDetailsHandler(payload));
  };

  return (
    <>
      {(reverseNudgeStatusUpdateSelector?.isLoading ||
        followerDetailsSelector?.isLoading) && <Loader />}
      {(isSidebarOpen || reverseSideBar) && (
        <div
          className="overlay2"
          onClick={() => {
            if (isSidebarOpen) {
              setIsSidebarOpen(false);
            } else {
              setReverseSidebar(false);
            }
            dispatch(reverseNudgeAction.reverseNudgeReset());
          }}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`rightSidebar ${
          isSidebarOpen || reverseSideBar ? "open" : ""
        }`}
      >
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">Reverse Nudge Details</div>
          <div
            className="closeSidebar"
            onClick={() => {
              if (isSidebarOpen) {
                setIsSidebarOpen(false);
              } else {
                setReverseSidebar(false);
              }
              dispatch(reverseNudgeAction.reverseNudgeReset());
            }}
          >
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowSidebar">
          <img
            className="w-100 merchantImg br10 mb-6"
            src={reverseNudgeSelector?.data?.data?.nudgeData?.photoURL}
            alt={reverseNudgeSelector?.data?.data?.nudgeData?.title}
          />
          <div className="fs-16 fw-600">
            {reverseNudgeSelector?.data?.data?.nudgeData?.title}
          </div>
          <div className="fs-14 mb-20">
            {reverseNudgeSelector?.data?.data?.nudgeData?.message}
          </div>
          <div className="divider2"></div>
          <div className="fs-16 fw-600">Follower requesting Reverse Nudge</div>
          {reverseNudgeSelector?.data?.data?.userList?.map((item, index) => {
            return (
              <div className="cardFollow mt-10" key={index}>
                <div className="d-flex justify-between gap-12">
                  <div className="d-flex justify-between gap-12 w-100">
                    <div className="d-flex align-center gap-12">
                      <div className="initialName">TT</div>
                      <div>
                        <div className="fw-700">
                          {item?.userId?.displayName}
                        </div>
                        <div className="fs-14 fw-300 o5">
                          {moment(item?.createdAt).format("MMMM,YYYY")}
                        </div>
                      </div>
                    </div>
                    {/* greenLabel */}
                    <div className={item?.status==="Accepted"?"label greenLabel ":"label greenLabel "}>{item?.status}</div>
                  </div>
                  {item?.status === "Pending" && (
                    <div className="custom-checkbox">
                      <label className="checkLabel">
                        <input
                          type="checkbox"
                          //   checked={checked}
                          //   onChange={handleChange}
                          checked={checkedUsers.includes(item?.userId?._id)}
                          onChange={() =>
                            handleCheckboxChange(item?.userId?._id)
                          }
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  )} 
                </div>

                <div className="divider2"></div>
                <div
                  className="btn btnSecondary"
                  onClick={() => toggleSidebar(item)}
                >
                  View Details
                </div>
              </div>
            );
          })}
          {checkedUsers?.length > 0 && (
            <div className="d-flex mt-10 gap-10">
              <div
                className="btn w-100"
                onClick={() => nudgeStatusFn("Denied")}
              >
                Decline
              </div>
              <div
                className="btn btnSecondary w-100"
                onClick={() => nudgeStatusFn("Accepted")}
              >
                Accept
              </div>
            </div>
          )}
        </div>
      </div>

      <FollowerDetails
        isOpen={followerDetailsDrawer}
        toggleSidebar={toggleSidebar}
        followerDetails={followerDetails}
        followerDetailsSelector={followerDetailsSelector}
        // state={state}
      />
    </>
  );
};

export default ReverseNudgeDrawer;
