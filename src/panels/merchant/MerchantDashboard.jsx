import React, { useState } from "react";
import TabContainer from "../../shared/components/dashboards/TabContainer";
import GraphWithCircle from "../../shared/components/dashboards/GraphWithCircle";
import chart from "../../assets/images/chart.jpg";
import map from "../../assets/images/map.jpg";
import PromotionCard from "../../shared/components/dashboards/PromotionCard";
import BarChart from "../../shared/charts/BarChart";
import chartnudge from "../../assets/images/chartnudgefill.svg";
import chartPromotion from "../../assets/images/chartPromotionfill.svg";
import chartfollower from "../../assets/images/chartfollowerfill.svg";


const MerchantDashboard = () => {
  const [activeTab, setActiveTab] = useState("1");
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
  return (
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
                        />
                      }
                    />
                  </div>
        </div>
      </div>
    </>
  );
};

export default MerchantDashboard;
