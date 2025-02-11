import React, { useEffect, useState } from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import coke from "../../../assets/images/coke.svg";
import editMember from "../../../assets/images/editMember.svg";
import deleteMember from "../../../assets/images/deleteMember.svg";
import { useNavigate } from "react-router-dom";

const BrandDetails = ({ isOpen, toggleDetails }) => {
  const navigate = useNavigate();

  return (
    <>
      {isOpen && <div className="overlay2" onClick={toggleDetails}></div>}

      <div className={`rightSidebar rightSidebar2 ${isOpen ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">Brand Details</div>
          <div className="closeSidebar" onClick={toggleDetails}>
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowCart2 overflowCart">
          <div className="brandImagePromo mb-20">
            <img src={coke} alt="" />
          </div>
          <div className="d-flex justify-between align-center gap-10">
            <div className="fs-16 fw-700">Coca Cola</div>
            <div className="fs-16 fw-600 roi green">Performance: 52%</div>
          </div>
          <div className="divider2"></div>
          <div className="grid2 mb-20">
            <div>
              <div className="lightBlack fs-14 mb-4">MSRP</div>
              <div className="fs-14 fw-600">$19.99 per case</div>
            </div>
            <div>
              <div className="lightBlack fs-14 mb-4">SKUs</div>
              <div className="fs-14 fw-600">COKE-12x12-002</div>
            </div>
            <div className="twoSpace">
              <div className="lightBlack fs-14 mb-4">Description</div>
              <div className="fs-14 fw-600">
                Coca Cola - Classic 12 oz cans (12-pack)
              </div>
            </div>
          </div>
          <div className="divider2"></div>
          <div className="grid2 mb-20">
            <div>
              <div className="lightBlack fs-14 mb-4">MSRP</div>
              <div className="fs-14 fw-600">$19.99 per case</div>
            </div>
            <div>
              <div className="lightBlack fs-14 mb-4">SKUs</div>
              <div className="fs-14 fw-600">COKE-12x12-002</div>
            </div>
            <div className="twoSpace">
              <div className="lightBlack fs-14 mb-4">Description</div>
              <div className="fs-14 fw-600">
                Coca Cola - Classic 12 oz cans (12-pack)
              </div>
            </div>
          </div>
          <div className="divider2"></div>
          <div className="grid2 mb-20">
            <div>
              <div className="lightBlack fs-14 mb-4">MSRP</div>
              <div className="fs-14 fw-600">$19.99 per case</div>
            </div>
            <div>
              <div className="lightBlack fs-14 mb-4">SKUs</div>
              <div className="fs-14 fw-600">COKE-12x12-002</div>
            </div>
            <div className="twoSpace">
              <div className="lightBlack fs-14 mb-4">Description</div>
              <div className="fs-14 fw-600">
                Coca Cola - Classic 12 oz cans (12-pack)
              </div>
            </div>
          </div>
          <div className="divider2"></div>
          <div className="d-flex align-center gap-10">
            <div
              className="btn btnSecondary w-100 gap-8"
              onClick={() => navigate("/admin/brands/edit")}
            >
              <img src={editMember} alt="" />
              Edit
            </div>
            <div className="deleteBtn btn">
              <img src={deleteMember} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandDetails;
