import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import backButton from "../../../../assets/images/backButton.svg";
import breadCrumbIcon from "../../../../assets/images/breadCrumb.svg";
import deleteBrands from "../../../../assets/images/deleteBrands.svg";
import addMerchantIcon from "../../../../assets/images/addMerchantIcon.svg";
import { Breadcrumb, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fileUploadHandler } from "../../../../redux/action/fileUpload";
import Loader from "../../../../common/Loader/Loader";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
// import {
//   createBrandAction,
//   createBrandHandler,
// } from "../../../../redux/action/createBrandSlice";
import { brandValidationSchema } from "./brandValidation";
import { useCommonMessage } from "../../../../common/CommonMessage";
import noImageFound from "../../../../assets/images/noImageFound.png";
import { createDistributorAction } from "../../../../redux/action/distributorsAction/createDistributorBrand";
import {
  updateBrandAction,
  updateBrandHandler,
} from "../../../../redux/action/updateBrand";
import {
  addSupplierBrandHandler,
  addSupplierBrandAction,
} from "../../../../redux/action/supplierActions/addSupplierBrand";
import {
  updateSupplierBrandAction,
  updateSupplierBrandHandler,
} from "../../../../redux/action/supplierActions/updateSupplierBrand";
import { fileUploadSupplierHandler } from "../../../../redux/action/supplierActions/fileUploadSupplier";
import {
  updateDistributorAction,
  updateDistributorBrandHandler,
} from "../../../../redux/action/distributorsAction/updateDistributorBrand";
import { createDistributorBrandHandler } from "../../../../redux/action/distributorsAction/createDistributorBrand";
import {
  fileUploadDistributorAction,
  fileUploadDistributorHandler,
} from "../../../../redux/action/distributorsAction/fileUploadDistributor";
import { handleKeyPressSpace } from "../../../../common/commonFunctions/CommonFunctions";

