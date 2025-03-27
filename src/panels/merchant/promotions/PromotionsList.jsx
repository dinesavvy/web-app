import React, { useEffect, useRef, useState } from "react";
// import addBtn from "../../../assets/images/addBtn.svg";
// import coke from "../../../assets/images/coke.svg";
import { Pagination } from "antd";
// import PromotionDetails from "./PromotionDetails";
import { useNavigate } from "react-router-dom";
import { adminPromotionListHandler } from "../../../redux/action/adminPromotion";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/Loader/Loader";
import moment from "moment";
import noImageFound from "../../../assets/images/noImageFound.png";
import remainTime from "../../../assets/images/remainTime.svg";
import searchIcon from "../../../assets/images/searchIcon.svg";
import successNailedIt from "../../../assets/images/successNailedIt.svg";
import {
  activePromotionListAction,
  activePromotionListHandler,
} from "../../../redux/action/businessAction/activePromotionList";
import {
  archivePromotionHandler,
  archivePromotionListAction,
} from "../../../redux/action/businessAction/archivePromotion";
import {
  updatePromotionPriceAction,
  updatePromotionPriceHandler,
} from "../../../redux/action/businessAction/updateProotionPrice";
import { useCommonMessage } from "../../../common/CommonMessage";
import SearchSelect from "../../admin/Components/SearchSelect";

