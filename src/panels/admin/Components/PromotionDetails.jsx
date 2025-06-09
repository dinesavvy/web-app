import React, { useEffect, useState } from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import arrowUp from "../../../assets/images/arrow-up.svg";
import coke from "../../../assets/images/coke.svg";
import PromotionCart from "./PromotionCart";
import moment from "moment";
import { promotionDetailsHandler } from "../../../redux/action/promotionDetails";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/Loader/Loader";
import noImageFound from "../../../assets/images/noImageFound.png";
import CommonModal from "./CommonModal";

const PromotionDetails = ({
  isOpen,
  toggleDetails,
  promotionalDetailsData,
  setIsDetailsOpen,
  activeTab,
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(false);
  const [addFund, setAddFund] = useState(false);
  const [endPromotionModal, setEndPromotionModal] = useState(false);

  const promotionDetailsSelector = useSelector(
    (state) => state?.promotionDetails
  );
  const adminEndPromotionSelector = useSelector(
    (state) => state?.adminEndPromotion
  );

  const dispatch = useDispatch();

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

  useEffect(() => {
    if (promotionalDetailsData) {
      let payload = {
        promotionId: promotionalDetailsData?._id,
      };
      dispatch(promotionDetailsHandler(payload));
    }
  }, [promotionalDetailsData]);

  const endPromotion = () => {
    // let payload = {
    //   promotionId: promotionalDetailsData?._id,
    // };
    // dispatch(adminEndPromotionHandler(payload));
    setEndPromotionModal(true);
  };

  return (
    <>
      {(promotionDetailsSelector?.isLoading ||
        adminEndPromotionSelector?.isLoading) && <Loader />}
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
          <div className="fs-18 fw-700 pc">
            {promotionDetailsSelector?.data?.data?.promotionTitle
              ? promotionDetailsSelector?.data?.data?.promotionTitle
                  .charAt(0)
                  .toUpperCase() +
                promotionDetailsSelector?.data?.data?.promotionTitle.slice(1)
              : ""}
          </div>
          <div className="divider2"></div>
          <div className="brandImagePromo mb-10">
            <img
              src={
                promotionDetailsSelector?.data?.data?.brandDetails
                  ?.imageUrl[0] || coke
              }
              alt={promotionDetailsSelector?.data?.data?.promotionTitle}
            />
          </div>
          <div className="d-flex justify-between align-center gap-10">
            <div className="fs-16 fw-700">
              {promotionDetailsSelector?.data?.data?.brandDetails?.brandName
                ?.charAt(0)
                .toUpperCase() +
                promotionDetailsSelector?.data?.data?.brandDetails?.brandName?.slice(
                  1
                )}
            </div>
            <div
              className={
                promotionDetailsSelector?.data?.data?.redemptionPercentage > 50
                  ? "fs-16 fw-600 roi green"
                  : "fs-16 fw-600 roi blue"
              }
            >
              Redeemed:{" "}
              {promotionDetailsSelector?.data?.data?.redemptionPercentage}%
            </div>
          </div>
          <div className="divider2"></div>
          <div className="grid2 mb-20">
            <div>
              <div className="fs-14 mb-4">Brand / Product</div>
              <div className="fs-14 fw-600">
                {promotionDetailsSelector?.data?.data?.brandDetails?.brandName
                  ? promotionDetailsSelector.data.data.brandDetails.brandName
                      .charAt(0)
                      .toUpperCase() +
                    promotionDetailsSelector.data.data.brandDetails.brandName.slice(
                      1
                    )
                  : "-"}
              </div>
            </div>
            <div>
              <div className="fs-14 mb-4">SKU</div>
              <div className="fs-14 fw-600">
                {promotionDetailsSelector?.data?.data?.brandDetails?.brandItem?.map(
                  (item) => item?.sku
                )}
              </div>
            </div>
            <div>
              <div className="fs-14 mb-4">Start Date</div>
              <div className="fs-14 fw-600">
                {moment(promotionDetailsSelector?.data?.data?.startDate).format(
                  "YYYY-MM-DD"
                )}
              </div>
            </div>
            <div>
              <div className="fs-14 mb-4">End Date</div>
              <div className="fs-14 fw-600">
                {moment(promotionDetailsSelector?.data?.data?.endDate).format(
                  "YYYY-MM-DD"
                )}
              </div>
            </div>
            <div>
              <div className="fs-14 mb-4">Total Quantity</div>
              <div className="fs-14 fw-600">
                {promotionDetailsSelector?.data?.data?.merchant?.quantity ||
                  "-"}
              </div>
            </div>
            <div>
              <div className="fs-14 mb-4">Promotional Credits</div>
              <div className="fs-14 fw-600">
                {promotionDetailsSelector?.data?.data?.merchant?.promotionFund
                  ? `$${promotionDetailsSelector?.data?.data?.merchant?.promotionFund}`
                  : "-"}
              </div>
            </div>
          </div>
          <div className="divider2"></div>
          <div className="fs-2 fw-700 mb-20">Merchants</div>
          <div className="accordionCustom">
            {/* {items.map((item, index) => ( */}
            <>
              <div className=" accordion-item">
                <div
                  className="accordionHeader fs-16 fw-700"
                  onClick={() => setOpenIndex(!openIndex)}
                >
                  <div>
                    {promotionDetailsSelector?.data?.data?.locationDetails
                      ?.businessName
                      ? promotionDetailsSelector?.data?.data?.locationDetails?.businessName
                          .charAt(0)
                          .toUpperCase() +
                        promotionDetailsSelector?.data?.data?.locationDetails?.businessName?.slice(
                          1
                        )
                      : ""}
                  </div>

                  <div className="d-flex align-center gap-16">
                    <div className="fs-16 fw-600 roi blue">
                      {promotionDetailsSelector?.data?.data?.promotionStatus ||
                        "-"}
                    </div>
                    <div
                      className={`arrow ${openIndex === true ? "open" : ""}`}
                    >
                      <img src={arrowUp} alt="arrowUp" className="arrowUp" />
                    </div>
                  </div>
                </div>
                <div
                  className={` accordion-content ${
                    openIndex === true ? "open" : ""
                  }`}
                >
                  <div className="imageAccorddian mb-20">
                    <img
                      src={
                        promotionDetailsSelector?.data?.data?.locationDetails
                          ?.logoUrl || noImageFound
                      }
                      alt={
                        promotionDetailsSelector?.data?.data?.locationDetails
                          ?.businessName || "No Image Found"
                      }
                      className="h-100 object-cover"
                    />
                  </div>
                  <div className="grid2 mb-20">
                    <div>
                      <div className="fs-14 mb-4">Quantity/Nudge Cedit</div>
                      <div className="fs-14 fw-600">
                        {
                          promotionDetailsSelector?.data?.data?.merchant
                            ?.quantity
                        }{" "}
                      </div>
                    </div>
                    <div>
                      <div className="fs-14 mb-4">MSRP</div>
                      <div className="fs-14 fw-600">
                        ${promotionDetailsSelector?.data?.data?.merchant?.mSRP}
                      </div>
                    </div>
                    <div>
                      <div className="fs-14 mb-4">Price for Reimbursement</div>
                      <div className="fs-14 fw-600">
                        $
                        {
                          promotionDetailsSelector?.data?.data?.merchant
                            ?.retailPrice
                        }
                      </div>
                    </div>
                    <div>
                      <div className="fs-14 mb-4">Promotional Funds</div>
                      <div className="fs-14 fw-600">
                        $
                        {
                          promotionDetailsSelector?.data?.data?.merchant
                            ?.promotionFund
                        }
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-center justify-between mb-4">
                    <div className="fs-14">Redeemed</div>
                    {/* <div className="fs-14 fw-600">30/256</div> */}
                  </div>
                  <div className="range h22 ">
                    <div
                      className="rangePercentage"
                      // style={{ width: "50%" }}
                      style={{
                        width: `${
                          promotionDetailsSelector?.data?.data
                            ?.redemptionPercentage || 0
                        }%`,
                      }}
                    ></div>
                    <div className="percentageAbsolute fs-14 fw-500">
                      {
                        promotionDetailsSelector?.data?.data
                          ?.redemptionPercentage
                      }
                      %
                    </div>
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
                        <div className="btn w-100" onClick={() => toggleCart()}>
                          Continue
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="btnSecondary btn bgTrans disabled"
                        // onClick={() => setAddFund(true)}
                      >
                        Add Fund
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
            {/* ))} */}
          </div>
          {activeTab === "active" &&
            promotionDetailsSelector?.data?.data?.promotionStatus ===
              "Pending" && (
              <>
                {/* <div className="divider2"></div> */}
                <div className="deleteBtnfull btn" onClick={endPromotion}>
                  Close Promotion
                </div>
              </>
            )}
        </div>
      </div>
      <PromotionCart isOpen={isCartOpen} toggleCart={toggleCart} />
      {endPromotionModal && (
        <CommonModal
          endPromotionModal={endPromotionModal}
          setEndPromotionModal={setEndPromotionModal}
          // brandDetails={brandDetails}
          setIsDetailsOpen={setIsDetailsOpen}
          promotionalDetailsData={promotionalDetailsData}
        />
      )}
    </>
  );
};

export default PromotionDetails;
