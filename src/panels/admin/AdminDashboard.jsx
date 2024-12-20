import { useState } from "react";
import "../../assets/css/dashboard.css";
import chartnudge from "../../assets/images/chartnudge.svg";
import chartPromotion from "../../assets/images/chartPromotion.svg";
import chartfollower from "../../assets/images/chartfollower.svg";
import chart from "../../assets/images/chart.jpg";
import OverviewGrid from "../../shared/components/dashboards/OverviewGrid";
import TabContainer from "../../shared/components/dashboards/TabContainer";
import GraphWithCircle from "../../shared/components/dashboards/GraphWithCircle";
import PromotionCard from "../../shared/components/dashboards/PromotionCard";
import olive from "../../assets/images/olive.png";
import BarChart from "../../shared/charts/BarChart";
import DoughnutChart from "../../shared/charts/DoughnutChart";
import { Pagination } from "antd";
import AreaChart from "../../shared/charts/AreaChart";
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [activeTab2, setActiveTab2] = useState("1");
  const [activeTab3, setActiveTab3] = useState("1");
  const [openIndex, setOpenIndex] = useState(0); // Initially, the first item is open
  const data = {
    labels: ["Progress", "Remaining"],
    progress: 80,
    total: 100,
  };

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the clicked panel
  };

  const Test2 = () => {
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
              labels={["M", "T", "W", "T", "F", "S"]}
              datas={[65, 59, 80, 81, 56, 55, 40]}
              topColor={"rgba(2, 124, 255, 0.5)"}
              bottomColor={"rgba(215, 210, 226, 0.2)"}
              borderColor={"rgba(0, 123, 255, 1)"}
              className={"w-100 mxh"}
            />
          </div>
          <div className="card w-100">
            <div className="d-flex justify-between align-center ">
              <div className="fs-16 fw-600 ">Habitual Users</div>
              <div className="fs-16 ">12/day (avg)</div>
            </div>
            <div className="divider2"></div>
            {/* <img src={chart4} alt="" className="w-100 mxh" /> */}
            <BarChart
              labels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
              datas={[90, 56, 58, 10, 20, 44, 56]}
              className="w-100 mxh"
              barThickness={80}
              borderSkipped={"bottom"}
              xDisplay={true}
              yDisplay={false}
              isDatasMap={false}
              displayLegend={false}
            />
          </div>
        </div>
        <div className="d-flex gap-16 mb-16 flexWrap">
          <div className="card w-100">
            <div className="d-flex justify-between align-center mb-20">
              <div className="fs-16 fw-600 ">Habitual Users</div>
              <div className="fs-16 ">12/day (avg)</div>
            </div>
            <div className="divider2"></div>
            {/* <img src={chart4} alt="" className="w-100 mxh" /> */}
            <BarChart
              labels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
              datas={[90, 56, 58, 10, 20, 44, 56]}
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
              <div className="fs-16 fw-600 ">Habitual Users</div>
            </div>
            <div className="divider2"></div>
            <div className="text-center">
              {/* <img src={chart5} alt="" className="h-100 mxh" /> */}
              <DoughnutChart data={data} className="h-100 mxh" />
            </div>
          </div>
        </div>
        <div className="btnSecondary btn">Communicate</div>
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
      id: "1",
      label: "Today",
    },
    {
      id: "2",
      label: "Weekly",
    },
    {
      id: "3",
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
  return (
    <>
      <div className="dashboard">
        <div className="d-flex flexWrap gap-20">
          <div className="mx292">
            <div className="overviewCard fs-16 mb-10">Overview</div>
            <OverviewGrid />
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
            count={77}
            chartPromotionImage={chartnudge}
            buttonText="See Nudges"
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
                    key={tab.id}
                    className={`tab-button ${
                      activeTab2 === tab.id ? "active" : ""
                    }`}
                    onClick={() => setActiveTab2(tab.id)}
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
          <div className="accordion">
            {items.map((item, index) => (
              <div key={index} className="accordion-item">
                <div
                  className="accordion-header"
                  onClick={() => handleToggle(index)}
                >
                  <img src={item.titleImage} alt="" />
                  <div className="fs-18 fw-600">{item.title}</div>
                  <div className="tag">
                    <div className="tagAbsolute">#{item.id}</div>
                  </div>
                </div>
                {openIndex === index && (
                  <div className="accordion-body">{item.content}</div>
                )}
              </div>
            ))}
          </div>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
