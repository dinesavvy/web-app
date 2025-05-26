import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import rightactive from "../../../assets/images/rightactive.svg";
import clockIcon from "../../../assets/images/clock.svg";

import Loader from "../../../common/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptInviteAction,
  acceptInviteHandler,
} from "../../../redux/action/businessAction/acceptInvite";
import { useBusiness } from "../../../common/Layout/BusinessContext";

const SelectModal = ({
  isModalOpen,
  onClose,
  onSelect,
  items,
  selectedItem,
  businessListSelector,
  setModalOpen,
  selectedBusiness,
  isModalOpenNotification,
  setModalOpenNotification,
}) => {
  const dispatch = useDispatch();

  const acceptInviteSelector = useSelector((state) => state?.acceptInvite);

  const [tempItem, setTempItem] = useState(false);
  // const { setSelectedBusiness } = useBusiness();

  const handleAcceptDecline = (value, item) => {
    let payload = {
      locationId: item?._id,
      status: value,
    };
    dispatch(acceptInviteHandler(payload));
    if (value === "accepted") {
      setTempItem(item);
    }
  };

  useEffect(() => {
    if (acceptInviteSelector?.data?.statusCode === 200) {
      dispatch(acceptInviteAction.acceptInviteReset());
      // setSelectedBusiness(tempItem);
      window.location.reload();
      if (isModalOpenNotification) {
        setModalOpenNotification(false);
      } else {
        setModalOpen(false);
      }
    }
  }, [acceptInviteSelector,isModalOpenNotification]);

  return (
    <>
      {(businessListSelector?.isLoading || acceptInviteSelector?.isLoading) && (
        <Loader />
      )}
      <Modal
        centered
        visible={isModalOpen || isModalOpenNotification} // Control the visibility of the modal  // Handle close
        footer={null} // Hide the footer (buttons)
        closable={false}
        className="selecModal"
      >
        <div className="">
          <div className="topPadding d-flex justify-between align-center">
            <div className="fs-26 fw-700">Your Business</div>
            <div
              className="closeSidebar"
              onClick={() => {
                if (isModalOpenNotification) {
                  setModalOpenNotification(false);
                } else {
                  setModalOpen(false);
                }
              }}
            >
              <img src={closeRightSidebar} alt="closeRightSidebar" />
            </div>
          </div>
          {/* List of items */}
          {console.log(businessListSelector,"businessListSelector")}
          <div className="padding30 overflow-Y">
            {businessListSelector?.data?.data?.records?.length > 0 ? (
              <>
                {businessListSelector?.data?.data?.records?.map(
                  (item, index) => (
                    <div
                      key={index}
                      className={`modal-item ${
                        (selectedBusiness?.name ||
                          businessListSelector?.data?.data?.records?.[0]
                            ?.name) === item?.name
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        if (item?.roleStatus === "accepted") {
                          onSelect(item);
                          // setModalOpen(false);
                        }
                      }}
                    >
                      <div className="d-flex justify-between align-center gap-16 mb-8">
                        <div>
                          <div className="fs-18 fw-500 mb-4">
                            {item?.businessName}
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
                      {item?.roleStatus === "pending" && (
                        <div className="d-flex align-center gap-10">
                          <div
                            className="btn w135"
                            onClick={() =>
                              handleAcceptDecline("accepted", item)
                            }
                          >
                            Accept
                          </div>
                          <div
                            className="btn w135 btnSecondary"
                            onClick={() => handleAcceptDecline("deny", item)}
                          >
                            Reject
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )}
                {businessListSelector?.data?.data?.businessRequestList?.map(
                  (item, index) => (
                    <div
                      key={`request-${index}`}
                      className="modal-item"
                    >
                      <div className="d-flex justify-between align-center gap-16 mb-8">
                        <div>
                          <div className="fs-18 fw-500 mb-4">
                            {item?.businessName}
                          </div>
                          <div className="fs-14 grey">
                            {[
                              item.businessDetails?.address?.addressLine1,
                              item.businessDetails?.address?.addressLine2,
                              item.businessDetails?.address?.locality,
                              item.businessDetails?.address?.administrativeDistrictLevel1,
                              item.businessDetails?.address?.country,
                              item.businessDetails?.address?.postalCode,
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          </div>
                        </div>
                        <div className="">
                          <img src={clockIcon} alt="rightactive" />
                        </div>
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
