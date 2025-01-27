import React, { useEffect, useState } from "react";
import breadCrumbIcon from "../../../assets/images/breadCrumb.svg";
import backButton from "../../../assets/images/backButton.svg";
import { Breadcrumb, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import FollowerDetails from "./FollowerDetails";

const ReverseNudge = () => {
  const navigate = useNavigate();
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
      <div className="tabPadding mb-30">
        <div className="d-flex align-center gap-20 mb-20 w-100">
          <img
            src={backButton}
            alt="backButton"
            className="cursor-pointer"
            onClick={() => navigate("/admin/brands")}
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
          <div className="btn btnSecondary" onClick={() => toggleSidebar()}>
            View Details
          </div>
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

export default ReverseNudge;
