import React from "react";
import closeRightSidebar from "../../../../assets/images/closeRightSidebar.svg";
import importIcon from "../../../../assets/images/importIcon.svg";
const SupportDetail = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {isOpen && <div className="overlay2" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <div className={`rightSidebar ${isOpen ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">Detail View</div>
          <div className="closeSidebar" onClick={toggleSidebar}>
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowSidebar">
          <div className="d-flex align-center gap-12 mb-18">
            <div className="initialName">JW</div>
            <div>
              <div className="fw-700">Jenny Wilson</div>
              <div className="fs-14 fw-300 o5 ">#123456</div>
            </div>
          </div>
        
          <div className="mb-40">
            <div className="fs-14">
              <div className="lightBlack mb-4">Business name</div>
              <div className="fw-600">Garden Grove Café & Bistro</div>
            </div>
            <div className="divider18"></div>
            <div className="fs-14">
              <div className="lightBlack mb-4">Phone number</div>
              <div className="fw-600">123 456 7890</div>
            </div>
            <div className="divider18"></div>
            <div className="fs-14">
              <div className="lightBlack mb-4">Email address</div>
              <div className="fw-600">jennywilson@gmail.com</div>
            </div>
            <div className="divider18"></div>
            <div className="fs-14">
              <div className="lightBlack mb-4">Description</div>
              <div className="fw-600">I’m struggling to create my dine savvy acount can you please help me with login</div>
            </div>
            <div className="divider18"></div>
            <div className="fs-14">
              <div className="lightBlack mb-4">Working Hours</div>
              <div className="fw-600">12–3 pm, 7–11 pm</div>
            </div>
            <div className="divider18"></div>
            <div className="fs-14">
              <div className="lightBlack mb-4">Location</div>
              <div className="fw-600">SG Iscon Junction TP, Shivalik Shilp, Hardcastle Restaurants Pvt Ltd, Ground floor, 14, Sarkhej - Gandhinagar Hwy</div>
            </div>
          </div>
          <div className="btn">
          Import form Google <img src={importIcon} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportDetail;
