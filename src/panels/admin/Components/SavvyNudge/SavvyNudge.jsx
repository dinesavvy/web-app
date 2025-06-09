import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import coke from "../../../../assets/images/coke.svg";
import addCredits from "../../../../assets/images/addCredits.svg";
import remainTime from "../../../../assets/images/remainTime.svg";
import savvynudge from "../../../../assets/images/savvynudge.svg";
import playbtn from "../../../../assets/images/playbtn.svg";
import { Modal } from "antd";
import SavvyNudgeDetail from "./SavvyNudgeDetail";
import MerchantViewAll from "./MerchantViewAll";
import { useDispatch, useSelector } from "react-redux";
import { savvyNudgesListHandler } from "../../../../redux/action/savvyNudgesList";
import Loader from "../../../../common/Loader/Loader";
import moment from "moment";
import noImageFound from "../../../../assets/images/noImageFound.png";
import { Pagination } from "antd";
import {
  savvyNudgeDetailsAction,
  savvyNudgeDetailsHandler,
} from "../../../../redux/action/savvyNudgeDetails";
import { useCommonMessage } from "../../../../common/CommonMessage";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import CommonPagination from "../../../../common/pagination/CommonPagination";

const getYoutubeId = (url) => {
  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const SavvyNudge = () => {
  const navigate = useNavigate();
  const messageApi = useCommonMessage();
  const [activeTab, setActiveTab] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 12 });

  // Scroll to top when the component mounts
  useScrollToTop([pagination?.page, pagination?.limit]);

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update the active tab
    setPagination({ page: 1, limit: 12 }); // Reset pagination to page 1 when tab changes
  };
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const savvyNudgeDetailsSelector = useSelector(
    (state) => state?.savvyNudgeDetails
  );

  const toggleSidebar = (item) => {
    // If sidebar is already open, just close it without calling API
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
      dispatch(savvyNudgeDetailsAction.savvyNudgeDetailsReset());
      return;
    }

    // Only dispatch API call when opening
    let payload = {
      savvyNudgeId: item?._id,
    };
    dispatch(savvyNudgeDetailsHandler(payload));
  };

  useEffect(() => {
    if (savvyNudgeDetailsSelector?.data?.statusCode === 200) {
      setIsSidebarOpen(true);
    }
  }, [savvyNudgeDetailsSelector]);

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ page, limit: pageSize });
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

  const [isSidebarOpenMerchantViewAll, setIsSidebarOpenMerchantViewAll] =
    useState(false);

  const [merchantInnerDrawer, setMerchantInnerDrawer] = useState([]);

  const toggleSidebarMerchantViewAll = (item) => {
    setMerchantInnerDrawer(item);
    setIsSidebarOpenMerchantViewAll((prevState) => !prevState);
  };

  useEffect(() => {
    if (isSidebarOpenMerchantViewAll) {
      document.body.classList.add("overflow-Hidden");
    } else {
      document.body.classList.remove("overflow-Hidden");
    }
    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-Hidden");
    };
  }, [isSidebarOpenMerchantViewAll]);

  const dispatch = useDispatch();
  const savvyNudgesListSelector = useSelector(
    (state) => state?.savvyNudgesList
  );

  useEffect(() => {
    let payload = {
      page: pagination?.page,
      limit: pagination?.limit,
      searchString: "",
      isActive: activeTab,
    };
    dispatch(savvyNudgesListHandler(payload));
  }, [pagination, activeTab]);

  const foodSupplierLink = (item) => {
    if (item?.foodSupplierLink) {
      window.open(item?.foodSupplierLink, "_blank");
    } else {
      messageApi.open({
        type: "error",
        content: "No food link Found",
      });
    }
  };

  const beverageLink = (item) => {
    if (item?.beverageSupplierLink) {
      window.open(item?.beverageSupplierLink, "_blank");
    } else {
      messageApi.open({
        type: "error",
        content: "No beverage link found",
      });
    }
  };

  return (
    <>
      {(savvyNudgesListSelector?.isLoading ||
        savvyNudgeDetailsSelector?.isLoading) && <Loader />}
      <div className="dashboard">
        <div className="tabPadding">
          <div className="d-flex justify-between align-center mb-20 gap-10 flexsm">
            <div className="fs-24 fw-600">Savvy Nudges</div>
            <div className="position-relative d-flex align-center gap-10">
              <div
                className="gap-8 btnSecondary p16 btn z1"
                onClick={() => navigate("/admin/create-savvy-nudge")}
              >
                <img src={addCredits} alt="addCredits" />
                Create Savvy Nudge
              </div>
            </div>
          </div>

          <div className="tabs-container tab3 tabing mb-20">
            <div className="tabs">
              {["Active", "Inactive"].map((label, index) => {
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
            {savvyNudgesListSelector?.data?.data?.result?.length > 0 ? (
              <>
                {savvyNudgesListSelector?.data?.data?.result?.map(
                  (item, index) => {
                    const videoId = getYoutubeId(item?.youtubeUrl);
                    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                    return (
                      <>
                        <div
                          className="merchantCard bb position-relative"
                          key={index}
                        >
                          <div className="pt-30 d-flex flexColumn h-100">
                            <div className="nailedIt active fs-14">
                              <img
                                src={remainTime}
                                className="remainTime"
                                alt=""
                              />
                              {/* Expires in 5 days */}
                              {moment(item?.expireDate).format("MMMM Do YYYY")}
                            </div>

                            <div
                              className="text-center minsavvynudgevideo"
                              onClick={() =>
                                setActiveVideoUrl(item?.youtubeUrl)
                              }
                            >
                              <img src={playbtn} className="playbtn" alt="" />
                              <img
                                src={thumbnail}
                                alt="Video thumbnail"
                                className="w-100 h-100"
                              />
                              <img
                                src={savvynudge}
                                className="savvynudge"
                                alt=""
                              />
                            </div>

                            <div className="bottomPadding d-flex flexColumn flex1 gap-20 justify-between">
                              <div>
                                <div className="fs-16 fw-700">
                                  {item?.title.charAt(0).toUpperCase() +
                                    item?.title.slice(1).toLowerCase() || "-"}
                                </div>
                                <div className="fs-14">
                                  {/* Get 20% off on all large pizzas today! Limited
                              time offer. */}
                                  {item?.description || "-"}
                                </div>
                                <div className="divider16"></div>

                                <div className="mb-16">
                                  <div className="fs-14 mb-4">Time Frame</div>
                                  <div className="fs-14 fw-600">
                                    {moment(item?.createdAt).format(
                                      "DD/MM/YYYY"
                                    )}{" "}
                                    -{" "}
                                    {moment(item?.expireDate).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </div>
                                </div>

                                <div className="mb-16">
                                  <div className="fs-14 mb-4">
                                    Audience Targeting
                                  </div>
                                  <div className="fs-14 fw-600">
                                    {/* All followers and everyone within 25 mi */}
                                    {item?.audience || "-"}
                                  </div>
                                </div>

                                {/* <div className="mb-16">
                                  <div className="fs-14 mb-4">Merchants</div>
                                  <div className="d-flex gap-8 align-center">
                                    <div className="position-relative d-flex borderImageCollaps">
                                      {item?.merchants
                                        ?.slice(0, 5)
                                        ?.map((itemMerchant, i) => (
                                          <div key={i} className="imageCollaps">
                                            <img
                                              src={item?.details?.logoUrl || noImageFound}
                                              className="w-100 h-100"
                                              alt={item?.title}
                                            />
                                          </div>
                                        ))}
                                    </div>
                                    {item?.merchants?.length > 5 && (
                                      <div
                                        className="cursor-pointer fs-14 fw-600"
                                        onClick={toggleSidebarMerchantViewAll}
                                      >
                                        +{item?.merchants?.length - 5} more
                                      </div>
                                    )}
                                  </div>
                                </div> */}
                                {item?.merchants?.length > 0 && (
                                  <div className="mb-16">
                                    <div className="fs-14 mb-4">Merchants</div>
                                    <div className="d-flex gap-8 align-center">
                                      <div
                                        className="position-relative d-flex borderImageCollaps cursor-pointer"
                                        onClick={() =>
                                          toggleSidebarMerchantViewAll(item)
                                        }
                                      >
                                        {item?.merchants
                                          ?.slice(0, 5)
                                          ?.map((itemMerchant, i) => (
                                            <div
                                              key={i}
                                              className="imageCollaps"
                                            >
                                              <img
                                                src={
                                                  item?.details?.logoUrl ||
                                                  noImageFound
                                                }
                                                className="w-100 h-100"
                                                alt={item?.title}
                                              />
                                            </div>
                                          ))}
                                      </div>
                                      {item?.merchants?.length > 5 && (
                                        <div
                                          className="cursor-pointer fs-14 fw-600"
                                          onClick={() =>
                                            toggleSidebarMerchantViewAll(item)
                                          }
                                        >
                                          +{item?.merchants?.length - 5} more
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}

                                <div>
                                  <div className="fs-14 mb-4">
                                    Buy it from here
                                  </div>
                                  <div className="d-flex align-center fs-14 fw-600">
                                    <a
                                      // href={item?.foodSupplierLink}
                                      onClick={() => foodSupplierLink(item)}
                                      // target="_blank"
                                      className="anchorBlue"
                                    >
                                      Food Link
                                    </a>
                                    <div className="dot"></div>
                                    <a
                                      // href={item?.beverageSupplierLink}
                                      // target="_blank"
                                      onClick={() => beverageLink(item)}
                                      className="anchorBlue"
                                    >
                                      Beverage Link
                                    </a>
                                  </div>
                                </div>

                                <div className="divider16"></div>
                                <div className="d-flex align-center fs-12 justify-between gap-8">
                                  <div
                                    className="anchorBlue"
                                    onClick={() => toggleSidebar(item)}
                                  >
                                    View Ingredients
                                  </div>
                                  <div
                                    className="anchorBlue"
                                    onClick={() => toggleSidebar(item)}
                                  >
                                    Preparation instructions
                                  </div>
                                </div>
                              </div>

                              <div
                                className="btn btnSecondary"
                                onClick={() => toggleSidebar(item)}
                              >
                                View Details
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  }
                )}
              </>
            ) : (
              <div className="noDataFound">No data found</div>
            )}
          </div>

          {savvyNudgesListSelector?.data?.data?.result?.length > 0 && (
            <CommonPagination
              currentPage={pagination?.page}
              pageSize={pagination?.limit}
              totalCount={savvyNudgesListSelector?.data?.data?.recordsCount}
              currentCount={savvyNudgesListSelector?.data?.data?.result?.length}
              onPageChange={handlePaginationChange}
              label="Savvy Nudges"
            />
          )}
        </div>
      </div>

      {/* Modals and Sidebars */}
      <div className="p-6 flex flex-wrap gap-4">
        <Modal
          open={!!activeVideoUrl}
          onCancel={() => setActiveVideoUrl(null)}
          footer={null}
          centered
          destroyOnClose
          className="videoModal"
        >
          {activeVideoUrl && (
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`${activeVideoUrl.replace(
                  "watch?v=",
                  "embed/"
                )}?autoplay=1`}
                title="YouTube Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          )}
        </Modal>
        {savvyNudgeDetailsSelector?.data?.statusCode === 200 && (
          <SavvyNudgeDetail
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            savvyNudgeDetailsSelector={savvyNudgeDetailsSelector}
            // videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          />
        )}

        <MerchantViewAll
          isOpenMerchantViewAll={isSidebarOpenMerchantViewAll}
          toggleSidebarMerchantViewAll={toggleSidebarMerchantViewAll}
          merchantInnerDrawer={merchantInnerDrawer}
        />
      </div>
    </>
  );
};

export default SavvyNudge;
