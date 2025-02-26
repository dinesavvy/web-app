import React, { useEffect } from "react";
import modalbg from "../../../assets/images/modalbg.png";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTeamMemberAction,
  removeTeamMemberHandler,
} from "../../../redux/action/removeTeamMember";
import Loader from "../../../common/Loader/Loader";
import { useCommonMessage } from "../../../common/CommonMessage";
import { merchantTeamsHandler } from "../../../redux/action/merchantTeams";
import {
  removeTeamMemberBusinessAction,
  removeTeamMemberBusinessHandler,
} from "../../../redux/action/businessAction/removeTeamMember";
import { businessTeamListHandler } from "../../../redux/action/businessAction/businessTeamList";
import { useLocation } from "react-router-dom";
import {
  removeSupplierAction,
  removeSupplierHandler,
} from "../../../redux/action/removeSupplier";
import {
  removeDistributorAction,
  removeDistributorHandler,
} from "../../../redux/action/removeDistributor";

const CommonModal = ({
  modal2Open,
  setModal2Open,
  modalImage,
  removeTeamMember,
  merchantApp,
  selectTeam,
  removeSupplier,
  removeDistributor,
}) => {
  const messageApi = useCommonMessage();
  const getMerchantId = localStorage.getItem("merchantId");
  const dispatch = useDispatch();

  const location = useLocation();

  let getLocationDetails = location?.pathname;

  const removeTeamMemberSelector = useSelector(
    (state) => state?.removeTeamMember
  );

  const removeDistributorSelector = useSelector(
    (state) => state?.removeDistributor
  );

  const removeTeamMemberBusinessSelector = useSelector(
    (state) => state?.removeTeamMemberBusiness
  );


  const removeSupplierSelector = useSelector((state) => state?.removeSupplier);

  const deleteTeam = () => {
    if (merchantApp) {
      dispatch(removeSupplierHandler({ teamMappingId: removeTeamMember?._id }));
      return;
    }
  
    if (getLocationDetails !== "/admin/suppliers" && removeTeamMember?._id) {
      dispatch(removeTeamMemberHandler({ teamMappingId: removeTeamMember._id }));
    }
  
    if (removeSupplier?._id) {
      dispatch(removeSupplierHandler({ supplierId: removeSupplier._id }));
    }
  
    if (removeDistributor?._id) {
      dispatch(removeDistributorHandler({ distributorId: removeDistributor._id }));
    }
  };
  

  useEffect(() => {
    if (!merchantApp) {
      if (removeTeamMemberSelector?.data?.statusCode === 200) {
        messageApi.open({
          type: "success",
          content: removeTeamMemberSelector?.data?.message,
        });
        setModal2Open(false);
        dispatch(removeTeamMemberAction.removeTeamMemberReset());
        if (getMerchantId) {
          let payload = {
            locationId: getMerchantId,
          };
          dispatch(merchantTeamsHandler(payload));
        }
      } else if (removeSupplierSelector?.data?.statusCode === 200) {
        messageApi.open({
          type: "success",
          content: removeSupplierSelector?.data?.message,
        });
        setModal2Open(false);
        dispatch(removeSupplierAction.removeSupplierReset());
      } else if (removeDistributorSelector?.data?.statusCode === 200) {
        messageApi.open({
          type: "success",
          content: removeDistributorSelector?.data?.message,
        });
        setModal2Open(false);
        dispatch(removeDistributorAction.removeDistributorReset());
      }
    } else if (merchantApp) {
      if (removeTeamMemberBusinessSelector?.data?.statusCode === 200) {
        messageApi.open({
          type: "success",
          content: removeTeamMemberBusinessSelector?.data?.message,
        });
        setModal2Open(false);
        dispatch(
          removeTeamMemberBusinessAction.removeTeamMemberBusinessReset()
        );
        dispatch(businessTeamListHandler());
      }
    }
  }, [
    removeTeamMemberSelector,
    removeTeamMemberBusinessSelector,
    merchantApp,
    removeSupplierSelector,
    removeDistributorSelector,
  ]);

  return (
    <>
      {(removeTeamMemberSelector?.isLoading ||
        removeSupplierSelector?.isLoading ||
        removeDistributorSelector?.isLoading) && <Loader />}
      <Modal
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        closable={false} // Removes the close button in the header
        footer={null}
      >
        <div className="modalbg">
          <img src={modalbg} alt="" />
        </div>
        <div className="modalImage mb-30">
          <img src={modalImage} alt="" />
        </div>
        <div className="text-center mb-30">
          <div className="fs-26 fw-700 mb-15">
            {getLocationDetails === "/admin/suppliers"
              ? "Delete Team Supplier"
              : "Delete Team Member"}
          </div>
          <div className="fs-18">
            Are you sure you want to remove{" "}
            <span className="fw-600">
              {removeTeamMember?.displayName ||
                removeSupplier?.supplierName ||
                removeDistributor?.distributorName}
            </span>{" "}
            from the{" "}
            {getLocationDetails === "/admin/suppliers"
              ? "supplier?"
              : getLocationDetails === "/admin/distributors"
              ? "distributor?"
              : "team?"}
          </div>
        </div>
        <div className="div d-flex align-center gap-16">
          <div className="btn w-100" onClick={() => setModal2Open(false)}>
            Cancel
          </div>
          <div className="btn btnSecondary w-100" onClick={deleteTeam}>
            Delete
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CommonModal;
