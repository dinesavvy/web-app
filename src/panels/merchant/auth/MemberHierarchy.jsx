import React from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import google from "../../../assets/images/google.svg";
import apple from "../../../assets/images/apple.svg";

const MemberHierarchy = ({ isMemberHierarchy, toggleMemberHierarchy }) => {
  return (
    <>
      {isMemberHierarchy && (
        <div className="overlay2" onClick={toggleMemberHierarchy}></div>
      )}

      {/* Sidebar */}
      <div className={`rightSidebar ${isMemberHierarchy ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">Edit Member</div>
          <div className="closeSidebar" onClick={toggleMemberHierarchy}>
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowSidebar">
          <div className="mb-40">
            <div className="mb-20">
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                id="name"
              />
            </div>
            <div className="mb-20">
              <label htmlFor="number" className="grey mb-10 fs-16 fw-500">
                Phone number
              </label>
              <input
                type="text"
                name="phone_number"
                placeholder="Enter your phone number"
                id="phone_number"
                className="input"
              />
            </div>
            <div className="mb-20">
              <label htmlFor="location" className="grey mb-10 fs-16 fw-500">
                location
              </label>
              <select as="select" name="location" className="input w-100">
                <option value="">Select a location</option>
              </select>
            </div>
            <div className="mb-20">
              <label htmlFor="location" className="grey mb-10 fs-16 fw-500">
                Role
              </label>
              <select as="select" name="role" className="input w-100">
                <option value="">Select a role</option>
              </select>
            </div>
            <div className="mb-20">
              <label htmlFor="invitedDate" className="grey mb-10 fs-16 fw-500">
                Date Invited
              </label>
              <div className="fixedDate input  position-relative">Pending</div>
            </div>
            <div className="mb-20">
              <label htmlFor="joinedDate" className="grey mb-10 fs-16 fw-500">
                Date Joined
              </label>
              <div className="fixedDate position-relative w-100">
                <input
                  type="text"
                  name="invitedDate"
                  // placeholder="Enter your phone number"
                  id="invitedDate"
                  className="input"
                />
                <div className="resendBtn fs-14">Resend</div>
              </div>
            </div>
          </div>
          <div className="btn w-100">
            Add
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberHierarchy;
