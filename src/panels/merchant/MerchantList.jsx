import React, { useState, useRef, useEffect } from "react";
import "./merchant.css";
import SearchSelect from "../../shared/components/SearchSelect";
import olive from "../../assets/images/olive.png";
import countIcon from "../../assets/images/countIcon.svg";
import countIconRed from "../../assets/images/countIconRed.svg";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";

const MerchantList = () => {
    const navigate = useNavigate()
  const [activeTab2, setActiveTab2] = useState("1");

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
   const items = [
      { id: "1", title: "Olive Garden", titleImage: olive },
      { id: "2", title: "Olive Garden", titleImage: olive },
      { id: "3", title: "Olive Garden", titleImage: olive },
    ];
  return (
    <>
      <div className="dashboard">
        <div className="card">
          <div className="d-flex align-center justify-between mb-20 flexWraplg">
            <div className="fs-24 fw-600">Merchants</div>
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
          <SearchSelect />
          <div className="merchantGrid mb-20">
            <div className="merchantCard">
              <div className="topPadding">
                <div className="merchantImage">
                  <img src={olive} alt="" />
                </div>
                <div className="fs-16 fw-700 mb-10">
                  Garden Grove Café & Bistro
                </div>
              </div>
              <div className="divider2 m-0"></div>
              <div className="bottomPadding">
                <div className="label greenLabel mb-20">Top performing</div>
                <div className="grid2 mb-20">
                  <div>
                    <div className="fs-14 mb-4">Date joined</div>
                    <div className="fs-14 fw-600">Sep 9, 2024</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Followers</div>
                    <div className="fs-14 fw-600">89</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Nudges Sent</div>
                    <div className="fs-14 fw-600">196</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Nudge Credits</div>
                    <div className="fs-14 fw-600">568</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Followers added</div>
                    <div className="count">
                      <img src={countIcon} alt="" />
                      45
                    </div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Nudges Accepted</div>
                    <div className="count">
                      <img src={countIcon} alt="" />
                      124
                    </div>
                  </div>
                </div>
                <div className="gridBtn">
                  <div className="btnSecondary btn" onClick={()=>navigate("/merchant/details")}>Details</div>
                  <div className="btnSecondary btn" onClick={()=>navigate("/merchant/team-member")}>Team</div>
                  <div className="btnSecondary btn">Nudges</div>
                </div>
              </div>
            </div>
            <div className="merchantCard">
              <div className="topPadding">
                <div className="merchantImage">
                  <img src={olive} alt="" />
                </div>
                <div className="fs-16 fw-700 mb-10">
                  Garden Grove Café & Bistro
                </div>
              </div>
              <div className="divider2 m-0"></div>
              <div className="bottomPadding">
                <div className="label greenLabel mb-20">Top performing</div>
                <div className="grid2 mb-20">
                  <div>
                    <div className="fs-14 mb-4">Date joined</div>
                    <div className="fs-14 fw-600">Sep 9, 2024</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Followers</div>
                    <div className="fs-14 fw-600">89</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Nudges Sent</div>
                    <div className="fs-14 fw-600">196</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Nudge Credits</div>
                    <div className="fs-14 fw-600">568</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Followers added</div>
                    <div className="count">
                      <img src={countIcon} alt="" />
                      45
                    </div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Nudges Accepted</div>
                    <div className="count ">
                      <img src={countIcon} alt="" />
                      124
                    </div>
                  </div>
                </div>
                <div className="gridBtn">
                  <div className="btnSecondary btn" onClick={()=>navigate("/merchant/details")}>Details</div>
                  <div className="btnSecondary btn" onClick={()=>navigate("/merchant/team-member")}>Team</div>
                  <div className="btnSecondary btn">Nudges</div>
                </div>
              </div>
            </div>
            <div className="merchantCard">
              <div className="topPadding">
                <div className="merchantImage">
                  <img src={olive} alt="" />
                </div>
                <div className="fs-16 fw-700 mb-10">
                  Garden Grove Café & Bistro
                </div>
              </div>
              <div className="divider2 m-0"></div>
              <div className="bottomPadding">
                <div className="label greenLabel mb-20">Top performing</div>
                <div className="grid2 mb-20">
                  <div>
                    <div className="fs-14 mb-4">Date joined</div>
                    <div className="fs-14 fw-600">Sep 9, 2024</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Followers</div>
                    <div className="fs-14 fw-600">89</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Nudges Sent</div>
                    <div className="fs-14 fw-600">196</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Nudge Credits</div>
                    <div className="fs-14 fw-600">568</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Followers added</div>
                    <div className="count">
                      <img src={countIcon} alt="" />
                      45
                    </div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Nudges Accepted</div>
                    <div className="count">
                      <img src={countIcon} alt="" />
                      124
                    </div>
                  </div>
                </div>
                <div className="gridBtn">
                  <div className="btnSecondary btn" onClick={()=>navigate("/merchant/details")}>Details</div>
                  <div className="btnSecondary btn" onClick={()=>navigate("/merchant/team-member")}>Team</div>
                  <div className="btnSecondary btn">Nudges</div>
                </div>
              </div>
            </div>
            <div className="merchantCard">
              <div className="topPadding">
                <div className="merchantImage">
                  <img src={olive} alt="" />
                </div>
                <div className="fs-16 fw-700 mb-10">
                  Garden Grove Café & Bistro
                </div>
              </div>
              <div className="divider2 m-0"></div>
              <div className="bottomPadding">
                <div className="label greenLabel mb-20">Top performing</div>
                <div className="grid2 mb-20">
                  <div>
                    <div className="fs-14 mb-4">Date joined</div>
                    <div className="fs-14 fw-600">Sep 9, 2024</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Followers</div>
                    <div className="fs-14 fw-600">89</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Nudges Sent</div>
                    <div className="fs-14 fw-600">196</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Nudge Credits</div>
                    <div className="fs-14 fw-600">568</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Followers added</div>
                    <div className="count">
                      <img src={countIcon} alt="" />
                      45
                    </div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Nudges Accepted</div>
                    <div className="count">
                      <img src={countIcon} alt="" />
                      124
                    </div>
                  </div>
                </div>
                <div className="gridBtn">
                  <div className="btnSecondary btn" onClick={()=>navigate("/merchant/details")}>Details</div>
                  <div className="btnSecondary btn" onClick={()=>navigate("/merchant/team-member")}>Team</div>
                  <div className="btnSecondary btn">Nudges</div>
                </div>
              </div>
            </div>
            <div className="merchantCard">
              <div className="topPadding">
                <div className="merchantImage">
                  <img src={olive} alt="" />
                </div>
                <div className="fs-16 fw-700 mb-10">
                  Garden Grove Café & Bistro
                </div>
              </div>
              <div className="divider2 m-0"></div>
              <div className="bottomPadding">
                <div className="label greenLabel mb-20">Top performing</div>
                <div className="grid2 mb-20">
                  <div>
                    <div className="fs-14 mb-4">Date joined</div>
                    <div className="fs-14 fw-600">Sep 9, 2024</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Followers</div>
                    <div className="fs-14 fw-600">89</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Nudges Sent</div>
                    <div className="fs-14 fw-600">196</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Nudge Credits</div>
                    <div className="fs-14 fw-600">568</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Followers added</div>
                    <div className="count">
                      <img src={countIcon} alt="" />
                      45
                    </div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Nudges Accepted</div>
                    <div className="count">
                      <img src={countIcon} alt="" />
                      124
                    </div>
                  </div>
                </div>
                <div className="gridBtn">
                  <div className="btnSecondary btn" onClick={()=>navigate("/merchant/details")}>Details</div>
                  <div className="btnSecondary btn" onClick={()=>navigate("/merchant/team-member")}>Team</div>
                  <div className="btnSecondary btn">Nudges</div>
                </div>
              </div>
            </div>
            <div className="merchantCard">
              <div className="topPadding">
                <div className="merchantImage">
                  <img src={olive} alt="" />
                </div>
                <div className="fs-16 fw-700 mb-10">
                  Garden Grove Café & Bistro
                </div>
              </div>
              <div className="divider2 m-0"></div>
              <div className="bottomPadding">
                <div className="label redLabel mb-20">Top performing</div>
                <div className="grid2 mb-20">
                  <div>
                    <div className="fs-14 mb-4">Date joined</div>
                    <div className="fs-14 fw-600">Sep 9, 2024</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Followers</div>
                    <div className="fs-14 fw-600">89</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Nudges Sent</div>
                    <div className="fs-14 fw-600">196</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Nudge Credits</div>
                    <div className="fs-14 fw-600">568</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Followers added</div>
                    <div className="count">
                      <img src={countIcon} alt="" />
                      45
                    </div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Nudges Accepted</div>
                    <div className="count countred">
                      <img src={countIconRed} alt="" />
                      124
                    </div>
                  </div>
                </div>
                <div className="gridBtn">
                  <div className="btnSecondary btn" onClick={()=>navigate("/merchant/details")}>Details</div>
                  <div className="btnSecondary btn" onClick={()=>navigate("/merchant/team-member")}>Team</div>
                  <div className="btnSecondary btn">Nudges</div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-center justify-between flexPagination">
            <div className="fs-16">Showing 1 to 5 of 10 Restaurants</div>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MerchantList;
