import React, { useEffect, useState } from "react";
import btnArrowblue from "../../../assets/images/btnArrowblue.svg";
import searchIcon from "../../../assets/images/searchIcon.svg";
import circleinfo from "../../../assets/images/circleinfo.gif";
import circleAbsolute2 from "../../../assets/images/circleAbsolute2.gif";
import { Pagination } from "antd";
import FollowerDetails from "./FollowerDetails";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { businessFollowerListHandler } from "../../../redux/action/businessAction/businessFollowers";
import Loader from "../../../common/Loader/Loader";
import moment from "moment";

const Followers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({ page: 1, limit: 9 });
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getMerchantBusinessSelector = JSON.parse(
    localStorage.getItem("selectedBusiness")
  );

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ page, limit: pageSize });
  };

  const businessListFollowerListSelector = useSelector(
    (state) => state?.businessListFollowerList
  );
  console.log(
    businessListFollowerListSelector,
    "businessListFollowerListSelector"
  );

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

  const [followerDetails, setFollowerDetails] = useState();

  const toggleSidebar = (item) => {
    setIsSidebarOpen((prevState) => !prevState);
    setFollowerDetails(item);
  };

  useEffect(() => {
    let payload = {
      page: pagination.page,
      limit: pagination.limit,
      locationId: getMerchantBusinessSelector?.locationId,
      searchString: searchQuery,
    };
    dispatch(businessFollowerListHandler(payload));
  }, [searchQuery]);

  const filteredFollowers =
    businessListFollowerListSelector?.data?.data?.records?.filter((item) =>
      item.userId.displayName?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <>
      {businessListFollowerListSelector?.isLoading && <Loader />}
      <div className="dashboard">
        <div className="grid3 gap-20 mb-30">
          <div className="tabPadding">
            <div className="fs-24 lh1 fw-600">Followers</div>
            <div className="divider2"></div>
            <div>
              <div className="circleinfo mb-10">
                <img src={circleAbsolute2} className="circleAbsolute" alt="" />
                <div className="fs-34 fw-700 z1">10</div>
                <div className="fs-14 z1">to go</div>
              </div>
            </div>
          </div>
          <div className="tabPadding">
            <div className="fs-24 lh1 fw-600">Nearby</div>
            <div className="divider2"></div>
            <div>
              <div className="circleinfo mb-10">
                <img src={circleinfo} className="circleAbsolute" alt="" />
                <div className="fs-34 fw-700 z1">256</div>
              </div>
            </div>
          </div>
          <div className="tabPadding">
            <div className="fs-24 lh1 fw-600">Loyalty</div>
            <div className="divider2"></div>
            <div>
              <div className="circleinfo mb-10">
                <img src={circleAbsolute2} className="circleAbsolute" alt="" />
                <div className="fs-34 fw-700 z1">15</div>
                <div className="fs-14 z1">to go</div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-center gap-20 mb-30">
          <div
            className="w-100 btn btnSecondary gap-8 noborderbtn"
            onClick={() => navigate("/merchant/reverse-nudge")}
          >
            Your 3 followers need nudges <img src={btnArrowblue} alt="" />
          </div>
          <div className="w-100 btn btnSecondary gap-8 noborderbtn">
            Followers with pending Nudges <img src={btnArrowblue} alt="" />
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
            {filteredFollowers?.map((item, index) => {
              return (
                <>
                  <div className="cardFollow" key={index}>
                    <div className="d-flex justify-between gap-12">
                      <div className="d-flex align-center gap-12">
                        <div className="initialName">
                          {item.userId.displayName
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
                            {moment(item?.createdAt).format("MMMM,YYYY")}
                          </div>
                        </div>
                      </div>
                      <div className="custom-checkbox">
                        <label className="checkLabel">
                          <input type="checkbox" />
                          <span class="checkmark"></span>
                        </label>
                      </div>
                    </div>
                    <div className="divider2"></div>

                    <div className="fs-14 mb-6">Preferences</div>
                    <div className="flexTag mb-20">
                      {item?.customerPreferenceData?.map((item, index) => {
                        return item?.filterData?.length > 0 ? (
                          item.filterData.map((item1, subIndex) => (
                            <div key={`${index}-${subIndex}`}>{item1}</div>
                          ))
                        ) : (
                          <div key={index}>No data available</div>
                        );
                      })}
                    </div>
                    <div
                      className="btn btnSecondary"
                      onClick={() => toggleSidebar(item)}
                    >
                      View Details
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="d-flex align-center justify-between flexPagination">
            {/* <div className="fs-16">Showing 1 to 5 of 10 Restaurants</div> */}
            <div className="fs-16">
              Showing {pagination.page} to {pagination.limit} of{" "}
              {businessListFollowerListSelector?.data?.data?.recordsCount}{" "}
              followers
            </div>
            {/* <Pagination defaultCurrent={1} total={50} /> */}
            <Pagination
              current={pagination.page}
              pageSize={pagination.limit}
              total={businessListFollowerListSelector?.data?.data?.recordsCount}
              onChange={handlePaginationChange}
            />
          </div>
        </div>
        <FollowerDetails
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          followerDetails={followerDetails}
        />
      </div>
    </>
  );
};

export default Followers;
