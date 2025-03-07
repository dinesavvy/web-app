import React, { useEffect, useState } from "react";
import closeRightSidebar from "../../../../assets/images/closeRightSidebar.svg";
import uploadsupllierImage from "../../../../assets/images/uploadsupllierImage.svg";
import closeIcon from "../../../../assets/images/closeIcon.svg";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../common/Loader/Loader";
import { useCommonMessage } from "../../../../common/CommonMessage";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  createSuplierHandler,
  createSupplierAction,
} from "../../../../redux/action/createSupplier";
import {
  fileUploadAction,
  fileUploadHandler,
} from "../../../../redux/action/fileUpload";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { supplierValidation } from "./supplierValidation";
import {
  updateSupplierAction,
  updateSupplierHandler,
} from "../../../../redux/action/updateSupplier";
import { getGeoInfo } from "../../../../services/geoLocation";

const SupplierDetails = ({
  isOpen,
  toggleDetails,
  setIsDetailsOpen,
  selectedSupplier,
}) => {
  const [countryCode, setCountryCode] = useState("91");
  const [loading, setLoading] = useState(true);

  const [country, setCountry] = useState("");
  const fileuploadSelector = useSelector((state) => state?.fileupload);
  console.log(fileuploadSelector, "fileuploadSelector");
  const [imagePreview, setImagePreview] = useState(null);
  const [phone, setPhone] = useState(
    selectedSupplier?.contactPhoneNumber || ""
  );
  const [fileObject, setFileObject] = useState();

  const dispatch = useDispatch();
  const messageApi = useCommonMessage();
  const createSuplierSelector = useSelector((state) => state?.createSuplier);
  const updateSupplierSelector = useSelector((state) => state?.updateSupplier);

  // const handlePhoneChange = (value, data) => {
  //   if (value === "") {
  //     // setCountryCode(""); // Reset to India when input is cleared
  //     setPhone("");
  //     return;
  //   }

  //   let newCountryCode = data.dialCode;
  //   let newPhone = value.replace(newCountryCode, "").trim();

  //   if (!newPhone) {
  //     // If the number is empty, reset country code
  //     setCountry("");
  //     // setCountryCode("");
  //     return;
  //   } else {
  //     setCountry(newCountryCode);
  //     setCountryCode(newCountryCode);
  //   }

  //   setCountryCode(newCountryCode);
  //   setPhone(newPhone);
  // };
  // const handlePhoneChange = (value, country) => {
  //   setPhone(value.replace(country.dialCode, "")); // Store only the number
  //   setCountryCode(`+${country.dialCode}`); // Update country code
  // };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFileObject(file);
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

  useEffect(() => {
    const uploadFile = async () => {
      if (fileuploadSelector?.data?.statusCode === 200) {
        try {
          const response = await fetch(
            fileuploadSelector?.data?.data?.[0]?.url,
            {
              method: "PUT",
              body: fileObject,
            }
          );
        } catch (error) {
          console.error("Error uploading file", error);
        }
        // dispatch(fileUploadAction.fileuploadReset())
      }
    };

    uploadFile();
  }, [fileuploadSelector]);

  // Fetch Geo location
  useEffect(() => {
    const fetchGeoInfo = async () => {
      setLoading(true);
      const data = await getGeoInfo();
      if (data) {
        setCountryCode(data?.country_calling_code);
      }
      setLoading(false);
    };

    fetchGeoInfo();
  }, []);

  const handleFormSubmit = (values) => {
    if (!selectedSupplier) {
      let logoUrl = fileuploadSelector?.data?.data
        ?.map((item) => item?.src)
        .join("");

      if (!logoUrl) {
        messageApi.open({
          type: "error",
          content: "Please upload a logo",
        });
        return;
      }

      let payload = {
        supplierName: values?.supplierName,
        contactName: values?.supplierContactName,
        contactPosition: values?.supplierPosition,
        contactEmail: values?.supplierEmail,
        contactPhoneNumber: values?.supplierContactNumber,
        logoUrl,
      };
      dispatch(createSuplierHandler(payload));
    } else if (selectedSupplier) {
      let logoUrl = selectedSupplier?.logoUrl;
      if (!logoUrl) {
        messageApi.open({
          type: "error",
          content: "Please upload a logo",
        });
        return;
      }
      let payload = {
        supplierName: values?.supplierName,
        contactName: values?.supplierContactName,
        contactPosition: values?.supplierPosition,
        contactEmail: values?.supplierEmail,
        contactPhoneNumber: values?.supplierContactNumber,
        logoUrl,
        supplierId: selectedSupplier?._id,
      };
      dispatch(updateSupplierHandler(payload));
    }
  };

  useEffect(() => {
    if (createSuplierSelector?.message) {
      messageApi.open({
        type: "error",
        content: createSuplierSelector?.message,
      });
      dispatch(fileUploadAction.fileuploadReset())
      dispatch(createSupplierAction.createSuplierReset());
    } else if (createSuplierSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: createSuplierSelector?.data?.message,
      });
      setIsDetailsOpen(false);
      dispatch(createSupplierAction.createSuplierReset());
      dispatch(fileUploadAction.fileuploadReset());
    }
  }, [createSuplierSelector]);

  useEffect(() => {
    if (updateSupplierSelector?.message) {
      messageApi.open({
        type: "error",
        content: updateSupplierSelector?.message,
      });
      dispatch(fileUploadAction.fileuploadReset());
      dispatch(updateSupplierAction.updateSupplierReset());
    } else if (updateSupplierSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: updateSupplierSelector?.data?.message,
      });
      setIsDetailsOpen(false);
      dispatch(updateSupplierAction.updateSupplierReset());
    }
  }, [updateSupplierSelector]);

  return (
    <>
      {(createSuplierSelector?.isLoading ||
        updateSupplierSelector?.isLoading ||
        fileuploadSelector?.isLoading ||
        loading) && <Loader />}
        {console.log(selectedSupplier,"selectedSupplier")}
      {isOpen && <div className="overlay2" onClick={toggleDetails}></div>}
      <Formik
        enableReinitialize
        initialValues={{
          supplierName: selectedSupplier?.supplierName || "",

          supplierContactNumber: selectedSupplier?.contactPhoneNumber||"",
            // ? selectedSupplier?.contactPhoneNumber
            // : `${countryCode}${phone}`,

          supplierPosition: selectedSupplier?.contactPosition || "",
          supplierEmail: selectedSupplier?.contactEmail || "",
          supplierContactName: selectedSupplier?.contactName || "",
        }}
        validationSchema={supplierValidation}
        onSubmit={(values, formikBag) => {
          handleFormSubmit(values, formikBag);
        }}
      >
        {({
          isSubmitting,
          resetForm,
          setFieldValue,
          setFieldTouched,
          values,
          /* and other goodies */
        }) => (
          <Form>
            <div
              className={`rightSidebar rightSidebar2 ${isOpen ? "open" : ""}`}
            >
              <div className="d-flex justify-between align-center">
                <div className="fs-20 fw-600">
                  {selectedSupplier ? "Edit Supplier" : "Add Supplier"}
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
                <div className="fs-14 mb-10 fw-500">Supplier logo</div>
                {imagePreview || selectedSupplier ? (
                  <div className="brandImagePromo mb-10">
                    <img
                      src={imagePreview || selectedSupplier?.logoUrl}
                      alt="Uploaded Preview"
                    />
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
                      {/* <div>Maximum Size: 5MB</div> */}
                    </div>
                  </>
                )}
                <div className="divider2"></div>
                <div className="mb-40">
                  <div className="mb-20">
                    <label htmlFor="" className="fs-14 fw-500 mb-10">
                      Supplier name*
                    </label>
                    <Field
                      type="text"
                      placeholder="Enter name"
                      name="supplierName"
                      autocomplete="off"
                    />
                    <ErrorMessage
                      name="supplierName"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    />
                  </div>
                  <div className="mb-20">
                    <label htmlFor="" className="fs-14 fw-500 mb-10">
                      Contact name*
                    </label>
                    <Field
                      type="text"
                      placeholder="Enter name"
                      name="supplierContactName"
                      autocomplete="off"
                    />
                    <ErrorMessage
                      name="supplierContactName"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    />
                  </div>
                  <div className="mb-20">
                    <label htmlFor="" className="fs-14 fw-500 mb-10">
                      Contact position
                    </label>
                    <Field
                      type="text"
                      placeholder="Enter name"
                      name="supplierPosition"
                      autocomplete="off"
                    />
                    {/* <ErrorMessage
                      name="supplierPosition"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    /> */}
                  </div>
                  <div className="mb-20">
                    <label htmlFor="" className="fs-14 fw-500 mb-10">
                      Contact email*
                    </label>
                    <Field
                      type="text"
                      placeholder="Enter email"
                      name="supplierEmail"
                      autocomplete="off"
                    />
                    <ErrorMessage
                      name="supplierEmail"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    />
                  </div>
                  <div className="mb-20">
                    <label htmlFor="" className="fs-14 fw-500 mb-10">
                      Contact*
                    </label>
                    <PhoneInput
                      // country={countryCode || undefined}
                      // value={`${countryCode}${phone}`}
                      value={values?.supplierContactNumber || `${countryCode}${phone}`}
                      onChange={(value) => {
                        setFieldValue("supplierContactNumber", value);
                      }}
                      disableCountryGuess={false} 
                      placeholder="Enter phone number"
                      className="phoneInput"
                      name="supplierContactNumber"
                      enableAreaCodes={true} 
                      isValid={(inputNumber, country, countries) => {
                        return inputNumber.length >= country.format.length; 
                      }}
                    />
                    <ErrorMessage
                      name="supplierContactNumber"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    />
                  </div>
                </div>
                <button className="btn w-100" type="submit">
                  {selectedSupplier ? "Update Supplier" : "Add Supplier"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SupplierDetails;
