import React, { useEffect, useState } from "react";
import btnArrowblue from "../../../assets/images/btnArrowblue.svg";
import searchIcon from "../../../assets/images/searchIcon.svg";
import circleinfo from "../../../assets/images/circleinfo.gif";
import circleAbsolute2 from "../../../assets/images/circleAbsolute2.gif";
import { Pagination } from "antd";
import FollowerDetails from "./FollowerDetails";
import { useNavigate } from "react-router-dom";

const Followers = () => {
  const navigate = useNavigate()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    
      const toggleSidebar = (item) => {
        setIsSidebarOpen((prevState) => !prevState);
      };
    
  return (
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
          <div className="fs-24 lh1 fw-600">Followers</div>
          <div className="divider2"></div>
          <div>
            <div className="circleinfo mb-10">
              <img src={circleinfo} className="circleAbsolute" alt="" />
              <div className="fs-34 fw-700 z1">256</div>
            </div>
          </div>
        </div>
        <div className="tabPadding">
          <div className="fs-24 lh1 fw-600">Followers</div>
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
        <div className="w-100 btn btnSecondary gap-8 noborderbtn" onClick={()=>navigate("/merchant/reverse-nudge")}>
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
          />
          <img src={searchIcon} alt="" className="absoluteImage" />
        </div>
        <div className="grid3 mb-30">
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
                  <span class="checkmark"></span>
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
            <div className="btn btnSecondary" onClick={() => toggleSidebar()}>View Details</div>
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
                  <span class="checkmark"></span>
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
            <div className="btn btnSecondary" onClick={() => toggleSidebar()}>View Details</div>
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
                  <span class="checkmark"></span>
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
            <div className="btn btnSecondary" onClick={() => toggleSidebar()}>View Details</div>
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
                  <span class="checkmark"></span>
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
            <div className="btn btnSecondary" onClick={() => toggleSidebar()}>View Details</div>
          </div>
        </div>
        <div className="d-flex align-center justify-between flexPagination">
          <div className="fs-16">Showing 1 to 5 of 10 Restaurants</div>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
      <FollowerDetails
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    </div>
  );
};

export default Followers;
