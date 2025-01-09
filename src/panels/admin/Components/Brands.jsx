import React, { useState } from "react";
import addBtn from "../../../assets/images/addBtn.svg";
import coke from "../../../assets/images/coke.svg";
import editMember from "../../../assets/images/editMember.svg";
import deleteMember from "../../../assets/images/deleteMember.svg";
import deleteModal from "../../../assets/images/deleteModal.svg";
import SearchSelect from "./SearchSelect";
import CommonModal from "./CommonModal";
import { useNavigate } from "react-router-dom";

const Brands = () => {
       const [modal2Open, setModal2Open] = useState(false);
       const navigate = useNavigate()
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
          <div className="merchantGrid ">
            <div className="merchantCard">
              <div className="p-20">
                <div className="text-center promotionImage">
                  <img src={coke} alt="" className="h-100" />
                </div>
              </div>
              <div className="divider m-0"></div>
              <div className="bottomPadding">
                <div className="fs-16 fw-700 mb-20">Coca Cola</div>
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
                <div className="d-flex align-center gap-10">
                  <div
                    className="btn btnSecondary w-100 gap-8"
                    onClick={() => navigate("/admin/brands/edit")}
                  >
                    <img src={editMember} alt="" />
                    Edit
                  </div>
                  <div
                    className="deleteBtn btn"
                    onClick={() => setModal2Open(true)}
                  >
                    <img src={deleteMember} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommonModal modal2Open={modal2Open} setModal2Open={setModal2Open} modalImage={deleteModal}/>
    </>
  );
};

export default Brands;
