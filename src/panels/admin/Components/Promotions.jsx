import React, { useEffect, useRef, useState } from "react";
// import addBtn from "../../../assets/images/addBtn.svg";
// import coke from "../../../assets/images/coke.svg";
import SearchSelect from "./SearchSelect";
import { Pagination } from "antd";
import PromotionDetails from "./PromotionDetails";
import { useNavigate } from "react-router-dom";
import { adminPromotionListHandler } from "../../../redux/action/adminPromotion";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/Loader/Loader";
import moment from "moment";
import noImageFound from "../../../assets/images/noImageFound.png";

const Promotions = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 9 });
  const [searchString, setSearchString] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  const [isOpen, setIsOpen] = useState(false);
  const [promotionalDetailsData, setPromotionalDetailsData] = useState();

  const dispatch = useDispatch();
  const selectRef = useRef(null);
  const navigate = useNavigate();

  const adminPromotionList = useSelector((state) => state?.adminPromotion);
  const adminEndPromotionSelector = useSelector(
      (state) => state?.adminEndPromotion
    );

  const handleSearchChange = (value) => {
    setSearchString(value);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to the first page on search
  };

  const handleSearchAreaChange = (selectedAreas) => {
    setSearchArea(selectedAreas);
  };

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ page, limit: pageSize });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isDetailsOpen) {
      document.body.classList.add("overflow-Hidden");
    } else {
      document.body.classList.remove("overflow-Hidden");
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-Hidden");
    };
  }, [isDetailsOpen]);

  const toggleDetails = () => {
    setIsDetailsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    let payload = {
      page: pagination?.page,
      limit: pagination?.limit,
      searchString: searchString,
      isActive: activeTab !== "active" ? false : true,
    };
    dispatch(adminPromotionListHandler(payload));
  }, [pagination, searchString, activeTab,adminEndPromotionSelector]);

  return (
    <>
      {adminPromotionList?.isLoading && <Loader />}
      <div className="dashboard">
        <div className="tabPadding">
          <div className="d-flex justify-between align-center mb-20 gap-10 flexsm">
            <div className="fs-24 fw-600">Promotions</div>
            {/* <div
              className={`position-relative ${isOpen ? "rotate" : ""} `}
              ref={selectRef}
            >
              <div className="gap-8 addBtn btn z1" onClick={toggleDropdown}>
                Create New Promotion
                <img src={addBtn} alt="addBtn" />
              </div>
              {isOpen && (
                <>
                  <div className="select-options">
                    <div className="options cursor-pointer" onClick={()=>navigate("/admin/add-promotions")}>Single Promotion</div>
                    <div className="options cursor-pointer" onClick={()=>navigate("/admin/add-promotions")}>Group Promotion</div>
                  </div>
                </>
              )}
            </div> */}
            <div className="position-relative d-flex align-center gap-10">
              <div
                className="gap-8 btnSecondary p32 btn z1"
                onClick={() => navigate("/admin/add-promotions")}
              >
                Single Promotion
              </div>
              {/* <div
                className="gap-8 btnSecondary p32 btn z1"
                onClick={() => navigate("/admin/add-promotions")}
              >
                Group Promotion
              </div> */}
            </div>
          </div>
          <div className="tabs-container tab3 tabing mb-20">
            <div className="tabs">
              <button
                className={`tab-button ${
                  activeTab === "active" ? "active" : ""
                }`}
                onClick={() => setActiveTab("active")}
              >
                Active
              </button>
              <button
                className={`tab-button ${
                  activeTab === "Inactive" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Inactive")}
              >
                Inactive
              </button>
            </div>
          </div>
          <SearchSelect
            onSearchChange={handleSearchChange}
            onSearchAreaChange={handleSearchAreaChange}
          />

          <div className="merchantGrid mb-20">
            {adminPromotionList?.data?.data?.records?.length > 0 ? (
              <>
                {adminPromotionList?.data?.data?.records?.map((item, index) => {
                  return (
                    <div className="merchantCard position-relative" key={index}>
                      <div className="p-10">
                        {item?.redemptionPercentage > 50 && (
                          <div className="nailedIt active fs-14">
                            You Nailed it!
                          </div>
                        )}
                        <div className="text-center promotionImage mb-28">
                          <img
                            src={
                              item?.brandDetails?.imageUrl?.[0] || noImageFound
                            }
                            alt=""
                            className="h-100"
                          />
                        </div>
                        <div className="d-flex justify-between align-center gap-10">
                          <div className="fs-16 fw-700 trunc1">
                            {item?.brandDetails?.brandName
                              ? item.brandDetails.brandName
                                  .charAt(0)
                                  .toUpperCase() +
                                item.brandDetails.brandName.slice(1)
                              : ""}
                          </div>

                          <div
                            className={
                              item?.redemptionPercentage > 50
                                ? "fs-16 fw-600 roi green"
                                : "fs-16 fw-600 roi blue"
                            }
                          >
                            Redeemed: {item?.redemptionPercentage}%
                          </div>
                        </div>
                      </div>
                      <div className="divider m-0"></div>
                      <div className="bottomPadding">
                        <div className="mb-16">
                          <div className="fs-14 mb-4">Promotion title</div>
                          {/* <div className="fs-14 fw-600">
                            {item?.promotionTitle}{" "}
                          </div> */}
                          <div className="fs-14 fw-600">
                            {item?.promotionTitle
                              ? item?.promotionTitle.charAt(0).toUpperCase() +
                                item?.promotionTitle.slice(1)
                              : ""}
                          </div>
                        </div>
                        <div className="grid2 mb-20">
                          <div>
                            <div className="fs-14 mb-4">Brand / Product</div>
                            <div className="fs-14 fw-600">
                              {item?.brandDetails?.brandName
                                ? item?.brandDetails?.brandName
                                    .charAt(0)
                                    .toUpperCase() +
                                  item.brandDetails.brandName.slice(1)
                                : ""}{" "}
                            </div>
                          </div>
                          <div>
                            <div className="fs-14 mb-4">Expiration Date</div>
                            <div className="fs-14 fw-600">
                              {moment(item?.endDate).format("YYYY-MM-DD")}
                            </div>
                          </div>
                          <div>
                            <div className="fs-14 mb-4">
                              Promotional Credits
                            </div>
                            <div className="fs-14 fw-600">
                              ${item?.merchant?.promotionFund}
                            </div>
                          </div>
                          <div>
                            <div className="fs-14 mb-4">Qty/ Nudge Credits</div>
                            <div className="fs-14 fw-600">
                              {item?.merchant?.quantity}
                            </div>
                          </div>
                        </div>
                        <div
                          className="btn btnSecondary"
                          onClick={() => {
                            toggleDetails();
                            setPromotionalDetailsData(item);
                          }}
                        >
                          View Details
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="noDataFound">No data available</div>
            )}

            {/* <div className="merchantCard position-relative">
              <div className="p-10">
                <div className="nailedIt active fs-14">You Nailed it!</div>
                <div className="text-center promotionImage mb-28">
                  <img src={coke} alt="" className="h-100" />
                </div>
                <div className="d-flex justify-between align-center gap-10">
                  <div className="fs-16 fw-700">Coca Cola</div>
                  <div className="fs-16 fw-600 roi blue">Redeemed: 5.1%</div>
                </div>
              </div>
              <div className="divider m-0"></div>
              <div className="bottomPadding">
                <div className="grid2 mb-20">
                  <div>
                    <div className="fs-14 mb-4">Brand / Product</div>
                    <div className="fs-14 fw-600">Chocolate Cake </div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Expiration Date</div>
                    <div className="fs-14 fw-600">08/30/2024</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Promotional Credits</div>
                    <div className="fs-14 fw-600">$1,000</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Qty/ Nudge Credits</div>
                    <div className="fs-14 fw-600">$100</div>
                  </div>
                </div>
                <div className="btn btnSecondary" onClick={toggleDetails}>
                  View Details
                </div>
              </div>
            </div> */}
            {/* <div className="merchantCard position-relative">
              <div className="p-10">
                <div className="nailedIt active fs-14">You Nailed it!</div>
                <div className="text-center promotionImage mb-28">
                  <img src={coke} alt="" className="h-100" />
                </div>
                <div className="d-flex justify-between align-center gap-10">
                  <div className="fs-16 fw-700">Coca Cola</div>
                  <div className="fs-16 fw-600 roi red">Redeemed: 4.9%</div>
                </div>
              </div>
              <div className="divider m-0"></div>
              <div className="bottomPadding">
                <div className="grid2 mb-20">
                  <div>
                    <div className="fs-14 mb-4">Brand / Product</div>
                    <div className="fs-14 fw-600">Chocolate Cake </div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Expiration Date</div>
                    <div className="fs-14 fw-600">08/30/2024</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Promotional Credits</div>
                    <div className="fs-14 fw-600">$1,000</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Qty/ Nudge Credits</div>
                    <div className="fs-14 fw-600">$100</div>
                  </div>
                </div>
                <div className="btn btnSecondary" onClick={toggleDetails}>
                  View Details
                </div>
              </div>
            </div> */}
            {/* <div className="merchantCard position-relative">
              <div className="p-10">
                <div className="nailedIt active fs-14">You Nailed it!</div>
                <div className="text-center promotionImage mb-28">
                  <img src={coke} alt="" className="h-100" />
                </div>
                <div className="d-flex justify-between align-center gap-10">
                  <div className="fs-16 fw-700">Coca Cola</div>
                  <div className="fs-16 fw-600 roi green">Redeemed: 52%</div>
                </div>
              </div>
              <div className="divider m-0"></div>
              <div className="bottomPadding">
                <div className="grid2 mb-20">
                  <div>
                    <div className="fs-14 mb-4">Brand / Product</div>
                    <div className="fs-14 fw-600">Chocolate Cake </div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Expiration Date</div>
                    <div className="fs-14 fw-600">08/30/2024</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Promotional Credits</div>
                    <div className="fs-14 fw-600">$1,000</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Qty/ Nudge Credits</div>
                    <div className="fs-14 fw-600">$100</div>
                  </div>
                </div>
                <div className="btn btnSecondary" onClick={toggleDetails}>
                  View Details
                </div>
              </div>
            </div> */}
          </div>
          {adminPromotionList?.data?.data?.records?.length > 0 && (
            <div className="d-flex align-center justify-between flexPagination">
              <div className="fs-16">
                {(() => {
                  const start = (pagination.page - 1) * pagination.limit + 1;
                  const end = Math.min(
                    start + adminPromotionList?.data?.data?.records?.length - 1,
                    adminPromotionList?.data?.data?.recordsCount
                  );
                  return `Showing ${start} to ${end} of ${adminPromotionList?.data?.data?.recordsCount} Promotions`;
                })()}
              </div>
              <Pagination
                current={pagination?.page}
                pageSize={pagination?.limit}
                total={adminPromotionList?.data?.data?.recordsCount}
                onChange={handlePaginationChange}
              />
            </div>
          )}
        </div>
      </div>
      <PromotionDetails
        isOpen={isDetailsOpen}
        toggleDetails={toggleDetails}
        promotionalDetailsData={promotionalDetailsData}
        setIsDetailsOpen = {setIsDetailsOpen}
        activeTab={activeTab}
      />
    </>
  );
};

export default Promotions;
