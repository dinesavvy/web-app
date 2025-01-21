import { Breadcrumb, DatePicker, Space } from "antd";
import React, { useState } from "react";
import "../../../assets/css/merchant.css";
import backButton from "../../../assets/images/backButton.svg";
import breadCrumbIcon from "../../../assets/images/breadCrumb.svg";
import CustomSelect from "./CustomSelect";
import { useLocation } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import moment from "moment";

const EditMember = () => {
  const { state } = useLocation();
  console.log(state, "statestate");

  const handleFormSubmit = (value) => {
    console.log(value, "value");
  };

  return (
    <>
      <Formik
      enableReinitialize
        initialValues={{
          name: state?.displayName || "",
          phone_number: state?.phoneNumber || "",
          location: "",
          invitedDate: "",
          joinedDate: "",
        }}
        onSubmit={(values, formikBag) => {
          handleFormSubmit(values, formikBag);
        }}
      >
        {({
          isSubmitting,
          setFieldValue,
          /* and other goodies */
        }) => (
          <Form>
            <div className="dashboard">
              <div className="tabPadding mb-30">
                <div className="d-flex align-center gap-20 mb-30 w-100">
                  <img
                    src={backButton}
                    alt="backButton"
                    className="cursor-pointer"
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
                    {state?.displayName
                      ?.split(" ")
                      .map((name) => name[0]?.toUpperCase())
                      .join("")}
                  </div>
                  <div>
                    <div className="fw-700">
                      {state?.displayName?.charAt(0).toUpperCase() +
                        state?.displayName?.slice(1)}
                    </div>
                    <div className="fs-14 fw-300 o5">
                      {moment(state?.createdAt).format("MMMM,YYYY")}
                    </div>
                  </div>
                </div>

                <div className="inputGrid gap-20">
                  <div>
                    <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                      Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      id="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="number" className="grey mb-10 fs-16 fw-500">
                      Phone number
                    </label>
                    <Field
                      type="text"
                      name="phone_number"
                      placeholder="Enter your phone number"
                      id="phone_number"
                      className="input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="grey mb-10 fs-16 fw-500"
                    >
                      Location
                    </label>
                    <Field
                      name="location"
                      component={CustomSelect}
                      options={["Option 1", "Option 2", "Option 3"]}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="grey mb-10 fs-16 fw-500"
                    >
                      Role
                    </label>
                    <Field
                      name="role"
                      component={CustomSelect}
                      options={["Option 1", "Option 2", "Option 3"]}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="invitedDate"
                      className="grey mb-10 fs-16 fw-500"
                    >
                      Date Invited
                    </label>
                    <Space direction="vertical" className="noicon">
                      <DatePicker
                        placeholder="YYYY-MM-DD"
                        format="YYYY-MM-DD"
                        onChange={(date, dateString) => {
                          setFieldValue("invitedDate", dateString);
                        }}
                        disabledDate={(current) => {
                          return current && current < moment().startOf("day");
                        }}
                        allowClear={false}
                      />
                    </Space>
                  </div>
                  <div>
                    <label
                      htmlFor="joinedDate"
                      className="grey mb-10 fs-16 fw-500"
                    >
                      Date Joined
                    </label>
                    <div className="fixedDate input  position-relative">
                      Pending <div className="resendBtn fs-14">Resend</div>
                    </div>
                    {/* <Space direction="vertical" className="noicon">
                      <DatePicker
                        placeholder="YYYY-MM-DD"
                        format="YYYY-MM-DD"
                        onChange={(date, dateString) => {
                          setFieldValue("joinedDate", dateString);
                        }}
                        disabledDate={(current) => {
                          return current && current < moment().startOf("day");
                        }}
                        allowClear={false}
                      />
                    </Space> */}
                  </div>
                </div>
              </div>

              <div className="tabPadding mb-30">
                <div className="fs-18 fw-600">Select Permissions</div>
                <div className="divider2"></div>
                {state?.roleData?.map((role, index) => (
                  <div key={index}>
                    {/* <div className="fs-16 fw-500 mb-10">{role.roleName}</div> */}
                    <div className="grid4">
                      {Object.entries(role.permissions).map(([key, value]) => {
                        // Create a label from the permission key
                        const label = key
                          .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
                          .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter
                        return (
                          <div className="custom-checkbox" key={key}>
                            <label className="checkLabel">
                              <input
                                type="checkbox"
                                checked={value === 1}
                                readOnly
                              />
                              <span className="checkmark"></span>
                              {label}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                    <div className="divider2 mt-10 mb-10"></div>
                  </div>
                ))}
              </div>
              <div className="d-flex align-center justify-end gap-16">
                <div className="btn btnSecondary w-172">Discard</div>
                <button className="btn w-172" type="submit">
                  Save Changes
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditMember;
