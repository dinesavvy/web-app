import React, { useEffect, useState } from "react";
import addBtn from "../../../assets/images/addBtn.svg";
import coke from "../../../assets/images/coke.svg";
import SearchSelect from "./SearchSelect";
import { Pagination } from "antd";
import PromotionCart from "./PromotionCart";

const Promotions = () => {
      const [isCartOpen, setIsCartOpen] = useState(false);
        
          useEffect(() => {
            if (isCartOpen) {
              document.body.classList.add("overflow-Hidden");
            } else {
              document.body.classList.remove("overflow-Hidden");
            }
        
            // Cleanup on component unmount
            return () => {
              document.body.classList.remove("overflow-Hidden");
            };
          }, [isCartOpen]);
          const toggleCart = () => {
            setIsCartOpen((prevState) => !prevState);
          };
  return (
    <>
      <div className="dashboard">
        <div className="tabPadding">
          <div className="d-flex justify-between align-center mb-20">
            <div className="fs-24 fw-600">Promotions</div>
            <div className="btn gap-8 addBtn">
              Create New Promotion
              <img src={addBtn} alt="addBtn" />
            </div>
          </div>
          <div class="tabs-container tab3 tabing mb-20">
            <div class="tabs">
              <button class="tab-button active">Active</button>
              <button class="tab-button ">Inactive</button>
            </div>
          </div>
          <SearchSelect />
          <div className="merchantGrid mb-20">
            <div className="merchantCard position-relative">
              <div className="p-10">
                <div className="nailedIt active fs-14">You Nailed it!</div>
                <div className="text-center promotionImage mb-28">
                  <img src={coke} alt="" className="h-100" />
                </div>
                <div className="d-flex justify-between align-center gap-10">
                  <div className="fs-16 fw-700">Coca Cola</div>
                  <div className="fs-16 fw-600 roi blue">ROI: 5.1%</div>
                </div>
              </div>
              <div className="divider m-0"></div>
              <div className="bottomPadding">
                <div className="grid2 mb-20">
                  <div>
                    <div className="fs-14 mb-4">Brand / Product</div>
                    <div className="fs-14 fw-600">Chocolate Cake </div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Launch Date</div>
                    <div className="fs-14 fw-600">08/30/2024</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Promotional Credits</div>
                    <div className="fs-14 fw-600">$1,000</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Nudge Credits</div>
                    <div className="fs-14 fw-600">$100</div>
                  </div>
                </div>
                <div className="btn btnSecondary" onClick={toggleCart}>
                View Details
                </div>
              </div>
            </div>
            <div className="merchantCard position-relative">
              <div className="p-10">
                <div className="nailedIt active fs-14">You Nailed it!</div>
                <div className="text-center promotionImage mb-28">
                  <img src={coke} alt="" className="h-100" />
                </div>
                <div className="d-flex justify-between align-center gap-10">
                  <div className="fs-16 fw-700">Coca Cola</div>
                  <div className="fs-16 fw-600 roi red">ROI: 4.9%</div>
                </div>
              </div>
              <div className="divider m-0"></div>
              <div className="bottomPadding">
                <div className="grid2 mb-20">
                  <div>
                    <div className="fs-14 mb-4">Brand / Product</div>
                    <div className="fs-14 fw-600">Chocolate Cake </div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Launch Date</div>
                    <div className="fs-14 fw-600">08/30/2024</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Promotional Credits</div>
                    <div className="fs-14 fw-600">$1,000</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Nudge Credits</div>
                    <div className="fs-14 fw-600">$100</div>
                  </div>
                </div>
                <div className="btn btnSecondary" onClick={toggleCart}>
                View Details
                </div>
              </div>
            </div>
            <div className="merchantCard position-relative">
              <div className="p-10">
                <div className="nailedIt active fs-14">You Nailed it!</div>
                <div className="text-center promotionImage mb-28">
                  <img src={coke} alt="" className="h-100" />
                </div>
                <div className="d-flex justify-between align-center gap-10">
                  <div className="fs-16 fw-700">Coca Cola</div>
                  <div className="fs-16 fw-600 roi green">ROI: 52%</div>
                </div>
              </div>
              <div className="divider m-0"></div>
              <div className="bottomPadding">
                <div className="grid2 mb-20">
                  <div>
                    <div className="fs-14 mb-4">Brand / Product</div>
                    <div className="fs-14 fw-600">Chocolate Cake </div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Launch Date</div>
                    <div className="fs-14 fw-600">08/30/2024</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Promotional Credits</div>
                    <div className="fs-14 fw-600">$1,000</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4">Nudge Credits</div>
                    <div className="fs-14 fw-600">$100</div>
                  </div>
                </div>
                <div className="btn btnSecondary" onClick={toggleCart}>
                View Details
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
      <PromotionCart isOpen={isCartOpen} toggleCart={toggleCart} />
    </>
  );
};

export default Promotions;
