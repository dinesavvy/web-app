import React, { useEffect, useState } from "react";
import addBtn from "../../../assets/images/addBtn.svg";
import coke from "../../../assets/images/coke.svg";
import editMember from "../../../assets/images/editMember.svg";
import onlyArrowBtn from "../../../assets/images/onlyArrowBtn.svg";
import deleteModal from "../../../assets/images/deleteModal.svg";
import SearchSelect from "./SearchSelect";
import CommonModal from "./CommonModal";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import BrandDetails from "./BrandDetails";

const Brands = () => {
  const [brandDetails, setBrandDetails] = useState(false);
  const navigate = useNavigate();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  useEffect(() => {
    if (isDetailsOpen) {
      document.body.classList.add("overflow-Hidden");
    } else {
      document.body.classList.remove("overflow-Hidden");
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-Hidden");
    };
  }, [isDetailsOpen]);
  const toggleDetails = () => {
    setIsDetailsOpen((prevState) => !prevState);
  };
  return (
    <>
      <div className="dashboard">
        <div className="tabPadding">
          <div className="d-flex justify-between align-center mb-20">
            <div className="fs-24 fw-600">Brands</div>
            <div className="btn gap-8 addBtn">
              Add Brand
              <img src={addBtn} alt="addBtn" />
            </div>
          </div>
          <SearchSelect />
          <div className="merchantGrid mb-20">
            <div className="merchantCard">
              <div className="p-20">
                <div className="text-center promotionImage">
                  <img src={coke} alt="" className="h-100" />
                </div>
              </div>
              <div className="divider m-0"></div>
              <div className="bottomPadding">
                <div className="fs-16 fw-700 mb-20">Coca Cola</div>
              
                <div className="fs-16 fw-600 roi green mb-20">
                  Redeemed: 52%
                </div>
                <div className="d-flex align-center gap-10">
                  <div
                    className="btn btnSecondary w-100 gap-8"
                    onClick={() => navigate("/admin/add-promotions")}
                  >
                    <img src={editMember} alt="" />
                    Promote
                  </div>
                  <div
                    className="onlyArrowBtn btn"
                    onClick={() => toggleDetails()}
                  >
                    <img src={onlyArrowBtn} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-center justify-between flexPagination">
            <div className="fs-16">Showing 1 to 5 of 10 Restaurants</div>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
      <BrandDetails isOpen={isDetailsOpen} toggleDetails={toggleDetails} />
    </>
  );
};

export default Brands;
