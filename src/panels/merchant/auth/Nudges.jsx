import React, { useState } from "react";
import addnudge from "../../../assets/images/addnudge.svg";
import addCredits from "../../../assets/images/addCredits.svg";
import searchIcon from "../../../assets/images/searchIcon.svg";
import nudgeImageSub from "../../../assets/images/nudgeImageSub.svg";
import nudgeCardImage from "../../../assets/images/nudgeCardImage.svg";
import deleteMember from "../../../assets/images/deleteMember.svg";
import deleteModal from "../../../assets/images/deleteModal.svg";
import nudgeEmpty from "../../../assets/images/nudgeEmpty.svg";
import btnArrow from "../../../assets/images/btnArrow.svg";
import dish2 from "../../../assets/images/dish2.png";
import modalbg from "../../../assets/images/modalbg.png";
import { Breadcrumb } from "antd";
import PercentageFiller from "./PercentageFiller";
import CommonModal from "./CommonModal";
import ActiveNudge from "./ActiveNudge";

const Nudges = () => {
        const [modal2Open, setModal2Open] = useState(false);
        const [isSidebarOpen, setIsSidebarOpen] = useState(false);
        const toggleSidebar = (item) => {
          setIsSidebarOpen((prevState) => !prevState);
        };
  return (
    <>
      {/* <div className="emptyHeight">
        <div className="modal-content">
          <div className="ant-modal-body">
            <div className="modalbg">
              <img src={modalbg} alt="" />
            </div>
            <div className="modalImage mb-30">
              <img src={nudgeEmpty} alt="" />
            </div>
            <div className="text-center mb-30">
              <div className="fs-26 fw-700 mb-15">Get Nudging, Get Loyalty</div>
              <div className="fs-18">
              Create your first promotional nudge to engage with your customers, Start by setting up a new campaign for any of your restaurants.
              </div>
            </div>
            <div className="div d-flex align-center gap-16">
              <div className="btn w-100 gap-8">Create First Nudge <img src={btnArrow} alt="" /></div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="dashboard">
        <div className="tabPadding mb-30">
          <div className="d-flex align-center justify-between gap-20 mb-20 w-100">
            <div className="fs-24 fw-600 ">Nudges</div>
            <div className="btn btnSecondary p16 gap-8">
              <img src={addCredits} alt="addCredits" />
              Create a Nudge
            </div>
          </div>
          <div className="lineSearch w-100 mb-20">
            <input type="text" placeholder="Search Nudges" />
            <img src={searchIcon} alt="" className="absoluteImage" />
          </div>
          <div className="d-flex align-center justify-between mb-15">
            <div>
              <span className="fw-16">Nudges Goal: </span>
              <span className="fw-700 fs-20">15</span>
            </div>
            <div>
              <span className="fs-14">Sent </span>
              <span className="fs-18 gc fw-700">10</span>
            </div>
          </div>
          <div className="range mb-15">
            <div className="rangePercentage" style={{ width: "50%" }}></div>
          </div>
          <div className="fs-14 fw-500 grey mb-20">
            You are just 50% behind to achieve Goal
          </div>
          {/* <div className="weekNudge pc mb-20">
            <div className="fs-18 fw-600">Nudges Expected This Week</div>
            <div className="fw-700 fs-20">124</div>
          </div> */}
          <div className="card mb-20">
            <div className="fs-20 fw-700 d-flex gap-20 align-center justify-between">
              <div>Nudge Credits</div>
              <div>44</div>
            </div>
            <div className="divider2"></div>
            <div className="d-flex justify-between align-center gap-20 mb-6">
              <div className="fs-16 grey fw-500">Previous balance</div>
              <div className="fs-20 fw-700">30</div>
            </div>
            <div className="d-flex justify-between align-center gap-20 mb-6">
              <div className="fs-16 grey fw-500">Followers added today</div>
              <div className="gc fs-20 fw-700">+7</div>
            </div>
            <div className="d-flex justify-between align-center gap-20">
              <div className="fs-16 grey fw-500">
                Promotional credits added today
              </div>
              <div className="gc fs-20 fw-700">+7</div>
            </div>
            <div className="divider2"></div>
            <div className="d-flex justify-between align-center gap-20 mb-20">
              <div className="fs-16 grey fw-500">Nudge credits needed</div>
              <div className="gc fs-20 fw-700">7</div>
            </div>
            {/* <div className="mb-16">
              <input type="text" placeholder="Enter number of credits" />
            </div> */}
            <div className="d-flex justify-between align-center gap-20 ">
              <div className="d-flex align-center gap-16 flex-wrap">
                <div className="addNudge2 active">5 Nudges</div>
                <div className="addNudge2">10 Nudges</div>
                <div className="addNudge2">15 Nudges</div>
                <div className="addNudge2">20 Nudges</div>
                <div className="addNudge2">25 Nudges</div>
              </div>
              <div className="btn btnSecondary p16 gap-8">
                <img src={addCredits} alt="addCredits" />
                Add Nudge Credits
              </div>
            </div>
          </div>
          <div className="card mb-20">
            <div className="fs-20 fw-700 d-flex gap-20 align-center justify-between">
              <div>Promotional Credits</div>
              <div>$44</div>
            </div>
            <div className="divider2"></div>
            <div className="d-flex justify-between align-center gap-20 mb-6">
              <div className="fs-16 grey fw-500">Previous balance</div>
              <div className="fs-20 fw-700">$30</div>
            </div>
            <div className="d-flex justify-between align-center gap-20 mb-6">
              <div className="fs-16 grey fw-500">Promotions accepted today</div>
              <div className="gc fs-20 fw-700">7</div>
            </div>
            <div className="d-flex justify-between align-center gap-20">
              <div className="fs-16 grey fw-500">
                Promotional credits added today
              </div>
              <div className="gc fs-20 fw-700">$7</div>
            </div>
            <div className="divider2"></div>
            <div className="d-flex justify-between align-center gap-20 mb-20">
              <div className="fs-16 grey fw-500">
                Promotional credits needed
              </div>
              <div className="gc fs-20 fw-700">$7</div>
            </div>
            {/* <div className="mb-16">
              <input type="text" placeholder="Enter number of credits" />
            </div> */}
            <div className="d-flex justify-between align-center gap-20 ">
              <div className="d-flex align-center gap-16 flex-wrap">
                <div className="addNudge2 active">5 Nudges</div>
                <div className="addNudge2">10 Nudges</div>
                <div className="addNudge2">15 Nudges</div>
                <div className="addNudge2">20 Nudges</div>
                <div className="addNudge2">25 Nudges</div>
              </div>
              <div className="btn btnSecondary p16 gap-8">
                <img src={addCredits} alt="addCredits" />
                Add Promotional Credits
              </div>
            </div>
          </div>
          <div className="fs-20 fw-700 mb-10">Top Nudge</div>
          <div className="d-flex gap-20 ">
            <div className="cardNudge w-100">
              <div className="image150 position-relative ">
                <img src={dish2} alt="" className="w-100 h-100" />
                <img src={nudgeImageSub} className="nudgeImageSub" alt="" />
              </div>
              <img src={nudgeCardImage} className="nudgeCardImage" alt="" />
              <div className="nudgePadding w-100">
                <div className="fs-18 fw-700">Dine Savvy</div>
                <div className="fs-14 mb-8">
                  <span className="grey">Get </span>
                  <span className="fw-700">10%</span>
                  <span className="grey"> off at your next visit </span>
                </div>
                <div className="d-flex gap-8 align-center mb-12">
                  <div className="position-relative d-flex">
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                  </div>
                  <div className="fs-14 fw-700 gc">52 people accepted</div>
                </div>
                <div className="TagFull">Valid till 1st September 2024</div>
              </div>
            </div>
            <div className="w-100 card bgGrey d-flex gap-20 align-center">
              <PercentageFiller percentage={50} />
              <div>
                <div className="fs-24 fw-700 mb-8 gc">Hooray! 🎉</div>
                <div className="fs-16">
                  <span className="gc fw-700">85%</span> of people who got the
                  nudge came in!
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tabs-container tab3 tabFull ">
          <div class="tabs">
            <button class="tab-button active">Active Nudges</button>
            <button class="tab-button ">Inactive Nudges</button>
            <button class="tab-button ">Reverse Nudges</button>
          </div>
        </div>
        <div className="tabPadding">
          <div className="merchantGrid mb-20">
            <div className="merchantCard position-relative">
              <div className="">
                <div className="nailedIt active fs-14">12h 20m remaining</div>
                <div className="text-center nudgeCardImage180">
                  <img src={dish2} alt="" className="h-100 w-100" />
                </div>
              </div>
              <div className="bottomPadding">
                <div className="fs-16 fw-700 mb-8">
                Double the Flavor, Half the Price
                </div>
                <div className="fs-14 mb-20">
                Get 20% off on all large pizzas today! Limited time offer.
                </div>
                <div className="d-flex gap-8 align-center mb-20">
                  <div className="position-relative d-flex">
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                  </div>
                  <div className="fs-14 fw-700 gc">52 people accepted</div>
                </div>
                <div className="d-flex gap-10">
                <div className="btn btnSecondary w-100" onClick={() => toggleSidebar()}>View Details</div>
                <div className="btn deleteBtnfull w-100" onClick={() => setModal2Open(true)}>End Nudge</div>
                </div>
              </div>
            </div>
            <div className="merchantCard position-relative">
              <div className="">
                <div className="nailedIt active fs-14">12h 20m remaining</div>
                <div className="text-center nudgeCardImage180">
                  <img src={dish2} alt="" className="h-100 w-100" />
                </div>
              </div>
              <div className="bottomPadding">
                <div className="fs-16 fw-700 mb-8">
                Double the Flavor, Half the Price
                </div>
                <div className="fs-14 mb-20">
                Get 20% off on all large pizzas today! Limited time offer.
                </div>
                <div className="d-flex gap-8 align-center mb-20">
                  <div className="position-relative d-flex">
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                  </div>
                  <div className="fs-14 fw-700 gc">52 people accepted</div>
                </div>
                <div className="d-flex gap-10">
                <div className="btn btnSecondary w-100">View Details</div>
                <div className="btn  w-100">Relaunch</div>
                </div>
              </div>
            </div>
            <div className="merchantCard position-relative">
              <div className="">
                <div className="text-center nudgeCardImage180">
                  <img src={dish2} alt="" className="h-100 w-100" />
                </div>
              </div>
              <div className="bottomPadding">
                <div className="fs-16 fw-700 mb-8">
                Double the Flavor, Half the Price
                </div>
                <div className="fs-14 mb-20">
                Get 20% off on all large pizzas today! Limited time offer.
                </div>
                <div className="d-flex gap-8 align-center mb-20">
                  <div className="position-relative d-flex">
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                    <div className="imageCollaps">
                      <img src={dish2} alt="" className="w-100 h-100" />
                    </div>
                  </div>
                  <div className="fs-14 fw-700 gc">52 people accepted</div>
                </div>
                <div className="d-flex gap-10">
                <div className="btn btnSecondary w-100">View Details</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommonModal modal2Open={modal2Open} setModal2Open={setModal2Open} modalImage={deleteModal}/>
      <ActiveNudge
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    </>
  );
};

export default Nudges;