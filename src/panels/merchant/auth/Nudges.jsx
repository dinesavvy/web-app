import React, { useEffect, useState } from "react";
import addnudge from "../../../assets/images/addnudge.svg";
import addCredits from "../../../assets/images/addCredits.svg";
import searchIcon from "../../../assets/images/searchIcon.svg";
import nudgeImageSub from "../../../assets/images/nudgeImageSub.svg";
import nudgeCardImage from "../../../assets/images/nudgeCardImage.svg";
import deleteMember from "../../../assets/images/deleteMember.svg";
import deleteModal from "../../../assets/images/deleteModal.svg";
import nudgeEmpty from "../../../assets/images/nudgeEmpty.svg";
import btnArrow from "../../../assets/images/btnArrow.svg";
import dish2 from "../../../assets/images/dish2.png";
import PercentageFiller from "./PercentageFiller";
import CommonModal from "./CommonModal";
import MerchantNudgeDetails from "./MerchantNudgeDetails";
import { useDispatch, useSelector } from "react-redux";
import { businessNudgesListHandler } from "../../../redux/action/businessAction/businessNudgesList";
import Loader from "../../../common/Loader/Loader";
import PaymentSidebar from "./PaymentSidebar";
import {
  businessNudgeDetailAction,
  businessNudgeDetailsHandler,
} from "../../../redux/action/businessAction/businessNudgeDetails";
import { useBusiness } from "../../../common/Layout/BusinessContext";
import AccessDeniedModal from "../accessDeniedModal/accessDeniedModal";
import { useNavigate } from "react-router-dom";
import { businessNudgeAnalyticHandler, getNudgeAnalyticHandler } from "../../../redux/action/businessAction/businessNudgeAnalytic";

const Nudges = () => {
  const [tempState, setTempState] = useState([]);
  const [modal2Open, setModal2Open] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isPaymentSidebar, setIsPaymentSidebar] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("active"); // Default active tab is 'active'
  const navigate = useNavigate();

  const togglePaymentSidebar = (item) => {
    setIsPaymentSidebar((prevState) => !prevState);
  };

  const businessNudgesListSelector = useSelector(
    (state) => state?.businessNudgesList
  );

  const businessNudgeDetailsSelector = useSelector(
    (state) => state?.businessNudgeDetails
  );

  const getSelectedBusiness = JSON.parse(
    localStorage.getItem("selectedBusiness")
  );

  const dispatch = useDispatch();

  // For Ghost Screen
  const { selectedBusiness, setSelectedBusiness } = useBusiness();
  const businessListSelector = useSelector((state) => state?.businessList);

  useEffect(() => {
    if (businessListSelector?.data?.data?.records?.length) {
      const matchedBusiness = businessListSelector?.data?.data?.records?.find(
        (element) => element?._id === selectedBusiness?._id
      );

      if (matchedBusiness) {
        setTempState(matchedBusiness);
      }
    }
  }, [businessListSelector, selectedBusiness]);


const nudgeAnalyticSelector = useSelector((state)=>state?.businessNudgeAnalytic)

  useEffect(()=>{
dispatch(businessNudgeAnalyticHandler())
  },[])

  const toggleSidebar = (item) => {
    let payload = {
      nudgeId: item?._id,
    };
    dispatch(businessNudgeDetailsHandler(payload));
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("overflow-Hidden");
    } else {
      document.body.classList.remove("overflow-Hidden");
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-Hidden");
    };
  }, [isSidebarOpen]);

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update the active tab
  };

  useEffect(() => {
    let payload = {
      page: 1,
      limit: 10,
      locationId: getSelectedBusiness?._id,
      isActive: activeTab === "active" ? true : false,
    };
    dispatch(businessNudgesListHandler(payload));
  }, [activeTab]);

  useEffect(() => {
    if (isPaymentSidebar) {
      document.body.classList.add("overflow-Hidden");
    } else {
      document.body.classList.remove("overflow-Hidden");
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-Hidden");
    };
  }, [isPaymentSidebar]);

  useEffect(() => {
    if (businessNudgeDetailsSelector?.data?.statusCode === 200) {
      setIsSidebarOpen((prevState) => !prevState);
      // dispatch(businessNudgeDetailAction.businessNudgeDetailsReset());
    }
  }, [businessNudgeDetailsSelector]);



  const createNudge = () => {
    if (
      tempState?.roleTitle !== "Owner" &&
      tempState?.roleData?.permissions?.sendNudges !== 2
    ) {
      setIsChecked(true);
    } else {
      navigate("/merchant/create-nudge");
    }
  };

  const nudgeGoal = nudgeAnalyticSelector?.data?.data?.nudgeGoal || 0;
