import React, { useEffect, useState } from "react";
import closeRightSidebar from "../../../../assets/images/closeRightSidebar.svg";
import coke from "../../../../assets/images/coke.svg";
import editMember from "../../../../assets/images/editMember.svg";
import deleteMember from "../../../../assets/images/deleteMember.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBrandHandler } from "../../../../redux/action/deleteBrand";
import { removeSupplierHandler } from "../../../../redux/action/supplierActions/removeSupplier";
import noImageFound from "../../../../assets/images/noImageFound.png";

const BrandDetails = ({ isOpen, toggleDetails, brandDetails }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteBrand = () => {
    let payload = {
      brandId: brandDetails?._id,
    };
    dispatch(removeSupplierHandler(payload));
  };

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
            <img src={brandDetails?.imageUrl?.[0] || noImageFound} alt="" />
          </div>
          <div className="d-flex justify-between align-center gap-10">
            <div className="fs-16 fw-700">{brandDetails?.brandName}</div>
            <div className="fs-16 fw-600 roi green">Performance: 52%</div>
          </div>
          <div className="divider2"></div>
          {brandDetails?.brandItem?.length > 0 ? (
            <>
              {brandDetails?.brandItem?.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="grid2 mb-20">
                      <div>
                        <div className="lightBlack fs-14 mb-4">MSRP</div>
                        <div className="fs-14 fw-600">
                          ${item?.mSRP} per case
                        </div>
                      </div>
                      <div>
                        <div className="lightBlack fs-14 mb-4">SKUs</div>
                        <div className="fs-14 fw-600">{item?.sku}</div>
                      </div>
                      <div className="twoSpace">
                        <div className="lightBlack fs-14 mb-4">Description</div>
                        <div className="fs-14 fw-600">
                          {/* Coca Cola - Classic 12 oz cans (12-pack) */}
                          {item?.description}
                        </div>
                      </div>
                    </div>
                    <div className="divider2"></div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="noDataFound">No data available</div>
          )}

          {/* <div className="divider2"></div> */}
          <div className="d-flex align-center gap-10">
            <div
              className="btn btnSecondary w-100 gap-8"
              onClick={() =>
                navigate("/supplier/addBrand", {
                  state: { brandDetails: brandDetails },
                })
              }
            >
              <img src={editMember} alt="" />
              Edit
            </div>
            <div className="deleteBtn btn" onClick={deleteBrand}>
              <img src={deleteMember} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandDetails;
