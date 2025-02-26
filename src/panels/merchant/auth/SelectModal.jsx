import React from "react";
import { Modal } from "antd";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import rightactive from "../../../assets/images/rightactive.svg";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   businessListAction,
//   businessListHandler,
// } from "../../../redux/action/businessAction/businessListSlice";
import Loader from "../../../common/Loader/Loader";

const SelectModal = ({
  isModalOpen,
  onClose,
  onSelect,
  items,
  selectedItem,
  businessListSelector,
  setModalOpen,
  selectedBusiness,
}) => {
  return (
    <>
      {businessListSelector?.isLoading && <Loader />}
      <Modal
        centered
        visible={isModalOpen} // Control the visibility of the modal  // Handle close
        footer={null} // Hide the footer (buttons)
        closable={false}
        className="selecModal"
      >
        <div className="">
          <div className="topPadding d-flex justify-between align-center">
            <div className="fs-26 fw-700">Your Business</div>
            <div className="closeSidebar" onClick={() => setModalOpen(false)}>
              <img src={closeRightSidebar} alt="closeRightSidebar" />
            </div>
          </div>
          {/* List of items */}
          <div className="padding30">
            {businessListSelector?.data?.data?.records?.length > 0 ? (
              <>
                {businessListSelector?.data?.data?.records?.map(
                  (item, index) => (
                    <div
                      key={index}
                      className={`modal-item d-flex justify-between align-center gap-16 ${
                        selectedBusiness?.name === item?.name ? "active" : ""
                      }`}
                      onClick={() => {
                        onSelect(item); // Select the item
                        setModalOpen(false); // Close the modal
                      }}
                    >
                      <div>
                        <div className="fs-18 fw-500 mb-4">
                          {item.businessName}
                        </div>
                        <div className="fs-14 grey">
                          {[
                            item.address?.addressLine1,
                            item.address?.addressLine2,
                            item.address?.locality,
                            item.address?.administrativeDistrictLevel1,
                            item.address?.country,
                            item.address?.postalCode,
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        </div>
                      </div>
                      <div className="rightIcon">
                        <img src={rightactive} alt="rightactive" />
                      </div>
                    </div>
                  )
                )}
              </>
            ) : (
              <div className="noDataFound">No data available</div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SelectModal;
