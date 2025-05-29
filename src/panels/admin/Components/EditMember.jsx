import { Breadcrumb, DatePicker, Space } from "antd";
import React, { useEffect, useState } from "react";
import "../../../assets/css/merchant.css";
import backButton from "../../../assets/images/backButton.svg";
import breadCrumbIcon from "../../../assets/images/breadCrumb.svg";
import CustomSelect from "./CustomSelect";
import datePicker from "../../../assets/images/datePicker.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";
import { roleListHandler } from "../../../redux/action/roleList";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/Loader/Loader";
import * as Yup from "yup";
import {
  updateTeamAction,
  updateTeamHandler,
} from "../../../redux/action/updateTeam";
import {
  resendInviteLinkAction,
  resendInviteLinkHandler,
} from "../../../redux/action/resendInviteLink";
import { useCommonMessage } from "../../../common/CommonMessage";
import { handleKeyPressSpace } from "../../../common/commonFunctions/CommonFunctions";

const EditMember = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone_number: Yup.string().required("Phone number is required"),
  });

  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const messageApi = useCommonMessage();
  const roleListSelector = useSelector((state) => state?.roleList);
  const resendInviteLinkSelector = useSelector(
    (state) => state?.resendInviteLink
  );

  const updateTeamSelector = useSelector((state) => state?.updateTeam);

  useEffect(() => {
    if (state) {
      let payload = {
        businessId: state?.merchantDetailsSelector?.data?.data?.businessId,
      };
      dispatch(roleListHandler(payload));
    }
  }, []);

  const handleFormSubmit = (values) => {
    const selectedRole = roleListSelector?.data?.data?.records?.find(
      (role) => role.title === values.role
    );

    let payload = {
      teamMappingId: state?.item?._id,
      roleId: selectedRole?._id,
      name: values?.name,
      phoneNumber: values?.phone_number,
      locationId:
        state?.merchantDetailsSelector?.data?.data?._id ||
        localStorage.getItem("merchantId"),
    };
    dispatch(updateTeamHandler(payload));
  };

  const resendInviteLink = () => {
    let payload = {
      teamMappingId: state?.item?._id,
    };
    dispatch(resendInviteLinkHandler(payload));
  };

  useEffect(() => {
    if (resendInviteLinkSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: resendInviteLinkSelector?.data?.message,
      });
      dispatch(resendInviteLinkAction.resendInviteReset());
    }
  }, [resendInviteLinkSelector]);

  useEffect(() => {
    if (updateTeamSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: updateTeamSelector?.data?.message,
      });
      dispatch(updateTeamAction.updateTeamReset());
      navigate("/admin/merchant/details");
    } else if (updateTeamSelector?.data?.statusCode === 400) {
      messageApi.open({
        type: "error",
        content: updateTeamSelector?.message,
      });
      dispatch(updateTeamAction.updateTeamReset());
    } else if (updateTeamSelector?.message) {
      messageApi.open({
        type: "error",
        content: updateTeamSelector?.message,
      });
      dispatch(updateTeamAction.updateTeamReset());
    }
  }, [updateTeamSelector]);

  return (
    <>
      {(roleListSelector?.isLoading ||
        resendInviteLinkSelector?.isLoading ||
        updateTeamSelector?.isLoading) && <Loader />}
      <Formik
        enableReinitialize
        initialValues={{
          name: state?.item?.displayName || "",
          phone_number: state?.item?.userInfo?.phoneNumber || "",
          location:
            state?.item?.locationData?.map((item) => item?.businessName) || "",
          invitedDate: moment(state?.item?.createdAt).format("DD-MM-YYYY"),
          joinedDate: "",
          permissions: {},
          role: state?.item?.roleData?.[0]?.roleName || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, formikBag) => {
          handleFormSubmit(values, formikBag);
        }}
      >
        {({
          isSubmitting,
          setFieldValue,
          values,
          /* and other goodies */
        }) => {
          useEffect(() => {
            if (values?.role) {
              const selectedRole = roleListSelector?.data?.data?.records?.find(
                (role) => role.title === values.role
              );
              if (selectedRole) {
                setFieldValue("permissions", selectedRole.permissions || {});
              }
            }
          }, [values.role, setFieldValue, roleListSelector]);
          return (
            <Form>
              <div className="dashboard">
                <div className="tabPadding mb-30">
                  <div className="d-flex align-center gap-20 mb-30 w-100">
                    <img
                      src={backButton}
                      alt="backButton"
                      className="cursor-pointer backButton"
                      onClick={() => navigate("/admin/merchant/details")}
                    />
                    <div>
                      <div className="fs-24 fw-600 mb-4">
                        Edit Team Member Details
                      </div>
                      <Breadcrumb
                        separator={<img src={breadCrumbIcon} />}
                        items={[
                          {
                            title: "Team Members",
                            onClick: () => navigate("/admin/merchant/details"),
                          },
                          {
                            title: "Details",
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="divider2 mb-30"></div>

                  <div className="d-flex align-center gap-12 mb-30">
                    <div className="initialName">
                      {state?.item?.displayName
                        ?.split(" ")
                        .map((name) => name[0]?.toUpperCase())
                        .join("")}
                    </div>
                    <div>
                      <div className="fw-700">
                        {state?.item?.displayName?.charAt(0).toUpperCase() +
                          state?.item?.displayName?.slice(1)}
                      </div>
                      <div className="fs-14 fw-300 o5">
                        {moment(state?.item?.createdAt).format("MMMM,YYYY")}
                      </div>
                    </div>
                  </div>

                  <div className="inputGrid gap-20">
                    <div>
                      <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                        Name*
                      </label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        id="name"
                        onKeyDown={handleKeyPressSpace}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="mt-10 fw-500 fs-14 error"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="number"
                        className="grey mb-10 fs-16 fw-500"
                      >
                        Phone number*
                      </label>
                      <Field
                        type="text"
                        name="phone_number"
                        placeholder="Enter your phone number"
                        id="phone_number"
                        className="input"
                        onKeyDown={handleKeyPressSpace}
                      />
                      <ErrorMessage
                        name="phone_number"
                        component="div"
                        className="mt-10 fw-500 fs-14 error"
                      />
                    </div>
                    <div>
                      <div>
                        <label
                          htmlFor="location"
                          className="grey mb-10 fs-16 fw-500"
                        >
                          location
                        </label>
                        <Field
                          as="select"
                          name="location"
                          className="input w-100"
                          onChange={(e) => {
                            const selectedTitle = e.target.value;
                            setFieldValue("location", selectedTitle); // Update role
                          }}
                        >
                          <option value="">Select a location</option>
                          {state?.item?.locationData?.map((role) => (
                            <option value={role?.businessName}>
                              {role?.businessName}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="location"
                        className="grey mb-10 fs-16 fw-500"
                      >
                        Role
                      </label>
                      <Field
                        as="select"
                        name="role"
                        className="input w-100"
                        onChange={(e) => {
                          const selectedTitle = e.target.value || values.role;
                          const selectedRole =
                            roleListSelector?.data?.data?.records?.find(
                              (role) => role.title === selectedTitle
                            );
                          setFieldValue("role", selectedTitle); // Update role
                          setFieldValue(
                            "permissions",
                            selectedRole?.permissions || {}
                          ); // Update permissions
                        }}
                        value={values.role}
                      >
                        {/* <option value="">Select a role</option> */}
                        {roleListSelector?.data?.data?.records?.map((role) => (
                          <option key={role._id} value={role.title}>
                            {role.title}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <div>
                      <label
                        htmlFor="invitedDate"
                        className="grey mb-10 fs-16 fw-500"
                      >
                        Date Invited
                      </label>
                      <div className="fixedDate position-relative w-100">
                        <Field
                          type="text"
                          name="invitedDate"
                          // placeholder="Enter your phone number"
                          id="invitedDate"
                          className="input"
                          disabled
                        />
                        {/* {state?.item?.status === "pending" && ( */}
                        <div
                          className="resendBtn fs-14"
                          onClick={resendInviteLink}
                        >
                          Resend
                        </div>
                        {/* )} */}
                      </div>
                      {/* <div className="fixedDate input  position-relative">
                      Pending <div className="resendBtn fs-14" onClick={resendInviteLink}>Resend</div>
                    </div> */}
                      {/* <div className="position-relative positionBlock">
                      <Space direction="vertical" className="noicon">
                        <DatePicker
                          className="customTime input"
                          placeholder="YYYY-MM-DD"
                          format="YYYY-MM-DD"
                          value={state?.item?.createdAt ? dayjs(state?.item?.createdAt) : null} 
                          onChange={(date, dateString) => {
                            setFieldValue("invitedDate", dateString);
                          }}
                          disabledDate={(current) => {
                            return current && current < moment().startOf("day");
                          }}
                          allowClear={false}
                        />
                        <img
                          src={datePicker}
                          alt="datePicker"
                          className="datePickerImg"
                        />
                      </Space>
                    </div> */}
                    </div>
                    {state?.item?.status === "pending" && (
                      <div>
                        <label
                          htmlFor="joinedDate"
                          className="grey mb-10 fs-16 fw-500"
                        >
                          Date Joined
                        </label>
                        <div className="fixedDate input  position-relative">
                          Pending
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {values.role && (
                  <div className="tabPadding mb-30">
                    <div className="fs-18 fw-600">Select Permissions</div>
                    <div className="divider2"></div>
                    <div>
                      {/* <h3>Permissions for {values.role}:</h3> */}
                      <div className="grid4">
                        {Object.entries(values.permissions).map(
                          ([key, value]) => {
                            const label = key
                              .replace(/([a-z])([A-Z])/g, "$1 $2")
                              .replace(/^\w/, (c) => c.toUpperCase());

                            // Handle cases based on value
                            if (value === 0) {
                              return null; // Don't show this permission
                            }

                            return (
                              <div className="custom-checkbox" key={key}>
                                <label className="checkLabel">
                                  <input
                                    type="checkbox"
                                    checked={value === 2}
                                    readOnly
                                  />
                                  <span className="checkmark"></span>
                                  {label}
                                </label>
                              </div>
                            );
                          }
                        )}
                      </div>
                      <div className="divider2 mt-10 mb-10"></div>
                    </div>
                  </div>
                )}
                <div className="d-flex align-center justify-end gap-16">
                  <div
                    className="btn btnSecondary w-172"
                    onClick={() => navigate("/admin/merchant/details")}
                  >
                    Discard
                  </div>
                  <button className="btn w-172" type="submit">
                    Save Changes
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default EditMember;
