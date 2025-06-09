import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import coke from "../../../assets/images/coke.svg";
import addCredits from "../../../assets/images/addCredits.svg";
import remainTime from "../../../assets/images/remainTime.svg";
import savvynudge from "../../../assets/images/savvynudge.svg";
import playbtn from "../../../assets/images/playbtn.svg";
import { Modal, Pagination } from "antd";
import SavvyNudgeDetail from "./SavvyNudgeDetail";
import SearchSelect from "../../admin/Components/SearchSelect";
import { useDispatch, useSelector } from "react-redux";
import useScrollToTop from "../../../hooks/useScrollToTop";
import { savvyNudgeListHandler } from "../../../redux/action/businessAction/savvyNudgeList";
import Loader from "../../../common/Loader/Loader";
import {
  savvyNudgeOfferAction,
  savvyNudgeOfferHandler,
} from "../../../redux/action/businessAction/savvyNudgeOffer";
import moment from "moment";
import { useCommonMessage } from "../../../common/CommonMessage";
import SavvyNudgeModal from "./SavvyNudgeModal";
const getYoutubeId = (url) => {
  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};
const SavvyNudge = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({ page: 1, limit: 12 });
  const [searchString, setSearchString] = useState("");
  // const [acceptDeclineModal, setAcceptDeclinedModal] = useState(false);
  // const [acceptModal, setAcceptModal] = useState(false);
  const [modalState, setModalState] = useState({
    isVisible: false,
    actionType: "",
  });

  // Scroll to top when the component mounts
  useScrollToTop([pagination?.page, pagination?.limit]);

  const savvyNudgesListSelector = useSelector((state) => state?.savvyNudgeList);
  console.log(savvyNudgesListSelector, "savvyNudgesListSelector");
  const savvyNudgeOfferSelector = useSelector(
    (state) => state?.savvyNudgeOffer
  );

  const [activeTab, setActiveTab] = useState("active");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    dispatch(savvyNudgeOfferAction.savvyNudgeOfferReset());
    setPagination({ page: 1, limit: 10 });
  };

  const tabs = [
    { id: "active", label: "Active" },
    { id: "offer", label: "Offer", tag: "03" },
    { id: "archive", label: "Archive" },
  ];

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ page, limit: pageSize });
  };

  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
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
  // savvyNudgeListHandler

  const videoLinks = [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://youtu.be/3JZ_D3ELwOQ",
    "https://www.youtube.com/embed/tgbNymZ7vqY",
  ];

  console.log(activeTab, "activeTab");
  useEffect(() => {
    if (activeTab === "active" || activeTab === "archive") {
      let payload = {
        page: pagination?.page,
        limit: pagination?.limit,
        searchString: "",
        isActive: activeTab === "active" ? true : false,
      };
      dispatch(savvyNudgeListHandler(payload));
    } else if (activeTab === "offer") {
      let payload = {
        page: pagination?.page,
        limit: pagination?.limit,
        searchString: searchString,
        // isActive: false,
      };
      dispatch(savvyNudgeOfferHandler(payload));
    }
  }, [pagination, activeTab]);

  console.log(savvyNudgeOfferSelector, "savvyNudgeOfferSelector");

  const messageApi = useCommonMessage();

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

  const handleSearchChange = (value) => {
    setSearchString(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <>
      {(savvyNudgesListSelector?.isLoading ||
        savvyNudgeOfferSelector?.isLoading) && <Loader />}
      <div className="dashboard">
        <div className="tabs-container tab3 tabFull tabing">
          <div className="tabs">
            {tabs?.map(({ id, label, tag }) => (
              <button
                key={id}
                className={`tab-button ${
                  id === "offer"
                    ? "d-flex align-center justify-center gap-8"
                    : ""
                } ${activeTab === id ? "active" : ""}`}
                onClick={() => handleTabClick(id)}
              >
                {label}
                {id === "offer" && activeTab === "offer" && (
                  <div className="tagNumber pc fs-14 fw-500">{tag}</div>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="tabPadding">
          <div className="d-flex justify-between align-center mb-20 gap-10 flexsm">
            <div className="fs-24 fw-600">Savvy Nudges</div>
          </div>
          <SearchSelect
            onSearchChange={handleSearchChange}
            // onSearchAreaChange={handleSearchAreaChange}
          />
          <div className="merchantGrid mb-20">
            {(activeTab === "active" || activeTab === "archive") &&
            savvyNudgesListSelector?.data?.data?.records?.length > 0 ? (
              <>
                {savvyNudgesListSelector?.data?.data?.records?.map((item) => {
                  const videoId = getYoutubeId(item?.youtubeUrl);
                  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

                  return (
                    <div className="merchantCard bb position-relative">
                      <div className="pt-30 d-flex flexColumn h-100">
                        {/* successNailedIt */}
                        <div className="nailedIt  active fs-14 ">
                          <img src={remainTime} className="remainTime" alt="" />{" "}
                          {/* Expires in 5 days */}
                          {moment(item?.expireDate).format("MMMM Do YYYY")}
                        </div>

                        <div
                          className="text-center minsavvynudgevideo"
                          onClick={() => setActiveVideoUrl(url)}
                        >
                          <img src={playbtn} className="playbtn" alt="" />
                          <img
                            src={thumbnail}
                            alt="Video thumbnail"
                            className="w-100 h-100"
                          />
                          <img src={savvynudge} className="savvynudge" alt="" />
                        </div>
                        <div className="bottomPadding d-flex flexColumn  flex1 gap-20 justify-between">
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
                                {/* 10/05/2025 - 15/05/2025 */}
                                {moment(item?.createdAt).format(
                                  "DD/MM/YYYY"
                                )} -{" "}
                                {moment(item?.expireDate).format("DD/MM/YYYY")}
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
                            <div className="">
                              <div className="fs-14 mb-4">Buy it from here</div>
                              <div className="d-flex align-center fs-14 fw-600">
                                <a
                                  // href="#"
                                  onClick={() => foodSupplierLink(item)}
                                  target="_blank"
                                  className="anchorBlue"
                                >
                                  Food Link
                                </a>
                                <div className="dot"></div>
                                <a
                                  // href="#"
                                  onClick={() => beverageLink(item)}
                                  target="_blank"
                                  className="anchorBlue"
                                >
                                  Beverage Link
                                </a>
                              </div>
                            </div>
                            <div className="divider16"></div>
                            <div className="d-flex align-center fs-12 justify-between gap-8">
                              <div className="anchorBlue">View Ingredients</div>
                              <div className="anchorBlue">
                                Preparation instructions
                              </div>
                            </div>
                          </div>
                          {/* {activeTab === "active" ? (
                            <div className="d-flex gap-10">
                              <div
                                className="btn deleteBtn w-100"
                                onClick={() => toggleSidebar()}
                              >
                                End Nudge
                              </div>
                              <div
                                className="btn  w-100"
                                onClick={() => toggleSidebar()}
                              >
                                View Details
                              </div>
                            </div>
                          ) : (
                            <div className="d-flex gap-10">
                              <div
                                className="btn btnSecondary w-100"
                                // onClick={() => handleOpenModal("decline")}
                              >
                                Decline
                              </div>
                              <div
                                className="btn w-100"
                                // onClick={() => setAcceptModal(true)}
                              >
                                Accept
                              </div>
                            </div>
                          )} */}
                          <div className="d-flex">
                            <div
                              className="btn btnSecondary w-100"
                              // onClick={() => handleOpenModal("decline")}
                            >
                              View Details
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : <div className="noDataFound">No data found</div> ? (
              savvyNudgeOfferSelector?.data?.data?.records?.length > 0 ? (
                <>
                  {savvyNudgeOfferSelector?.data?.data?.records?.map((item) => {
                    const videoId = getYoutubeId(item?.youtubeUrl);
                    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

                    return (
                      <div className="merchantCard bb position-relative">
                        <div className="pt-30 d-flex flexColumn h-100">
                          {/* successNailedIt */}
                          <div className="nailedIt  active fs-14 ">
                            <img
                              src={remainTime}
                              className="remainTime"
                              alt=""
                            />{" "}
                            {/* Expires in 5 days */}
                            {moment(item?.expireDate).format("MMMM Do YYYY")}
                          </div>

                          <div
                            className="text-center minsavvynudgevideo"
                            onClick={() => setActiveVideoUrl(item?.youtubeUrl)}
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
                          <div className="bottomPadding d-flex flexColumn  flex1 gap-20 justify-between">
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
                                  {/* 10/05/2025 - 15/05/2025 */}
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
                              <div className="">
                                <div className="fs-14 mb-4">
                                  Buy it from here
                                </div>
                                <div className="d-flex align-center fs-14 fw-600">
                                  <a
                                    onClick={() => foodSupplierLink(item)}
                                    target="_blank"
                                    className="anchorBlue"
                                  >
                                    Food Link
                                  </a>
                                  <div className="dot"></div>
                                  <a
                                    onClick={() => beverageLink(item)}
                                    target="_blank"
                                    className="anchorBlue"
                                  >
                                    Beverage Link
                                  </a>
                                </div>
                              </div>
                              <div className="divider16"></div>
                              <div className="d-flex align-center fs-12 justify-between gap-8">
                                <div className="anchorBlue">
                                  View Ingredients
                                </div>
                                <div className="anchorBlue">
                                  Preparation instructions
                                </div>
                              </div>
                            </div>
                            {/* {activeTab === "active" ? (
                              <div className="d-flex gap-10">
                                <div
                                  className="btn deleteBtn w-100"
                                  // onClick={() => toggleSidebar()}
                                >
                                  End Nudge
                                </div>
                                <div
                                  className="btn  w-100"
                                  onClick={() => toggleSidebar()}
                                >
                                  View Details
                                </div>
                              </div>
                            ) : ( */}
                            <div className="d-flex gap-10">
                              <div
                                className="btn btnSecondary w-100"
                                // onClick={() => toggleSidebar()}
                                // onClick={() => setShowModal("decline")}
                                onClick={() =>
                                  setModalState({
                                    isVisible: true,
                                    actionType: "decline",
                                  })
                                }
                              >
                                Decline
                              </div>
                              <div
                                className="btn w-100"
                                // onClick={() => toggleSidebar()}
                                onClick={() =>
                                  setModalState({
                                    isVisible: true,
                                    actionType: "accept",
                                  })
                                }
                              >
                                Accept
                              </div>
                            </div>
                            {/* )} */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {/* {savvyNudgeOfferSelector?.data?.data?.records?.length >
                  0 && (
                  <div className="d-flex align-center justify-between flexPagination">
                    <div className="fs-16">
                      Showing {pagination?.page} to {pagination?.limit}{" "}
                      of{" "}
                      {
                        savvyNudgeOfferSelector?.data?.data
                          ?.recordsCount
                      }{" "}
                      followers
                    </div>
                    <Pagination
                      current={pagination?.page}
                      pageSize={pagination?.limit}
                      total={
                        savvyNudgeOfferSelector?.data?.data
                          ?.recordsCount
                      }
                      onChange={handlePaginationChange}
                      pageSizeOptions={["12", "20", "50", "100"]}
                      showSizeChanger={true}
                    />
                  </div>
                )} */}
                </>
              ) : (
                <div className="noDataFound">No data found</div>
              )
            ) : null}
          </div>
          {activeTab === "offer" &&
            savvyNudgeOfferSelector?.data?.data?.records?.length > 0 && (
              <div className="d-flex align-center justify-between flexPagination">
                <div className="fs-16">
                  Showing {pagination?.page} to {pagination?.limit} of{" "}
                  {savvyNudgeOfferSelector?.data?.data?.recordsCount} followers
                </div>
                <Pagination
                  current={pagination?.page}
                  pageSize={pagination?.limit}
                  total={savvyNudgeOfferSelector?.data?.data?.recordsCount}
                  onChange={handlePaginationChange}
                  pageSizeOptions={["12", "20", "50", "100"]}
                  showSizeChanger={true}
                />
              </div>
            )}
        </div>
      </div>
      <div className="p-6 flex flex-wrap gap-4">
        {/* Ant Design Modal for Playing Video */}
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
        <SavvyNudgeDetail
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
      </div>
      {/* Savvy Nudge Accept , Decline and end nudge modal */}
      {modalState?.isVisible && (
        <SavvyNudgeModal
          modalState={modalState}
          setModalState={setModalState}
        />
      )}
    </>
  );
};

export default SavvyNudge;
