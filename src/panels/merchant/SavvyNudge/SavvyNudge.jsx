import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import coke from "../../../assets/images/coke.svg";
import addCredits from "../../../assets/images/addCredits.svg";
import remainTime from "../../../assets/images/remainTime.svg";
import savvynudge from "../../../assets/images/savvynudge.svg";
import playbtn from "../../../assets/images/playbtn.svg";
import { Modal } from "antd";
import SavvyNudgeDetail from "./SavvyNudgeDetail";
import SearchSelect from "../../admin/Components/SearchSelect";
const getYoutubeId = (url) => {
  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};
const SavvyNudge = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");
  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update the active tab
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

  

  const videoLinks = [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://youtu.be/3JZ_D3ELwOQ",
    "https://www.youtube.com/embed/tgbNymZ7vqY",
  ];
  return (
    <>
      <div className="dashboard">
        <div className="tabs-container tab3 tabFull tabing">
          <div className="tabs">
            <button
              className={`tab-button ${activeTab === "active" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("active");
              }}
            >
              Active
            </button>

            <button
              className={`tab-button d-flex align-center justify-center gap-8 ${
                activeTab === "offer" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab("offer");
              }}
            >
              Offer{" "}
              {activeTab === "offer" && (
                <div className="tagNumber pc fs-14 fw-500">03</div>
              )}
            </button>
            <button
              className={`tab-button ${
                activeTab === "archive" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab("archive");
              }}
            >
              Archive
            </button>
          </div>
        </div>
        <div className="tabPadding">
          <div className="d-flex justify-between align-center mb-20 gap-10 flexsm">
            <div className="fs-24 fw-600">Savvy Nudges</div>
          </div>
          <SearchSelect />
          <div className="merchantGrid mb-20">
            {videoLinks.map((url) => {
              const videoId = getYoutubeId(url);
              const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

              return (
                <div className="merchantCard bb position-relative">
                  <div className="pt-30 d-flex flexColumn h-100">
                    {/* successNailedIt */}
                    <div className="nailedIt  active fs-14 ">
                      <img src={remainTime} className="remainTime" alt="" />{" "}
                      Expires in 5 days
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
                        <div className="fs-16 fw-700">Title</div>
                        <div className="fs-14">
                          Get 20% off on all large pizzas today! Limited time
                          offer.
                        </div>
                        <div className="divider16"></div>
                        <div className="mb-16">
                          <div className="fs-14 mb-4">Time Frame</div>
                          <div className="fs-14 fw-600">
                            10/05/2025 - 15/05/2025
                          </div>
                        </div>
                        <div className="mb-16">
                          <div className="fs-14 mb-4">Audience Targeting</div>
                          <div className="fs-14 fw-600">
                            All followers and everyone within 25 mi
                          </div>
                        </div>
                        <div className="">
                          <div className="fs-14 mb-4">Buy it from here</div>
                          <div className="d-flex align-center fs-14 fw-600">
                            <a href="#" target="_blank" className="anchorBlue">
                              Food Link
                            </a>
                            <div className="dot"></div>
                            <a href="#" target="_blank" className="anchorBlue">
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
                      {activeTab === "active" ? (
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
                            onClick={() => toggleSidebar()}
                          >
                            Decline
                          </div>
                          <div
                            className="btn w-100"
                            onClick={() => toggleSidebar()}
                          >
                            Accept
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
    </>
  );
};

export default SavvyNudge;
