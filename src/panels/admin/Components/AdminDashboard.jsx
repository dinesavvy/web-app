import React, { useEffect, useState } from "react";
import "../../../assets/css/dashboard.css";
import chartnudge from "../../../assets/images/chartnudge.svg";
import chartPromotion from "../../../assets/images/chartPromotion.svg";
import chartfollower from "../../../assets/images/chartfollower.svg";
import chart from "../../../assets/images/chart.jpg";
import OverviewGrid from "../../../common/dashboards/OverviewGrid";
import TabContainer from "../../../common/dashboards/TabContainer";
import GraphWithCircle from "../../../common/dashboards/GraphWithCircle";
import PromotionCard from "../../../common/dashboards/PromotionCard";
import olive from "../../../assets/images/olive.png";
import BarChart from "../../../common/charts/BarChart";
import DoughnutChart from "../../../common/charts/DoughnutChart";
import noImageFound from "../../../assets/images/noImageFound.png";

import { Pagination } from "antd";
import AreaChart from "../../../common/charts/AreaChart";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { analyticsDetailsHandler } from "../../../redux/action/analyticsDetails";
import Loader from "../../../common/Loader/Loader";
import { merchantPerfomanceAnalyticsListHandler } from "../../../redux/action/merchantPerfomanceAnalyticsList";
import {
  merchantPerformanceAnalyticsDetailsAction,
  merchantPerformanceAnalyticsDetailsHandler,
} from "../../../redux/action/merchantPerformanceAnalyticsDetails";
import { useCommonMessage } from "../../../common/CommonMessage";

