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
import logoutBg from "../../../assets/images/logoutBg.svg";
import modalbg from "../../../assets/images/modalbg.png";
import emptyBG from "../../../assets/images/emptyBG.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { businessDashboardHandler } from "../../../redux/action/businessAction/businessDashboard";
import LineChart from "../../../common/charts/LineChart";

const MerchantDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("1");

  const businessDashBoardSelector = useSelector(
    (state) => state?.businessDashboard
  );
  
  const getSelectedBusiness = JSON.parse(
    localStorage.getItem("selectedBusiness")
  );
  
  const businessListSelector = useSelector((state) => state?.businessList);
  console.log(businessListSelector, "businessListSelector");


  useEffect(() => {
    dispatch(businessDashboardHandler());
  }, []);

  console.log(getSelectedBusiness, "getSelectedBusiness");

  const tabs = [
    {
      id: "1",
      label: "1D",
      content: (
        <GraphWithCircle
          title="Habitual Followers"
          value="8,000"
          trend={10}
          merchantsCount={256}
          chartImage={chart}
        />
      ),
    },
    {
      id: "2",
      label: "1W",
      content: (
        <GraphWithCircle
          title="Habitual Followers"
          value="8,000"
          trend={10}
          merchantsCount={256}
          chartImage={chart}
        />
      ),
    },
    {
      id: "3",
      label: "3M",
      content: (
        <GraphWithCircle
          title="Habitual Followers"
          value="8,000"
          trend={10}
          merchantsCount={256}
          chartImage={chart}
        />
      ),
    },
    {
      id: "4",
      label: "4M",
      content: (
        <GraphWithCircle
          title="Habitual Followers"
          value="8,000"
          trend={10}
          merchantsCount={256}
          chartImage={chart}
        />
      ),
    },
    {
      id: "5",
      label: "5M",
      content: (
        <GraphWithCircle
          title="Habitual Followers"
          value="8,000"
          trend={10}
          merchantsCount={256}
          chartImage={chart}
        />
      ),
    },
  ];

  const labels = businessDashBoardSelector?.data?.data?.nudgeData.map((item) => `${item._id}`); 
  const datas = businessDashBoardSelector?.data?.data?.nudgeData.map((item) => item.value); 

  return (
    <>
      {/*********************** Empty Content ************************/}
      {getSelectedBusiness?.roleTitle !== "Owner" &&
      getSelectedBusiness?.roleData?.permissions?.viewAnalytics !== 2 ? (
        <div className="dashboard">
          <div className="emptyHeight position-relative">
            <img src={emptyBG} alt="" className="emptyBG" />
            <div className="modal-content">
              <div className="ant-modal-body">
                <div className="modalbg">
                  <img src={modalbg} alt="" />
                </div>
                <div className="modalImage mb-30">
                  <img src={logoutBg} alt="" />
                </div>
                <div className="text-center mb-30">
                  <div className="fs-26 fw-700 mb-15">
                    Welcome to Your <br />
                    Restaurant Dashboard
                  </div>
                  <div className="fs-18">
                    You do not have permission to access any business yet.
                    Please contact your administrator for assistance.
                  </div>
                </div>
                <div
                  className="div d-flex align-center gap-16"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/");
                  }}
                >
                  <div className="btn deleteBtnfull w-100 gap-8"> Logout</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
                count={80}
                chartPromotionImage={chartPromotion}
                buttonText="You need promotions"
                middleComponent={
                  <BarChart
                    labels={["Bar 1", "Bar 2"]}
                    datas={[50, 110]}
                    className="w-100"
                    barThickness={100}
                    borderSkipped={false}
                    xDisplay={false}
                    yDisplay={true}
                  />
                }
              />
              <PromotionCard
                title="Nudges"
                count={businessDashBoardSelector?.data?.data?.nudgeData?.length}
                chartPromotionImage={chartnudge}
                buttonText="See Nudges"
                onButtonClick={() => navigate("/merchant/nudges")}
                middleComponent={
                  // <BarChart
                  //   labels={["Bar 1", "Bar 2"]}
                  //   datas={[58, 160]}
                  //   className="w-100"
                  //   barThickness={100}
                  //   borderSkipped={false}
                  //   xDisplay={false}
                  //   yDisplay={true}
                  // />
                  <LineChart labels={["",""]} datas={datas} className="w-100" />
                }
              />{" "}
              <PromotionCard
                title="Followers"
                count={
                  businessDashBoardSelector?.data?.data?.followerData?.length
                }
                onButtonClick={() => navigate("/merchant/followers")}
                chartPromotionImage={chartfollower}
                buttonText="See Followers"
                middleComponent={
                  <LineChart
                    labels={["", ""]}
                    datas={[45, 89]}
                    className="w-100"
                  />
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MerchantDashboard;
