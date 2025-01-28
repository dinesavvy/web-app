import React from "react";
import addCircle from "../../../assets/images/addCircle.svg";

const Hierarchy = () => {
  return (
    <>
      <div className="dashboard">
        <div className="tabPadding mb-30">
          <div className="fs-24 fw-600">Hierarchy </div>

          <div className="divider2"></div>
          <div className="d-flex align-center gap-20 mb-20">
            <div className="profileImage">gh</div>
            <div>
              <div className="fs-24 fw-600 mb-10">Myles Leighton</div>
              <div className="positionTag fs-16 fw-600">Owner</div>
            </div>
          </div>
          <div className="d-flex align-center justify-between mb-20">
            <div className="fs-20 fw-600">My team</div>
            <div className="addCircle cursor-pointer">
              <img src={addCircle} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hierarchy;