const nudgeSent = nudgeAnalyticSelector?.data?.data?.nudgeSent || 0;
const percentage = nudgeGoal > 0 ? (nudgeSent / nudgeGoal) * 100 : 0;



  return (
    <>
      {(businessNudgesListSelector?.isLoading ||
        businessNudgeDetailsSelector?.isLoading) && <Loader />}
      {/* <div className="emptyHeight">
        <div className="modal-content">
          <div className="ant-modal-body">
            <div className="modalbg">
              <img src={modalbg} alt="" />
            </div>
            <div className="modalImage mb-30">
              <img src={nudgeEmpty} alt="" />
            </div>
            <div className="text-center mb-30">
              <div className="fs-26 fw-700 mb-15">Get Nudging, Get Loyalty</div>
              <div className="fs-18">
              Create your first promotional nudge to engage with your customers, Start by setting up a new campaign for any of your restaurants.
              </div>
            </div>
            <div className="div d-flex align-center gap-16">
              <div className="btn w-100 gap-8">Create First Nudge <img src={btnArrow} alt="" /></div>
            </div>
          </div>
        </div>
      </div> */}
      {/* {tempState?.roleTitle !== "Owner" &&
      tempState?.roleData?.permissions?.sendNudges !== 1 ? (
        <AccessDeniedModal />
      ) : (
        <> */}
      {isChecked ? (
        <AccessDeniedModal />
      ) : (
        <>
          <div className="dashboard">
            <div className="tabPadding mb-30">
              <div className="d-flex align-center justify-between gap-20 mb-20 w-100">
                <div className="fs-24 fw-600 ">Nudges</div>
                <div
                  className="btn btnSecondary p16 gap-8"
                  onClick={createNudge}
                >
                  <img src={addCredits} alt="addCredits" />
                  Create a Nudge
                </div>
              </div>
              <div className="lineSearch w-100 mb-20">
                <input type="text" placeholder="Search Nudges" />
                <img src={searchIcon} alt="" className="absoluteImage" />
              </div>
              <div className="d-flex align-center justify-between mb-15">
                <div>
                  <span className="fw-16">Nudges Goal: </span>
                  <span className="fw-700 fs-20">{nudgeAnalyticSelector?.data?.data?.nudgeGoal}</span>
                </div>
                <div>
                  <span className="fs-14">Sent </span>
                  <span className="fs-18 gc fw-700">{nudgeAnalyticSelector?.data?.data?.nudgeSent}</span>
                </div>
              </div>
              <div className="range mb-15">
                <div className="rangePercentage" style={{ width: percentage }}></div>
              </div>
              <div className="fs-14 fw-500 grey mb-20">
                You are just {percentage}% behind to achieve Goal
              </div>
              {/* <div className="weekNudge pc mb-20">
            <div className="fs-18 fw-600">Nudges Expected This Week</div>
            <div className="fw-700 fs-20">124</div>
          </div> */}
              <div className="card mb-20">
                <div className="fs-20 fw-700 d-flex gap-20 align-center justify-between">
                  <div>Nudge Credits</div>
                  <div>{nudgeAnalyticSelector?.data?.data?.nudgeCredit}</div>
                </div>
                <div className="divider2"></div>
                <div className="d-flex justify-between align-center gap-20 mb-6">
                  <div className="fs-16 grey fw-500">Previous balance</div>
                  <div className="fs-20 fw-700">30</div>
                </div>
                <div className="d-flex justify-between align-center gap-20 mb-6">
                  <div className="fs-16 grey fw-500">Followers added today</div>
                  <div className="gc fs-20 fw-700">{nudgeAnalyticSelector?.data?.data?.followerAddedToday}</div>
                </div>
                <div className="d-flex justify-between align-center gap-20">
                  <div className="fs-16 grey fw-500">
                    Promotional credits added today
                  </div>
                  <div className="gc fs-20 fw-700">{nudgeAnalyticSelector?.data?.data?.promotionNudgeCreditAddedToday}</div>
                </div>
                <div className="divider2"></div>
                <div className="d-flex justify-between align-center gap-20 mb-20">
                  <div className="fs-16 grey fw-500">Nudge credits needed</div>
                  <div className="gc fs-20 fw-700">7</div>
                </div>
                {/* <div className="mb-16">
              <input type="text" placeholder="Enter number of credits" />
            </div> */}
                <div className="d-flex justify-between align-center gap-20 ">
                  <div className="d-flex align-center gap-16 flex-wrap">
                    <div className="addNudge2 active">5 Nudges</div>
                    <div className="addNudge2">10 Nudges</div>
                    <div className="addNudge2">15 Nudges</div>
                    <div className="addNudge2">20 Nudges</div>
                    <div className="addNudge2">25 Nudges</div>
                  </div>
                  <div
                    className="btn btnSecondary p16 gap-8"
                    onClick={() => togglePaymentSidebar()}
                  >
                    <img src={addCredits} alt="addCredits" />
                    Add Nudge Credits
                  </div>
                </div>
              </div>
              <div className="card mb-20">
                <div className="fs-20 fw-700 d-flex gap-20 align-center justify-between">
                  <div>Promotional Credits</div>
                  <div>$44</div>
                </div>
                <div className="divider2"></div>
                <div className="d-flex justify-between align-center gap-20 mb-6">
                  <div className="fs-16 grey fw-500">Previous balance</div>
                  <div className="fs-20 fw-700">$30</div>
                </div>
                <div className="d-flex justify-between align-center gap-20 mb-6">
                  <div className="fs-16 grey fw-500">
                    Promotions accepted today
                  </div>
                  <div className="gc fs-20 fw-700">7</div>
                </div>
                <div className="d-flex justify-between align-center gap-20">
                  <div className="fs-16 grey fw-500">
                    Promotional credits added today
                  </div>
                  <div className="gc fs-20 fw-700">$7</div>
                </div>
                {/* <div className="divider2"></div>
            <div className="d-flex justify-between align-center gap-20 mb-20">
              <div className="fs-16 grey fw-500">
                Promotional credits needed
              </div>
              <div className="gc fs-20 fw-700">$7</div>
            </div> */}
                {/* <div className="mb-16">
              <input type="text" placeholder="Enter number of credits" />
            </div> */}
                {/* <div className="d-flex justify-between align-center gap-20 ">
              <div className="d-flex align-center gap-16 flex-wrap">
                <div className="addNudge2 active">5 Nudges</div>
                <div className="addNudge2">10 Nudges</div>
                <div className="addNudge2">15 Nudges</div>
                <div className="addNudge2">20 Nudges</div>
                <div className="addNudge2">25 Nudges</div>
              </div>
              <div className="btn btnSecondary p16 gap-8">
                <img src={addCredits} alt="addCredits" />
                Add Promotional Credits
              </div>
            </div> */}
              </div>
              <div className="fs-20 fw-700 mb-10">Top Nudge</div>
              <div className="d-flex gap-20 ">
                <div className="cardNudge w-100">
                  <div className="image150 position-relative ">
                    <img src={dish2} alt="" className="w-100 h-100" />
                    <img src={nudgeImageSub} className="nudgeImageSub" alt="" />
                  </div>
                  <img src={nudgeCardImage} className="nudgeCardImage" alt="" />
                  <div className="nudgePadding w-100">
                    <div className="fs-18 fw-700">Dine Savvy</div>
                    <div className="fs-14 mb-8">
                      <span className="grey">Get </span>
                      <span className="fw-700">10%</span>
                      <span className="grey"> off at your next visit </span>
                    </div>
                    <div className="d-flex gap-8 align-center mb-12">
                      <div className="position-relative d-flex">
                        <div className="imageCollaps">
                          <img src={dish2} alt="" className="w-100 h-100" />
                        </div>
                        <div className="imageCollaps">
                          <img src={dish2} alt="" className="w-100 h-100" />
                        </div>
                        <div className="imageCollaps">
                          <img src={dish2} alt="" className="w-100 h-100" />
                        </div>
                        <div className="imageCollaps">
                          <img src={dish2} alt="" className="w-100 h-100" />
                        </div>
                        <div className="imageCollaps">
                          <img src={dish2} alt="" className="w-100 h-100" />
                        </div>
                      </div>
                      <div className="fs-14 fw-700 gc">52 people accepted</div>
                    </div>
                    <div className="TagFull">Valid till 1st September 2024</div>
                  </div>
                </div>
                <div className="w-100 card bgGrey d-flex gap-20 align-center">
                  <PercentageFiller percentage={50} />
                  <div>
                    <div className="fs-24 fw-700 mb-8 gc">Hooray! 🎉</div>
                    <div className="fs-16">
                      <span className="gc fw-700">85%</span> of people who got
                      the nudge came in!
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tabs-container tab3 tabFull ">
              <div className="tabs">
                <button
                  className={`tab-button ${
                    activeTab === "active" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("active")}
                >
                  Active Nudges
                </button>
                <button
                  className={`tab-button ${
                    activeTab === "inactive" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("inactive")}
                >
                  Inactive Nudges
                </button>
                <button
                  className={`tab-button ${
                    activeTab === "reverse" ? "active" : ""
                  }`}
                  // className="tab-button disabled"
                  // className="tab-button"
                  onClick={() => handleTabClick("reverse")}
                >
                  Reverse Nudges
                </button>
              </div>
            </div>
            <div className="tabPadding">
              <div className="merchantGrid mb-20">
                {businessNudgesListSelector?.data?.data?.length > 0 ? (
                  businessNudgesListSelector?.data?.data?.map((item) => {
                    return (
                      <div
                        className="merchantCard position-relative"
                        key={item?.id}
                      >
                        <div>
                          {/* <div className="nailedIt active fs-14">
                        {getTimeRemaining(item?.createdAt)}
                      </div> */}
                          <div className="text-center nudgeCardImage180">
                            <img
                              src={item?.image || dish2}
                              alt=""
                              className="h-100 w-100"
                            />
                          </div>
                        </div>
                        <div className="bottomPadding">
                          <div className="fs-16 fw-700 mb-8">{item?.title}</div>
                          <div className="fs-14 mb-20">{item?.description}</div>
                          <div className="d-flex gap-8 align-center mb-20">
                            <div className="position-relative d-flex">
                              {item?.acceptedFollowerList?.map(
                                (itemFollower, index) => (
                                  <div className="imageCollaps" key={index}>
                                    <img
                                      src={itemFollower?.photoURL}
                                      alt={item?.title}
                                      className="w-100 h-100"
                                    />
                                  </div>
                                )
                              )}
                            </div>
                            {item?.totalAcceptedFollowerList > 0 && (
                              <div className="fs-14 fw-700 gc">
                                {item?.totalAcceptedFollowerList} people
                                accepted
                              </div>
                            )}
                          </div>
                          <div className="d-flex gap-10">
                            <div
                              className="btn btnSecondary w-100"
                              onClick={() => toggleSidebar(item)}
                            >
                              View Details
                            </div>
                            <div
                              className="btn deleteBtnfull w-100"
                              onClick={() => setModal2Open(true)}
                            >
                              End Nudge
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>No data available</div>
                )}

                {/* <div className="merchantCard position-relative">
              <div className="">
                <div className="nailedIt active fs-14">12h 20m remaining</div>
                <div className="text-center nudgeCardImage180">
                  <img src={dish2} alt="" className="h-100 w-100" />
                </div>
              </div>
              <div className="bottomPadding">
                <div className="fs-16 fw-700 mb-8">
                  Double the Flavor, Half the Price
                </div>
                <div className="fs-14 mb-20">
                  Get 20% off on all large pizzas today! Limited time offer.
                </div>
                <div className="d-flex gap-8 align-center mb-20">
                  <div className="position-relative d-flex">
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                  </div>
                  <div className="fs-14 fw-700 gc">52 people accepted</div>
                </div>
                <div className="d-flex gap-10">
                  <div className="btn btnSecondary w-100">View Details</div>
                  <div className="btn  w-100">Relaunch</div>
                </div>
              </div>
            </div> */}
                {/* <div className="merchantCard position-relative">
              <div className="">
                <div className="text-center nudgeCardImage180">
                  <img src={dish2} alt="" className="h-100 w-100" />
                </div>
              </div>
              <div className="bottomPadding">
                <div className="fs-16 fw-700 mb-8">
                  Double the Flavor, Half the Price
                </div>
                <div className="fs-14 mb-20">
                  Get 20% off on all large pizzas today! Limited time offer.
                </div>
                <div className="d-flex gap-8 align-center mb-20">
                  <div className="position-relative d-flex">
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                  </div>
                  <div className="fs-14 fw-700 gc">52 people accepted</div>
                </div>
                <div className="d-flex gap-10">
                  <div className="btn btnSecondary w-100">View Details</div>
                </div>
              </div>
            </div> */}
              </div>
            </div>
          </div>
          <CommonModal
            modal2Open={modal2Open}
            setModal2Open={setModal2Open}
            modalImage={deleteModal}
          />
          <MerchantNudgeDetails
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            activeTab={activeTab}
            businessNudgeDetailsSelector={businessNudgeDetailsSelector}
          />
          <PaymentSidebar
            isPaymentSidebar={isPaymentSidebar}
            togglePaymentSidebar={togglePaymentSidebar}
          />
        </>
      )}
      {/* {isChecked && <AccessDeniedModal />} */}
    </>
    // )}
    // </>
  );
};

export default Nudges;
