import React from "react";
import emptyBG from "../../../assets/images/emptyBG.png";
import logoutBg from "../../../assets/images/logoutBg.svg";
import modalbg from "../../../assets/images/modalbg.png";

const AccessDeniedModal = () => {
  return (
    <>
      <div className="dashboard">
        <div className="emptyHeight position-relative">
          <img src={emptyBG} alt="" className="emptyBG" />
          <div className="modal-content">
            <div className="ant-modal-body">
              <div className="modalbg">
                <img src={modalbg} alt="" />
              </div>
              <div className="modalImage mb-30">
                <img src={logoutBg} alt="" />
              </div>
              <div className="text-center mb-30">
                <div className="fs-26 fw-700 mb-15">
                  Access Denied <br />
                  {/* Restaurant Dashboard */}
                </div>
                <div className="fs-18">
                  {/* You do not have permission to access any business yet.
                        Please contact your administrator for assistance. */}
                  You do not have sufficient permissions to access this feature. 
                  Please contact your administrator to request the necessary access.
                </div>
              </div>
              <div
                className="div d-flex align-center gap-16"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                <div className="btn deleteBtnfull w-100 gap-8"> Logout</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccessDeniedModal;
