import React, { useEffect, useState } from "react";
import addBtn from "../../../../assets/images/addBtn.svg";
import searchIcon from "../../../../assets/images/searchIcon.svg";
import emailCard from "../../../../assets/images/emailCard.svg";
import phoneCard from "../../../../assets/images/phoneCard.svg";
import inveCard from "../../../../assets/images/inveCard.svg";
import userCard from "../../../../assets/images/userCard.svg";
import noImageFound from "../../../../assets/images/noImageFound.png";
import { Pagination } from "antd";
import DistributorDetails from "./DistributorDetails";

const Distributors = () => {
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
          <div className="d-flex align-center justify-between mb-20">
            <div className="fs-24 fw-600">Distributors</div>
            <div className="btn gap-8 addBtn" onClick={()=>setIsDetailsOpen(true)}>
              Add Distributors
              <img src={addBtn} alt="addBtn" />
            </div>
          </div>
          <div className="lineSearch w-100 mb-20">
            <input
              type="text"
              placeholder="Search Distributors"
              autoComplete="off"
            />
            <img src={searchIcon} alt="" className="absoluteImage" />
          </div>
          <div className="merchantGrid ">
            <div className="merchantCard position-relative">
              <div className="topPadding">
                <div className="merchantImage">
                  <img src={noImageFound} alt="" />
                </div>
                <div className="fs-16 fw-700 mb-10">
                  Garden Grove Café & Bistro
                </div>
              </div>
              {/* <div className="custom-checkbox merchantCardCheckbox">
                <label className="checkLabel">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </div> */}
              <div className="divider2 m-0"></div>
              <div className="bottomPadding">
                <div className="d-flex flexColumn gap-10">
                  <div className="d-flex align-center gap-12 fs-14">
                    <img src={userCard} alt="" />
                    grothoff@icloud.com
                  </div>
                  <div className="d-flex align-center gap-12 fs-14">
                    <img src={inveCard} alt="" />
                    217 555-0113
                  </div>
                  <div className="d-flex align-center gap-12 fs-14">
                    <img src={emailCard} alt="" />
                    grothoff@icloud.com
                  </div>
                  <div className="d-flex align-center gap-12 fs-14">
                    <img src={phoneCard} alt="" />
                    217 555-0113
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="divider2"></div>
          <div className="d-flex align-center justify-between flexPagination">
          <div className="fs-16">Showing 1 to 5 of 10 Distributors</div>
          <Pagination defaultCurrent={1} total={50} />
        </div>
        </div>
      </div>
      <DistributorDetails isOpen={isDetailsOpen} toggleDetails={toggleDetails} />
    </>
  )
}

export default Distributors