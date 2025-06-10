import React, { useEffect, useState } from "react";
import btnArrowblue from "../../../assets/images/btnArrowblue.svg";
import searchIcon from "../../../assets/images/searchIcon.svg";
import circleinfo from "../../../assets/images/circleinfo.gif";
import circleAbsolute2 from "../../../assets/images/circleAbsolute2.gif";
import { Pagination } from "antd";
import FollowerDetails from "./FollowerDetails";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { businessFollowerListHandler } from "../../../redux/action/businessAction/businessFollowers";
import Loader from "../../../common/Loader/Loader";
import moment from "moment";
import createAdd from "../../../assets/images/createAdd.svg";
import deleteList from "../../../assets/images/deleteList.svg";
import { followerAnalyticsHandler } from "../../../redux/action/businessAction/followerAnalytics";
import { useBusiness } from "../../../common/Layout/BusinessContext";
import AccessDeniedModal from "../accessDeniedModal/accessDeniedModal";
import RedeemedNudges from "../redeemedNudges/RedeemedNudges";
import useScrollToTop from "../../../hooks/useScrollToTop";
import CommonPagination from "../../../common/pagination/CommonPagination";

const Followers = () => {
  const [tempState, setTempState] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [redeemedNudges, setRedeemedNudges] = useState(false);
  const [followerDetails, setFollowerDetails] = useState();
  const [pagination, setPagination] = useState({ page: 1, limit: 12 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Scroll to top when the component mounts
  useScrollToTop([pagination?.page, pagination?.limit]);

  const { state } = useLocation();

  // When notification type is 35 then open redeemed redeeme nudge drawer and when refresh then reset navigation state
  useEffect(() => {
    if (state?.notificationType === 35) {
      setRedeemedNudges(true);
      // Reset state after setting it
      navigate(window.location.pathname, { replace: true, state: null });
    }
  }, [state, window.location.pathname]);

  const businessListFollowerListSelector = useSelector(
    (state) => state?.businessListFollowerList
  );
  const isAnyCheckboxChecked = Object.values(checkedItems).some(
    (checked) => checked
  );

  // const filteredFollowers =
  //   businessListFollowerListSelector?.data?.data?.records?.filter(
  //     (item) =>
  //       item?.userId?.displayName?.toLowerCase() ||
  //       item?.customerPreferenceData?.personalPreference.includes(
  //         searchQuery.toLowerCase()
  //       )
  //   ) || [];

  // For Ghost Screen
  const { selectedBusiness, setSelectedBusiness } = useBusiness();
  const businessListSelector = useSelector((state) => state?.businessList);

  useEffect(() => {
    if (businessListSelector?.data?.data?.records?.length) {
      const matchedBusiness = businessListSelector?.data?.data?.records?.find(
        (element) => element?._id === selectedBusiness?._id
      );
      if (matchedBusiness) {
        setTempState(matchedBusiness);
      }
    }
  }, [businessListSelector, selectedBusiness]);

  useEffect(() => {
    if (
      (Array.isArray(state?.statePrev?.selectedItems) &&
        state?.statePrev?.selectedItems?.length > 0) ||
      state?.statePrev?.locationId?.locationId
    ) {
      const updatedCheckedItems = {};

      businessListFollowerListSelector?.data?.data?.records?.forEach(
        (item, index) => {
          // Mark as checked if the item is in selectedItems
          const isSelected =
            Array.isArray(state?.statePrev?.selectedItems) &&
            state?.statePrev?.selectedItems?.some(
              (selectedItem) => selectedItem?._id === item?._id
            );
          updatedCheckedItems[index] = isSelected;
        }
      );
      setCheckedItems(updatedCheckedItems);
      setSelectedItems(state?.statePrev?.selectedItems || []); // Ensure selectedItems is an array
    }
  }, [state?.statePrev?.selectedItems, businessListFollowerListSelector]);

  const followerAnalyticsSelector = useSelector(
    (state) => state?.followerAnalytics
  );
  useEffect(() => {
    dispatch(followerAnalyticsHandler());
  }, []);

  const getMerchantBusinessSelector = JSON.parse(
    localStorage.getItem("selectedBusiness")
  );

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ page, limit: pageSize });
  };

  // Checkbox onChange
  const handleCheckboxChange = (index, isChecked, item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: isChecked,
    }));

    if (isChecked) {
      // Add the item to the selectedItems array if not already present
      setSelectedItems((prev) =>
        prev.some((selectedItem) => selectedItem?._id === item?._id)
          ? prev
          : [...prev, item]
      );
    } else {
      // Remove the item from the selectedItems array
      setSelectedItems((prev) =>
        prev.filter((selectedItem) => selectedItem?._id !== item?._id)
      );
    }
  };

  // Delete Selected items
  const handleDelete = () => {
    // Remove from checkedItems
    const updatedCheckedItems = { ...checkedItems };
    Object.keys(checkedItems).forEach((key) => {
      if (checkedItems[key]) {
        delete updatedCheckedItems[key];
      }
    });
    setCheckedItems(updatedCheckedItems);
    // Remove from selectedItems
    const updatedSelectedItems = selectedItems.filter(
      (item, index) => !checkedItems[index]
    );
    setSelectedItems(updatedSelectedItems);
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

  const toggleSidebar = (item) => {
    setIsSidebarOpen((prevState) => !prevState);
    setFollowerDetails(item);
  };

  useEffect(() => {
    let payload = {
      page: pagination?.page,
      limit: pagination?.limit,
      locationId: getMerchantBusinessSelector?.locationId,
      searchString: searchQuery,
    };
    dispatch(businessFollowerListHandler(payload));
  }, [searchQuery, pagination?.page, pagination?.limit]);

  const redeemedNudgeFn = () => {
    setRedeemedNudges(true);
  };
  
  return (
    <>
      {businessListFollowerListSelector?.isLoading && <Loader />}
      {tempState?.roleTitle !== "Owner" &&
      tempState?.roleData?.permissions?.viewFollowers !== 2 ? (
        <AccessDeniedModal />
      ) : (
        <div className="dashboard">
          <div className="grid3 gap-20 mb-30">
            <div className="tabPadding">
              <div className="fs-24 lh1 fw-600">Followers</div>
              <div className="divider2"></div>
              <div class="ring-container blueRing circleinfo ringExpand">
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="ring"></div>
                {/* <img
                    src={circleAbsolute2}
                    className="circleAbsolute"
                    alt=""
                  /> */}
                <div className="fs-34 fw-700 z1">
                  {followerAnalyticsSelector?.data?.data?.followerCount}
                </div>
                <div className="fs-14 z1">to go</div>
              </div>
            </div>
            <div className="tabPadding">
              {/* <div className="fs-24 lh1 fw-600">Nearby</div> */}
              <div className="fs-24 lh1 fw-600">Expected</div>
              <div className="divider2"></div>
              <div class="ring-container circleinfo ring100 ringExpand">
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="ring"></div>
                <div className="fs-34 fw-700 z1">
                  {/* {followerAnalyticsSelector?.data?.data?.nearByFollowerCount} */}
                  {
                    followerAnalyticsSelector?.data?.data
                      ?.nearByRestaurantFollowerCount
                  }
                </div>
              </div>
            </div>
            <div className="tabPadding">
              <div className="fs-24 lh1 fw-600">Loyalty</div>
              <div className="divider2"></div>
              <div class="ring-container blueRing circleinfo ringExpand">
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="ring"></div>
                <div className="fs-34 fw-700 z1">
                  {followerAnalyticsSelector?.data?.data?.loyaltyFollowerCount}
                </div>
                <div className="fs-14 z1">to go</div>
              </div>
            </div>
          </div>
          <div className="d-flex align-center gap-20 mb-30 flex575">
            <div
              className="w-100 btn btnSecondary gap-8 noborderbtn"
              onClick={() => navigate("/merchant/reverse-nudge")}
            >
              Followers needing Nudges <img src={btnArrowblue} alt="" />
            </div>
            <div
              className="w-100 btn btnSecondary gap-8 noborderbtn"
              onClick={() => redeemedNudgeFn()}
            >
              {/* Redeem Nudges <img src={btnArrowblue} alt="" /> */}
              Accepted Nudges <img src={btnArrowblue} alt="" />
            </div>
          </div>
          <div className="tabPadding">
            <div className="fs-24 fw-600 mb-20">All Followers</div>
            <div className="lineSearch w-100 mb-20">
              <input
                type="text"
                autoComplete="off"
                placeholder="Search your Followers"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <img src={searchIcon} alt="" className="absoluteImage" />
            </div>
            <div className="merchantGrid mb-30">
              {businessListFollowerListSelector?.data?.data?.records?.length >
              0 ? (
                businessListFollowerListSelector?.data?.data?.records?.map(
                  (item, index) => {
                    return (
                      <div className="cardFollow" key={index}>
                        <div className="d-flex justify-between gap-12">
                          <div className="d-flex align-center gap-12">
                            <div className="initialName">
                              {item?.userId?.displayName
                                .split(" ")
                                .map((word) => word.charAt(0).toUpperCase())
                                .join("")
                                .slice(0, 2)}
                            </div>
                            <div>
                              <div className="fw-700">
                                {item?.userId?.displayName
                                  ?.charAt(0)
                                  .toUpperCase() +
                                  item?.userId?.displayName?.slice(1)}
                              </div>
                              <div className="fs-14 fw-300 o5">
                                {moment(item?.createdAt).format("MMMM, YYYY")}
                              </div>
                            </div>
                          </div>
                          <div className="custom-checkbox">
                            <label className="checkLabel">
                              <input
                                type="checkbox"
                                checked={checkedItems[index] || false}
                                onChange={(e) =>
                                  handleCheckboxChange(
                                    index,
                                    e.target.checked,
                                    item
                                  )
                                }
                              />
                              <span className="checkmark"></span>
                            </label>
                          </div>
                        </div>
                        <div className="divider2"></div>
                        <div className="fs-14 mb-6">Preferences</div>
                        <div className="flexTag mb-20">
                          {item?.customerPreferenceData?.filterData?.length >
                          0 ? (
                            item?.customerPreferenceData?.filterData?.filter(
                              (item) => item?.trim()
                            ).length > 0 ? (
                              item?.customerPreferenceData?.filterData?.map(
                                (item, index) => {
                                  const trimmedItem = item?.trim();
                                  return trimmedItem ? (
                                    <div key={index}>
                                      {trimmedItem.charAt(0).toUpperCase() +
                                        trimmedItem.slice(1)}
                                    </div>
                                  ) : null;
                                }
                              )
                            ) : (
                              <div>No data available</div>
                            )
                          ) : (
                            <div>No data available</div>
                          )}
                        </div>
                        <div
                          className="btn btnSecondary"
                          onClick={() => toggleSidebar(item)}
                        >
                          View Details
                        </div>
                      </div>
                    );
                  }
                )
              ) : (
                <div className="noDataFound">No Data Found</div>
              )}
            </div>
            {businessListFollowerListSelector?.data?.data?.records?.length > 0 && (
                <CommonPagination
                  currentPage={pagination?.page}
                  pageSize={pagination?.limit}
                  totalCount={businessListFollowerListSelector?.data?.data?.recordsCount}
                  currentCount={
                    businessListFollowerListSelector?.data?.data?.records?.length
                  }
                  onPageChange={handlePaginationChange}
                  label="Followers"
                />
              )}
            {isAnyCheckboxChecked && !state?.statePrev?.selectedItems && (
              <div className="floatAdd">
                <div
                  className="btn fs-16"
                  onClick={() =>
                  {
                    navigate("/merchant/create-nudge", {
                      state: { locationId: state, selectedItems },
                    })
                  }
                  }
                >
                  <img src={createAdd} alt="image" />
                  <div>Create nudge</div>
                </div>
                <div className="h-24 cursor-pointer" onClick={handleDelete}>
                  <img src={deleteList} className="w-100 h-100" alt="" />
                </div>
              </div>
            )}

            {isAnyCheckboxChecked && state?.statePrev?.selectedItems && (
              <div className="floatAdd">
                <div
                  className="btn fs-16"
                  onClick={() =>
                    navigate("/merchant/create-nudge", {
                      state: { locationId: state, selectedItems },
                    })
                  }
                >
                  {/* <img src={createAdd} alt="image" /> */}
                  <div>Continue</div>
                </div>
                <div className="h-24 cursor-pointer" onClick={handleDelete}>
                  <img src={deleteList} className="w-100 h-100" alt="" />
                </div>
              </div>
            )}
          </div>
          <FollowerDetails
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            followerDetails={followerDetails}
            state={state}
          />
          {redeemedNudges && (
            <RedeemedNudges
              redeemedNudges={redeemedNudges}
              setRedeemedNudges={setRedeemedNudges}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Followers;
