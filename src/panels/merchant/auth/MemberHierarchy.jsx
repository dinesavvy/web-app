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
  console.log(createTeamSelector, "createTeamSelectorcreateTeamSelector");

  // const validationSchema = Yup.object({
  //   name: Yup.string().required("Name is required"),
  //   phone_number: Yup.string()
  //     .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
  //     .required("Phone number is required"),
  //   location: Yup.string().required("Location is required"),
  //   role: Yup.string().required("Role is required"),
  //   invitedDate: Yup.string(),
  //   joinedDate: Yup.string().required("Joined date is required"),
  // });

  useEffect(() => {
    if (addTeamModal === true || selectTeam) {
      let payload = {
        page: 1,
        limit: 10,
      };
      dispatch(businessListHandler(payload));
      dispatch(businessRoleListHandler());
    }
  }, [addTeamModal, selectTeam]);

  const handleFormSubmit = (values) => {
    let payload = {
      roleId: values?.role,
      name: values?.name?.trim(),
      phoneNumber: values?.phone_number,
    };
    dispatch(createTeamHandler(payload));
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
        <div className="overflowSidebar">
          {/* Add and Edit Member */}
          <Formik
            enableReinitialize
            initialValues={{
              name: getBusinessTeamSelector?.data?.data?.displayName || "",
              phone_number: selectTeam?.assignUserId?.phoneNumber || "",
              location: selectTeam?.locationId?._id || "",
              role: selectTeam?.roleId?._id || "",
              invitedDate: "",
              joinedDate:
                moment(selectTeam?.createdAt).format("DD-MM-YYYY") || "",
            }}
            // validationSchema={validationSchema}
            onSubmit={(values) => {
              handleFormSubmit(values);
            }}
          >
            {({ setFieldValue, resetForm }) => (
              <Form>
                <div className="divider2"></div>
                <div className="d-flex justify-between align-center">
                  <div className="fs-20 fw-600">
                    {addTeamModal ? "Add Member" : "Edit Member"}
                  </div>
                  <div
                    className="closeSidebar"
                    // onClick={addTeamModal ? addTeam : toggleMemberHierarchy}
                    onClick={() => {
                      // Reset the form
                      resetForm();
                      // Toggle the sidebar or close the member hierarchy
                      addTeamModal ? addTeam() : toggleMemberHierarchy();
                    }}
                  >
                    <img src={closeRightSidebar} alt="closeRightSidebar" />
                  </div>
                </div>
                <div className="mb-40">
                  <div className="mb-20">
                    <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                      Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      id="name"
                      className="input"
                    />
                    {/* <ErrorMessage
                      name="name"
                      component="div"
                      className="error"
                    /> */}
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
                      />
                      <div className="inputIcon">
                        <img src={phoneEdit} alt="" />
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
                    <Field as="select" name="location" className="input w-100">
                      <option value="">Select a location</option>
                      {/* Add location options here */}
                      {businessListSelector?.data?.data?.records?.map(
                        (location) => (
                          <option value={location?._id}>
                            {location?.businessName}
                          </option>
                        )
                      )}
                    </Field>
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
                          Pending
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
                            <Field
                              type="text"
                              name="joinedDate"
                              id="joinedDate"
                              className="input"
                            />
                            <div className="resendBtn fs-14">Resend</div>
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
