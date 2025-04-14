import React, { useEffect, useState } from "react";
import addCircle from "../../../assets/images/addCircle.svg";
import arrowRight from "../../../assets/images/arrowRight.svg";
import MemberHierarchy from "./MemberHierarchy";
import MemberPermissions from "./MemberPermissions";
import { businessTeamListHandler } from "../../../redux/action/businessAction/businessTeamList";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/Loader/Loader";
import { getBusinessTeamHandler } from "../../../redux/action/businessAction/getBusinessTeam";
import editMember from "../../../assets/images/editMember.svg";
import deleteMember from "../../../assets/images/deleteMember.svg";
import deleteModal from "../../../assets/images/deleteModal.svg";
import CommonModal from "../../admin/Components/CommonModal";
import { businessRoleListHandler } from "../../../redux/action/businessAction/businessRoleList";

const Hierarchy = () => {
  const dispatch = useDispatch();
  const [isMemberHierarchy, setIsMemberHierarchy] = useState(false);
  const [addTeamModal, setAddTeamModal] = useState(false);
  const [removeTeamMember, setRemoveTeamMember] = useState({});
  const [merchantApp, setMerchantApp] = useState(false);
  const [isMemberPermissions, setIsMemberPermissions] = useState(false);
  const [selectTeam, setSelectTeam] = useState();
  const [modal2Open, setModal2Open] = useState(false);
  const [rolesItems, setRolesItems] = useState();

  const getSelectedBusinessData = JSON.parse(
    localStorage.getItem("selectedBusiness")
  );

  const updateTeamBusinessSelector = useSelector(
    (state) => state?.updateTeamBusiness
  );

  const businessTeamListSelector = useSelector(
    (state) => state?.businessTeamList
  );
  const getBusinessTeamSelector = useSelector(
    (state) => state?.getBusinessTeam
  );

  const businessRoleListSelector = useSelector(
    (state) => state?.businessRoleList
  );

  const toggleMemberHierarchy = (item) => {
    setSelectTeam(item);
    setIsMemberHierarchy((prevState) => !prevState);
  };

  useEffect(() => {
    if (isMemberHierarchy) {
      let payload = {
        teamMappingId: selectTeam?._id,
      };
      dispatch(getBusinessTeamHandler(payload));
    }
  }, [isMemberHierarchy]);

  const addTeam = () => {
    setAddTeamModal((prevState) => !prevState);
  };

  useEffect(() => {
    if (isMemberHierarchy) {
      document.body.classList.add("overflow-Hidden");
    } else {
      document.body.classList.remove("overflow-Hidden");
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-Hidden");
    };
  }, [isMemberHierarchy]);

  useEffect(() => {
    dispatch(businessRoleListHandler());
  }, []);

  const toggleMemberPermissions = (item) => {
    setRolesItems(item);
    setIsMemberPermissions((prevState) => !prevState);
  };

  useEffect(() => {
    dispatch(businessTeamListHandler());
    if (isMemberPermissions) {
      document.body.classList.add("overflow-Hidden");
    } else {
      document.body.classList.remove("overflow-Hidden");
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-Hidden");
    };
  }, [isMemberPermissions]);

  return (
    <>
      {(businessTeamListSelector?.isLoading || updateTeamBusinessSelector?.isLoading) && <Loader />}
      <div className="dashboard">
        <div className="tabPadding mb-30">
          <div className="fs-24 fw-600">Hierarchy </div>

          <div className="divider2"></div>
          <div className="d-flex align-center gap-20 mb-20">
            <div className="profileImage">
              {JSON.parse(
                localStorage.getItem("loginResponse")
              )?.firstName?.charAt(0)}
              {JSON.parse(
                localStorage.getItem("loginResponse")
              )?.lastName?.charAt(0)}
            </div>
            <div>
              <div className="fs-24 fw-600 mb-10">
                {JSON.parse(localStorage.getItem("loginResponse")).firstName}
              </div>
              <div className="positionTag fs-16 fw-600">
                {getSelectedBusinessData?.roleTitle}
              </div>
            </div>
          </div>
          <div className="d-flex align-center justify-between mb-20">
            <div className="fs-20 fw-600">My team</div>
            <div
              className="addCircle cursor-pointer"
              onClick={() => addTeam("")}
            >
              <img src={addCircle} alt="" />
            </div>
          </div>
          <div className="merchantGrid">
            {businessTeamListSelector?.data?.data?.records?.length > 0 ? (
              <>
                {businessTeamListSelector?.data?.data?.records?.map(
                  (item, index) => {
                    return (
                      <div className="card" key={index}>
                        <div className="d-flex justify-between gap-12">
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
                              <div className="fs-14  grey">
                                {item?.roleId?.title}
                              </div>
                              {/* <div className="fs-14  grey">
                              {item?.status}
                            </div> */}

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

                          <div className="blueTag fs-14">
                            {item?.status
                              ? item.status.charAt(0).toUpperCase() +
                                item.status.slice(1)
                              : ""}
                          </div>
                        </div>
                        <div className="divider2"></div>
                        <div className="d-flex align-center gap-10">
                          <div
                            className="btn btnSecondary w-100 gap-8"
                            onClick={() => toggleMemberHierarchy(item)}
                            // onClick={() =>
                            //   navigate("/admin/merchant/edit-member", {
                            //     state: {
                            //       item: item,
                            //       merchantDetailsSelector:
                            //         merchantDetailsSelector,
                            //       activeTabs: 5,
                            //     },
                            //   })
                            // }
                          >
                            <img src={editMember} alt="" />
                            Edit
                          </div>
                          <div
                            className="deleteBtn btn"
                            onClick={() => {
                              setModal2Open(true);
                              setRemoveTeamMember(item);
                              setMerchantApp(true);
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
          <div className="divider2"></div>
          <div className="fs-20 fw-600 mb-20">My Roles</div>
          <div className="merchantGrid">
            {businessRoleListSelector?.data?.data?.records?.map(
              (item, index) => {
                return (
                  <>
                    <div
                      className="myteamFlex"
                      onClick={() => toggleMemberPermissions(item)}
                    >
                      <div className="d-flex align-center gap-8">
                        <div>
                          <div className="fs-16 ">{item?.title}</div>
                        </div>
                      </div>
                      <div className="d-flex align-center gap-4">
                        <img
                          src={arrowRight}
                          alt="arrowRight"
                          className="arrowRight"
                        />
                      </div>
                    </div>
                  </>
                );
              }
            )}
          </div>
        </div>
      </div>
      <MemberHierarchy
        isMemberHierarchy={isMemberHierarchy}
        toggleMemberHierarchy={toggleMemberHierarchy}
        selectTeam={selectTeam}
        setAddTeamModal={setAddTeamModal}
        addTeamModal={addTeamModal}
        addTeam={addTeam}
        getBusinessTeamSelector={getBusinessTeamSelector}
      />
      <MemberPermissions
        isMemberPermissions={isMemberPermissions}
        setIsMemberPermissions={setIsMemberPermissions}
        toggleMemberPermissions={toggleMemberPermissions}
        rolesItems={rolesItems}
        setRolesItems={setRolesItems}
      />
      <CommonModal
        modal2Open={modal2Open}
        setModal2Open={setModal2Open}
        modalImage={deleteModal}
        removeTeamMember={removeTeamMember}
        merchantApp={merchantApp}
        selectTeam={selectTeam}
      />
    </>
  );
};

export default Hierarchy;
