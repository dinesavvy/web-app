import React, { useEffect, useState } from "react";
import emailCard from "../../../assets/images/emailCard.svg";
import phoneCard from "../../../assets/images/phoneCard.svg";
import archiveImage from "../../../assets/images/archive.svg";
import rearchive from "../../../assets/images/rearchive.svg";
import { Pagination } from "antd";
import CommonToast from "../../../common/toast/CommonToast";
import { useDispatch, useSelector } from "react-redux";
import nudgeIcon from "../../../assets/images/nudgeIcon.svg";

import { followersListHandler } from "../../../redux/action/followersList";
import SearchSelect from "../Components/SearchSelect";
import Loader from "../../../common/Loader/Loader";
import resturantIcon from "../../../assets/images/resturantIcon.svg";

import {
  followerArchiveAction,
  followerArchiveHandler,
} from "../../../redux/action/followerArchive";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Followers = () => {
  const [archive, setArchive] = useState(false);
  const [arr, setArr] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 9 });
  const [searchString, setSearchString] = useState("");
  const [searchArea, setSearchArea] = useState([]);

  const followerListSelector = useSelector((state) => state?.followeList);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ page, limit: pageSize });
  };

  const handleSearchChange = (value) => {
    setSearchString(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSearchAreaChange = (selectedAreas) => {
    setSearchArea(selectedAreas);
  };

  useEffect(() => {
    const fetchMerchants = () => {
      const payload = {
        // locationId: state?._id,
        page: pagination.page,
        limit: pagination.limit,
        status: archive ? "InActive" : "Active",
        searchString,
        searchArea,
      };
      dispatch(followersListHandler(payload));
    };

    fetchMerchants();
  }, [pagination, searchString, searchArea, archive]);

  const followerArchiveSelector = useSelector(
    (state) => state?.followerArchive
  );

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

  useEffect(() => {
    if (followerArchiveSelector?.data?.statusCode === 200) {
      const payload = {
        page: pagination.page,
        limit: pagination.limit,
        status: archive ? "InActive" : "Active",
        searchString,
        searchArea,
      };
      dispatch(followersListHandler(payload));
      dispatch(followerArchiveAction.followerArchiveReset());
    }
  }, [followerArchiveSelector]);

  const navigateToFollowerDetails = (item) => {
    navigate("/admin/followerList/followerDetails", { state: item });
  };

  return (
    <>
      {/*********************** Empty Content ************************/}
      {/* <div className="emptyHeight">
        <div className="modal-content">
          <div className="ant-modal-body">
            <div className="modalbg">
              <img src={modalbg} alt="" />
            </div>
            <div className="modalImage mb-30">
              <img src={follow} alt="" />
            </div>
            <div className="text-center mb-30">
              <div className="fs-26 fw-700 mb-15">Build Your Following</div>
              <div className="fs-18">
              Share your restaurant profile with customers to keep them updated about your latest deals and promotions.
              </div>
            </div>
            <div className="div d-flex align-center gap-16">
              <div className="btn w-100 gap-8">Share Restaurant Profile <img src={btnArrow} alt="" /></div>
            </div>
          </div>
        </div>
      </div> */}
      {(followerListSelector?.isLoading ||
        followerArchiveSelector?.isLoading) && <Loader />}
      <div className="dashboard">
        <div className="tabPadding">
          <div className="d-flex justify-between align-center mb-20">
            <div className="fs-24 fw-600">Followers</div>
            <div
              className="btnSecondary btn  secondarysecond"
              onClick={() => setArchive(!archive)}
            >
              {archive ? "Back to list" : "Show archive"}
            </div>
          </div>
          <div className="mb-20">
            <div className="lineSearch w-100">
              {/* <input
                type="text"
                name="text"
                placeholder="Search for Consumer by Name"
                id="text"
              />
              <img src={searchIcon} alt="" className="absoluteImage" /> */}
              <SearchSelect
                onSearchChange={handleSearchChange}
                onSearchAreaChange={handleSearchAreaChange}
              />
            </div>
          </div>
          {archive ? (
            <div className="merchantGrid mb-30">
              {followerListSelector?.data?.data?.records?.map((item, index) => {
                return (
                  <div className="cardFollow" key={index}>
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
                          </div>
                          <div className="fs-14 fw-300 o5">
                            {moment(item?.createdAt).format("MMMM,YYYY")}
                          </div>
                        </div>
                      </div>
                      {/* <div className="custom-checkbox">
                    <label className="checkLabel">
                      <input
                        type="checkbox"
                        onClick={() =>
                          setArr((prevState) => [...prevState, "1"])
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div> */}
                    </div>
                    <div className="divider2"></div>
                    {/* {item?.userInfo?.email && ( */}
                    <div className="d-flex align-center gap-12 mb-10">
                      <img src={emailCard} alt="" />
                      <div className="fs-14">
                        {item?.userInfo?.email || "-"}
                      </div>
                    </div>
                    {/* )} */}
                    {/* {item?.userInfo?.phoneNumber !== "" && ( */}
                    <div className="d-flex align-center gap-12">
                      <img src={phoneCard} alt="" />
                      <div className="fs-14">
                        {item?.userInfo?.phoneNumber || "-"}
                      </div>
                    </div>
                    <div className="d-flex justify-between align-center gap-12 fs-14 mt-10">
                      <div className="d-flex align-center gap-12">
                        <img src={resturantIcon} alt="" />
                        Restaurants following:
                      </div>
                      <div className="fw-500">{item?.followerCount || "-"}</div>
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
                            <div key={index}>{preference}</div>
                          )
                        )
                      ) : (
                        <div>No preferences available</div>
                      )}
                    </div>

                    {/* )} */}
                    <div className="divider2"></div>
                    <div className="d-flex gap-10 mt-20 justify-end flexBtn">
                      <div
                        className="btnSecondary w-100 btn"
                        onClick={() => addToList(item)}
                      >
                        Add to List
                      </div>
                      <div
                        className="btnSecondary w-100 btn"
                        onClick={() => navigateToFollowerDetails(item)}
                      >
                        View Details
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="merchantGrid mb-30">
              {followerListSelector?.data?.data?.records?.length > 0 ? (
                followerListSelector?.data?.data?.records?.map(
                  (item, index) => {
                    return (
                      <div className="cardFollow" key={index}>
                        <div className="d-flex justify-between gap-12">
                          <div className="d-flex align-center gap-12">
                            <div className="initialName">
                              {item?.userInfo?.displayName.charAt(0) +
                                item?.userInfo?.displayName.charAt(1)}
                            </div>
                            <div>
                              <div className="fw-700">
                                {/* {item?.userInfo?.displayName} */}
                                {item?.userInfo?.displayName &&
                                  item.userInfo.displayName
                                    .charAt(0)
                                    .toUpperCase() +
                                    item.userInfo.displayName.slice(1)}
                              </div>
                              <div className="fs-14 fw-300 o5">
                                {moment(item?.createdAt).format("MMMM,YYYY")}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="divider2"></div>
                        {/* {item?.userInfo?.email && ( */}
                        <div className="d-flex align-center gap-12 mb-10">
                          <img src={emailCard} alt="" />
                          <div className="fs-14">
                            {item?.userInfo?.email || "-"}
                          </div>
                        </div>
                        {/* )} */}
                        {/* {item?.userInfo?.phoneNumber && ( */}
                        <div className="d-flex align-center gap-12">
                          <img src={phoneCard} alt="" />
                          <div className="fs-14">
                            {item?.userInfo?.phoneNumber || "-"}
                          </div>
                        </div>
                        {/* )} */}
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
                                <div key={index}>{preference}</div>
                              )
                            )
                          ) : (
                            <div>No preferences available</div>
                          )}
                        </div>
                        <div className="divider2"></div>
                        <div className="d-flex gap-10 mt-20 justify-end flexBtn">
                          <div
                            className="btnSecondary w-100 btn"
                            onClick={() => addToArchiveFollowers(item)}
                          >
                            Archive
                          </div>
                          <div
                            className="btnSecondary w-100 btn"
                            onClick={() => navigateToFollowerDetails(item)}
                          >
                            View Details
                          </div>
                        </div>
                      </div>
                    );
                  }
                )
              ) : (
                <div className="no-data-found">No data found</div>
              )}
            </div>
          )}
          <div className="d-flex align-center justify-between flexPagination">
            <div className="fs-16">
              Showing {pagination.page} to {pagination.limit} of{" "}
              {followerListSelector?.data?.data?.recordsCount} Restaurants
            </div>
            <Pagination
              current={pagination.page}
              pageSize={pagination.limit}
              total={followerListSelector?.data?.data?.recordsCount}
              onChange={handlePaginationChange}
            />
          </div>
        </div>
      </div>
      {arr?.length ? (
        <CommonToast
          image={archive ? rearchive : archiveImage}
          text={archive ? "Remove from Archive" : "Add to Archive"}
        />
      ) : null}
    </>
  );
};

export default Followers;
