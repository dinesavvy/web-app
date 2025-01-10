import React, { useCallback, useEffect, useRef, useState } from "react";
import searchIcon from "../../../assets/images/searchIcon.svg";
import addCredits from "../../../assets/images/addCredits.svg";
import radioSelected from "../../../assets/images/radioSelected.svg";
import olive from "../../../assets/images/olive.png";
import restaurantCard from "../../../assets/images/restaurantCard.png";
import NudgeDetail from "../Components/NudgeDetail";
import { merchantsListHandler } from "../../../redux/action/merchantsList";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/Loader/Loader";
import { nudgesListHandler } from "../../../redux/action/nudgesList";
import { Pagination } from "antd";
import moment from "moment";
import { nudgesDetailsHandler } from "../../../redux/action/nudgeDetails";

const Nudges = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 9 });
  const [activeTab, setActiveTab] = useState(true);
  const merchantsListSelector = useSelector((state) => state?.merchantsList);
  const nudgesListSelector = useSelector((state) => state?.nudgesList);

  // For Nudge Details Data
  const nudgeDetailsMainSelector = useSelector(
    (state) => state?.nudgeDetailsMain
  );

  const dispatch = useDispatch();
  const options = [
    { value: "1", label: "Option 1", img: olive },
    { value: "2", label: "Option 2", img: olive },
    { value: "3", label: "Option 3", img: olive },
  ];
  const [page, setPage] = useState(1);
  const scrollContainerRef = useRef(null);
  const [searchString, setSearchString] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  console.log(selectedValue, "selectedValue");
  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update the active tab
  };

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ page, limit: pageSize });
  };

  const handleSearchChange = (value) => {
    setSearchString(value);
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
    const fetchNudgesList = () => {
      const payload = {
        locationId: selectedValue?._id,
        page: pagination.page,
        limit: pagination.limit,
        searchString,
        isActive: activeTab,
      };
      dispatch(nudgesListHandler(payload));
    };
    fetchNudgesList();
  }, [pagination, searchString, activeTab,selectedValue]);

  useEffect(() => {
    const fetchMerchants = () => {
      const payload = {
        page: page,
        limit: 10,
        timeFrame: "today",
        searchString,
      };
      dispatch(merchantsListHandler(payload));
    };

    fetchMerchants();
  }, [searchString, page]);

  const toggleSidebar = (item) => {
    setIsSidebarOpen((prevState) => !prevState);
    let payload = {
      nudgeId: item?._id,
    };
    dispatch(nudgesDetailsHandler(payload));
  };

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  // Check if user scrolled to the end
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (
      container.scrollLeft + container.offsetWidth >=
      container.scrollWidth - 10 // 10px buffer for smoothness
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      {/********************** Empty Content ***********************/}
      {/* <div className="emptyHeight">
        <div className="modal-content">
          <div className="ant-modal-body">
            <div className="modalbg">
              <img src={modalbg} alt="" />
            </div>
            <div className="modalImage mb-30">
              <img src={nudgeEmpty} alt="" />
            </div>
            <div className="text-center mb-30">
              <div className="fs-26 fw-700 mb-15">No Nudge Yet</div>
              <div className="fs-18">
              Create your first promotional nudge to engage with your customers, Start by setting up a new campaign for any of your restaurants.
              </div>
            </div>
            <div className="div d-flex align-center gap-16">
              <div className="btn w-100 gap-8">Create First Nudge <img src={btnArrow} alt="" /></div>
            </div>
          </div>
        </div>
      </div> */}
      {(merchantsListSelector?.isLoading || nudgesListSelector?.isLoading) && (
        <Loader />
      )}
      <div className="dashboard">
        <div className="tabPadding mb-30">
          <div className="fs-24 fw-600">Nudges</div>
          <div className="divider2"></div>
          <div className="lineSearch w-100 mb-20">
            <input
              type="text"
              name="text"
              placeholder="Search Nudges/Restaurant"
              id="text"
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <img src={searchIcon} alt="" className="absoluteImage" />
          </div>
          <div
            className="overflowy"
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            <div
              className={
                merchantsListSelector?.data?.data?.records?.length > 0
                  ? "gap-20 nudgeGrid"
                  : "gap-20 nudgeGrid w-100"
              }
            >
              {merchantsListSelector?.data?.data?.records?.length > 0 ? (
                merchantsListSelector?.data?.data?.records.map((option) => (
                  <label key={option.value} className="custom-label">
                    <input
                      type="radio"
                      name="option"
                      value={option.value}
                      checked={selectedValue?._id === option?._id} // Dynamically toggle based on state
                      onChange={() => handleChange(option)}
                      autoComplete="off"
                    />
                    {console.log(selectedValue, "selectedValue")}
                    <div className="custom-radio-button">
                      <img src={radioSelected} alt="radioSelected" />
                    </div>
                    <div className="radioImage">
                      <img src={option.logoUrl || olive} alt="" />
                    </div>
                    <div className="radioCafeName">
                      <div>
                        <div className="pc fs-14 fw-500">
                          {option?.businessName}
                        </div>
                        <div className="fs-12 oneLine">
                          {option?.address?.addressLine1 +
                            " " +
                            option?.address?.addressLine2 +
                            " " +
                            option?.address?.administrativeDistrictLevel1 +
                            " " +
                            option?.address?.locality +
                            " " +
                            option?.address?.postalCode +
                            " " +
                            option?.address?.country}
                        </div>
                      </div>
                    </div>
                  </label>
                ))
              ) : (
                <div className="no-restaurants-found">No restaurant found</div>
              )}
            </div>
          </div>
        </div>

        {selectedValue && (
          <>
            <div className="card">
              <div className="d-flex justify-between align-center gap-20 mb-20 flexmd">
                <div className="fs-24 fw-600">
                  {selectedValue?.businessName}
                </div>
                {/* <div className="btn btnSecondary p16 gap-8">
              <img src={addCredits} alt="addCredits" />
              Create a Nudge
            </div> */}
              </div>
              <div class="tabs-container tab3 tabing mb-20">
                <div class="tabs">
                  <button
                    className={`tab-button ${
                      activeTab === true ? "active" : ""
                    }`}
                    onClick={() => handleTabClick(true)}
                  >
                    Active
                  </button>
                  <button
                    className={`tab-button ${
                      activeTab === false ? "active" : ""
                    }`}
                    onClick={() => handleTabClick(false)}
                  >
                    Inactive
                  </button>
                </div>
              </div>
              <div className="merchantGrid mb-20">
                {nudgesListSelector?.data?.data?.records?.length > 0 ? (
                  nudgesListSelector?.data?.data?.records?.map(
                    (item, index) => {
                      console.log(item,"itemitemitemitem")
                      return (
                        <div className="merchantCard" key={index}>
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
                          <div className="bottomPadding">
                            <div className="lightBlack fs-14 mb-20">
                              {/* Get 20% off on all large pizzas today! Limited
                              time offer. */}
                              {item?.message}
                            </div>
                            <div className="d-flex justify-between align-center gap-20 mb-8">
                              <div className="fs-14 lightBlack ">Sent date</div>
                              <div className="fs-14 fw-500">
                                {moment(item?.createdAt).format("DD MMMM,YYYY")}
                              </div>
                            </div>
                            <div className="d-flex justify-between align-center gap-20 mb-8">
                              <div className="fs-14 lightBlack ">
                                Expiration date
                              </div>
                              <div className="fs-14 fw-500">
                                {moment(item?.createdAt).format("DD MMMM,YYYY")}
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
                                  {item?.totalAcceptedFollowerList}/
                                  {(
                                    (item?.totalAcceptedFollowerList /
                                      item?.recipientCount) *
                                    100
                                  ).toFixed(0)}
                                  %
                                </div>
                              </div>
                              <div>
                                <div className="fs-14 mb-4 lightBlack">
                                  Declined:
                                </div>
                                <div className="fs-14 fw-600 rc">
                                  {item?.disLikeUserList}/
                                  {(
                                    (item?.disLikeUserList /
                                      item?.recipientCount) *
                                    100
                                  ).toFixed(0)}
                                  %
                                </div>
                              </div>
                              <div>
                                <div className="fs-14 mb-4 lightBlack">
                                  No Response
                                </div>
                                <div className="fs-14 fw-600 greyColor">
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
                                </div>
                              </div>
                            </div>
                            <div
                              className="btn btnSecondary w-100"
                              onClick={() => toggleSidebar(item)}
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
              <div className="d-flex align-center justify-between flexPagination">
                <div className="fs-16">
                  Showing {pagination.page} to {pagination.limit} of{" "}
                  {merchantsListSelector?.data?.data?.recordsCount} Restaurants
                </div>
                <Pagination
                  current={pagination.page}
                  pageSize={pagination.limit}
                  total={merchantsListSelector?.data?.data?.recordsCount}
                  onChange={handlePaginationChange}
                />
              </div>
            </div>
          </>
        )}
      </div>
      {/* {isSidebarOpen && ( */}
      <NudgeDetail
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        nudgeDetailsMainSelector={nudgeDetailsMainSelector}
      />
      {/* )} */}
    </>
  );
};

export default Nudges;