const AddBrandsDistributor = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [fileObject, setFileObject] = useState();

  const messageApi = useCommonMessage();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const fileuploadSelector = useSelector(
    (state) => state?.fileUploadDistributor
  );
  const createBrandSelector = useSelector(
    (state) => state?.createDistributorBrand
  );
  const updateBrandSelector = useSelector(
    (state) => state?.updateDistributorBrand
  );

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
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
      dispatch(fileUploadDistributorHandler(payload));
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
      }
    };
    uploadFile();
  }, [fileuploadSelector]);

  const handleFormSubmit = (values) => {
    let logoUrl =
      fileuploadSelector?.data?.data
        ?.map((item) => item?.src)
        .filter(Boolean) ||
      (state?.brandDetails?.imageUrl?.[0]
        ? [state?.brandDetails?.imageUrl?.[0]]
        : []);

    if (logoUrl?.length === 0) {
      messageApi.open({
        type: "error",
        content: "Please upload a logo",
      });
      return;
    }
    const brandItemArray = values?.SKUs?.map((item) => ({
      mSRP: item?.msrp,
      unit: item?.unit  || "per_case",
      sku: item?.sku,
      description: item?.description,
      quantity: item?.quantity,
    }));

    let payload = {
      imageUrl: logoUrl,
      brandName: values?.brandName,
      brandItem: brandItemArray, // Set the array here
    };
    if (!state?.brandDetails) {
      dispatch(createDistributorBrandHandler(payload));
    } else if (state?.brandDetails) {
      payload.brandId = state?.brandDetails?._id;
      dispatch(updateDistributorBrandHandler(payload));
    }
  };

  useEffect(() => {
    if (createBrandSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: createBrandSelector?.data?.message,
      });
      navigate("/distributors/brands");
      dispatch(createDistributorAction.createDistributorBrandReset());
      dispatch(fileUploadDistributorAction.fileuploadDistributorReset());
    } else if (
      createBrandSelector?.message?.response?.data?.statusCode === 400
    ) {
      messageApi.open({
        type: "error",
        content: createBrandSelector?.message?.response?.data?.message,
      });
      dispatch(fileUploadDistributorAction.fileuploadDistributorReset());
      dispatch(createDistributorAction.createDistributorBrandReset());
    }
  }, [createBrandSelector]);

  useEffect(() => {
    if (updateBrandSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: updateBrandSelector?.data?.message,
      });
      navigate("/distributors/brands");
      dispatch(updateDistributorAction.updateDistributorBrandReset());
      dispatch(fileUploadDistributorAction.fileuploadDistributorReset());
    } else if (updateBrandSelector?.message?.data?.statusCode === 400) {
      messageApi.open({
        type: "error",
        content: updateBrandSelector?.message?.data?.message,
      });
      dispatch(fileUploadDistributorAction.fileuploadDistributorReset());
      dispatch(updateDistributorAction.updateDistributorBrandReset());
    }
  }, [updateBrandSelector]);

  return (
    <>
      {(fileuploadSelector?.isLoading ||
        createBrandSelector?.isLoading ||
        updateBrandSelector?.isLoading) && <Loader />}
      <Formik
        enableReinitialize
        initialValues={{
          brandName: state?.brandDetails?.brandName || "",
          SKUs: state?.brandDetails?.brandItem?.length
            ? state?.brandDetails?.brandItem.map((item) => ({
                msrp: item?.mSRP || "",
                unit: item?.unit || "",
                sku: item?.sku || "",
                description: item?.description || "",
                quantity: item?.quantity || "",
              }))
            : [
                {
                  msrp: "",
                  unit: "",
                  sku: "",
                  description: "",
                  quantity: "",
                },
              ],
        }}
        validationSchema={brandValidationSchema}
        onSubmit={(values, formikBag) => {
          handleFormSubmit(values, formikBag);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div className="dashboard">
              <div className="tabPadding mb-30">
                <div className="d-flex align-center gap-20 mb-20 w-100">
                  <img
                    src={backButton}
                    alt="backButton"
                    className="cursor-pointer backButton"
                    onClick={() => navigate("/distributors/brands")}
                  />
                  <div>
                    <div className="fs-24 fw-600 mb-4">
                      {state?.brandDetails ? "Edit brand" : "Add Brand"}
                    </div>
                    <Breadcrumb
                      className="cursor-pointer"
                      separator={<img src={breadCrumbIcon} />}
                      items={[
                        {
                          title: "Brands",
                          onClick: () => navigate("/distributors/brands"),
                        },
                        {
                          title: "Add Brand",
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="divider2 m30"></div>
                <div className="d-flex align-end gap-16 mb-30 flexWrapsm">
                  <div className="changeBrandImage">
                    <img
                      src={
                        imagePreview ||
                        state?.brandDetails?.imageUrl?.[0] ||
                        noImageFound
                      }
                      alt="coke"
                    />
                  </div>
                  <div className="btn w240" onClick={handleButtonClick}>
                    Change Photo
                  </div>
                  <input
                    id="fileUpload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>
                <div className="inputGrid gap-30">
                  <div>
                    <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                      Brand Name*
                    </label>
                    <Field
                      type="text"
                      className="input"
                      placeholder="Brand Name"
                      name="brandName"
                      autoComplete="off"
                      onKeyDown={handleKeyPressSpace}
                    />
                    <ErrorMessage
                      name="brandName"
                      component="div"
                      className=" fw-500 fs-14 error"
                    />
                  </div>
                </div>
              </div>
              <FieldArray name="SKUs">
                {({ push, remove }) => (
                  <>
                    {values?.SKUs?.map((item, index) => {
                      return (
                        <div className="tabPadding mb-30" key={index}>
                          <div className="inputGrid gap-30">
                            <div className="w-100 d-flex flexDirection h-100 justify-between position-relative">
                              <label className="grey mb-10 fs-16 fw-500">
                                MSRP (Manufacturer’s Suggested Retail Price)*
                              </label>
                              <Field
                                type="text"
                                className="input"
                                placeholder="$22.99"
                                name={`SKUs[${index}].msrp`}
                                autoComplete="off"
                              />
                              <ErrorMessage
                                name={`SKUs[${index}].msrp`}
                                component="div"
                                className=" fw-500 fs-14 error absoluteError"
                              />
                            </div>

                              <div className="w-160 d-flex flexDirection h-100 justify-between position-relative">
                              <label className="grey mb-10 fs-16 fw-500">
                                Unit*
                              </label>
                              <Field name={`SKUs[${index}].unit`}>
                                {({ field, form }) => (
                                  <Select
                                    className="custom-select"
                                    placeholder="Select Unit"
                                    value={field.value || "per_case"}
                                    onChange={(value) =>
                                      form.setFieldValue(
                                        `SKUs[${index}].unit`,
                                        value
                                      )
                                    }
                                  >
                                    <Option value="per_case">Per case</Option>
                                    <Option value="per_pake">Per Pake</Option>
                                  </Select>
                                )}
                              </Field>
                              {/* <ErrorMessage
                                name={`SKUs[${index}].unit`}
                                component="div"
                                className="mt-10 fw-500 fs-14 error"
                              /> */}
                            </div>

                              <div className="w-100 d-flex flexDirection h-100 justify-between position-relative">
                                <label className="grey mb-10 fs-16 fw-500">
                                  SKUs*
                                </label>
                              <Field
                                type="text"
                                className="input"
                                placeholder="PEPSI-24x12-005"
                                name={`SKUs[${index}].sku`}
                                autoComplete="off"
                                onKeyDown={handleKeyPressSpace}
                              />
                              <ErrorMessage
                                name={`SKUs[${index}].sku`}
                                component="div"
                                className=" fw-500 fs-14 error absoluteError"
                              />
                            </div>

                              <div className="position-relative">
                              <label className="grey mb-10 fs-16 fw-500">
                                Description*
                              </label>
                              <Field
                                type="text"
                                className="input"
                                placeholder="Red Bull - 8.4 oz energy drink (12-pack)"
                                name={`SKUs[${index}].description`}
                                autoComplete="off"
                                onKeyDown={handleKeyPressSpace}
                              />
                              <ErrorMessage
                                name={`SKUs[${index}].description`}
                                component="div"
                                className=" fw-500 fs-14 error absoluteError"
                              />
                            </div>
                            <div className="">
                              <label className="grey mb-10 fs-16 fw-500">
                                Quantity*
                              </label>
                              <Field
                                type="text"
                                className="input"
                                placeholder="Quantity"
                                name={`SKUs[${index}].quantity`}
                                autoComplete="off"
                                maxLength={5}
                                onKeyDown={(e) => {
                                  if (
                                    !/^\d$/.test(e.key) && // Allow numbers
                                    ![
                                      "Backspace",
                                      "Delete",
                                      "ArrowLeft",
                                      "ArrowRight",
                                      "Tab",
                                    ].includes(e.key) // Allow navigation keys
                                  ) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              <ErrorMessage
                                name={`SKUs[${index}].quantity`}
                                component="div"
                                className=" fw-500 fs-14 error "
                              />
                            </div>
                          </div>

                          {/* <div className="divider2"></div> */}
                          {index > 0 && (
                            <div className="d-flex justify-end">
                              <div
                                className="d-flex align-center gap-8 red fs-16 fw-500 brandRed cursor-pointer"
                                onClick={() => remove(index)}
                              >
                                <img src={deleteBrands} alt="" />
                                Remove SKUs
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <div
                      className="addSku d-flex align-center justify-center gap-12 fs-16 fw-500 disabled"
                      // onClick={() =>
                      //   push({
                      //     msrp: "",
                      //     unit: "",
                      //     sku: "",
                      //     description: "",
                      //   })
                      // }
                    >
                      <img src={addMerchantIcon} alt="" />
                      Add Another SKUs
                    </div>
                  </>
                )}
              </FieldArray>

              <div className="divider"></div>
              <div className="d-flex mb-30 align-center justify-end gap-16">
                <div
                  className="btn btnSecondary w-172"
                  onClick={() => navigate("/admin/brands")}
                >
                  Discard
                </div>
                <button className="btn  w-172" type="submit">
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

export default AddBrandsDistributor;