const PromotionsList = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 9 });
  const [searchString, setSearchString] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  const [isOpen, setIsOpen] = useState(false);
  const [offerPrice, setOfferPrice] = useState({});
  const messageApi = useCommonMessage();

  const dispatch = useDispatch();
  const selectRef = useRef(null);
  const navigate = useNavigate();

  const activePromotionListSelector = useSelector(
    (state) => state?.activePromotionList
  );

  const archivePromotionListSelector = useSelector(
    (state) => state?.archivePromotionList
  );

  const updatePromotionPriceSelector = useSelector(
    (state) => state?.updatePromotionPrice
  );

  const handleSearchChange = (value) => {
    setSearchString(value);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to the first page on search
  };

  const handleSearchAreaChange = (selectedAreas) => {
    setSearchArea(selectedAreas);
  };

  const handleOfferPriceChange = (e, index) => {
    setOfferPrice((prev) => ({
      ...prev,
      [index]: e.target.value, // Update specific item's offer price
    }));
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
      // payload.searchString = searchString;
    };

    if (activeTab === "active") {
      payload.searchString = searchString;
      dispatch(activePromotionListHandler(payload));
    } else if (activeTab === "offer") {
      payload.isActive = true;
      payload.searchString = searchString;
      dispatch(archivePromotionHandler(payload));
    } else if (activeTab === "archive") {
      payload.isActive = false;
      payload.searchString = searchString;
      dispatch(archivePromotionHandler(payload));
    }
  }, [pagination, searchString, activeTab, updatePromotionPriceSelector]);

  const [tempState, setTempState] = useState(true);

  const handleAction = (item, value, index) => {
    let payload = {
      promotionId: value?._id,
      retailPrice: offerPrice[index]
        ? Number(offerPrice[index])
        : value?.merchant?.retailPrice,
      promotionStatus: item, // Denied
    };
    dispatch(updatePromotionPriceHandler(payload));
  };

  useEffect(() => {
    if (updatePromotionPriceSelector?.data?.statusCode == 200) {
      messageApi.open({
        type: "success",
        content: updatePromotionPriceSelector?.data?.message,
      });
      dispatch(updatePromotionPriceAction.updatePromotionPriceReset());
    }
  }, [updatePromotionPriceSelector]);

  const withdrawFund = () => {
    messageApi.open({
      type: "",
      content: "Coming Soon",
    });
  };

  return (
    <>
      {(activePromotionListSelector?.isLoading ||
        archivePromotionListSelector?.isLoading ||
        updatePromotionPriceSelector?.isLoading) && <Loader />}
      <div className="dashboard">
        {/* <div className="tabs-container tab3 tabFull tabing">
          <div className="tabs">
            <button
              className={`tab-button ${activeTab === "active" ? "active" : ""}`}
              onClick={() => setActiveTab("active")}
            >
              Active
            </button>
            <button
              className={`tab-button ${activeTab === "offer" ? "active" : ""}`}
              onClick={() => setActiveTab("offer")}
            >
              <div className="d-flex align-center justify-center gap-8">
                Offer
                <div className="tagNumber fs-14 fw-500">3</div>
              </div>
            </button>
            <button
              className={`tab-button ${
                activeTab === "archive" ? "active" : ""
              }`}
              onClick={() => setActiveTab("archive")}
            >
              Archive
            </button>
          </div>
        </div> */}

        <div className="tabs-container tab3 tabFull tabing">
          <div className="tabs">
            <button
              className={`tab-button ${activeTab === "active" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("active");
                setPagination({ page: 1, limit: 9 });
                dispatch(
                  archivePromotionListAction.archivePromotionListReset()
                );
                setSearchString("");
              }}
            >
              Active
            </button>

            <button
              className={`tab-button d-flex align-center justify-center gap-8 ${
                activeTab === "offer" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab("offer");
                setPagination({ page: 1, limit: 9 });
                setSearchString("");
              }}
            >
              Offer{" "}
              {activeTab === "offer" && (
                <div className="tagNumber pc fs-14 fw-500">
                  {archivePromotionListSelector?.data?.data?.records?.length}
                </div>
              )}
            </button>
            <button
              className={`tab-button ${
                activeTab === "archive" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab("archive");
                setPagination({ page: 1, limit: 9 });
                setSearchString("");
              }}
            >
              Archive
            </button>
          </div>
        </div>

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
            {/* <div className="d-flex align-center gap-10">
              <div
                className="gap-8 btnSecondary p32 btn z1"
                onClick={() => navigate("/admin/add-promotions")}
              >
                Single Promotion
              </div>
              <div
                className="gap-8 btnSecondary p32 btn z1"
                onClick={() => navigate("/admin/add-promotions")}
              >
                Group Promotion
              </div>
            </div> */}
          </div>
          {/* <div className="tabs-container tab3 tabing mb-20">
            <div className="tabs">
              <button
                className={`tab-button ${
                  activeTab === "active" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab("active");
                  setPagination({ page: 1, limit: 9 });
                  dispatch(
                    archivePromotionListAction.archivePromotionListReset()
                  );
                }}
              >
                Active
              </button>
              <button
                className={`tab-button ${
                  activeTab === "offer" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab("offer");
                  setPagination({ page: 1, limit: 9 });
                }}
              >
                Offer{" "}
                <span className="count">
                  {activeTab === "offer"
                    ? archivePromotionListSelector?.data?.data?.records?.length
                    : ""}
                </span>
              </button>
              <button
                className={`tab-button ${
                  activeTab === "archive" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab("archive");
                  setPagination({ page: 1, limit: 9 });
                }}
              >
                Archive
              </button>
            </div>
          </div> */}
          {/* <SearchSelect
            onSearchChange={handleSearchChange}
            onSearchAreaChange={handleSearchAreaChange}
          /> */}
          <div className="lineSearch w-100 mb-20">
            <input
              type="text"
              autoComplete="off"
              value={searchString}
              placeholder="Search for Promotions"
              onChange={(e) => {
                setSearchString(e.target.value);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
            />
            <img src={searchIcon} alt="" className="absoluteImage" />
          </div>
          {activeTab === "active" && (
            <>
              <div className="card mb-20">
                <div className="grid3 gap-20 mb-20">
                  <div className="borderRight">
                    <div className="fs-24 fw-700">
                      {
                        activePromotionListSelector?.data?.data
                          ?.promotionSummary?.activePromotion
                      }
                    </div>
                    <div className="fs-14 fw-500">Active Promotions</div>
                  </div>
                  <div className="borderRight">
                    <div className="fs-24 fw-700">
                      $
                      {
                        activePromotionListSelector?.data?.data
                          ?.promotionSummary?.fundAvailable
                      }
                    </div>
                    <div className="fs-14 fw-500">Funds available</div>
                  </div>
                  <div className="borderRight">
                    <div className="fs-24 fw-700">
                      $
                      {
                        activePromotionListSelector?.data?.data
                          ?.promotionSummary?.totalWithdrawFund
                      }
                    </div>
                    <div className="fs-14 fw-500">Funds withdrawn</div>
                  </div>
                </div>
                <div className="btnSecondary btn" onClick={withdrawFund}>
                  Withdraw
                </div>
              </div>
            </>
          )}
          <div className="merchantGrid mb-20">
            {activePromotionListSelector?.data?.data?.records?.length > 0 &&
            activeTab === "active" ? (
              <>
                {activePromotionListSelector?.data?.data?.records?.map(
                  (item, index) => {
                    return (
                      <div
                        className="merchantCard position-relative"
                        key={index}
                      >
                        <div className="p-10">
                          {/* successNailedIt */}
                          <div className="nailedIt  active fs-14 ">
                            {moment(item?.endDate).isBefore(moment()) ? (
                              <>
                                Expired on{" "}
                                {moment(item?.endDate).format("Do MMMM YYYY")}
                              </>
                            ) : (
                              <>
                                <img
                                  src={successNailedIt}
                                  className="successNailedItIcon"
                                  alt=""
                                />
                                <img
                                  src={remainTime}
                                  className="remainTime"
                                  alt=""
                                />{" "}
                                Expires in{" "}
                                {moment(item?.endDate).diff(moment(), "days") >
                                0
                                  ? `${moment(item?.endDate).diff(
                                      moment(),
                                      "days"
                                    )} days`
                                  : moment
                                      .utc(moment(item?.endDate).diff(moment()))
                                      .format("HH:mm:ss")}
                              </>
                            )}
                          </div>

                          <div className="text-center promotionImage mb-28">
                            <img
                              src={
                                item?.brandDetails?.imageUrl?.[0] ||
                                noImageFound
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
                          </div>
                          <div className="fs-14 fw-500 pc">
                            ${item?.merchant?.promotionFund} Promotional Reserve
                          </div>
                        </div>
                        <div className="divider m-0 "></div>
                        <div className="bottomPadding">
                          <div className="mb-16">
                            <div className="fs-14 mb-4">Promoter</div>
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
                          <div>
                            <div className="fs-14 mb-4">SKUs</div>
                            <div className="fs-14 fw-600">
                              {/* {item?.brandDetails?.brandItem?.map(
                                (item) => item?.sku
                              )} */}
                              ${item?.merchant?.retailPrice}
                            </div>
                          </div>
                          {/* <div className="d-flex justify-between align-center gap-10">
                            <div className="fs-14 mb-4">Item Quantity</div>
                            <div className="fs-14 fw-600">
                              {item?.merchant?.quantity}
                            </div>
                          </div>
                          <div className="d-flex justify-between align-center gap-10">
                            <div className="fs-14 mb-4">Nudges Redeemed</div>
                            <div className="fs-14 fw-600">
                              {item?.nudgeRedeemedCount}
                                </div>
                          </div> */}
                          <div className="divider2 m10"></div>
                          <div className="fs-14 mb-10">Depletion progress</div>
                          <div className="range mb-5 pc">
                            <div
                              className="rangePercentage"
                              style={{ width: `${item?.nudgeGoal || 0}%` }}
                            ></div>
                          </div>
                          <div className="fs-12 fw-500 mb-10 pc">
                            {item?.nudgeGoal}%
                          </div>
                          <div className="d-flex mb-6 justify-between align-center gap-10">
                            <div className="fs-12  grey">Retail Price</div>
                            <div className="fs-16 pc fw-500">
                              {/* {item?.brandDetails?.brandItem?.map(
                                    (item) => item?.sku
                                  )} */}
                              ${item?.merchant?.retailPrice}
                            </div>
                          </div>
                          <div className="d-flex mb-6 justify-between align-center gap-10">
                            <div className="fs-12  grey">Item Quantity</div>
                            <div className="fs-16  fw-500">
                              {/* {item?.brandDetails?.brandItem?.map(
                                    (item) => item?.sku
                                  )} */}
                              {item?.merchant?.quantity}
                            </div>
                          </div>
                          <div className="d-flex mb-6 justify-between align-center gap-10">
                            <div className="fs-12  grey">Nudges Redeemed</div>
                            <div className="fs-16  fw-500">
                              {/* {item?.brandDetails?.brandItem?.map(
                                    (item) => item?.sku
                                  )} */}
                              {item?.nudgeRedeemedCount}
                            </div>
                          </div>
                          {/* <div className="fs-14 fw-600">
                                  ${item?.remainingWithdrawFund}
                                </div> */}
                          <div className="d-flex mb-6 justify-between align-center gap-10">
                            <div className="fs-12  grey">
                              Funds Available for pc Withdrawal
                            </div>
                            <div className="fs-16 pc fw-500">
                              {/* {item?.brandDetails?.brandItem?.map(
                                      (item) => item?.sku
                                    )} */}
                              ${item?.remainingWithdrawFund}
                            </div>
                          </div>
                          <div className="divider2"></div>
                          <div
                            className="btn btnSecondary"
                            onClick={() => {
                              navigate("/merchant/create-nudge");
                              localStorage.setItem(
                                "promotionNudgeItem",
                                JSON.stringify(item)
                              );
                            }}
                          >
                            Send Nudges
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </>
            ) : activeTab === "active" ? (
              <div className="noDataFound">No data available</div>
            ) : null}
          </div>
          {activePromotionListSelector?.data?.data?.records?.length > 0 &&
            activeTab === "active" && (
              <div className="d-flex align-center justify-between flexPagination">
                <div className="fs-16">
                  {(() => {
                    const start = (pagination.page - 1) * pagination.limit + 1;
                    const end = Math.min(
                      start +
                        activePromotionListSelector?.data?.data?.records
                          ?.length -
                        1,
                      activePromotionListSelector?.data?.data?.recordsCount
                    );
                    return `Showing ${start} to ${end} of ${activePromotionListSelector?.data?.data?.recordsCount} Promotions`;
                  })()}
                </div>
                <Pagination
                  current={pagination?.page}
                  pageSize={pagination?.limit}
                  total={activePromotionListSelector?.data?.data?.recordsCount}
                  onChange={handlePaginationChange}
                />
              </div>
            )}
          {/* Archive List */}
          <div className="merchantGrid mb-20">
            {archivePromotionListSelector?.data?.data?.records?.length > 0 ? (
              <>
                {archivePromotionListSelector?.data?.data?.records?.map(
                  (item, index) => (
                    <div className="merchantCard position-relative" key={index}>
                      <div className="p-10">
                        <div className="nailedIt active fs-14">
                          {moment(item?.endDate).isBefore(moment()) ? (
                            <>
                              Expired on{" "}
                              {moment(item?.endDate).format("Do MMMM YYYY")}
                            </>
                          ) : (
                            <>
                              Expires in{" "}
                              {moment(item?.endDate).diff(moment(), "days") > 0
                                ? `${moment(item?.endDate).diff(
                                    moment(),
                                    "days"
                                  )} days`
                                : moment
                                    .utc(moment(item?.endDate).diff(moment()))
                                    .format("HH:mm:ss")}
                            </>
                          )}
                        </div>

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
                        </div>
                        <div className="fs-14 fw-500 pc">
                          ${item?.merchant?.promotionFund}Promotional Reserve
                        </div>
                      </div>
                      <div className="divider m-0 "></div>
                      <div className="bottomPadding">
                        <div className="mb-16">
                          <div className="fs-14 mb-4">Supplier/Distributor</div>
                          {/* <div className="fs-14 fw-600">
                            {item?.promotionTitle}{" "}
                          </div> */}
                          <div className="fs-14 fw-600">
                            {item?.creatorName
                              ? item?.creatorName.charAt(0).toUpperCase() +
                                item?.creatorName.slice(1)
                              : ""}
                          </div>
                        </div>
                        <div className="grid2 mb-20">
                          <div>
                            <div className="fs-14 mb-4">Description</div>
                            <div className="fs-14 fw-600">
                              {item?.brandDetails?.brandItem?.map(
                                (item) => item?.description
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="grid2 mb-20">
                          <div>
                            <div className="fs-14 mb-4">SKUs</div>
                            <div className="fs-14 fw-600">
                              {item?.brandDetails?.brandItem?.map(
                                (item) => item?.sku
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="grid2 mb-20">
                          <div>
                            <div className="fs-14 mb-4">MSRP</div>
                            <div className="fs-14 fw-600">
                              ${item?.merchant?.mSRP} per case
                            </div>
                          </div>
                          <div>
                            <div className="fs-14 mb-4">
                              Quantity/Nudge credits
                            </div>
                            {offerPrice[index] !== undefined &&
                            offerPrice[index] !== null ? (
                              <div className="fs-14 fw-600">
                                {isFinite(
                                  item?.merchant?.fundAmount / offerPrice[index]
                                )
                                  ? (
                                      item?.merchant?.fundAmount /
                                      offerPrice[index]
                                    ).toFixed(2)
                                  : (
                                      item?.merchant?.fundAmount /
                                      item?.merchant?.mSRP
                                    ).toFixed(2)}
                              </div>
                            ) : item?.merchant?.retailPrice ? (
                              <div className="fs-14 fw-600">
                                {isFinite(
                                  item?.merchant?.fundAmount /
                                    item?.merchant?.retailPrice
                                )
                                  ? (
                                      item?.merchant?.fundAmount /
                                      item?.merchant?.retailPrice
                                    ).toFixed(2)
                                  : (
                                      item?.merchant?.fundAmount /
                                      item?.merchant?.mSRP
                                    ).toFixed(2)}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        {activeTab === "offer" && (
                          <>
                            <div className="divider2"></div>
                            <div className="w-100 mb-20">
                              <input
                                type="text"
                                // value={searchInput}
                                // onChange={handleSearchInputChange}
                                // defaultValue={item?.merchant?.retailPrice}
                                defaultValue={
                                  offerPrice[index] ||
                                  item?.merchant?.retailPrice
                                } // Use item-specific value
                                onChange={(e) => {
                                  handleOfferPriceChange(e, index);
                                }}
                                placeholder="Enter price"
                                autoComplete="off"
                              />
                            </div>
                          </>
                        )}
                        {activeTab === "active" ? (
                          <div className="btn btnSecondary">Send Nudges</div>
                        ) : activeTab === "offer" ? (
                          <>
                            <div className="d-flex gap-10">
                              <div
                                className={
                                  offerPrice[index] ||
                                  item?.merchant?.retailPrice
                                    ? "btn btnSecondary w-100"
                                    : "btn btnSecondary w-100 disabled"
                                }
                                onClick={() => {
                                  if (
                                    offerPrice[index] ||
                                    item?.merchant?.retailPrice
                                  ) {
                                    handleAction("Denied", item, index);
                                  }
                                }}
                              >
                                Decline
                              </div>
                              <div
                                className={
                                  offerPrice[index] ||
                                  item?.merchant?.retailPrice
                                    ? "btn w-100"
                                    : "btn w-100 disabled"
                                }
                                onClick={() => {
                                  if (
                                    offerPrice[index] ||
                                    item?.merchant?.retailPrice
                                  ) {
                                    handleAction("Accepted", item, index);
                                  }
                                }}
                              >
                                Accept
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  )
                )}
              </>
            ) : activeTab === "offer" || activeTab === "archive" ? (
              <div className="noDataFound">No data available</div>
            ) : null}
          </div>

          {archivePromotionListSelector?.data?.data?.records?.length > 0 &&
            (activeTab === "offer" || activeTab === "archive") && (
              <div className="d-flex align-center justify-between flexPagination">
                <div className="fs-16">
                  {(() => {
                    const start = (pagination.page - 1) * pagination.limit + 1;
                    const end = Math.min(
                      start +
                        archivePromotionListSelector?.data?.data?.records
                          ?.length -
                        1,
                      archivePromotionListSelector?.data?.data?.recordsCount
                    );
                    return `Showing ${start} to ${end} of ${
                      archivePromotionListSelector?.data?.data?.recordsCount
                    } ${
                      activeTab === "offer"
                        ? "Offer Promotions"
                        : "Archived Promotions"
                    }`;
                  })()}
                </div>
                <Pagination
                  current={pagination?.page}
                  pageSize={pagination?.limit}
                  total={archivePromotionListSelector?.data?.data?.recordsCount}
                  onChange={handlePaginationChange}
                />
              </div>
            )}
        </div>
      </div>
      {/* <PromotionDetails
        isOpen={isDetailsOpen}
        toggleDetails={toggleDetails}
        promotionalDetailsData={promotionalDetailsData}
        setIsDetailsOpen = {setIsDetailsOpen}
        activeTab={activeTab}
      /> */}
    </>
  );
};

export default PromotionsList;
