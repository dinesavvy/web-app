import { Breadcrumb, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import "../../../assets/css/merchant.css";
import backButton from "../../../assets/images/backButton.svg";
import editMember from "../../../assets/images/editMember.svg";
import deleteMember from "../../../assets/images/deleteMember.svg";
import breadCrumbIcon from "../../../assets/images/breadCrumb.svg";
import deleteModal from "../../../assets/images/deleteModal.svg";
import { useNavigate } from "react-router-dom";
import CommonModal from "./CommonModal";
import { useDispatch, useSelector } from "react-redux";
import { merchantTeamsHandler } from "../../../redux/action/merchantTeams";
import Loader from "../../../common/Loader/Loader";

const TeamMember = ({ merchantDetailsSelector, activeTab3, setActiveTab3 }) => {
  const [pagination, setPagination] = useState({ page: 1, limit: 12 });
  const [removeTeamMember, setRemoveTeamMember] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modal2Open, setModal2Open] = useState(false);
  const getMerchantId = localStorage.getItem("merchantId");

  const merchantTeamsSelector = useSelector(
    (state) => state?.merchantTeamsList
  );

  useEffect(() => {
    if (getMerchantId) {
      let payload = {
        locationId: getMerchantId,
      };
      dispatch(merchantTeamsHandler(payload));
    }
  }, []);

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ page, limit: pageSize });
  };

  return (
    <>
      {merchantTeamsSelector?.isLoading && <Loader />}
      <div className="tabPadding">
        <div className="d-flex align-center gap-20 mb-20 w-100">
          <img
            src={backButton}
            alt="backButton"
            className="cursor-pointer backButton"
            onClick={() => navigate("/admin/merchant/list")}
          />
          <div>
            <div className="fs-24 fw-600 mb-4">Team Members</div>
            <Breadcrumb
              className="cursor-pointer"
              separator={<img src={breadCrumbIcon} />}
              items={[
                {
                  title: "Merchants",
                  onClick: () => navigate("/admin/merchant/list"),
                },
                {
                  title: "Team Members",
                },
              ]}
            />
          </div>
        </div>
        <div className="merchantGrid">
          {merchantTeamsSelector?.data?.data?.records?.length > 0 ? (
            <>
              {merchantTeamsSelector?.data?.data?.records?.map(
                (item, index) => {
                  return (
                    <div className="card justify-between position-relative flexColumn d-flex" key={index}>
                      <div>

                      <div className="d-flex align-center gap-12">
                        <div className="initialName">
                          {item?.displayName
                            ?.split(" ")
                            .map((name) => name.charAt(0).toUpperCase())
                            .join("")}
                        </div>
                        <div>
                          <div className="fw-700">
                            {item?.displayName?.charAt(0).toUpperCase() +
                              item?.displayName?.slice(1).toLowerCase()}
                          </div>
                          <div className="fs-14 fw-300 o5">
                            {/* {moment(item?.createdAt).format("YYYY")} */}
                            {item?.roleData?.map(
                              (itemRoledata, indexRoleData) => {
                                return <>{itemRoledata?.roleName}</>;
                              }
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="divider2"></div>
                      <div className="d-flex justify-between align-center gap-12 fs-14 mb-10">
                        <div className="">Followers added:</div>
                        <div className=" fw-500">{item?.followersCount}</div>
                      </div>
                      <div className="d-flex justify-between align-center gap-12 fs-14 mb-20">
                        <div className="">Nudges sent:</div>
                        <div className=" fw-500">{item?.nudgeCount}</div>
                      </div>
                      </div>
                      <div className="d-flex align-center gap-10">
                        <div
                          className="btn btnSecondary w-100 gap-8"
                          onClick={() =>
                            navigate("/admin/merchant/edit-member", {
                              state: {
                                item: item,
                                merchantDetailsSelector:
                                  merchantDetailsSelector,
                                activeTabs: 5,
                              },
                            })
                          }
                        >
                          <img src={editMember} alt="" />
                          Edit
                        </div>
                        <div
                          className="deleteBtn btn"
                          onClick={() => {
                            setModal2Open(true);
                            setRemoveTeamMember(item);
                          }}
                        >
                          <img src={deleteMember} alt="" />
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </>
          ) : (
            <div className="noDataFound">No data found</div>
          )}
        </div>
        {merchantTeamsSelector?.data?.data?.records?.length > 0 && (
          <div className="d-flex align-center justify-between flexPagination">
            <div className="fs-16">
              Showing {pagination.page} to{" "}
              {merchantTeamsSelector?.data?.data?.recordsCount} of{" "}
              {merchantTeamsSelector?.data?.data?.recordsCount} Teams
            </div>
            <Pagination
              current={pagination.page}
              pageSize={pagination.limit}
              total={merchantTeamsSelector?.data?.data?.recordsCount}
              onChange={handlePaginationChange}
            />
          </div>
        )}
      </div>
      <CommonModal
        modal2Open={modal2Open}
        setModal2Open={setModal2Open}
        modalImage={deleteModal}
        removeTeamMember={removeTeamMember}
      />
    </>
  );
};

export default TeamMember;
