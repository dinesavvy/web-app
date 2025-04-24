import React, { useEffect, useState } from "react";
import SupportDetail from "./SupportDetail";

const Support = () => {
  const [activeTab, setActiveTab] = useState(true);
  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update the active tab
  };
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
  return (
    <>
      <div className="dashboard">
        <div className="tabPadding">
          <div className="fs-24 fw-600 mb-30">Support Request</div>
          <div className="tabs-container tab3 tabing mb-30">
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
                Resolve
              </button>
            </div>
          </div>
          <div>
            <div className="merchantGrid">
              <div className="cardFollow">
                <div className="d-flex justify-between flexColumn">
                  <div>
                    <div className="d-flex align-center gap-12">
                      <div className="initialName">JW</div>
                      <div>
                        <div className="fw-700">Jenny Wilson</div>
                        <div className="fs-14 fw-300 o5 ">#123456</div>
                      </div>
                    </div>
                    <div className="divider2"></div>
                    <div className="mb-20">
                      <div className="fs-14  mb-16">
                        <div className="lightBlack mb-4">Business name</div>
                        <div className="fw-600">Garden Grove Café & Bistro</div>
                      </div>
                      <div className="fs-14  mb-16">
                        <div className="lightBlack mb-4">Phone number</div>
                        <div className="fw-600">123 456 7890</div>
                      </div>
                      <div className="fs-14  mb-16">
                        <div className="lightBlack mb-4">Email address</div>
                        <div className="fw-600">jennywilson@gmail.com</div>
                      </div>
                    </div>
                  </div>
                  <div className="gridBtn">
                    <div className="btn" onClick={() => toggleSidebar()}>
                      View Details
                    </div>
                    {activeTab === true && (
                      <div className="btnSecondary detailBtn btn">Resolve</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SupportDetail isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Support;
