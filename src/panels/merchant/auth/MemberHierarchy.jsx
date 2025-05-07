import React, { useEffect } from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import phoneEdit from "../../../assets/images/phoneEdit.svg";
import editMember from "../../../assets/images/editMember.svg";
import deleteMember from "../../../assets/images/deleteMember.svg";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { businessListHandler } from "../../../redux/action/businessAction/businessListSlice";
import { useDispatch, useSelector } from "react-redux";
import { businessRoleListHandler } from "../../../redux/action/businessAction/businessRoleList";
// import Loader from "../../../common/Loader/Loader";
import {
  createTeamAction,
  createTeamHandler,
} from "../../../redux/action/businessAction/createTeam";
import { useCommonMessage } from "../../../common/CommonMessage";
import { removeTeamMemberHandler } from "../../../redux/action/businessAction/removeTeamMember";
import moment from "moment";
import { businessTeamListHandler } from "../../../redux/action/businessAction/businessTeamList";
import {
  updateTeamBusinessAction,
  updateTeamBusinessHandler,
} from "../../../redux/action/businessAction/updateTeamBusiness";
import {
  businessResendInviteLinkAction,
  businessResendInviteLinkHandler,
} from "../../../redux/action/businessAction/businessResendInviteLink";

const MemberHierarchy = ({
  isMemberHierarchy,
  toggleMemberHierarchy,
  selectTeam,
  addTeamModal,
  setAddTeamModal,
  addTeam,
  getBusinessTeamSelector,
}) => {
  const dispatch = useDispatch();
  const messageApi = useCommonMessage();

  const businessListSelector = useSelector((state) => state?.businessList);
  const businessRoleListSelector = useSelector(
    (state) => state?.businessRoleList
  );
  const createTeamSelector = useSelector((state) => state?.createTeam);
  const updateTeamBusinessSelector = useSelector(
    (state) => state?.updateTeamBusiness
  );

  const businessResendInviteLinkSelector = useSelector(
    (state) => state?.businessResendInviteLink
  );
  const getSelectedBusiness = JSON.parse(
    localStorage.getItem("selectedBusiness")
  );

  
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    // phone_number: Yup.string()
    //   .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    //   .required("Phone number is required"),
    // location: Yup.string().required("Location is required"),
    // role: Yup.string().required("Role is required"),
    // invitedDate: Yup.string(),
    // joinedDate: Yup.string().required("Joined date is required"),
  });

  useEffect(() => {
    if (addTeamModal === true) {
      let payload = {
        page: 1,
        limit: 10,
      };
      dispatch(businessListHandler(payload));
      dispatch(businessRoleListHandler());
    }
  }, [addTeamModal]);

  const handleFormSubmit = (values) => {
    if (addTeamModal) {
      let payload = {
        roleId: values?.role,
        name: values?.name?.trim(),
        phoneNumber: values?.phone_number,
      };
      dispatch(createTeamHandler(payload));
    } else if (!addTeamModal) {
      let payload = {
        teamMappingId: selectTeam?._id,
        roleId: values?.role,
        name: values?.name,
        phoneNumber: values?.phone_number,
        locationId: selectTeam?.locationId?._id,
      };
      dispatch(updateTeamBusinessHandler(payload));
    }
  };

  useEffect(() => {
    if (createTeamSelector?.message) {
      messageApi.open({
        type: "error",
        content: createTeamSelector?.message,
      });
      dispatch(createTeamAction.createTeamReset());
    } else if (createTeamSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: createTeamSelector?.data?.message,
      });
      setAddTeamModal(false);
      dispatch(businessTeamListHandler());
      dispatch(createTeamAction.createTeamReset());
    }
  }, [createTeamSelector]);


  useEffect(() => {
    if (updateTeamBusinessSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: updateTeamBusinessSelector?.data?.message,
      });
      toggleMemberHierarchy();
      dispatch(businessTeamListHandler());
      dispatch(updateTeamBusinessAction.updateTeamBusinessReset());
    } else if (updateTeamBusinessSelector?.message?.status===400) {
      messageApi.open({
        type: "error",
        content: updateTeamBusinessSelector?.message?.response?.data?.message,
      });
      dispatch(updateTeamBusinessAction.updateTeamBusinessReset());
    }
  }, [updateTeamBusinessSelector]);

  useEffect(() => {
    if (businessResendInviteLinkSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: businessResendInviteLinkSelector?.data?.message,
      });
      toggleMemberHierarchy();
      dispatch(businessTeamListHandler());
      dispatch(businessResendInviteLinkAction.businessResendInviteLinkReset());
    } else if (businessResendInviteLinkSelector?.message) {
      messageApi.open({
        type: "error",
        content: businessResendInviteLinkSelector?.message,
      });
      dispatch(businessResendInviteLinkAction.businessResendInviteLinkReset());
    }
  }, [businessResendInviteLinkSelector]);

  const resendInviteLink = () => {
    let payload = {
      teamMappingId: selectTeam?._id,
    };
    dispatch(businessResendInviteLinkHandler(payload));
  };

  return (
    <>
      {isMemberHierarchy && (
        <div className="overlay2" onClick={toggleMemberHierarchy}></div>
      )}

      {addTeamModal && <div className="overlay2" onClick={addTeam}></div>}

      {/* Sidebar */}
      <div
        className={`rightSidebar ${
          isMemberHierarchy || addTeamModal ? "open" : ""
        }`}
      >
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">
            {addTeamModal ? "Add Member" : "Edit Member"}
          </div>

          <div
            className="closeSidebar"
            // onClick={addTeamModal ? addTeam : toggleMemberHierarchy}
            onClick={() => {
              // Reset the form
              // resetForm({});
              // Toggle the sidebar or close the member hierarchy
              addTeamModal ? addTeam() : toggleMemberHierarchy();
            }}
          >
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowSidebar">
          {/* Add and Edit Member */}
          <Formik
            enableReinitialize
            initialValues={{
              name: getBusinessTeamSelector?.data?.data?.displayName || "",
              phone_number: selectTeam?.assignUserId?.phoneNumber || "",
              location: "",
              role: selectTeam?.roleId?._id || "",
              invitedDate:
                moment(selectTeam?.createdAt).format("DD-MM-YYYY") || "",
              joinedDate: selectTeam?.status || "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleFormSubmit(values);
            }}
          >
            {({ setFieldValue, resetForm }) => (
              <Form>
                <div className="mb-40">
                  <div className="mb-20">
                    <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                      Name*
                    </label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      id="name"
                      className="input"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="mb-20">
                    <label
                      htmlFor="phone_number"
                      className="grey mb-10 fs-16 fw-500"
                    >
                      Phone number
                    </label>
                    <div className="position-relative">
                      <Field
                        type="text"
                        name="phone_number"
                        placeholder="Enter your phone number"
                        id="phone_number"
                        className="input"
                        disabled={
                          selectTeam?.status === "accepted" ? true : false
                        }
                      />
                      <div className="inputIcon">
                        <img src={phoneEdit} alt="" className="h-100 " />
                      </div>
                    </div>
                    {/* <ErrorMessage
                      name="phone_number"
                      component="div"
                      className="error"
                    /> */}
                  </div>
                  <div className="mb-20">
                    <label
                      htmlFor="location"
                      className="grey mb-10 fs-16 fw-500"
                    >
                      Location
                    </label>
                    {/* <Field name="location" className="input w-100" disabled> */}
                    {/* <option value="">Select a location</option> */}
                    {/* Add location options here */}
                    {/* {businessListSelector?.data?.data?.records?.map(
                        (location) => (
                          <option value={location?._id}>
                            {location?.businessName}
                          </option>
                        )
                      )} */}
                    {/* <Field
                      type="text"
                      name="location"
                      id="location"
                      className="input"
                      disabled
                    /> */}

                    <div className="input">
                      {getSelectedBusiness?.businessName ||
                        selectTeam?.locationId?.name}
                    </div>

                    {/* </Field> */}
                    {/* <ErrorMessage
                      name="location"
                      component="div"
                      className="error"
                    /> */}
                  </div>
                  <div className="mb-20">
                    <label htmlFor="role" className="grey mb-10 fs-16 fw-500">
                      Role
                    </label>
                    <Field as="select" name="role" className="input w-100">
                      <option value="">Select a role</option>
                      {/* Add role options here */}
                      {businessRoleListSelector?.data?.data?.records?.map(
                        (location) => (
                          <option value={location?._id}>
                            {location?.title}
                          </option>
                        )
                      )}
                    </Field>
                    {/* <ErrorMessage
                      name="role"
                      component="div"
                      className="error"
                    /> */}
                  </div>
                  {!addTeamModal && (
                    <>
                      <div className="mb-20">
                        <label
                          htmlFor="invitedDate"
                          className="grey mb-10 fs-16 fw-500"
                        >
                          Date Invited
                        </label>
                        <div className="fixedDate input position-relative">
                          {moment(selectTeam?.createdAt).format("DD-MM-YYYY")}
                        </div>
                      </div>
                      {selectTeam?.status === "pending" && (
                        <div className="mb-20">
                          <label
                            htmlFor="joinedDate"
                            className="grey mb-10 fs-16 fw-500"
                          >
                            Date Joined
                          </label>
                          <div className="fixedDate position-relative w-100">
                            <div className="fixedDate input position-relative">
                              {selectTeam?.status}
                            </div>
                            <div
                              className="resendBtn fs-14"
                              onClick={() => resendInviteLink()}
                            >
                              Resend
                            </div>
                          </div>
                          <ErrorMessage
                            name="joinedDate"
                            component="div"
                            className="error"
                          />
                        </div>
                      )}
                      {selectTeam?.status === "accepted" && (
                        <div className="mb-20">
                          <label
                            htmlFor="joinedDate"
                            className="grey mb-10 fs-16 fw-500"
                          >
                            Date Joined
                          </label>
                          <div className="fixedDate position-relative w-100">
                            <div className="fixedDate input position-relative">
                              {moment(selectTeam?.acceptedAt).format(
                                "DD-MM-YYYY"
                              )}
                            </div>
                          </div>
                          <ErrorMessage
                            name="joinedDate"
                            component="div"
                            className="error"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
                {/* Add Details */}
                {addTeamModal ? (
                  <button type="submit" className="btn w-100">
                    Add Member
                  </button>
                ) : (
                  <>
                    <div className="d-flex align-center gap-10">
                      <button type="submit" className="btn w-100 gap-8">
                        Update
                      </button>
                      {/* <div className="deleteBtn btn" onClick={removeTeamMember}>
                        <img src={deleteMember} alt="" />
                      </div> */}
                    </div>
                  </>
                )}
              </Form>
            )}
          </Formik>

          {/* Update Details*/}
        </div>
      </div>
    </>
  );
};

export default MemberHierarchy;
