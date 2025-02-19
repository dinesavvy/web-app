import React, { useEffect, useState } from "react";
import closeRightSidebar from "../../../../assets/images/closeRightSidebar.svg";
import uploadsupllierImage from "../../../../assets/images/uploadsupllierImage.svg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import PhoneInput from "react-phone-input-2";
import { distributorValidation } from "./distributorValidation";
import { useDispatch, useSelector } from "react-redux";
import { useCommonMessage } from "../../../../common/CommonMessage";
import { fileUploadHandler } from "../../../../redux/action/fileUpload";
import {
  createDistributorAction,
  createDistributorHandler,
} from "../../../../redux/action/createDistributor";
import closeIcon from "../../../../assets/images/closeIcon.svg";
import Loader from "../../../../common/Loader/Loader";
import {
  updateDistributorAction,
  updateDistributorHandler,
} from "../../../../redux/action/updateDistributor";

const DistributorDetails = ({
  isOpen,
  toggleDetails,
  setIsDetailsOpen,
  distributorItems,
}) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [countryCode, setCountryCode] = useState(
    distributorItems?.contactPhoneNumber ? "" : "+91"
  );
  const [country, setCountry] = useState("in");
  const [phone, setPhone] = useState(
    distributorItems?.contactPhoneNumber
      ? distributorItems?.contactPhoneNumber
      : ""
  );
  const dispatch = useDispatch();
  const fileuploadSelector = useSelector((state) => state?.fileupload);
  const createDistributorSelector = useSelector(
    (state) => state?.createDistributor
  );

  const updateDistributorSelector = useSelector(
    (state) => state?.updateDistributor
  );

  const messageApi = useCommonMessage();
  console.log(fileuploadSelector, "fileuploadSelector");
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        messageApi.open({
          type: "error",
          content: "Only JPG, JPEG, and PNG formats are allowed",
        });
        return;
      }

      // Validate file size (5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        messageApi.open({
          type: "error",
          content: "File size must not exceed 5MB.",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      let payload = {
        fileList: [{ fileName: file?.name }],
      };
      dispatch(fileUploadHandler(payload));
      reader.readAsDataURL(file);
    }
  };

  const handlePhoneChange = (value, data) => {
    const dialCode = `${data?.dialCode}`;
    let number = value.replace(dialCode, "").trim();

    if (!number) {
      // If the number is empty, reset country code
      setCountry("");
      setCountryCode("");
      return;
    } else {
      setCountry(data.countryCode);
      setCountryCode(dialCode);
    }

    setPhone(number);
  };

  const handleFormSubmit = (values) => {
    console.log(values,"values")
    if(!phone) {
      alert("dd")
      return
    }
    if (!distributorItems) {
      let payload = {
        distributorName: values?.distributorName.trim(),
        contactName: values?.distributorContactName,
        contactPosition: values?.distributorPosition,
        contactEmail: values?.distributorEmail,
        contactPhoneNumber: "+" + countryCode + phone,
        logoUrl: fileuploadSelector?.data?.data
          ?.map((item) => item?.src)
          .join(""),
      };

      dispatch(createDistributorHandler(payload));
      console.log(payload,"payload")
    } else if (distributorItems) {
      let payload = {
        distributorName: values?.distributorName.trim(),
        contactName: values?.distributorContactName,
        contactPosition: values?.distributorPosition,
        contactEmail: values?.distributorEmail,
        contactPhoneNumber: "+" + countryCode + phone,
        logoUrl:
          distributorItems?.logoUrl ||
          fileuploadSelector?.data?.data?.map((item) => item?.src).join(""),
          distributorId:distributorItems?._id
      };
      dispatch(updateDistributorHandler(payload));
      // console.log(payload,"payload")
    }
  };

  useEffect(() => {
    if (createDistributorSelector?.message) {
      messageApi.open({
        type: "error",
        content: createDistributorSelector?.message,
      });
      dispatch(createDistributorAction.createDistributorReset());
    } else if (createDistributorSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: createDistributorSelector?.data?.message,
      });
      setIsDetailsOpen(false);
      dispatch(createDistributorAction.createDistributorReset());
    }
  }, [createDistributorSelector]);

  useEffect(() => {
    if (updateDistributorSelector?.message) {
      messageApi.open({
        type: "error",
        content: updateDistributorSelector?.message,
      });
      dispatch(updateDistributorAction.updateDistributorReset());
    } else if (updateDistributorSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: updateDistributorSelector?.data?.message,
      });
      setIsDetailsOpen(false);
      dispatch(updateDistributorAction.updateDistributorReset());
    }
  }, [updateDistributorSelector]);

  return (
    <>
      {(createDistributorSelector?.isLoading ||
        updateDistributorSelector?.isLoading) && <Loader />}
      {isOpen && <div className="overlay2" onClick={toggleDetails}></div>}

      <Formik
        enableReinitialize
        initialValues={{
          distributorName: distributorItems?.distributorName || "",
          distributorContactNumber: distributorItems?.contactPhoneNumber || "",
          distributorPosition: distributorItems?.contactPosition || "",
          distributorEmail: distributorItems?.contactEmail || "",
          distributorContactName: distributorItems?.contactName || "",
        }}
        validationSchema={distributorValidation}
        onSubmit={(values, formikBag) => {
          handleFormSubmit(values, formikBag);
        }}
      >
        {({
          isSubmitting,
          resetForm,
          /* and other goodies */
        }) => (
          <Form>
            <div
              className={`rightSidebar rightSidebar2 ${isOpen ? "open" : ""}`}
            >
              <div className="d-flex justify-between align-center">
                <div className="fs-20 fw-600">
                  {distributorItems ? "Update Distributor" : "Add Distributors"}
                </div>
                <div
                  className="closeSidebar"
                  onClick={() => {
                    toggleDetails();
                    resetForm({});
                    setImagePreview(null);
                  }}
                >
                  <img src={closeRightSidebar} alt="closeRightSidebar" />
                </div>
              </div>
              <div className="divider2"></div>
              <div className="overflowCart2 overflowCart">
                <div className="fs-14 mb-10 fw-500">Distributors logo</div>
                {imagePreview ? (
                  <div className="brandImagePromo mb-10">
                    <img src={imagePreview} alt="Uploaded Preview" />
                    <div
                      className="closeIcon"
                      onClick={() => setImagePreview(null)}
                    >
                      <img src={closeIcon} alt="Remove" />
                    </div>
                  </div>
                ) : (
                  <>
                    <label className="uploadImage cursor-pointer mb-10">
                      <input
                        type="file"
                        className="d-none"
                        onChange={handleImageUpload}
                      />
                      <div className="text-center">
                        <img
                          src={uploadsupllierImage}
                          alt="Upload Preview"
                          className="mb-20 uploadsupllierImage"
                        />
                        <div className="fs-14">
                          Drag & drop files or{" "}
                          <u className="fw-700 pc">Choose File</u>
                        </div>
                      </div>
                    </label>

                    <div className="d-flex align-center justify-between fs-12">
                      <div>Supported formats: JPEG, PNG</div>
                      <div>Maximum Size: 5MB</div>
                    </div>
                  </>
                )}
                <div className="divider2"></div>
                <div className="mb-40">
                  <div className="mb-20">
                    <label htmlFor="" className="fs-14 fw-500 mb-10">
                      Distributors name*
                    </label>
                    {/* <input type="text" placeholder="Enter name" /> */}
                    <Field
                      type="text"
                      placeholder="Enter name"
                      name="distributorName"
                      autoComplete="off"
                    />
                    <ErrorMessage
                      name="distributorName"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    />
                  </div>
                  <div className="mb-20">
                    <label htmlFor="" className="fs-14 fw-500 mb-10">
                      Contact name*
                    </label>
                    {/* <input type="text" placeholder="Enter name" /> */}
                    <Field
                      type="text"
                      placeholder="Enter name"
                      name="distributorContactName"
                    />
                    <ErrorMessage
                      name="distributorContactName"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    />
                  </div>
                  <div className="mb-20">
                    <label htmlFor="" className="fs-14 fw-500 mb-10">
                      Contact position*
                    </label>
                    {/* <input type="text" placeholder="Enter position" /> */}
                    <Field
                      type="text"
                      placeholder="Enter name"
                      name="distributorPosition"
                    />
                    <ErrorMessage
                      name="distributorPosition"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    />
                  </div>
                  <div className="mb-20">
                    <label htmlFor="" className="fs-14 fw-500 mb-10">
                      Contact email*
                    </label>
                    {/* <input type="text" placeholder="Enter email   " /> */}
                    <Field
                      type="text"
                      placeholder="Enter name"
                      name="distributorEmail"
                    />
                    <ErrorMessage
                      name="distributorEmail"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    />
                  </div>
                  <div className="mb-20">
                    <label htmlFor="" className="fs-14 fw-500 mb-10">
                      Contact*
                    </label>
                    {/* <input type="number" placeholder="Enter phone number" /> */}
                    <PhoneInput
                      country={country} // Set country dynamically when user types a code
                      value={countryCode + phone} // Show full value but keep them separate in state
                      onChange={handlePhoneChange}
                      disableCountryGuess={false} // Allow auto-detection of typed country code
                      placeholder="Enter phone number"
                      className="phoneInput"
                      name="distributorContactNumber"
                    />
                  </div>
                </div>
                <button className="btn w-100" type="submit">
                  {distributorItems ? "Update Distributor" : "Add Distributor"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default DistributorDetails;
