import React, { useEffect, useRef, useState } from "react";
import closeRightSidebar from "../../../../assets/images/closeRightSidebar.svg";
import uploadsupllierImage from "../../../../assets/images/uploadsupllierImage.svg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import PhoneInput from "react-phone-input-2";
import { distributorValidation } from "./distributorValidation";
import { useDispatch, useSelector } from "react-redux";
import { useCommonMessage } from "../../../../common/CommonMessage";
import {
  fileUploadAction,
  fileUploadHandler,
} from "../../../../redux/action/fileUpload";
import {
  createDistributorAction,
  createDistributorHandler,
} from "../../../../redux/action/createDistributor";
// import closeIcon from "../../../../assets/images/closeIcon.svg";
import Loader from "../../../../common/Loader/Loader";
import {
  updateDistributorAction,
  updateDistributorHandler,
} from "../../../../redux/action/updateDistributor";
import { getGeoInfo } from "../../../../services/geoLocation";
import { handleKeyPressSpace } from "../../../../common/commonFunctions/CommonFunctions";

const DistributorDetails = ({
  isOpen,
  toggleDetails,
  setIsDetailsOpen,
  distributorItems,
  setDistributorItems,
}) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [countryCode, setCountryCode] = useState("91");
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("");
  const [fileObject, setFileObject] = useState();

  const [phone, setPhone] = useState(
    distributorItems?.contactPhoneNumber
      ? distributorItems?.contactPhoneNumber
      : ""
  );
  const messageApi = useCommonMessage();
  const dispatch = useDispatch();
  const hiddenFileInput = useRef(null);

  const fileuploadSelector = useSelector((state) => state?.fileupload);
  const createDistributorSelector = useSelector(
    (state) => state?.createDistributor
  );
  const updateDistributorSelector = useSelector(
    (state) => state?.updateDistributor
  );

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFileObject(file);

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        messageApi.open({
          type: "error",
          content: "Only JPG, JPEG, and PNG formats are allowed",
        });
        return;
      }
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

  useEffect(() => {
    const uploadFile = async () => {
      if (fileuploadSelector?.data?.statusCode === 200) {
        setLoading(true)
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
          setLoading(false)
        } finally{
          setLoading(false)
        }
      }
    };

    uploadFile();
  }, [fileuploadSelector]);

  const handleFormSubmit = (values) => {
    if (!distributorItems) {
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
        distributorName: values?.distributorName.trim(),
        contactName: values?.distributorContactName,
        contactPosition: values?.distributorPosition,
        contactEmail: values?.distributorEmail.toLowerCase(),
        contactPhoneNumber: values?.distributorContactNumber,
        logoUrl: fileuploadSelector?.data?.data
          ?.map((item) => item?.src)
          .join(""),
      };
      dispatch(createDistributorHandler(payload));
    } else if (distributorItems) {
      let logoUrl = distributorItems?.logoUrl;
      if (!logoUrl) {
        messageApi.open({
          type: "error",
          content: "Please upload a logo",
        });
        return;
      }
      let payload = {
        distributorName: values?.distributorName.trim(),
        contactName: values?.distributorContactName,
        contactPosition: values?.distributorPosition,
        contactEmail: values?.distributorEmail.toLowerCase(),
        contactPhoneNumber: values?.distributorContactNumber,
        logoUrl:
        fileuploadSelector?.data?.data?.map((item) => item?.src).join("")|| distributorItems?.logoUrl,
        distributorId: distributorItems?._id,
      };
      dispatch(updateDistributorHandler(payload));
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
      dispatch(fileUploadAction.fileuploadReset());
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
      dispatch(fileUploadAction.fileuploadReset());
      dispatch(updateDistributorAction.updateDistributorReset());
    }
  }, [updateDistributorSelector]);

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  return (
    <>
      {(createDistributorSelector?.isLoading ||
        updateDistributorSelector?.isLoading ||
        loading) && <Loader />}
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
          resetForm,
          setFieldValue,
          values,
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
                    setDistributorItems(null)
                  }}
                >
                  <img src={closeRightSidebar} alt="closeRightSidebar" />
                </div>
              </div>
              <div className="divider2"></div>
              <div className="overflowCart2 overflowCart">
                <div className="fs-14 mb-10 fw-500">Distributors logo</div>
                <div onClick={handleClick}>
                  <input
                    type="file"
                    className="d-none"
                    onChange={handleImageUpload}
                    ref={hiddenFileInput}
                  />
                  {imagePreview || distributorItems ? (
                    <div className="brandImagePromo mb-10">
                      <img
                        src={imagePreview || distributorItems?.logoUrl}
                        alt="Uploaded Preview"
                      />
                    </div>
                  ) : (
                    <>
                      <label className="uploadImage cursor-pointer mb-10">
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
                </div>
                <div className="divider2"></div>
                <div className="mb-40">
                  <div className="mb-20">
                    <label htmlFor="" className="fs-14 fw-500 mb-10">
                      Distributors name*
                    </label>
                    <Field
                      type="text"
                      placeholder="Enter name"
                      name="distributorName"
                      autocomplete="off"
                      onKeyDown={handleKeyPressSpace}
                      maxLength={30}
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
                    <Field
                      type="text"
                      placeholder="Enter name"
                      name="distributorContactName"
                      autocomplete="off"
                      onKeyDown={handleKeyPressSpace}
                      maxLength={30}
                    />
                    <ErrorMessage
                      name="distributorContactName"
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
                      placeholder="Enter position"
                      name="distributorPosition"
                      autocomplete="off"
                      onKeyDown={handleKeyPressSpace}
                      maxLength={30}
                    />
                  </div>
                  <div className="mb-20">
                    <label htmlFor="" className="fs-14 fw-500 mb-10">
                      Contact email*
                    </label>
                    <Field
                      type="text"
                      placeholder="Enter name"
                      name="distributorEmail"
                      onKeyDown={handleKeyPressSpace}
                      autocomplete = "off"
                    />
                    <ErrorMessage
                      name="distributorEmail"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    />
                  </div>
                  <div className="mb-20">
                    <label htmlFor="" className="fs-14 fw-500 mb-10">
                      Contact Phone number*
                    </label>
                    <PhoneInput
                      value={
                        values?.distributorContactNumber ||
                        `${countryCode}${phone}`
                      }
                      onChange={(value) => {
                        setFieldValue("distributorContactNumber", value);
                      }}
                      disableCountryGuess={false} 
                      placeholder="Enter phone number"
                      className="phoneInput"
                      name="distributorContactNumber"
                      enableAreaCodes={true} 
                      isValid={(inputNumber, country, countries) => {
                        return inputNumber.length >= country.format.length; 
                      }}
                    />
                    <ErrorMessage
                      name="distributorContactNumber"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
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
