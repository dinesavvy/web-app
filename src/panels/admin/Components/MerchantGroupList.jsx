import React from "react";
import breadCrumbIcon from "../../../assets/images/breadCrumb.svg";
import backButton from "../../../assets/images/backButton.svg";
import addMerchantIcon from "../../../assets/images/addMerchantIcon.svg";
import searchIcon from "../../../assets/images/searchIcon.svg";
import noImageFound from "../../../assets/images/noImageFound.png";
import countIcon from "../../../assets/images/countIcon.svg";
import countIconRed from "../../../assets/images/countIconRed.svg";
import modalbg from "../../../assets/images/modalbg.png";
import noMerchant from "../../../assets/images/noMerchant.svg";
import btnArrow from "../../../assets/images/btnArrow.svg";
import { Breadcrumb } from "antd";

const MerchantGroupList = () => {
  return (
    <div className="dashboard">
      <div className="tabPadding">
        <div className="mb-20 d-flex align-center justify-between gap-20">
          <div className="d-flex align-center gap-20 w-100">
            <img src={backButton} alt="backButton" className="cursor-pointer backButton" />
            <div>
              <div className="fs-24  mb-4">
                <span className="fw-600"> Group Name</span>{" "}
                <span className="fs-16">(0 Merchants)</span>
              </div>
              <Breadcrumb
                separator={<img src={breadCrumbIcon} />}
                items={[
                  {
                    title: "Groups",
                  },
                  {
                    title: "Groups Details",
                  },
                ]}
              />
            </div>
          </div>
          <div className="btn btnSecondary p16 gap-8">
            Add Merchant
            <img src={addMerchantIcon} alt="addMerchantIcon" />
          </div>
        </div>
        {/* Empty Groups */}
        <div className="emptyHeight2 position-relative">
          <div className="modal-content">
            <div className="ant-modal-body">
              <div className="modalbg">
                <img src={modalbg} alt="" />
              </div>
              <div className="modalImage mb-30">
                <img src={noMerchant} alt="" />
              </div>
              <div className="text-center mb-30">
                <div className="fs-26 fw-700 mb-15">No Merchant’s Yet</div>
                <div className="fs-18">
                  This group doesn’t have any merchant
                </div>
              </div>
              <div className="div d-flex align-center gap-16">
                <div className="btn  w-100 gap-8">
                  {" "}
                  Add Merchant
                  <img src={btnArrow} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lineSearch w-100 mb-20">
          <input
            type="text"
            placeholder="Search Merchants"
            autoComplete="off"
          />
          <img src={searchIcon} alt="" className="absoluteImage" />
        </div>
        <div className="merchantGrid mb-20">
          <div className="merchantCard position-relative">
            <div className="topPadding">
              <div className="merchantImage">
                <img src={noImageFound} alt="" />
              </div>
              <div className="fs-16 fw-700 mb-10">
                Garden Grove Café & Bistro
              </div>
            </div>
            <div className="custom-checkbox merchantCardCheckbox">
              <label className="checkLabel">
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="divider2 m-0"></div>
            <div className="bottomPadding">
              <div className="label greenLabel mb-20">Top performing</div>

              <div className="grid2 mb-20">
                <div>
                  <div className="fs-14 mb-4">Date joined</div>
                  <div className="fs-14 fw-600">Sep 9, 2024</div>
                </div>
                <div>
                  <div className="fs-14 mb-4">Nudge Sent</div>
                  <div className="fs-14 fw-600">196</div>
                </div>
                <div>
                  <div className="fs-14 mb-4">Volume Potential</div>
                  <div className="fs-14 fw-600">89</div>
                </div>
                <div>
                  <div className="fs-14 mb-4">Depletions Potential</div>
                  <div className="fs-14 fw-600">50%</div>
                </div>
                <div>
                  <div className="fs-14 mb-4">Followers added</div>
                  <div className="count">
                    <img src={countIcon} alt="" />
                    45
                  </div>
                </div>
                <div>
                  <div className="fs-14 mb-4">Nudges Accepted</div>
                  <div className="count countred">
                    <img src={countIconRed} alt="" />
                    44
                  </div>
                </div>
              </div>
              <div className="gridBtn">
                <div
                  className="btn disabled"
                >
                  Promote
                </div>
                <div className="btnSecondary detailBtn btn">Details</div>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default MerchantGroupList;