const AdminDashboard = () => {
  const [communicateItem, setCommunicateItem] = useState();
  const [pagination, setPagination] = useState({ page: 1, limit: 9 });
  const [activeTab, setActiveTab] = useState("1");
  const [activeTab2, setActiveTab2] = useState("today");
  const [activeTab3, setActiveTab3] = useState("1");
  const [openIndex, setOpenIndex] = useState(0); // Initially, the first item is open
  const data = {
    labels: ["Progress", "Remaining"],
    progress: 80,
    total: 100,
  };

  const navigate = useNavigate();
  const messageApi = useCommonMessage();

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ page, limit: pageSize });
  };

  const analyticsDetailsSelector = useSelector(
    (state) => state?.analyticsDetails
  );

  const handleToggle = (index) => {
    // setOpenIndex(openIndex === index ? null : index); // Toggle the clicked panel
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(analyticsDetailsHandler());
  }, []);

  const Test2 = ({ merchantPerformanceAnalyticsDetailsSelector, item }) => {
    console.log(
      merchantPerformanceAnalyticsDetailsSelector,
      "merchantPerformanceAnalyticsDetailsSelector"
    );
    return (
      <>
        <div className="d-flex gap-16 mb-16 flexWrap">
          <div className="chartborder mx369">
            <div className="chartpadding mb-20">
              <div className="fs-16 fw-600 ">Habitual Users</div>
            </div>
            {/* <img src={chart} alt="" className="w-100 mxh" />
             */}

            <AreaChart
              // labels={["M", "T", "W", "T", "F", "S"]}
              // datas={[65, 59, 80, 81, 56, 55, 40]}
              topColor={"rgba(2, 124, 255, 0.5)"}
              bottomColor={"rgba(215, 210, 226, 0.2)"}
              borderColor={"rgba(0, 123, 255, 1)"}
              className={"w-100 mxh"}
              merchantPerformanceAnalyticsDetailsSelector={
                merchantPerformanceAnalyticsDetailsSelector?.data?.data
                  ?.userData
              }
            />
          </div>
          <div className="card w-100">
            <div className="d-flex justify-between align-center ">
              <div className="fs-16 fw-600 ">New Followers Added</div>
              <div className="fs-16 ">12/day (avg)</div>
            </div>
            <div className="divider2"></div>
            {/* <img src={chart4} alt="" className="w-100 mxh" /> */}
            <BarChart
              // labels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
              // datas={[90, 56, 58, 10, 20, 44, 56]}
              className="w-100 mxh"
              barThickness={80}
              borderSkipped={"bottom"}
              xDisplay={true}
              yDisplay={false}
              isDatasMap={false}
              displayLegend={false}
              merchantPerformanceAnalyticsDetailsSelector={
                merchantPerformanceAnalyticsDetailsSelector?.data?.data
                  ?.followerData
              }
            />
          </div>
        </div>
        <div className="d-flex gap-16 mb-16 flexWrap">
          <div className="card w-100">
            <div className="d-flex justify-between align-center mb-20">
              <div className="fs-16 fw-600 ">Nudges Sent</div>
              <div className="fs-16 ">12/day (avg)</div>
            </div>
            <div className="divider2"></div>
            {/* <img src={chart4} alt="" className="w-100 mxh" /> */}
            <BarChart
              labelsStatic={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
              datasStatic={[90, 56, 58, 10, 20, 44, 56]}
              className="w-100 mxh"
              barThickness={80}
              borderSkipped={"bottom"}
              xDisplay={true}
              yDisplay={false}
              isDatasMap={false}
              displayLegend={false}
            />
          </div>
          <div className="card mx369">
            <div className="d-flex justify-between align-center mb-20">
              <div className="fs-16 fw-600 ">Nudge Acceptance Rate</div>
            </div>
            <div className="divider2"></div>
            <div className="text-center">
              {/* <img src={chart5} alt="" className="h-100 mxh" /> */}
              <DoughnutChart data={data} className="h-100 mxh" />
            </div>
          </div>
        </div>
        {/* <div className="btnSecondary btn">Communicate</div> */}
      </>
    );
  };

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
  const tabs2 = [
    {
      value: "today",
      label: "Today",
    },
    {
      value: "weekly",
      label: "Weekly",
    },
    {
      value: "monthly",
      label: "Monthly",
    },
  ];
  const tabs3 = [
    {
      id: "1",
      label: "Top performers",
    },
    {
      id: "2",
      label: "Needs attention",
    },
  ];
  const items = [
    { id: "1", title: "Olive Garden", titleImage: olive, content: <Test2 /> },
    { id: "2", title: "Olive Garden", titleImage: olive, content: <Test2 /> },
    { id: "3", title: "Olive Garden", titleImage: olive, content: <Test2 /> },
  ];

  const merchantPerformanceAnalyticsListSelector = useSelector(
    (state) => state?.merchantPerformanceAnalyticsList
  );

  useEffect(() => {
    let payload = {
      page: pagination.page,
      limit: pagination.limit,
      timeFrame: activeTab2,
      sortOn: "performance",
      holdingSort: activeTab3 === "1" ? true : false,
    };
    dispatch(merchantPerfomanceAnalyticsListHandler(payload));
  }, [activeTab2, activeTab3]);

  const merchantPerformanceAnalyticsDetailsSelector = useSelector(
    (state) => state?.merchantPerformanceAnalyticsDetails
  );

  // useEffect(() => {
  //   if (merchantPerformanceAnalyticsDetailsSelector?.data?.statusCode === 200) {
  //     messageApi.open({
  //       type: "success",
  //       content: merchantPerformanceAnalyticsDetailsSelector?.data?.message,
  //     });
  //     dispatch(
  //       merchantPerformanceAnalyticsDetailsAction.merchantPerformanceAnalyticsDetailsReset()
  //     );
  //     if (communicateItem) {
  //       localStorage.setItem("merchantId", communicateItem?._id);
  //       navigate("/admin/merchant/details", { state: communicateItem });
  //     }
  //   }
  // }, [merchantPerformanceAnalyticsDetailsSelector]);

  const restaurantItemClick = (item, index) => {
    console.log(item, "index");
    setOpenIndex(index);
    if (item?._id) {
      let payload = {
        timeFrame: activeTab2,
        locationId: item?._id,
        followerLocationId: item?.locationId,
      };
      dispatch(merchantPerformanceAnalyticsDetailsHandler(payload));
    }
  };

  const handleCommunicate = (item) => {
    setCommunicateItem(item);
    localStorage.setItem("merchantId", item?._id);
    navigate("/admin/merchant/details", { state: item });
  };

  return (
    <>
      {(analyticsDetailsSelector?.isLoading ||
        merchantPerformanceAnalyticsListSelector?.isLoading ||
        merchantPerformanceAnalyticsDetailsSelector?.isLoading) && <Loader />}
      <div className="dashboard">
        <div className="d-flex flexWrap gap-20">
          <div className="mx292">
            <div className="overviewCard fs-16 mb-10">Overview</div>
            <OverviewGrid analyticsDetailsSelector={analyticsDetailsSelector} />
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
            count={analyticsDetailsSelector?.data?.data?.targetPromotionsCount}
            chartPromotionImage={chartPromotion}
            // analyticsDetailsSelector ={analyticsDetailsSelector}
            onButtonClick={() => navigate("/admin/promotions")}
            buttonText="See promotions"
            middleComponent={
              <BarChart
                labels={["Bar 1", "Bar 2"]}
                datas={[50, 110]}
                className="w-100"
                barThickness={100}
                borderSkipped={false}
                xDisplay={false}
                yDisplay={true}
                isDatasMap={true}
                displayLegend={true}
              />
            }
          />
          <PromotionCard
            title="Nudges"
            count={analyticsDetailsSelector?.data?.data?.targetNudgeCount}
            chartPromotionImage={chartnudge}
            buttonText="See Nudges"
            onButtonClick={() => navigate("/admin/nudges")}
            middleComponent={
              <BarChart
                labels={["Bar 1", "Bar 2"]}
                datas={[58, 160]}
                className="w-100"
                barThickness={100}
                borderSkipped={false}
                xDisplay={false}
                yDisplay={true}
                isDatasMap={true}
                displayLegend={true}
              />
            }
          />{" "}
          <PromotionCard
            title="Followers"
            count={79}
            chartPromotionImage={chartfollower}
            buttonText="See Followers"
            onButtonClick={() => navigate("/admin/merchant/followers")}
            middleComponent={
              <BarChart
                labels={["Bar 1", "Bar 2"]}
                datas={[45, 89]}
                className="w-100"
                barThickness={100}
                borderSkipped={false}
                xDisplay={false}
                yDisplay={true}
                isDatasMap={true}
                displayLegend={true}
              />
            }
          />
        </div>
        <div className="divider"></div>
        {/* <PerformanceCard title={"Restaurants performance"} /> */}
        <div className="card">
          <div className="d-flex align-center justify-between mb-20 flexWraplg">
            <div className="fs-24 fw-600">Restaurants performance</div>
            <div className="tabs-container tab2">
              <div className="tabs">
                {tabs2.map((tab) => (
                  <button
                    key={tab.value}
                    className={`tab-button ${
                      activeTab2 === tab.value ? "active" : ""
                    }`}
                    onClick={() => setActiveTab2(tab.value)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="tabs-container tab3 mb-20">
            <div className="tabs">
              {tabs3.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-button ${
                    activeTab3 === tab.id ? "active" : ""
                  }`}
                  onClick={() => setActiveTab3(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="accordion mb-20">
            {merchantPerformanceAnalyticsListSelector?.data?.data?.records?.map(
              (item, index) => (
                <div
                  key={index}
                  className="accordion-item"
                  onClick={() => restaurantItemClick(item, index)}
                >
                  <div
                    className="accordion-header"
                    onClick={() => handleToggle(index)}
                  >
                    <img
                      src={item.logoUrl || noImageFound}
                      alt={item.businessName}
                    />
                    <div className="fs-18 fw-600">{item.businessName}</div>
                    <div className="tag">
                      <div className="tagAbsolute">#{index + 1}</div>
                    </div>
                  </div>
                  {openIndex === index && (
                    <>
                      <div className="accordion-body">{item.content}</div>
                      {merchantPerformanceAnalyticsDetailsSelector?.data
                        ?.statusCode === 200 && (
                        <>
                          <Test2
                            merchantPerformanceAnalyticsDetailsSelector={
                              merchantPerformanceAnalyticsDetailsSelector
                            }
                            item={item}
                          />
                          <div
                            className="btnSecondary btn"
                            onClick={() => handleCommunicate(item)}
                          >
                            Communicate
                          </div>
                        </>
                      )}
                    </>
                  )}
                  {/* {restaurantPerformance && <Test2 />} */}
                </div>
              )
            )}
          </div>
          <div className="d-flex align-center justify-between flexPagination">
            <div className="fs-16">
              Showing {pagination.page} to{" "}
              {merchantPerformanceAnalyticsListSelector?.data?.data?.limit} of{" "}
              {
                merchantPerformanceAnalyticsListSelector?.data?.data
                  ?.recordsCount
              }{" "}
              Restaurants
            </div>
            <Pagination
              defaultCurrent={1}
              current={pagination.page}
              pageSize={pagination.limit}
              total={
                merchantPerformanceAnalyticsListSelector?.data?.data
                  ?.recordsCount
              }
              onChange={handlePaginationChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
