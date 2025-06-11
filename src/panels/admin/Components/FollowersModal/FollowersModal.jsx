import React, { useEffect, useState } from "react";
import { followersListHandler } from "../../../../redux/action/followersList";
import { useDispatch, useSelector } from "react-redux";
import resturantIcon from "../../../../assets/images/resturantIcon.svg";
import nudgeIcon from "../../../../assets/images/nudgeIcon.svg";
import backButton from "../../../../assets/images/backButton.svg";
import breadCrumbIcon from "../../../../assets/images/breadCrumb.svg";
import { Breadcrumb, Pagination } from "antd";
import SearchSelect from "../../Components/SearchSelect";
import Loader from "../../../../common/Loader/Loader";
import moment from "moment";
import createAdd from "../../../../assets/images/createAdd.svg";
import deleteList from "../../../../assets/images/deleteList.svg";
import { useNavigate } from "react-router-dom";
import CommonPagination from "../../../../common/pagination/CommonPagination";
import {
  followerArchiveHandler,
} from "../../../../redux/action/followerArchive";

const FollowersModal = ({
  archive,
  setArchive,
  selectedItems,
  setSelectedItems,
  state,
  onConfirm,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchString, setSearchString] = useState("");
  const [pagination, setPagination] = useState({ page: 1, limit: 12 });
  const followerListSelector = useSelector((state) => state?.followeList);

  const [checkedItems, setCheckedItems] = useState({});
  useEffect(() => {
    if (
      state?.selectedItems?.length > 0 &&
      followerListSelector?.data?.data?.records
    ) {
      const initialCheckedItems = {};
      followerListSelector.data.data.records.forEach((item, index) => {
        if (
          state.selectedItems.some(
            (selectedItem) =>
              selectedItem.userInfo?.customerId === item.userInfo?.customerId
          )
        ) {
          initialCheckedItems[index] = true;
        }
      });
      setCheckedItems(initialCheckedItems);
      setSelectedItems(state.selectedItems);
    } else {
      // Reset states when no selected items
      setCheckedItems({});
      setSelectedItems([]);
    }
  }, [state?.selectedItems, followerListSelector?.data?.data?.records]);

  const [searchArea, setSearchArea] = useState([]);

  const followerArchiveSelector = useSelector(
    (state) => state?.followerArchive
  );

  const handleDelete = () => {
    const updatedCheckedItems = { ...checkedItems };
    Object.keys(checkedItems).forEach((key) => {
      if (checkedItems[key]) {
        delete updatedCheckedItems[key];
      }
    });
    setCheckedItems(updatedCheckedItems);
    const updatedSelectedItems = selectedItems.filter(
      (item, index) => !checkedItems[index]
    );
    setSelectedItems(updatedSelectedItems);
  };

  const addToArchiveFollowers = (item) => {
    let payload = {
      status: "InActive", //InActive, Active
      customerId: item?.userInfo?.customerId,
    };
    dispatch(followerArchiveHandler(payload));
  };

  const addToList = (item) => {
    let payload = {
      status: "Active", //InActive, Active
      customerId: item?.userInfo?.customerId,
    };
    dispatch(followerArchiveHandler(payload));
  };

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ page, limit: pageSize });
  };

  const handleSearchChange = (value) => {
    setSearchString(value);
    setCheckedItems({});
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSearchAreaChange = (selectedAreas) => {
    setSearchArea(selectedAreas);
    setCheckedItems({});
  };

  const handleCheckboxChange = (index, isChecked, item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: isChecked,
    }));

    if (isChecked) {
      setSelectedItems((prev) => {
        const exists = prev.some(
          (selectedItem) =>
            selectedItem.userInfo?.customerId === item.userInfo?.customerId
        );
        if (!exists) {
          return [...prev, item];
        }
        return prev;
      });
    } else {
      setSelectedItems((prev) =>
        prev.filter(
          (selectedItem) =>
            selectedItem.userInfo?.customerId !== item.userInfo?.customerId
        )
      );
    }
  };

  const isAnyCheckboxChecked = Object.values(checkedItems).some(
    (checked) => checked
  );

  useEffect(() => {
    // if (activeTab3 === "3") {
    const fetchMerchants = () => {
      const payload = {
        // locationId: localStorage.getItem("merchantId"),
        page: pagination.page,
        limit: pagination.limit,
        status: archive ? "InActive" : "Active",
        searchString,
        searchArea,
      };
      dispatch(followersListHandler(payload));
    };

    fetchMerchants();
    // }
  }, [pagination, searchString, searchArea, archive, followerArchiveSelector]);

  return (
    <>
      {(followerListSelector?.isLoading ||
        followerArchiveSelector?.isLoading) && <Loader />}
      <div className="d-flex justify-between align-center mb-20">
        <div className="fs-24 fw-600">Followers</div>
        <div
          className="btnSecondary btn  secondarysecond"
          onClick={() => {
            setArchive(!archive);
            setPagination({ page: 1, limit: 12 });
          }}
        >
          {archive ? "Back to list" : "Show archive"}
        </div>
      </div>
      {/* <div className="topPadding d-flex justify-between align-center">
        <div
          className="closeSidebar"
          onClick={() => {
            setSelectMerchantList(false);
            setArchive("");
          }}
        >
          <img src={closeRightSidebar} alt="closeRightSidebar" />
        </div>
      </div> */}
      {archive ? (
        <>
          <div className="merchantGrid mb-30">
            {followerListSelector?.data?.data?.records?.length > 0 ? (
              <>
                {followerListSelector?.data?.data?.records?.map(
                  (item, index) => {
                    return (
                      <div className="cardFollow d-flex justify-between h-100 flexColumn" key={index}>
                        <div>
                          <div className="d-flex justify-between gap-12">
                          <div className="d-flex align-center gap-12">
                            <div className="initialName">
                              {item?.userInfo?.displayName.charAt(0) +
                                item?.userInfo?.displayName.charAt(1)}
                            </div>
                            <div>
                              <div className="fw-700">
                                {item?.userInfo?.displayName &&
                                  item.userInfo.displayName
                                    .charAt(0)
                                    .toUpperCase() +
                                    item.userInfo.displayName.slice(1)}
                                <div className="fs-14 fw-300 o5 ">
                                  {item?.userInfo?.email.length > 0
                                    ? item?.userInfo?.email
                                    : "-"}
                                </div>
                              </div>
                              <div className="fs-14 fw-300 o5">
                                {moment(item?.createdAt).format("MMMM,YYYY")}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="divider2"></div>
                        <div className="d-flex justify-between align-center gap-12 fs-14 mt-10">
                          <div className="d-flex align-center gap-12">
                            <img src={resturantIcon} alt="" />
                            Restaurants following:
                          </div>
                          <div className="fw-500">
                            {item?.followerCount || "-"}
                          </div>
                        </div>

                        <div className="d-flex justify-between align-center gap-12 fs-14 mt-10">
                          <div className="d-flex align-center gap-12">
                            <img src={nudgeIcon} alt="" />
                            Nudges shared
                          </div>
                          <div className="fw-500">{item?.nudgeCount}</div>
                        </div>
                        <div className="divider2"></div>
                        <div className="fs-14 mb-6">Preferences</div>
                        <div className="flexTag mb-20">
                          {item?.customerPreferencesData?.personalPreference
                            ?.length > 0 ? (
                            item.customerPreferencesData.personalPreference.map(
                              (preference, index) => (
                                <div key={index}>
                                  {preference.charAt(0).toUpperCase() +
                                    preference.slice(1)}
                                </div>
                              )
                            )
                          ) : (
                            <div>No preferences available</div>
                          )}
                        </div>
                        <div className="divider2"></div>
                        </div>
                        <div className="d-flex gap-10  justify-end flexBtn">
                          <div
                            className="btnSecondary w-100 btn"
                            onClick={() => addToList(item)}
                          >
                            Add to List
                          </div>
                          {/* <div
                            className="btnSecondary w-100 btn"
                            onClick={() => navigateToFollowerDetails(item)}
                          >
                            View Details
                          </div> */}
                        </div>
                      </div>
                    );
                  }
                )}
              </>
            ) : (
              <div className="noDataFound">No data found</div>
            )}
          </div>
        </>
      ) : (
        <div className="tabPadding">
          {/* <div className="d-flex align-center justify-between gap-20 mb-30 flexrightsm">
            <div className="d-flex align-center gap-20 w-100">
              <img
                src={backButton}
                alt=""
                className="cursor-pointer backButton"
                onClick={() => {
                  navigate("/admin/merchant/list");
                }}
              />
              <div>
                <div className="fs-24 fw-600 mb-4">Followers</div>
                <Breadcrumb
                  className="cursor-pointer"
                  separator={<img src={breadCrumbIcon} />}
                  items={[
                    {
                      title: "Merchants",
                      onClick: () => navigate("/admin/merchant/list"),
                    },
                    {
                      title: "Followers",
                    },
                  ]}
                />
              </div>
            </div>
            <div className="text-end">
              <div className="fs-14">Followers</div>
              <div className="fs-26 sc fw-700">
                {followerListSelector?.data?.data?.records?.length}
              </div>
            </div>
          </div> */}
          <SearchSelect
            onSearchChange={handleSearchChange}
            onSearchAreaChange={handleSearchAreaChange}
          />
          <div className="merchantGrid mb-30">
            {followerListSelector?.data?.data?.records?.length > 0 ? (
              followerListSelector?.data?.data?.records?.map((item, index) => (
                <div className="cardFollow d-flex justify-between h-100 flexColumn" key={index}>
                  <div>
                    <div className="d-flex justify-between gap-12">
                    <div className="d-flex align-center gap-12">
                      <div className="initialName">
                        {item?.userInfo?.displayName?.slice(0, 2)}
                      </div>
                      <div>
                        <div className="fw-700">
                          {item?.userInfo?.displayName &&
                            item?.userInfo?.displayName
                              .charAt(0)
                              .toUpperCase() +
                              item?.userInfo?.displayName.slice(1)}
                        </div>
                        <div className="fs-14 fw-300 o5 ">
                          {item?.userInfo?.email.length > 0
                            ? item?.userInfo?.email
                            : "-"}
                        </div>
                        <div className="fs-14 fw-300 o5">
                          {moment(item?.userInfo?.createdAt).format(
                            "MMMM, YYYY"
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="custom-checkbox">
                      <label className="checkLabel">
                        <input
                          type="checkbox"
                          checked={checkedItems[index] || false}
                          onChange={(e) =>
                            handleCheckboxChange(index, e.target.checked, item)
                          }
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                  <div className="divider2"></div>
                  <div className="d-flex justify-between align-center gap-12 fs-14 mb-10">
                    <div className="d-flex align-center gap-12">
                      <img src={resturantIcon} alt="" />
                      Restaurants following:
                    </div>
                    <div className="fw-500">{item?.followerCount}</div>
                  </div>
                  <div className="d-flex justify-between align-center gap-12 fs-14">
                    <div className="d-flex align-center gap-12">
                      <img src={nudgeIcon} alt="" />
                      Nudges shared
                    </div>
                    <div className="fw-500">{item?.nudgeCount}</div>
                  </div>
                  <div className="divider2"></div>
                  <div className="fs-14 mb-6">Preferences</div>
                  <div className="flexTag mb-20">
                    {item?.customerPreferencesData?.personalPreference?.length >
                    0 ? (
                      item.customerPreferencesData.personalPreference.map(
                        (preference, index) => (
                          <div key={index}>{preference}</div>
                        )
                      )
                    ) : (
                      <div>No preferences available</div>
                    )}
                  </div>
                  </div>
                  <div className="d-flex gap-10  justify-end flexBtn">
                    <div
                      className="btnSecondary w-100 btn"
                      onClick={() => addToArchiveFollowers(item)}
                    >
                      Archive
                    </div>
                    {/* <div
                      className="btnSecondary w-100 btn"
                      onClick={() => viewDetails(item)}
                    >
                      View Details
                    </div> */}
                  </div>
                </div>
              ))
            ) : (
              <div className="noDataFound">No data found</div>
            )}
          </div>

          {isAnyCheckboxChecked && (
            <div className="floatAdd">
              <div className="btn fs-16" onClick={onConfirm}>
                <img src={createAdd} alt="image" />
                <div>Create nudge</div>
              </div>
              <div className="h-24 cursor-pointer" onClick={handleDelete}>
                <img src={deleteList} className="w-100 h-100" alt="" />
              </div>
            </div>
          )}
        </div>
      )}
      {/* Follower Modal Pagination */}
      {followerListSelector?.data?.data?.records?.length > 0 && (
        <CommonPagination
          currentPage={pagination?.page}
          pageSize={pagination?.limit}
          totalCount={followerListSelector?.data?.data?.recordsCount}
          currentCount={followerListSelector?.data?.data?.records?.length}
          onPageChange={handlePaginationChange}
          label="Followers"
        />
      )}
    </>
  );
};

export default FollowersModal;
