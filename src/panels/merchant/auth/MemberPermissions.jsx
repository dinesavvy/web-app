import React from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import phoneEdit from "../../../assets/images/phoneEdit.svg";
import editMember from "../../../assets/images/editMember.svg";
import deleteMember from "../../../assets/images/deleteMember.svg";

const MemberPermissions = ({
  isMemberPermissions,
  toggleMemberPermissions,
}) => {
  return (
    <>
      {isMemberPermissions && (
        <div className="overlay2" onClick={toggleMemberPermissions}></div>
      )}

      {/* Sidebar */}
      <div className={`rightSidebar ${isMemberPermissions ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">Edit Member</div>
          <div className="closeSidebar" onClick={toggleMemberPermissions}>
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowSidebar">
          <div className="fs-16 fw-600 mb-16">Select permissions</div>
          <div className="mb-40">
            <label className="selectPermission mb-12 fs-14">
              Add Team members
              <div className="custom-checkbox">
                <label className="checkLabel">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </div>
            </label>
            <label className="selectPermission mb-12 fs-14">
              Add Team members
              <div className="custom-checkbox">
                <label className="checkLabel">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </div>
            </label>
            <label className="selectPermission mb-12 fs-14">
              Add Team members
              <div className="custom-checkbox">
                <label className="checkLabel">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </div>
            </label>
            <label className="selectPermission mb-12 fs-14">
              Add Team members
              <div className="custom-checkbox">
                <label className="checkLabel">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </div>
            </label>
          </div>
          <div className="btn  w-100 gap-8" onClick={toggleMemberPermissions}>Update</div>
        </div>
      </div>
    </>
  );
};

export default MemberPermissions;
