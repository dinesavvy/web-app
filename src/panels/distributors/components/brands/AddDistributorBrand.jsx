import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import backButton from "../../../../assets/images/backButton.svg";
import breadCrumbIcon from "../../../../assets/images/breadCrumb.svg";
import coke from "../../../../assets/images/coke.svg";
import deleteBrands from "../../../../assets/images/deleteBrands.svg";
import addMerchantIcon from "../../../../assets/images/addMerchantIcon.svg";
import { Breadcrumb, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fileUploadHandler } from "../../../../redux/action/fileUpload";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { supplierBrandValidation } from "./suppplierBrandValidaton";
import { useCommonMessage } from "../../../../common/CommonMessage";
import Loader from "../../../../common/Loader/Loader";
import { addSupplierBrandAction } from "../../../../redux/action/supplierActions/addSupplierBrand";
import { createDistributorBrandHandler } from "../../../../redux/action/distributorsAction/createDistributorBrand";
import { fileUploadDistributorHandler } from "../../../../redux/action/distributorsAction/fileUploadDistributor";

const AddDistributorBrand = () => {
  const messageApi = useCommonMessage();
  const [fileObject, setFileObject] = useState();
  const [uploadedImage, setUploadedImage] = useState();
  const fileuploadSelector = useSelector((state) => state?.fileUploadDistributor);
  const createBrandSelector = useSelector((state) => state?.createDistributorBrand);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileObject(file);
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    if (file) {
      // Automatically trigger file upload after selection
      let payload = {
        fileList: [{ fileName: file?.name }],
      };
      dispatch(fileUploadDistributorHandler(payload));
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
  
            if (response.ok) {
              console.log("File uploaded successfully");
            } else {
              console.error("Failed to upload file", response.status);
            }
          } catch (error) {
            console.error("Error uploading file", error);
          }
        }
      };
  
      uploadFile();
    }, [fileuploadSelector]);

  const handleFormSubmit = (values) => {
    console.log(values, "values");
    // Map the form values to the desired payload structure
    const brandItemArray = values?.SKUs?.map((item) => ({
      mSRP: item?.msrp,
      unit: item?.unit,
      sku: item?.sku,
      description: item?.description,
    }));

    let payload = {
      imageUrl: [fileuploadSelector?.data?.data?.[0]?.src],
      brandName: values?.brandName,
      brandItem: brandItemArray, // Set the array here
    };

    dispatch(createDistributorBrandHandler(payload));
  };

  useEffect(() => {
    if (createBrandSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: createBrandSelector?.data?.message,
      });
      navigate("/distributors/brands");
      dispatch(addSupplierBrandAction.addSupplierBrandReset());
    }
  }, [createBrandSelector]);

  return (
    <>
      {(fileuploadSelector?.isLoading || createBrandSelector?.isLoading) && (
        <Loader />
      )}
      <Formik
        initialValues={{
          brandName: "",
          SKUs: [
            {
              msrp: "",
              unit: "",
              sku: "",
              description: "",
            },
          ],
        }}
        validationSchema={supplierBrandValidation}
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
                    <div className="fs-24 fw-600 mb-4">Add Brand</div>
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
                    <img src={uploadedImage || coke} alt="coke" />
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
                                MSRP (Manufacturer’s Suggested Retail Price)
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
                                Unit
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
                                SKUs
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
                                Description
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

export default AddDistributorBrand;
