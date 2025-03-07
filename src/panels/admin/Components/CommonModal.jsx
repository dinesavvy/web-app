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
import { useLocation, useNavigate } from "react-router-dom";
import {
  removeSupplierAction,
  removeSupplierHandler,
} from "../../../redux/action/removeSupplier";
import {
  removeDistributorAction,
  removeDistributorHandler,
} from "../../../redux/action/removeDistributor";
import logoutModal from "../../../assets/images/logoutModal.svg";
import deleteModalSVG from "../../../assets/images/deleteModal.svg";
import {
  deleteBrandHandler,
  deleteBrandsAction,
} from "../../../redux/action/deleteBrand";
import {
  removeBrandSupplierAction,
  removeBrandSupplierHandler,
} from "../../../redux/action/supplierActions/removeBrandSupplier";
import { deleteDistributorBrandAction, deleteDistributorBrandHandler } from "../../../redux/action/distributorsAction/deleteDistributorBrand";

const CommonModal = ({
  modal2Open,
  setModal2Open,
  modalImage,
  removeTeamMember,
  merchantApp,
  selectTeam,
  removeSupplier,
  removeDistributor,
  showLogoutModal,
  deleteBrandModal,
  deleteModal,
  setDeleteModal,
  brandDetails,
  setIsDetailsOpen,
}) => {
  const messageApi = useCommonMessage();
  const getMerchantId = localStorage.getItem("merchantId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getSupplierLogin = localStorage.getItem("supplierLogin");
  const getAdminLogin = localStorage.getItem("adminLogin");
  const getDistriutorLogin = localStorage.getItem("distributorLogin");

  let getLocationDetails = location?.pathname;
  const getBrandListSelector = useSelector((state) => state?.supplierBrandList);

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
  const deleteBrandSelector = useSelector((state) => state?.deleteBrand);
  const removeBrandSupplier = useSelector(
    (state) => state?.removeBrandSupplier
  );

  const deleteDistributorBrand = useSelector(
    (state) => state?.deleteDistributorBrand
  );
  console.log(deleteDistributorBrand, "deleteDistributorBrand");

  const deleteTeam = () => {
    if (merchantApp) {
      dispatch(removeSupplierHandler({ teamMappingId: removeTeamMember?._id }));
      return;
    }

    if (getLocationDetails !== "/admin/suppliers" && removeTeamMember?._id) {
      dispatch(
        removeTeamMemberHandler({ teamMappingId: removeTeamMember._id })
      );
    }

    if (removeSupplier?._id) {
      dispatch(removeSupplierHandler({ supplierId: removeSupplier._id }));
    }

    if (removeDistributor?._id) {
      dispatch(
        removeDistributorHandler({ distributorId: removeDistributor._id })
      );
    }

    if (deleteModal && getAdminLogin) {
      let payload = {
        brandId: brandDetails?._id,
      };
      dispatch(deleteBrandHandler(payload));
    }
    if (deleteModal && getSupplierLogin) {
      let payload = {
        brandId: brandDetails?._id,
      };
      dispatch(removeBrandSupplierHandler(payload));
    }

    if (deleteModal && getDistriutorLogin) {
      let payload = {
        brandId: brandDetails?._id,
      };
      dispatch(deleteDistributorBrandHandler(payload));
    }
  };

  const logout = () => {
    navigate("/");
    localStorage.clear();
    setModal2Open(false);
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

  // Admin Remove Brand useEffect
  useEffect(() => {
    if (deleteBrandSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: deleteBrandSelector?.data?.message,
      });
      dispatch(deleteBrandsAction.deleteBrandReset());
      setDeleteModal(false);
      setIsDetailsOpen(false);
    }
  }, [deleteBrandSelector]);

  // Supplier Remove Brand useEffect
  useEffect(() => {
    if (removeBrandSupplier?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: removeBrandSupplier?.data?.message,
      });
      dispatch(removeBrandSupplierAction.removeBrandSupplierReset());
      setDeleteModal(false);
      setIsDetailsOpen(false);
    }
  }, [removeBrandSupplier]);

  // Distributor Remove brand useEffect
  useEffect(() => {
    if (deleteDistributorBrand?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: deleteDistributorBrand?.data?.message,
      });
      dispatch(deleteDistributorBrandAction.deleteDistributorBrandReset());
      setDeleteModal(false);
      setIsDetailsOpen(false);
    }
  }, [deleteDistributorBrand]);

  return (
    <>
      {(removeTeamMemberSelector?.isLoading ||
        removeSupplierSelector?.isLoading ||
        removeDistributorSelector?.isLoading ||
        removeBrandSupplier?.isLoading ||
        deleteDistributorBrand?.isLoading) && <Loader />}
      <Modal
        centered
        open={modal2Open || deleteModal}
        onOk={() => {
          if (deleteModal) {
            setDeleteModal(false);
          } else {
            setModal2Open(false);
          }
        }}
        onCancel={() => {
          if (deleteModal) {
            setDeleteModal(false);
          } else {
            setModal2Open(false);
          }
        }}
        closable={false}
        footer={null}
      >
        <div className="modalbg">
          <img src={modalbg} alt="" />
        </div>

        <div className="modalImage mb-30">
          <img
            src={
              deleteModal
                ? deleteModalSVG
                : !showLogoutModal
                ? modalImage
                : logoutModal
            }
            alt=""
          />
        </div>

        {!showLogoutModal ? (
          <div className="text-center mb-30">
            <div className="fs-26 fw-700 mb-15">
              {getLocationDetails === "/admin/suppliers"
                ? "Delete Supplier"
                : getLocationDetails === "/admin/distributors"
                ? "Delete Distributor"
                : getLocationDetails === "/admin/brands" ||
                  getLocationDetails === "/supplier/brands" ||
                  getLocationDetails === "/distributors/brands"
                ? "Remove Brands"
                : "Delete Team Member"}
            </div>

            {deleteModal && (
              <div className="fs-18">
                Are you sure you want to remove{" "}
                <span className="fw-600">
                  {brandDetails?.brandName
                    ? brandDetails?.brandName.charAt(0).toUpperCase() +
                      brandDetails?.brandName.slice(1)
                    : ""}
                  ?
                </span>{" "}
              </div>
            )}
            {!deleteModal && (
              <div className="fs-18">
                Are you sure you want to remove{" "}
                <span className="fw-600">
                  {(() => {
                    const name =
                      removeTeamMember?.displayName ||
                      removeSupplier?.supplierName ||
                      removeDistributor?.distributorName ||
                      "";
                    return name.charAt(0).toUpperCase() + name.slice(1);
                  })()}
                </span>{" "}
                from the{" "}
                {getLocationDetails === "/admin/suppliers"
                  ? "supplier?"
                  : getLocationDetails === "/admin/distributors"
                  ? "distributor?"
                  : "team?"}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center mb-30">
            <div className="fs-26 fw-700 mb-15">
              Are you sure you want to Logout?
            </div>

            <div className="fs-18">This will log you out of the account </div>
          </div>
        )}

        {!showLogoutModal ? (
          <div className="div d-flex align-center gap-16">
            <div
              className="btn w-100"
              onClick={() => {
                if (deleteModal) {
                  setDeleteModal(false);
                } else {
                  setModal2Open(false);
                }
              }}
            >
              Cancel
            </div>
            <div className="btn btnSecondary w-100" onClick={deleteTeam}>
              Delete
            </div>
          </div>
        ) : (
          <div className="div d-flex align-center gap-16">
            <div className="btn w-100" onClick={logout}>
              Yes
            </div>
            <div
              className="btn btnSecondary w-100"
              onClick={() => {
                if (deleteModal) {
                  setDeleteModal(false);
                } else {
                  setModal2Open(false);
                }
              }}
            >
              Cancel
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default CommonModal;
