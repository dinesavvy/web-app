import React from "react";
import addBtn from "../../../assets/images/addBtn.svg";
import coke from "../../../assets/images/coke.svg";
import SearchSelect from "./SearchSelect";

const Brands = () => {
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
          
        </div>
      </div>
    </>
  );
};

export default Brands;
