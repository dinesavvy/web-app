import React, { useState } from "react";
import "../../assets/css/dashboard.css";
import circleinfo from "../../assets/images/circleinfo.svg";
import chartnudge from "../../assets/images/chartnudge.svg";
import chartPromotion from "../../assets/images/chartPromotion.svg";
import chartfollower from "../../assets/images/chartfollower.svg";
import chart from "../../assets/images/chart.jpg";
import chart2 from "../../assets/images/chart2.jpg";
import chart4 from "../../assets/images/chart4.jpg";
import chart5 from "../../assets/images/chart5.jpg";
import olive from "../../assets/images/olive.png";
import { Tabs } from "antd";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [activeTab2, setActiveTab2] = useState("1");
  const [activeTab3, setActiveTab3] = useState("1");
  const [openIndex, setOpenIndex] = useState(0); // Initially, the first item is open

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the clicked panel
  };
  const Test = () => {
    return (
      <div className="">
        <div className="chartpadding">
          <div>
            <div className="p12 mb-15">
              <div className="fs-16">Habitual Followers</div>
              <div className="fs-26 fw-700">8,000</div>
            </div>
            <div className="trend trendGreen">Trend 10%</div>
          </div>
          <div>
            <div className="circleinfo mb-10">
              <img src={circleinfo} className="circleAbsolute" alt="" />
              <div className="fs-34 fw-700 z1">256</div>
              <div className="fs-14 z1">Merchants</div>
            </div>
          </div>
        </div>
        <img src={chart} alt="" className="w-100 mxh" />
      </div>
    );
  };
  const Test2 = () => {
    return (
      <>
        <div className="d-flex gap-16 mb-16 flexWrap">
          <div className="chartborder mx369">
            <div className="chartpadding mb-20">
              <div className="fs-16 fw-600 ">Habitual Users</div>
            </div>
            <img src={chart} alt="" className="w-100 mxh" />
          </div>
          <div className="card w-100">
            <div className="d-flex justify-between align-center ">
              <div className="fs-16 fw-600 ">Habitual Users</div>
              <div className="fs-16 ">12/day (avg)</div>
            </div>
            <div className="divider2"></div>
            <img src={chart4} alt="" className="w-100 mxh" />
          </div>
        </div>
        <div className="d-flex gap-16 mb-16 flexWrap">
          <div className="card w-100">
            <div className="d-flex justify-between align-center mb-20">
              <div className="fs-16 fw-600 ">Habitual Users</div>
              <div className="fs-16 ">12/day (avg)</div>
            </div>
            <div className="divider2"></div>
            <img src={chart4} alt="" className="w-100 mxh" />
          </div>
          <div className="card mx369">
            <div className="d-flex justify-between align-center mb-20">
              <div className="fs-16 fw-600 ">Habitual Users</div>
            </div>
            <div className="divider2"></div>
            <div className="text-center">
            <img src={chart5} alt="" className="h-100 mxh" />
            </div>
          </div>
        </div>
        <div className="btnSecondary btn">
        Communicate
        </div>
      </>
    );
  };

  const tabs = [
    {
      id: "1",
      label: "1D",
      content: <Test />,
    },
    {
      id: "2",
      label: "1W",
      content: <Test />,
    },
    {
      id: "3",
      label: "3M",
      content: <Test />,
    },
    {
      id: "4",
      label: "4M",
      content: <Test />,
    },
    {
      id: "5",
      label: "5M",
      content: <Test />,
    },
  ];
  const tabs2 = [
    {
      id: "1",
      label: "Today",
      content: <Test />,
    },
    {
      id: "2",
      label: "Weekly",
      content: <Test />,
    },
    {
      id: "3",
      label: "Monthly",
      content: <Test />,
    },
  ];
  const tabs3 = [
    {
      id: "1",
      label: "Top performers",
      content: <Test />,
    },
    {
      id: "2",
      label: "Needs attention",
      content: <Test />,
    },
  ];
  const items = [
    { id : '1',title: "Olive Garden", titleImage: olive, content: <Test2 /> },
    { id : '2',title: "Olive Garden", titleImage: olive, content: <Test2 /> },
    { id : '3',title: "Olive Garden", titleImage: olive, content: <Test2 /> },
  ];
  return (
    <>
      <div className="dashboard">
        <div className="d-flex flexWrap gap-20">
          <div className="mx292">
            <div className="overviewCard fs-16 mb-10">Overview</div>
            <div className="card d-grid gap-20 overviewGrid2">
              <div>
                <div className="circleinfo mb-10">
                  <img src={circleinfo} className="circleAbsolute" alt="" />
                  <div className="fs-34 fw-700 z1">256</div>
                  <div className="fs-14 z1">Merchants</div>
                </div>
                <div className="trend">Trend 10%</div>
              </div>
              <div>
                <div className="circleinfo mb-10">
                  <img src={circleinfo} className="circleAbsolute" alt="" />
                  <div className="fs-34 fw-700 z1">256</div>
                  <div className="fs-14 z1">Merchants</div>
                </div>
                <div className="trend">Trend 10%</div>
              </div>
              <div>
                <div className="circleinfo mb-10">
                  <img src={circleinfo} className="circleAbsolute" alt="" />
                  <div className="fs-34 fw-700 z1">256</div>
                  <div className="fs-14 z1">Merchants</div>
                </div>
                <div className="trend">Trend 10%</div>
              </div>
              <div>
                <div className="circleinfo mb-10">
                  <img src={circleinfo} className="circleAbsolute" alt="" />
                  <div className="fs-34 fw-700 z1">256</div>
                  <div className="fs-14 z1">Merchants</div>
                </div>
                <div className="trend">Trend 10%</div>
              </div>
            </div>
          </div>
          <div className="w-100">
            <div className="h-100">
              <div className="tabs-container h-100">
                {/* Tab Buttons */}
                <div className="tabs mb-10">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`tab-button ${
                        activeTab === tab.id ? "active" : ""
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                  {tabs.map((tab) => (
                    <div
                      key={tab.id}
                      className={`tab-panel  ${
                        activeTab === tab.id ? "visible" : "hidden"
                      }`}
                    >
                      {tab.content}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="d-grid chartGrid gap-20">
          <div className="card">
            <div className="d-flex gap-20">
              <img src={chartPromotion} className="hchartImage" alt="" />
              <div>
                <div className="fs-16">Promotions</div>
                <div className="fs-26 fw-700">80</div>
              </div>
            </div>
            <div className="divider2"></div>
            <div className="mb-20">
              <img src={chart2} className="w-100" alt="" />
            </div>
            <div className="btn">See promotions</div>
          </div>
          <div className="card">
            <div className="d-flex gap-20">
              <img src={chartnudge} className="hchartImage" alt="" />
              <div>
                <div className="fs-16">Nudges</div>
                <div className="fs-26 fw-700">77</div>
              </div>
            </div>
            <div className="divider2"></div>
            <div className="mb-20">
              <img src={chart2} className="w-100" alt="" />
            </div>
            <div className="btn">See promotions</div>
          </div>
          <div className="card">
            <div className="d-flex gap-20">
              <img src={chartfollower} className="hchartImage" alt="" />
              <div>
                <div className="fs-16">Followers</div>
                <div className="fs-26 fw-700">79</div>
              </div>
            </div>
            <div className="divider2"></div>
            <div className="mb-20">
              <img src={chart2} className="w-100" alt="" />
            </div>
            <div className="btn">See promotions</div>
          </div>
        </div>
        <div className="divider"></div>
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
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
