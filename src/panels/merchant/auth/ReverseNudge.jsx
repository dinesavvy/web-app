import React, { useEffect, useState } from "react";
import breadCrumbIcon from "../../../assets/images/breadCrumb.svg";
import backButton from "../../../assets/images/backButton.svg";
import { Breadcrumb, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import FollowerDetails from "./FollowerDetails";
import { useDispatch, useSelector } from "react-redux";
import { reverseNudgeListHandler } from "../../../redux/action/businessAction/businessReverseNudgeList";
import noImageFound from "../../../assets/images/noImageFound.png";
import { businessNudgeDetailsHandler } from "../../../redux/action/businessAction/businessNudgeDetails";
import Loader from "../../../common/Loader/Loader";
import ReverseNudgeDrawer from "../reverseNudgeDrawer/ReverseNudgeDrawer";
import { reverseNudgeHandler } from "../../../redux/action/businessAction/reverseNudgeDetails";

const ReverseNudge = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 12 });

  const reverseNudgListSelector = useSelector(
    (state) => state?.reverseNudgList
  );
  const businessNudgeDetailsSelector = useSelector(
    (state) => state?.businessNudgeDetails
  );
  const reverseNudgeSelector = useSelector((state) => state?.reverseNudge);
  const reverseNudgeStatusUpdateSelector = useSelector(
    (state) => state?.reverseNudgeStatusUpdate
  );

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ page, limit: pageSize });
  };

  const getSelectedBusiness = JSON.parse(
    localStorage.getItem("selectedBusiness")
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

  useEffect(() => {
    dispatch(
      reverseNudgeListHandler({
        page: pagination.page,
        limit: pagination.limit,
        locationId: getSelectedBusiness?._id,
      })
    );
  }, [pagination, reverseNudgeStatusUpdateSelector]);

  const toggleSidebar = (item) => {
    let payload = {
      nudgeId: item?._id,
      locationId: getSelectedBusiness?._id,
    };
    dispatch(reverseNudgeHandler(payload));
  };

  useEffect(() => {
    if (reverseNudgeSelector?.data?.statusCode === 200) {
      setIsSidebarOpen((prevState) => !prevState);
    }
  }, [reverseNudgeSelector]);

  return (
    <>
      {(reverseNudgListSelector?.isLoading ||
        reverseNudgeSelector?.isLoading) && <Loader />}
      <div className="dashboard">
        <div className="tabPadding mb-30">
          <div className="d-flex align-center gap-20 mb-20 w-100">
            <img
              src={backButton}
              alt="backButton"
              className="cursor-pointer backButton"
              onClick={() => navigate("/merchant/followers")}
            />
            <div>
              <div className="fs-24 fw-600 mb-4">Reverse Nudges</div>
              <Breadcrumb
                separator={<img src={breadCrumbIcon} />}
                items={[
                  {
                    title: "Follower",
                  },
                  {
                    title: "Send Nudges",
                  },
                ]}
              />
            </div>
          </div>
          <div className="merchantGrid mb-20">
            {reverseNudgListSelector?.data?.data?.records?.length > 0 ? (
              <>
                {reverseNudgListSelector?.data?.data?.records?.map(
                  (item, index) => {
                    return (
                      <div
                        className="merchantCard position-relative flexColumn d-flex"
                        key={item?.id}
                      >
                        <div>
                          <div className="text-center nudgeCardImage180">
                            <img
                              // src={noImageFound}
                              src={item?.photoURL}
                              alt=""
                              className="h-100 w-100"
                            />
                          </div>
                        </div>
                        <div className="bottomPadding d-flex flexColumn flex1 gap-20 justify-between">
                          <div>
                            <div className="fs-16 fw-700 mb-8">
                              {item?.title}
                            </div>
                            <div className="fs-14 mb-20">{item?.message}</div>
                            <div className="d-flex gap-8 align-center mb-20">
                              <div className="position-relative d-flex">
                                {item?.reversNudgeUserList?.map(
                                  (itemFollower, index) => (
                                    <div className="imageCollaps" key={index}>
                                      <img
                                        // src={itemFollower?.photoURL}
                                        src={noImageFound}
                                        alt={item?.title}
                                        className="w-100 h-100"
                                      />
                                    </div>
                                  )
                                )}
                              </div>
                              {item?.reversNudgeUserList?.length > 0 && (
                                <div className="fs-14 fw-700 gc">
                                  {item?.reversNudgeUserList?.length} people
                                  accepted
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="d-flex gap-10">
                            <div
                              className="btn btnSecondary w-100"
                              onClick={() => toggleSidebar(item)}
                            >
                              View Details
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </>
            ) : (
              <div className="noDataFound">No data available</div>
            )}

            {/* <div className="cardFollow">
            <div className="d-flex justify-between gap-12">
              <div className="d-flex align-center gap-12">
                <div className="initialName">dr</div>
                <div>
                  <div className="fw-700">Dianne Russell</div>
                  <div className="fs-14 fw-300 o5">June, 2024</div>
                </div>
              </div>
              <div className="custom-checkbox">
                <label className="checkLabel">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
            <div className="divider2"></div>

            <div className="fs-14 mb-6">Preferences</div>
            <div className="flexTag mb-20">
              <div>Wine</div>
              <div>Steak, Bar</div>
              <div>Drinks</div>
              <div>Weight Watchers</div>
              <div>Casual Dining</div>
            </div>
            <div className="btn btnSecondary" onClick={() => toggleSidebar()}>
              View Details
            </div>
          </div>
          <div className="cardFollow">
            <div className="d-flex justify-between gap-12">
              <div className="d-flex align-center gap-12">
                <div className="initialName">dr</div>
                <div>
                  <div className="fw-700">Dianne Russell</div>
                  <div className="fs-14 fw-300 o5">June, 2024</div>
                </div>
              </div>
              <div className="custom-checkbox">
                <label className="checkLabel">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
            <div className="divider2"></div>

            <div className="fs-14 mb-6">Preferences</div>
            <div className="flexTag mb-20">
              <div>Wine</div>
              <div>Steak, Bar</div>
              <div>Drinks</div>
              <div>Weight Watchers</div>
              <div>Casual Dining</div>
            </div>
            <div className="btn btnSecondary" onClick={() => toggleSidebar()}>
              View Details
            </div>
          </div>
          <div className="cardFollow">
            <div className="d-flex justify-between gap-12">
              <div className="d-flex align-center gap-12">
                <div className="initialName">dr</div>
                <div>
                  <div className="fw-700">Dianne Russell</div>
                  <div className="fs-14 fw-300 o5">June, 2024</div>
                </div>
              </div>
              <div className="custom-checkbox">
                <label className="checkLabel">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
            <div className="divider2"></div>

            <div className="fs-14 mb-6">Preferences</div>
            <div className="flexTag mb-20">
              <div>Wine</div>
              <div>Steak, Bar</div>
              <div>Drinks</div>
              <div>Weight Watchers</div>
              <div>Casual Dining</div>
            </div>
            <div className="btn btnSecondary" onClick={() => toggleSidebar()}>
              View Details
            </div>
          </div> */}
          </div>
          {/* <div className="d-flex align-center justify-between flexPagination">
          <div className="fs-16">Showing 1 to 5 of 10 Nudges</div>
          <Pagination defaultCurrent={1} total={50} />
        </div> */}
          {reverseNudgListSelector?.data?.data?.records?.length > 0 && (
            <div className="d-flex align-center justify-between flexPagination mt-20">
              <div className="fs-16">
                {(() => {
                  const start = (pagination.page - 1) * pagination.limit + 1;
                  const end = Math.min(
                    start +
                      reverseNudgListSelector?.data?.data?.records?.length -
                      1,
                    reverseNudgListSelector?.data?.data?.recordsCount
                  );
                  return `Showing ${start} to ${end} of ${reverseNudgListSelector?.data?.data?.recordsCount} Nudges`;
                })()}
              </div>
              <Pagination
                current={pagination.page}
                pageSize={pagination.limit}
                total={reverseNudgListSelector?.data?.data?.recordsCount}
                onChange={handlePaginationChange}
              />
            </div>
          )}
        </div>
        {/* {isSidebarOpen && (
          <MerchantNudgeDetails
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            businessNudgeDetailsSelector={businessNudgeDetailsSelector}
          />
        )} */}
        <ReverseNudgeDrawer
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
          businessNudgeDetailsSelector={businessNudgeDetailsSelector}
          reverseNudgeSelector={reverseNudgeSelector}
        />
      </div>
    </>
  );
};

export default ReverseNudge;
