import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import backButton from "../../../../assets/images/backButton.svg";
import breadCrumbIcon from "../../../../assets/images/breadCrumb.svg";
import coke from "../../../../assets/images/coke.svg";
import deleteBrands from "../../../../assets/images/deleteBrands.svg";
import addMerchantIcon from "../../../../assets/images/addMerchantIcon.svg";
import { Breadcrumb, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fileUploadHandler } from "../../../../redux/action/fileUpload";
import Loader from "../../../../common/Loader/Loader";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import {
  createBrandAction,
  createBrandHandler,
} from "../../../../redux/action/createBrandSlice";
import { brandValidationSchema } from "./brandValidation";
import { useCommonMessage } from "../../../../common/CommonMessage";
import noImageFound from "../../../../assets/images/noImageFound.png";
import { updateBrandHandler } from "../../../../redux/action/updateBrand";

const AddBrands = () => {
  const [uploadedImage, setUploadedImage] = useState();
  const messageApi = useCommonMessage();
  const fileuploadSelector = useSelector((state) => state?.fileupload);

  const { state } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createBrandSelector = useSelector((state) => state?.createBrand);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    if (file) {
      // Automatically trigger file upload after selection
      let payload = {
        fileList: [{ fileName: file?.name }],
      };
      dispatch(fileUploadHandler(payload));
    }
  };

  const handleFormSubmit = (values) => {
    console.log(values,"values")
    const brandItemArray = values?.SKUs?.map((item) => ({
      mSRP: item?.msrp,
      unit: item?.unit,
      sku: item?.sku,
      description: item?.description,
    // quantity:item?.quantity
    }));

    let payload = {
      imageUrl: fileuploadSelector?.data?.data?.[0]?.src
        ? [fileuploadSelector?.data?.data?.[0]?.src]
        : [],
      brandName: values?.brandName,
      brandItem: brandItemArray, // Set the array here
    };
    if (!state?.brandDetails) {
      dispatch(createBrandHandler(payload));
    } else if (state?.brandDetails) {
      console.log(payload, "payload");
      dispatch(updateBrandHandler(payload));
    }
  };

  useEffect(() => {
    if (createBrandSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: createBrandSelector?.data?.message,
      });
      navigate("/admin/brands");
      dispatch(createBrandAction.createBrandReset());
    } else if (createBrandSelector?.message?.data?.statusCode === 400) {
      messageApi.open({
        type: "error",
        content: createBrandSelector?.message?.data?.message,
      });
      dispatch(createBrandAction.createBrandReset());
    }
  }, [createBrandSelector]);

  return (
    <>
      {(fileuploadSelector?.isLoading || createBrandSelector?.isLoading) && (
        <Loader />
      )}
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
              }))
            : [
                {
                  msrp: "",
                  unit: "",
                  sku: "",
                  description: "",
                  quantity:""
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
                    onClick={() => navigate("/admin/brands")}
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
                          onClick: () => navigate("/admin/brands"),
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
                    <img src={uploadedImage || noImageFound} alt="coke" />
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
                <div className="inputGrid gap-20">
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
                    />
                    <ErrorMessage
                      name="brandName"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
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
                          <div className="inputGrid gap-20">
                            <div className="w-100 d-flex flexDirection h-100 justify-between">
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
                                className="mt-10 fw-500 fs-14 error"
                              />
                            </div>

                            <div className="w-160 d-flex flexDirection h-100 justify-between">
                              <label className="grey mb-10 fs-16 fw-500">
                                Unit*
                              </label>
                              <Field name={`SKUs[${index}].unit`}>
                                {({ field, form }) => (
                                  <Select
                                    className="custom-select"
                                    placeholder="Select Unit"
                                    value={field.value}
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
                              <ErrorMessage
                                name={`SKUs[${index}].unit`}
                                component="div"
                                className="mt-10 fw-500 fs-14 error"
                              />
                            </div>

                            <div className="w-100 d-flex flexDirection h-100 justify-between">
                              <label className="grey mb-10 fs-16 fw-500">
                                SKUs*
                              </label>
                              <Field
                                type="text"
                                className="input"
                                placeholder="PEPSI-24x12-005"
                                name={`SKUs[${index}].sku`}
                                autoComplete="off"
                              />
                              <ErrorMessage
                                name={`SKUs[${index}].sku`}
                                component="div"
                                className="mt-10 fw-500 fs-14 error"
                              />
                            </div>

                            <div className="">
                              <label className="grey mb-10 fs-16 fw-500">
                                Description*
                              </label>
                              <Field
                                type="text"
                                className="input"
                                placeholder="Red Bull - 8.4 oz energy drink (12-pack)"
                                name={`SKUs[${index}].description`}
                                autoComplete="off"
                              />
                              <ErrorMessage
                                name={`SKUs[${index}].description`}
                                component="div"
                                className="mt-10 fw-500 fs-14 error"
                              />
                            </div>
                            <div className="">
                              <label className="grey mb-10 fs-16 fw-500">
                              Quantity*
                              </label>
                              <Field
                                type="text"
                                className="input"
                                placeholder="Red Bull - 8.4 oz energy drink (12-pack)"
                                name={`SKUs[${index}].quantity`}
                                autoComplete="off"
                              />
                              <ErrorMessage
                                name={`SKUs[${index}].quantity`}
                                component="div"
                                className="mt-10 fw-500 fs-14 error"
                              />
                            </div>
                          </div>

                          <div className="divider2"></div>
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
                      className="addSku d-flex align-center justify-center gap-12 fs-16 fw-500"
                      onClick={() =>
                        push({
                          msrp: "",
                          unit: "",
                          sku: "",
                          description: "",
                        })
                      }
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

export default AddBrands;
