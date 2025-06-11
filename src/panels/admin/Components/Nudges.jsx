import React, { useEffect, useState } from "react";
import searchIcon from "../../../assets/images/searchIcon.svg";
import addCredits from "../../../assets/images/addCredits.svg";
import radioSelected from "../../../assets/images/radioSelected.svg";
import restaurantCard from "../../../assets/images/restaurantCard.png";
import NudgeDetail from "../Components/NudgeDetail";
import {
  merchantListAction,
  merchantsListHandler,
} from "../../../redux/action/merchantsList";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/Loader/Loader";
import { nudgesListHandler } from "../../../redux/action/nudgesList";
import { Pagination } from "antd";
import moment from "moment";
import { nudgesDetailsHandler } from "../../../redux/action/nudgeDetails";
import noImageFound from "../../../assets/images/noImageFound.png";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../../../hooks/useScrollToTop";
import SearchSelect from "./SearchSelect";
import CommonPagination from "../../../common/pagination/CommonPagination";

const Nudges = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({ page: 1, limit: 12 });
  const [nudgePagination, setNudgePagination] = useState({
    page: 1,
    limit: 12,
  });
  const [activeTab, setActiveTab] = useState(true);
  const [nudgeId, setNudgeId] = useState("");
  const [searchString, setSearchString] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const merchantsListSelector = useSelector((state) => state?.merchantsList);
  const nudgesListSelector = useSelector((state) => state?.nudgesList);

  // For Nudge Details Data
  const nudgeDetailsMainSelector = useSelector(
    (state) => state?.nudgeDetailsMain
  );

  // Scroll to top when the component mounts
  useScrollToTop([nudgePagination?.page, nudgePagination?.limit]);

  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update the active tab
    setNudgePagination({ page: 1, limit: 12 });
  };

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ page, limit: pageSize });
    setSelectedValue("");
  };

  const handleNudgePagination = (page, pageSize) => {
    setNudgePagination({ page, limit: pageSize });
  };

  const handleSearchChange = (value) => {
    setSearchString(value);
    setSelectedValue("");
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("overflow-Hidden");
    } else {
      document.body.classList.remove("overflow-Hidden");
    }
    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-Hidden");
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    // if (selectedValue) {
    const fetchNudgesList = () => {
      const payload = {
        locationId: selectedValue?._id,
        page: nudgePagination?.page,
        limit: nudgePagination?.limit,
        searchString: "",
        isActive: activeTab,
      };
      dispatch(nudgesListHandler(payload));
    };
    fetchNudgesList();
    // }
  }, [nudgePagination, activeTab, selectedValue]);

  useEffect(() => {
    const fetchMerchants = () => {
      const payload = {
        page: pagination?.page,
        limit: pagination?.limit,
        timeFrame: "today",
        searchString,
        searchArea: [],
      };
      dispatch(merchantsListHandler(payload));
    };

    fetchMerchants();
  }, [searchString, pagination]);

  const toggleSidebar = (item, index) => {
    setNudgeId(index);
    setIsSidebarOpen((prevState) => !prevState);
    let payload = {
      nudgeId: item?._id,
    };
    dispatch(nudgesDetailsHandler(payload));
  };

  const handleChange = (value) => {
    localStorage.setItem("merchantId", value?._id);
    setSelectedValue(value);
  };

  return (
    <>
      {(merchantsListSelector?.isLoading || nudgesListSelector?.isLoading) && (
        <Loader />
      )}
      <div className="dashboard">
        <div className="tabPadding mb-30">
          <div className="fs-24 fw-600">Nudges</div>
          <div className="divider2"></div>
          {/* <div className="lineSearch w-100 mb-20">
            <input
              type="text"
              name="text"
              placeholder="Search Nudges/Restaurant"
              id="text"
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <img src={searchIcon} alt="" className="absoluteImage" />
          </div> */}
          <div className="mb-20">
            <div className="lineSearch w-100">
              <SearchSelect
                onSearchChange={handleSearchChange}
                // onSearchAreaChange={handleSearchAreaChange}
              />
            </div>
          </div>
          <div className="overflowy">
            <div
              className={
                merchantsListSelector?.data?.data?.records?.length > 0
                  ? "gap-20 nudgeGrid"
                  : "gap-20 nudgeGrid w-100"
              }
            >
              {merchantsListSelector?.data?.data?.records?.length > 0 ? (
                <>
                  {merchantsListSelector?.data?.data?.records?.map((option) => (
                    <label key={option?.value} className="custom-label">
                      <input
                        type="radio"
                        name="option"
                        value={option?.value}
                        checked={selectedValue?._id === option?._id} // Dynamically toggle based on state
                        onChange={() => {
                          handleChange(option);
                          setActiveTab(true);
                          setNudgePagination({ page: 1, limit: 12 });
                        }}
                        autoComplete="off"
                      />
                      <div className="custom-radio-button">
                        <img src={radioSelected} alt="radioSelected" />
                      </div>
                      <div className="radioImage">
                        <img src={option?.logoUrl || noImageFound} alt="" />
                      </div>
                      <div className="radioCafeName">
                        <div>
                          <div className="pc fs-14 fw-500 oneLine">
                            {option?.businessName &&
                              option?.businessName?.charAt(0).toUpperCase() +
                                option?.businessName?.slice(1)}
                          </div>
                          <div className="fs-12 oneLine">
                            {`${option?.address?.addressLine1 || ""} ${
                              option?.address?.addressLine2 || ""
                            } ${
                              option?.address?.administrativeDistrictLevel1 ||
                              ""
                            } ${option?.address?.locality || ""} ${
                              option?.address?.postalCode || ""
                            } ${option?.address?.country || ""}`}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </>
              ) : (
                <div className="noDataFound">No restaurant found</div>
              )}
            </div>
          </div>
          {merchantsListSelector?.data?.data?.records?.length>0 && (
            <>
              <div className="divider2"></div>
              <CommonPagination
                currentPage={pagination?.page}
                pageSize={pagination?.limit}
                totalCount={merchantsListSelector?.data?.data?.recordsCount}
                currentCount={
                  merchantsListSelector?.data?.data?.records?.length
                }
                onPageChange={handlePaginationChange}
                label="Merchants"
              />
            </>
          )}
        </div>

        {selectedValue && (
          <>
            <div className="card">
              <div className="d-flex justify-between align-center gap-20 mb-20 flexmd">
                <div className="fs-24 fw-600">
                  {selectedValue?.businessName.charAt(0).toUpperCase() +
                    selectedValue?.businessName.slice(1)}
                </div>
                <div
                  className="btn btnSecondary p16 gap-8"
                  onClick={() =>
                    navigate("/admin/nudges/template", {
                      state: { dineSavvyNudge: true },
                    })
                  }
                >
                  <img src={addCredits} alt="addCredits" />
                  Create a Nudge
                </div>
              </div>
              <div className="tabs-container tab3 tabing mb-20">
                <div className="tabs">
                  {["Active", "Inactive"]?.map((label, index) => {
                    const isActive = index === 0;
                    return (
                      <button
                        key={label}
                        className={`tab-button ${
                          activeTab === isActive ? "active" : ""
                        }`}
                        onClick={() => handleTabClick(isActive)}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="merchantGrid mb-20">
                {nudgesListSelector?.data?.data?.records?.length > 0 ? (
                  nudgesListSelector?.data?.data?.records?.map(
                    (item, index) => {
                      return (
                        <div
                          className="merchantCard position-relative flexColumn d-flex"
                          key={index}
                        >
                          <div className="position-relative">
                            <img
                              className="w-100 merchantImg"
                              src={item?.photoURL || restaurantCard}
                              alt={item?.title}
                            />
                            <div className="freeAbsolute">
                              <div className="fs-16 fw-700 mb-2">
                                {item?.title}
                              </div>
                              <div className="fs-14">
                                {item?.locationDetails?.address?.addressLine1 +
                                  " " +
                                  item?.locationDetails?.address?.addressLine2 +
                                  " " +
                                  item?.locationDetails?.address
                                    ?.administrativeDistrictLevel1 +
                                  " " +
                                  item?.locationDetails?.address?.locality +
                                  " " +
                                  item?.locationDetails?.address?.postalCode +
                                  " " +
                                  item?.locationDetails?.address?.country}
                              </div>
                            </div>
                          </div>
                          <div className="bottomPadding d-flex flexColumn flex1 gap-20 justify-between">
                            <div>
                              <div className="lightBlack fs-14 mb-20">
                                {item?.message || "-"}
                              </div>
                              <div className="d-flex justify-between align-center gap-20 mb-8">
                                <div className="fs-14 lightBlack ">
                                  Sent date
                                </div>
                                <div className="fs-14 fw-500">
                                  {moment(item?.createdAt).format(
                                    "DD MMMM,YYYY"
                                  )}
                                </div>
                              </div>
                              <div className="d-flex justify-between align-center gap-20 mb-8">
                                <div className="fs-14 lightBlack ">
                                  Expiration date
                                </div>
                                <div className="fs-14 fw-500">
                                  {moment(item?.deactivateAt).format(
                                    "DD MMMM,YYYY"
                                  )}
                                </div>
                              </div>
                              <div className="divider2"></div>
                              <div className="grid2 mb-20">
                                <div>
                                  <div className="fs-14 mb-4 lightBlack">
                                    Recipients:
                                  </div>
                                  <div className="fs-14 fw-600">
                                    {item?.recipientCount}
                                  </div>
                                </div>
                                <div>
                                  <div className="fs-14 mb-4 lightBlack">
                                    Accepted:
                                  </div>
                                  <div className="fs-14 fw-600 gc">
                                    {/* {item?.totalAcceptedFollowerList >0 &&item?.totalAcceptedFollowerList >0 ? ( */}
                                    {item?.totalAcceptedFollowerList > 0 ? (
                                      <>
                                        {item?.totalAcceptedFollowerList}/
                                        {(
                                          (item?.totalAcceptedFollowerList /
                                            item?.recipientCount) *
                                          100
                                        ).toFixed(0)}
                                        %
                                      </>
                                    ) : (
                                      <>0</>
                                    )}
                                    {/* ):(<>0</>)} */}
                                  </div>
                                </div>
                                <div>
                                  <div className="fs-14 mb-4 lightBlack">
                                    Declined:
                                  </div>
                                  <div className="fs-14 fw-600 rc">
                                    {item?.disLikeUserList > 0 ? (
                                      <>
                                        {item?.disLikeUserList}/
                                        {(
                                          (item?.disLikeUserList /
                                            item?.recipientCount) *
                                          100
                                        ).toFixed(0)}
                                        %
                                      </>
                                    ) : (
                                      <>0</>
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <div className="fs-14 mb-4 lightBlack">
                                    No Response
                                  </div>
                                  <div className="fs-14 fw-600 greyColor">
                                    {item?.recipientCount > 0 ? (
                                      <>
                                        {item?.recipientCount -
                                          (item?.totalAcceptedFollowerList +
                                            item?.disLikeUserList)}
                                        /
                                        {(
                                          ((item?.recipientCount -
                                            (item?.totalAcceptedFollowerList +
                                              item?.disLikeUserList)) /
                                            item?.recipientCount) *
                                          100
                                        ).toFixed(2)}
                                        %
                                      </>
                                    ) : (
                                      <>0</>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="btn btnSecondary w-100"
                              onClick={() => toggleSidebar(item, index)}
                            >
                              View Details
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )
                ) : (
                  <div className="noDataFound">No Data Found</div>
                )}
              </div>

              {/* {!selectedValue &&
                merchantsListSelector?.data?.data?.records?.length > 0 && (
                  <CommonPagination
                    currentPage={pagination?.page}
                    pageSize={pagination?.limit}
                    totalCount={merchantsListSelector?.data?.data?.recordsCount}
                    currentCount={
                      merchantsListSelector?.data?.data?.records?.length
                    }
                    onPageChange={handlePaginationChange}
                    label="Merchants"
                  />
                )} */}

              {/* Nudge Pagination */}
              {selectedValue &&
                nudgesListSelector?.data?.data?.records?.length > 0 && (
                  <CommonPagination
                    currentPage={nudgePagination?.page}
                    pageSize={nudgePagination?.limit}
                    totalCount={nudgesListSelector?.data?.data?.recordsCount}
                    currentCount={
                      nudgesListSelector?.data?.data?.records?.length
                    }
                    onPageChange={handleNudgePagination}
                    label="Nudges"
                  />
                )}
            </div>
          </>
        )}
      </div>
      {/* {isSidebarOpen && ( */}
      <NudgeDetail
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        nudgeDetailsMainSelector={nudgeDetailsMainSelector}
        nudgeId={nudgeId}
      />
      {/* )} */}
    </>
  );
};

export default Nudges;
