import React, { useEffect, useState } from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import arrowUp from "../../../assets/images/arrow-up.svg";
import coke from "../../../assets/images/coke.svg";
import olive from "../../../assets/images/olive.png";
import restaurantCard from "../../../assets/images/restaurantCard.png";
import PromotionCart from "./PromotionCart";

const PromotionDetails = ({ isOpen, toggleDetails }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [addFund, setAddFund] = useState(false);

  const toggleAccordion = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };
  const items = [
    {
      title: "Burger King",
      content: "Content for section 1 goes here.",
    },
    {
      title: "Taco Bell",
      content: "Content for section 2 goes here.",
    },
    {
      title: "Chili’s",
      content: "Content for section 3 goes here.",
    },
  ];
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
      {isOpen && <div className="overlay2" onClick={toggleDetails}></div>}

      <div className={`rightSidebar rightSidebar2 ${isOpen ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">Promotion Details</div>
          <div className="closeSidebar" onClick={toggleDetails}>
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowCart2 overflowCart">
          <div className="fs-18 fw-700 pc">Promotion Title</div>
          <div className="divider2"></div>
          <div className="brandImagePromo mb-10">
            <img src={coke} alt="" />
          </div>
          <div className="d-flex justify-between align-center gap-10">
            <div className="fs-16 fw-700">Coca Cola</div>
            <div className="fs-16 fw-600 roi red">Redeemed: 4.9%</div>
          </div>
          <div className="divider2"></div>
          <div className="grid2 mb-20">
            <div>
              <div className="fs-14 mb-4">Brand / Product</div>
              <div className="fs-14 fw-600">Chocolate Cake </div>
            </div>
            <div>
              <div className="fs-14 mb-4">SKU</div>
              <div className="fs-14 fw-600">COKE-12x12-002</div>
            </div>
            <div>
              <div className="fs-14 mb-4">Start Date</div>
              <div className="fs-14 fw-600">08/20/2024</div>
            </div>
            <div>
              <div className="fs-14 mb-4">End Date</div>
              <div className="fs-14 fw-600">08/30/2024</div>
            </div>
            <div>
              <div className="fs-14 mb-4">Total Quantity</div>
              <div className="fs-14 fw-600">1,000</div>
            </div>
            <div>
              <div className="fs-14 mb-4">Total Promotional Funds</div>
              <div className="fs-14 fw-600">$140</div>
            </div>
          </div>
          <div className="divider2"></div>
          <div className="fs-2 fw-700 mb-20">Merchants</div>
          <div className="accordionCustom">
            {items.map((item, index) => (
              <>
                <div key={index} className="accordionItem">
                  <div
                    className="accordionHeader fs-16 fw-700"
                    onClick={() => toggleAccordion(index)}
                  >
                    <div>{item.title}</div>
                    <div className="d-flex align-center gap-16">
                      <div className="fs-16 fw-600 roi blue">Accepted</div>
                      <div
                        className={`arrow ${openIndex === index ? "open" : ""}`}
                      >
                        <img src={arrowUp} alt="arrowUp" className="arrowUp" />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`accordion-content ${
                      openIndex === index ? "open" : ""
                    }`}
                  >
                    <div className="imageAccorddian mb-20">
                      <img
                        src={olive}
                        alt="olive"
                        className="h-100 object-cover"
                      />
                    </div>
                    <div className="grid2 mb-20">
                      <div>
                        <div className="fs-14 mb-4">Quantity/Nudge Cedit</div>
                        <div className="fs-14 fw-600">1,000 </div>
                      </div>
                      <div>
                        <div className="fs-14 mb-4">MSRP</div>
                        <div className="fs-14 fw-600">$23.99</div>
                      </div>
                      <div>
                        <div className="fs-14 mb-4">
                          Price for Reimbursement
                        </div>
                        <div className="fs-14 fw-600">$24.99</div>
                      </div>
                      <div>
                        <div className="fs-14 mb-4">Promotional Funds</div>
                        <div className="fs-14 fw-600">$500/$1000</div>
                      </div>
                    </div>
                    <div className="d-flex align-center justify-between mb-4">
                      <div className="fs-14">Redeemed</div>
                      <div className="fs-14 fw-600">30/256</div>
                    </div>
                    <div className="range h22 ">
                      <div
                        className="rangePercentage"
                        style={{ width: "50%" }}
                      ></div>
                      <div className="percentageAbsolute fs-14 fw-500">50%</div>
                    </div>
                    <div className="divider2"></div>
                    {addFund === true ? (
                      <>
                        <div className="w-100 d-flex flexDirection h-100 justify-between mb-20">
                          <label
                            htmlFor="name"
                            className="grey mb-10 fs-16 fw-500"
                          >
                            Promotional Funds
                          </label>
                          <input
                            type="text"
                            className="input bgWhite"
                            placeholder="Add Funds"
                          />
                        </div>
                        <div className="d-flex align-center gap-10">
                          <div
                            className="btn btnSecondary bgTrans w-100"
                            onClick={() => setAddFund(false)}
                          >
                            Cancel
                          </div>
                          <div
                            className="btn w-100"
                            onClick={() => toggleCart()}
                          >
                            Continue
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="btnSecondary btn bgTrans"
                          onClick={() => setAddFund(true)}
                        >
                          Add Fund
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="divider2"></div>
              </>
            ))}
          </div>
        </div>
      </div>
      <PromotionCart isOpen={isCartOpen} toggleCart={toggleCart} />
    </>
  );
};

export default PromotionDetails;