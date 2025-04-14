import React, { useEffect, useState } from "react";
import TabContainer from "../../../common/dashboards/TabContainer";
import BarChart from "../../../common/charts/BarChart";
import GraphWithCircle from "../../../common/dashboards/GraphWithCircle";
import chart from "../../../assets/images/chart.jpg";
import map from "../../../assets/images/map.jpg";
import PromotionCard from "../../../common/dashboards/PromotionCard";
import "../../../assets/css/dashboard.css";
import "../../../assets/css/merchant.css";

import chartnudge from "../../../assets/images/chartnudgefill.svg";
import chartPromotion from "../../../assets/images/chartPromotionfill.svg";
import chartfollower from "../../../assets/images/chartfollowerfill.svg";
// import logoutBg from "../../../assets/images/logoutBg.svg";
// import modalbg from "../../../assets/images/modalbg.png";
// import emptyBG from "../../../assets/images/emptyBG.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { businessDashboardHandler } from "../../../redux/action/businessAction/businessDashboard";
import LineChart from "../../../common/charts/LineChart";
import { useBusiness } from "../../../common/Layout/BusinessContext";
import Loader from "../../../common/Loader/Loader";
import AccessDeniedModal from "../accessDeniedModal/accessDeniedModal";

const MerchantDashboard = () => {
  const [tempState, setTempState] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedBusiness, setSelectedBusiness } = useBusiness();
  const [activeTab, setActiveTab] = useState("1D");

  const businessDashBoardSelector = useSelector(
    (state) => state?.businessDashboard
  );

  // Nudge Graph
  const temp = businessDashBoardSelector?.data?.data?.nudgeData
    ?.map((item) => item?.value)
    .join(",");

  const tempArray = temp ? temp.split(",").map(Number) : [0, 0,0,0,0];

  // Follower Graph
  const followerData = businessDashBoardSelector?.data?.data?.followerData
    ?.map((item) => item?.value)
    .join(",");

  const followerDataNumber = followerData?.split(",")?.map(Number);

  // Promotion Graph
  const promotionData = businessDashBoardSelector?.data?.data?.promotionData
    ?.map((item) => item?.value)
    .join(",");

  const promotionDataNumber = promotionData?.split(",")?.map(Number);

  const getSelectedBusiness = JSON.parse(
    localStorage.getItem("selectedBusiness")
  );
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

  useEffect(() => {
    const selectedTab = tabOptions.find((tab) => tab.id === activeTab);
    if (selectedTab) {
      dispatch(businessDashboardHandler({ timeFrame: selectedTab.timeFrame }));
    }
  }, [activeTab]);

  const tabOptions = [
    { id: "1D", label: "1D", timeFrame: "today" },
    { id: "1W", label: "1W", timeFrame: "weekly" },
    { id: "3M", label: "3M", timeFrame: "quarterly" },
    { id: "YTD", label: "YTD", timeFrame: "startYear" },
    { id: "1Y", label: "1Y", timeFrame: "yearly" },
  ];

  const tabs = tabOptions?.map(({ id, label }) => ({
    id,
    label,
    content: (
      <GraphWithCircle
        title="Habitual Followers"
        value={businessDashBoardSelector?.data?.data?.habitualUserCount}
        trend={businessDashBoardSelector?.data?.data?.habitualUserCount ?businessDashBoardSelector?.data?.data?.habitualUserCount/businessDashBoardSelector?.data?.data?.habitualUserList?.length:"0"}
        merchantsCount={256}
        chartImage={chart}
        businessDashBoardSelector={businessDashBoardSelector}
        tempArray={tempArray}
        activeTab={activeTab}
      />
    ),
  }));

  return (
    <>
      {businessDashBoardSelector?.isLoading && <Loader />}
      {/*********************** Empty Content ************************/}
      {/* {(getSelectedBusiness !== null && getSelectedBusiness?.roleTitle !== "Owner" && 
      getSelectedBusiness?.roleData?.permissions?.viewAnalytics !== 2|| businessListSelector?.data?.data?.records?.length===0) ? ( */}
      {tempState?.length > 0 &&
      tempState?.roleTitle !== "Owner" &&
      tempState?.roleData?.permissions?.viewAnalytics !== 2 ? (
        <AccessDeniedModal />
      ) : (
        <>
          <div className="dashboard">
            <div className="card">
              <div className="d-flex flexWrap gap-20">
                <div className="mx510">
                  <div className="overviewCard fs-16 mb-10">
                    Competitive Landscape
                  </div>
                  <div className="iframeMap">
                    <img src={map} alt="" />
                  </div>
                </div>
                <div className="w-100">
                  <TabContainer
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                </div>
              </div>
              <div className="divider"></div>
              <div className="d-grid chartGrid gap-20">
                <PromotionCard
                  title="Promotions"
                  count={businessDashBoardSelector?.data?.data?.promotionsCount}
                  chartPromotionImage={chartPromotion}
                  buttonText="You need promotions"
                  middleComponent={
                    // <BarChart
                    //   // labels={["Bar 1", "Bar 2"]}
                    //   labels={promotionDataNumber ? new Array(promotionDataNumber?.length).fill("") : [""]}
                    //   datas={promotionDataNumber}
                    //   className="w-100"
                    //   barThickness={100}
                    //   borderSkipped={false}
                    //   xDisplay={false}
                    //   yDisplay={true}
                    // />
                    <LineChart
                      labels={
                        promotionDataNumber ? new Array(promotionDataNumber?.length).fill("") : [""]
                      }
                      className="w-100"
                      businessDashBoardSelector={businessDashBoardSelector}
                      datas={promotionDataNumber}
                    />
                  }
                />
                <PromotionCard
                  title="Nudges"
                  count={businessDashBoardSelector?.data?.data?.totalNudgeCount}
                  chartPromotionImage={chartnudge}
                  buttonText="See Nudges"
                  onButtonClick={() => navigate("/merchant/nudges")}
                  middleComponent={
                    <LineChart
                      labels={
                        tempArray ? new Array(tempArray?.length).fill("") : [""]
                      }
                      className="w-100"
                      businessDashBoardSelector={businessDashBoardSelector}
                      datas={tempArray}
                    />
                  }
                />{" "}
                <PromotionCard
                  title="Followers"
                  count={businessDashBoardSelector?.data?.data?.followerCount}
                  onButtonClick={() => navigate("/merchant/followers")}
                  chartPromotionImage={chartfollower}
                  buttonText="See Followers"
                  middleComponent={
                    <LineChart
                      labels={
                        followerDataNumber
                          ? new Array(followerDataNumber?.length).fill("")
                          : [""]
                      }
                      datas={followerDataNumber}
                      className="w-100"
                    />
                  }
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MerchantDashboard;
