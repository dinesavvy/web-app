import React, { useState, useEffect } from "react";
import "../../../assets/css/merchant.css";
import SearchSelect from "../Components/SearchSelect";
import olive from "../../../assets/images/olive.png";
import countIcon from "../../../assets/images/countIcon.svg";
import countIconRed from "../../../assets/images/countIconRed.svg";
import noImageFound from "../../../assets/images/noImageFound.png";

import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { merchantsListHandler } from "../../../redux/action/merchantsList";
import moment from "moment";
import Loader from "../../../common/Loader/Loader";
import GroupList from "./GroupList";
import useScrollToTop from "../../../hooks/useScrollToTop";


const MerchantList = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 12 });
  const [searchString, setSearchString] = useState("");
  const [searchArea, setSearchArea] = useState([]);
  const [activeTab2, setActiveTab2] = useState("today");
  const [activeTab, setActiveTab] = useState("merchant");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const merchantListSelector = useSelector((state) => state?.merchantsList);

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ page, limit: pageSize });
  };

  const handleSearchChange = (value) => {
    setSearchString(value);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to the first page on search
  };

  const handleSearchAreaChange = (selectedAreas) => {
    setSearchArea(selectedAreas);
  };

  const tabs2 = [
    {
      id: "1",
      value: "today",
      label: "Today",
    },
    {
      id: "2",
      value: "weekly",
      label: "Weekly",
    },
    {
      id: "3",
      value: "monthly",
      label: "Monthly",
    },
  ];

  useEffect(() => {
    const fetchMerchants = () => {
      const payload = {
        page: pagination?.page,
        limit: pagination?.limit,
        timeFrame: activeTab2,
        searchString,
        searchArea,
      };
      dispatch(merchantsListHandler(payload));
    };

    fetchMerchants();
  }, [pagination, activeTab2, searchString, searchArea]);

  // Scroll to top when the component mounts
  useScrollToTop([activeTab, activeTab2, pagination?.page,pagination?.limit]);

  const tabs = [
    {
      id: "1",
      label: "merchant",
    },
    {
      id: "2",
      label: "groups",
    },
  ];
  
  return (
    <>
      {merchantListSelector?.isLoading && <Loader />}
      <div className="dashboard">
        <div className="tabs-container tab3 tabFull ">
          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${
                  activeTab === tab.label ? "active" : "disabled"
                }`}
                onClick={() => {
                  if(activeTab === tab.label){
                    setActiveTab("merchant");
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {activeTab === "merchant" ? (
          <>
            <div className="tabPadding">
              <div className="d-flex align-center justify-between mb-20 flexWraplg">
                <div className="fs-24 fw-600">Merchants</div>
                <div className="tabAfter">
                <div className="tabs-container tab2">
                  <div className="tabs">
                    {tabs2.map((tab) => (
                      <button
                        key={tab.id}
                        className={`tab-button ${
                          activeTab2  === tab.value ? "active" : ""
                        }`}
                        onClick={() => setActiveTab2(tab.value)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                </div>
              </div>
              <SearchSelect
                onSearchChange={handleSearchChange}
                onSearchAreaChange={handleSearchAreaChange}
              />
              <div className="merchantGrid mb-20">
                {merchantListSelector?.data?.data?.records?.length > 0 ? (
                  merchantListSelector?.data?.data?.records?.map(
                    (item, index) => {
                      return (
                        <>
                          <div
                            className="merchantCard position-relative"
                            key={index}
                          >
                            <div className="topPadding">
                              <div className="merchantImage">
                                <img
                                  src={item?.logoUrl || noImageFound}
                                  alt={item?.businessName}
                                />
                              </div>
                              <div className="fs-16 fw-700 mb-10 singleLine">
                                {/* Garden Grove Café & Bistro */}
                                {item?.businessName &&
                                  item?.businessName.charAt(0).toUpperCase() +
                                    item?.businessName.slice(1)}
                              </div>
                            </div>
                            {/* <div className="custom-checkbox merchantCardCheckbox">
                              <label className="checkLabel">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                            </div> */}
                            <div className="divider2 m-0"></div>
                            <div className="bottomPadding">
                              {parseInt(item?.performance) > 33 ? (
                                <div className="label greenLabel mb-20">
                                  Top performing
                                </div>
                              ) : (
                                <div className="label redLabel mb-20">
                                  Under performing
                                </div>
                              )}
                              <div className="grid2 mb-20">
                                <div>
                                  <div className="fs-14 mb-4">Date joined</div>
                                  <div className="fs-14 fw-600">
                                    {moment(item.createdAt).format(
                                      "MMM D, YYYY"
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <div className="fs-14 mb-4">Nudge Sent</div>
                                  <div className="fs-14 fw-600">
                                    {
                                      item?.nudge
                                        ?.timeFrameFollowerNudgeSentCount
                                    }
                                  </div>
                                </div>
                                <div>
                                  <div className="fs-14 mb-4">
                                    Volume Potential
                                  </div>
                                  <div className="fs-14 fw-600">
                                    {/* {
                                      item?.nudge
                                        ?.timeFrameFollowerNudgeSentCount
                                    } */}
                                    0
                                  </div>
                                </div>
                                <div>
                                  <div className="fs-14 mb-4">
                                    Depletions Potential
                                  </div>
                                  <div className="fs-14 fw-600">
                                    {/* {item?.nudge?.nudgeCredit} */}
                                    0
                                  </div>
                                </div>
                                <div>
                                  <div className="fs-14 mb-4">
                                    Followers added
                                  </div>
                                  <div className="count">
                                    <img src={countIcon} alt="" />
                                    {item?.timeFrameFollowerCount}
                                  </div>
                                </div>
                                <div>
                                  <div className="fs-14 mb-4">
                                    Nudges Accepted
                                  </div>
                                  <div
                                    className={
                                      parseInt(item?.performance) > 33
                                        ? "count "
                                        : "count countred"
                                    }
                                  >
                                    <img
                                      src={
                                        parseInt(item?.performance) > 33
                                          ? countIcon
                                          : countIconRed
                                      }
                                      alt=""
                                    />
                                    {
                                      item?.nudge
                                        ?.timeFrameFollowerNudgeAcceptCount
                                    }
                                  </div>
                                </div>
                              </div>
                              <div className="gridBtn">
                                <div
                                  className="btn"
                                  // onClick={() => {
                                  //   navigate("/admin/merchant/details", {
                                  //     state: item,
                                  //   });
                                  //   localStorage.setItem("merchantId", item?._id);
                                  // }}

                                  onClick={()=>navigate("/admin/promotions",{state:item})}
                                >
                                  Promote
                                </div>
                                <div
                                  className="btnSecondary detailBtn btn"
                                  onClick={() => {
                                    navigate("/admin/merchant/details", {
                                      state: item,
                                    });
                                    localStorage.setItem(
                                      "merchantId",
                                      item?._id
                                    );
                                    localStorage.setItem(
                                      "restaurantName",
                                      item?.businessName
                                    );
                                    // localStorage.setItem("merchantData", JSON.stringify(item));
                                  }}
                                >
                                  Details
                                </div>
                                {/* <div
                            className="btnSecondary btn"
                            onClick={() => navigate("/admin/merchant/team-member")}
                          >
                            Team
                          </div> */}
                                {/* <div className="btnSecondary btn">Nudges</div> */}
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                  )
                ) : (
                  <div className="noDataFound">No data found</div>
                )}
              </div>
              {merchantListSelector?.data?.data?.records?.length > 0 && (
                <div className="d-flex align-center justify-between flexPagination">
                  <div className="fs-16">
                    {(() => {
                      const start =
                        (pagination?.page - 1) * pagination?.limit + 1;
                      const end = Math.min(
                        start +
                          merchantListSelector?.data?.data?.records?.length -
                          1,
                        merchantListSelector?.data?.data?.recordsCount
                      );
                      return `Showing ${start} to ${end} of ${merchantListSelector?.data?.data?.recordsCount} Restaurants`;
                    })()}
                  </div>
                  <Pagination
                    current={pagination?.page}
                    pageSize={pagination?.limit}
                    total={merchantListSelector?.data?.data?.recordsCount}
                    onChange={handlePaginationChange}
                    pageSizeOptions={["12" ,'20', '50', '100']} 
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <GroupList />
          </>
        )}
      </div>
    </>
  );
};

export default MerchantList;
