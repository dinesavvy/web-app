import React, { useEffect, useState } from "react";
import closeRightSidebar from "../../../../assets/images/closeRightSidebar.svg";
import remainTime from "../../../../assets/images/remainTime.svg";
import savvynudge from "../../../../assets/images/savvynudge.svg";
import playbtn from "../../../../assets/images/playbtn.svg";
import arrowUp from "../../../../assets/images/arrow-up.svg";
import noImageFound from "../../../../assets/images/noImageFound.png";
import MerchantViewAll from "./MerchantViewAll";
import { Modal } from "antd";
import moment from "moment";

const SavvyNudgeDetail = ({
  isOpen,
  toggleSidebar,
  videoUrl,
  savvyNudgeDetailsSelector,
}) => {
  const getYouTubeVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };
  const videoId = getYouTubeVideoId(
    savvyNudgeDetailsSelector?.data?.data?.youtubeUrl
  );
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/0.jpg`
    : noImageFound;
  const [openIndex, setOpenIndex] = useState(null);
  const [openIndex2, setOpenIndex2] = useState(null);
  const [isSidebarOpenMerchantViewAll, setIsSidebarOpenMerchantViewAll] =
    useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [merchantInnerDrawer, setMerchantInnerDrawer] = useState([]);

  const toggleSidebarMerchantViewAll = (savvyNudgeDetailsSelector) => {
    setMerchantInnerDrawer(savvyNudgeDetailsSelector?.data?.data);
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

  // const staticData = [
  //   {
  //     businessName: "Olive Garden",
  //     logoUrl: noImageFound,
  //     promotionStatus: "Accepted",
  //     sent: 120,
  //     accepted: 15.99,
  //     declined: 12.99,
  //     redeemed: 500,
  //   },
  //   {
  //     businessName: "Taco Bell",
  //     logoUrl: noImageFound,
  //     promotionStatus: "Accepted",
  //     sent: 80,
  //     accepted: 10.0,
  //     declined: 8.0,
  //     redeemed: 300,
  //   },
  //   {
  //     businessName: "Pizza Hut",
  //     logoUrl: noImageFound,
  //     promotionStatus: "Rejected",
  //     sent: 200,
  //     accepted: 20.0,
  //     declined: 15.5,
  //     redeemed: 750,
  //   },
  // ];
  const staticData2 = [
    {
      businessName: "Ingredients",
      text: savvyNudgeDetailsSelector?.data?.data?.requiredIngredients,
    },
    {
      businessName: "Preparation instructions",
      text: savvyNudgeDetailsSelector?.data?.data?.preparationInstructions,
    },
  ];

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
      {isOpen && <div className="overlay2" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <div className={`rightSidebar ${isOpen ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">Savvy Nudge</div>
          <div className="closeSidebar" onClick={toggleSidebar}>
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowSidebar">
          <div className=" bb position-relative">
            <div className="d-flex flexColumn h-100">
              {/* successNailedIt */}
              <div className="br10 mb-20 sidebarSavvynudge">
                <div className="nailedIt  active fs-14 ">
                  <img src={remainTime} className="remainTime" alt="" />{" "}
                  {moment(
                    savvyNudgeDetailsSelector?.data?.data?.expireDate
                  ).format("MMMM Do YYYY")}
                </div>

                <div
                  className="text-center minsavvynudgevideo "
                  onClick={() =>
                    setActiveVideoUrl(
                      savvyNudgeDetailsSelector?.data?.data?.youtubeUrl
                    )
                  }
                >
                  <img src={playbtn} className="playbtn" alt="" />
                  <img
                    src={thumbnailUrl}
                    alt="Video thumbnail"
                    className="w-100 h-100"
                  />
                  <img src={savvynudge} className="savvynudge" alt="" />
                </div>
              </div>
              <div className=" d-flex flexColumn  flex1 gap-20 justify-between">
                <div>
                  <div className="fs-16 fw-700">
                    {savvyNudgeDetailsSelector?.data?.data?.title
                      .charAt(0)
                      .toUpperCase() +
                      savvyNudgeDetailsSelector?.data?.data?.title
                        .slice(1)
                        .toLowerCase() || "-"}
                  </div>
                  <div className="fs-14">
                    {/* Get 20% off on all large pizzas today! Limited time offer. */}
                    {savvyNudgeDetailsSelector?.data?.data?.description}
                  </div>
                  <div className="divider16"></div>
                  <div className="mb-16">
                    <div className="fs-14 mb-4">Time Frame</div>
                    <div className="fs-14 fw-600">
                      {moment(
                        savvyNudgeDetailsSelector?.data?.data?.createdAt
                      ).format("DD/MM/YYYY")}{" "}
                      -{" "}
                      {moment(
                        savvyNudgeDetailsSelector?.data?.data?.expireDate
                      ).format("DD/MM/YYYY")}
                    </div>
                  </div>
                  <div className="mb-16">
                    <div className="fs-14 mb-4">Audience Targeting</div>
                    <div className="fs-14 fw-600">
                      {/* All followers and everyone within 25 mi */}
                      {savvyNudgeDetailsSelector?.data?.data?.audience || "-"}
                    </div>
                  </div>

                  <div className="">
                    <div className="fs-14 mb-4">Buy it from here</div>
                    <div className="d-flex align-center fs-14 fw-600">
                      <a
                        // href={
                        //   savvyNudgeDetailsSelector?.data?.data
                        //     ?.foodSupplierLink
                        // }
                        // target="_blank"
                        onClick={() =>
                          foodSupplierLink(
                            savvyNudgeDetailsSelector?.data?.data
                          )
                        }
                        className="anchorBlue"
                      >
                        Food Link
                      </a>
                      <div className="dot"></div>
                      <a
                        // href={
                        //   savvyNudgeDetailsSelector?.data?.data
                        //     ?.beverageSupplierLink
                        // }
                        // target="_blank"
                        onClick={() =>
                          beverageLink(savvyNudgeDetailsSelector?.data?.data)
                        }
                        className="anchorBlue"
                      >
                        Beverage Link
                      </a>
                    </div>
                  </div>
                  <div className="divider16"></div>
                  <div className="accordionCustom accordion-custom">
                    {staticData2.map((item, index) => (
                      <>
                        <div
                          className="accordion-item accordionItem customItemAccordian"
                          key={index}
                        >
                          <div
                            className="accordionHeader  fs-22 fw-700"
                            onClick={() =>
                              setOpenIndex2(openIndex2 === index ? null : index)
                            }
                          >
                            <div>{item.businessName}</div>
                            <div className="d-flex align-center gap-16">
                              <div
                                className={`arrow ${
                                  openIndex2 === index ? "open" : ""
                                }`}
                              >
                                <img
                                  src={arrowUp}
                                  alt="arrowUp"
                                  className="arrowUp"
                                />
                              </div>
                            </div>
                          </div>

                          <div
                            className={`accordion-content customContentAccordian ${
                              openIndex2 === index ? "open" : ""
                            }`}
                          >
                            <p className="fs-14">{item?.text}</p>
                          </div>
                        </div>
                        <div className="divider2"></div>
                      </>
                    ))}
                  </div>

                  <div className="d-flex align-center justify-between gap-10 mb-20">
                    <div className="fs-22 fw-700">Merchants</div>
                    {savvyNudgeDetailsSelector?.data?.data?.merchants?.length >=
                      5 && (
                      <div
                        className="pc fs-14 fw-600 cursor-pointer"
                        onClick={() =>
                          toggleSidebarMerchantViewAll(
                            savvyNudgeDetailsSelector
                          )
                        }
                      >
                        View All
                      </div>
                    )}
                  </div>
                  <div className="accordionCustom">
                    {savvyNudgeDetailsSelector?.data?.data?.merchants
                      .slice(0, 5)
                      ?.map((item, index) => (
                        <div className="accordion-item" key={index}>
                          <div
                            className="accordionHeader fs-16 fw-700"
                            onClick={() =>
                              setOpenIndex(openIndex === index ? null : index)
                            }
                          >
                            <div>{item?.details?.businessName}</div>
                            <div className="d-flex align-center gap-16">
                              <div
                                className={`fs-16 fw-600 roi ${
                                  item?.status === "pending"
                                    ? "brandred"
                                    : "green"
                                }`}
                              >
                                {item?.status?.charAt(0).toUpperCase() +
                                  item?.status?.slice(1)}
                              </div>

                              <div
                                className={`arrow ${
                                  openIndex === index ? "open" : ""
                                }`}
                              >
                                <img
                                  src={arrowUp}
                                  alt="arrowUp"
                                  className="arrowUp"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className={`accordion-content ${
                              openIndex === index ? "open" : ""
                            }`}
                          >
                            <div className="imageAccorddian mb-20">
                              <img
                                src={item?.details?.logoUrl || noImageFound}
                                alt="logo"
                                className="h-100 object-cover"
                              />
                            </div>

                            <div className="grid2 ">
                              <div>
                                <div className="fs-14 mb-4">Sent</div>
                                <div className="fs-14 fw-600">
                                  {item?.savvyNudgeSent}
                                </div>
                              </div>
                              <div>
                                <div className="fs-14 mb-4">Accepted:</div>
                                <div className="fs-14 fw-600 greenText">
                                  {/* ${item.accepted} */}
                                  {/* 150/75% */}
                                  {item?.savvyNudgeSent
                                    ? `${item?.savvyNudgeaccepted || 0}/${
                                        item?.savvyNudgeSent
                                      } (${(
                                        (item?.savvyNudgeaccepted /
                                          item?.savvyNudgeSent) *
                                        100
                                      ).toFixed(2)}%)`
                                    : 0}
                                </div>
                              </div>
                              <div>
                                <div className="fs-14 mb-4">Declined:</div>
                                <div className="fs-14 fw-600 brandRed">
                                  {/* ${item.declined} */}
                                  {/* 30/15% */}
                                  {item?.savvyNudgeSent > 0
                                    ? `${item?.savvyNudgedeclined || 0}/${(
                                        (item?.savvyNudgedeclined /
                                          item?.savvyNudgeSent) *
                                        100
                                      ).toFixed(2)}%`
                                    : 0}
                                </div>
                              </div>
                              <div>
                                <div className="fs-14 mb-4">Redeemed</div>
                                <div className="fs-14 fw-600 greyColor">
                                  {/* ${item.redeemed} */}
                                  {/* 20/10% */}
                                  {item?.savvyNudgeSent > 0
                                    ? `${
                                        item?.savvyNudgeSent -
                                        ((item?.savvyNudgeaccepted || 0) +
                                          (item?.savvyNudgedeclined || 0))
                                      }/${(
                                        ((item?.savvyNudgeSent -
                                          ((item?.savvyNudgeaccepted || 0) +
                                            (item?.savvyNudgedeclined || 0))) /
                                          item?.savvyNudgeSent) *
                                        100
                                      ).toFixed(2)}%`
                                    : 0}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
              src={`${activeVideoUrl.replace("watch?v=", "embed/")}?autoplay=1`}
              title="YouTube Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        )}
      </Modal>
      <MerchantViewAll
        isOpenMerchantViewAll={isSidebarOpenMerchantViewAll}
        toggleSidebarMerchantViewAll={toggleSidebarMerchantViewAll}
        merchantInnerDrawer={merchantInnerDrawer}
      />
    </>
  );
};

export default SavvyNudgeDetail;
