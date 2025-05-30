import React, { useEffect, useState } from "react";
import closeRightSidebar from "../../../../assets/images/closeRightSidebar.svg";
import remainTime from "../../../../assets/images/remainTime.svg";
import savvynudge from "../../../../assets/images/savvynudge.svg";
import playbtn from "../../../../assets/images/playbtn.svg";
import arrowUp from "../../../../assets/images/arrow-up.svg";
import noImageFound from "../../../../assets/images/noImageFound.png";

const MerchantViewAll = ({
  isOpenMerchantViewAll,
  toggleSidebarMerchantViewAll,
  merchantInnerDrawer,
}) => {

  const [openIndex, setOpenIndex] = useState(null);
  const staticData = [
    {
      businessName: "Olive Garden",
      logoUrl: noImageFound,
      promotionStatus: "Accepted",
      sent: 120,
      accepted: 15.99,
      declined: 12.99,
      redeemed: 500,
    },
    {
      businessName: "Taco Bell",
      logoUrl: noImageFound,
      promotionStatus: "Accepted",
      sent: 80,
      accepted: 10.0,
      declined: 8.0,
      redeemed: 300,
    },
    {
      businessName: "Pizza Hut",
      logoUrl: noImageFound,
      promotionStatus: "Rejected",
      sent: 200,
      accepted: 20.0,
      declined: 15.5,
      redeemed: 750,
    },
  ];
  return (
    <>
      {isOpenMerchantViewAll && (
        <div className="overlay2" onClick={toggleSidebarMerchantViewAll}></div>
      )}

      {/* Sidebar */}
      <div className={`rightSidebar ${isOpenMerchantViewAll ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">Merchants</div>
          <div className="closeSidebar" onClick={toggleSidebarMerchantViewAll}>
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>

        <div className="divider2"></div>
        <div className="overflowSidebar">
          <div className="accordionCustom">
            {merchantInnerDrawer?.merchants?.map((item, index) => (
              <div
                className="accordion-item cursor-pointer"
                key={index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="accordionHeader fs-16 fw-700">
                  <div>{item.details?.businessName}</div>
                  <div className="d-flex align-center gap-16">
                    <div
                      className={`fs-16 fw-600 roi ${
                        item?.status === "pending" ? "brandred" : "green"
                      }`}
                    >
                      {/* red , grren , brandred */}
                      {item?.status?.charAt(0).toUpperCase() +
                        item?.status?.slice(1)}
                    </div>
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
                      src={item?.details?.logoUrl ||noImageFound}
                      alt="logo"
                      className="h-100 object-cover"
                    />
                  </div>

                  <div className="grid2 ">
                    <div>
                      <div className="fs-14 mb-4">Sent</div>
                      <div className="fs-14 fw-600">200</div>
                    </div>
                    <div>
                      <div className="fs-14 mb-4">Accepted:</div>
                      <div className="fs-14 fw-600 greenText">
                        {/* ${item.accepted} */}
                        150/75%
                      </div>
                    </div>
                    <div>
                      <div className="fs-14 mb-4">Declined:</div>
                      <div className="fs-14 fw-600 brandRed">
                        {/* ${item.declined} */}
                        30/15%
                      </div>
                    </div>
                    <div>
                      <div className="fs-14 mb-4">Redeemed</div>
                      <div className="fs-14 fw-600 greyColor">
                        {/* ${item.redeemed} */}
                        20/10%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MerchantViewAll;
