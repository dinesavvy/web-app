import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import coke from "../../../../assets/images/coke.svg";
import addCredits from "../../../../assets/images/addCredits.svg";
import remainTime from "../../../../assets/images/remainTime.svg";
import savvynudge from "../../../../assets/images/savvynudge.svg";
import playbtn from "../../../../assets/images/playbtn.svg";
import { Modal } from "antd";
const getYoutubeId = (url) => {
  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};
const SavvyNudge = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(true);
  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update the active tab
  };
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);

  const videoLinks = [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://youtu.be/3JZ_D3ELwOQ",
    "https://www.youtube.com/embed/tgbNymZ7vqY",
  ];
  return (
    <>
      <div className="dashboard">
        <div className="tabPadding">
          <div className="d-flex justify-between align-center mb-20 gap-10 flexsm">
            <div className="fs-24 fw-600">Savvy Nudges</div>
            <div className="position-relative d-flex align-center gap-10">
              <div className="gap-8 btnSecondary p16 btn z1" onClick={()=>navigate("/admin/create-savvy-nudge")}>
                <img src={addCredits} alt="addCredits" />
                Create Savvy Nudge
              </div>
            </div>
          </div>
          <div className="tabs-container tab3 tabing mb-20">
            <div className="tabs">
              <button
                className={`tab-button ${activeTab === true ? "active" : ""}`}
                onClick={() => handleTabClick(true)}
              >
                Active
              </button>
              <button
                className={`tab-button ${activeTab === false ? "active" : ""}`}
                onClick={() => handleTabClick(false)}
              >
                Inactive
              </button>
            </div>
          </div>
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
                        <div className="mb-16">
                          <div className="fs-14 mb-4">Merchants</div>
                          <div className="d-flex gap-8 align-center">
                            <div className="position-relative d-flex borderImageCollaps">
                              <div className="imageCollaps">
                                <img src={coke} className="w-100 h-100" />
                              </div>
                              <div className="imageCollaps">
                                <img src={coke} className="w-100 h-100" />
                              </div>
                              <div className="imageCollaps">
                                <img src={coke} className="w-100 h-100" />
                              </div>
                              <div className="imageCollaps">
                                <img src={coke} className="w-100 h-100" />
                              </div>
                              <div className="imageCollaps">
                                <img src={coke} className="w-100 h-100" />
                              </div>
                            </div>
                            <div className="cursor-pointer fs-14 fw-600">
                              +10 more
                            </div>
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
                      <div className="btn btnSecondary">View Details</div>
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
      </div>
    </>
  );
};

export default SavvyNudge;
