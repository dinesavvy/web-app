import React, { useEffect, useRef, useState } from "react";
import backButton from "../../../assets/images/backButton.svg";
import arrowRight from "../../../assets/images/arrowRight.svg";
import dish from "../../../assets/images/dish.png";
import { useDispatch, useSelector } from "react-redux";
import { getNudgesTemplateHandler } from "../../../redux/action/getNudgesTemplate";
import Loader from "../../../common/Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { fileUploadHandler } from "../../../redux/action/fileUpload";
import { businessNudgesTemplateHandler } from "../../../redux/action/businessAction/businessNudgesTemplate";

const NudgeTemplateMerchant = () => {
  const [uploadedImage, setUploadedImage] = useState(nudgesCards?.imageUrl[0]);

  const dispatch = useDispatch();
  const { state } = useLocation();

  const selectedBusiness = JSON.parse(localStorage.getItem("selectedBusiness"))

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [nudgesCards, setNudgesCard] = useState(null);
  const getBusinessNudgesTemplateSelector = useSelector(
    (state) => state?.businessNudgesTemplate
  );
  const fileuploadSelector = useSelector((state) => state?.fileupload);

  useEffect(() => {
    if(state?.locationId?.nudgePrev){
      setNudgesCard(state?.locationId?.nudgePrev)
    }
  }, [state])

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .max(50, "Title must be 50 characters or less"),
    description: Yup.string()
      .required("Description is required")
      .max(200, "Description must be 200 characters or less"),
    quantity: Yup.string().required("Please enter quantity"),
  });

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add("overflow-Hidden");
    } else {
      document.body.classList.remove("overflow-Hidden");
    }

    return () => {
      document.body.classList.remove("overflow-Hidden");
    };
  }, [isCartOpen]);

  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  useEffect(() => {
    let payload = {
      page: 1,
      limit: 10,
      // locationId: selectedBusiness?._id,
    };
    dispatch(businessNudgesTemplateHandler(payload));
  }, []);

  const handleSubmit = (values) => {
    console.log("Form values:", values);
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

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  return (
    <>
      {(getBusinessNudgesTemplateSelector?.isLoading ||
        fileuploadSelector?.isLoading) && <Loader />}
      <>
        <div className="dashboard">
          <div className="tabPadding mb-20">
            <div className="d-flex align-center gap-20 mb-30 w-100">
              <img
                src={backButton}
                alt="backButton"
                className="cursor-pointer"
              />
              <div>
                <div className="fs-24 fw-600">Nudges Template</div>
              </div>
            </div>
            <div className="templateGrid">
              {getBusinessNudgesTemplateSelector?.data?.data?.records?.map(
                (item, index) => {
                  return (
                    <div
                      className="templateImage"
                      key={index}
                      onClick={() => setNudgesCard(item)}
                    >
                      <img
                        src={item?.imageUrl[0]}
                        alt={item?.title}
                        className="cursor-pointer"
                      />
                      <div className="fs-18 fw-600 absoluteTemplateText">
                        {item?.title}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              title:
                nudgesCards?.title ||
                state?.locationId?.nudgePrev?.title ||
                "",
              description:
                nudgesCards?.description ||
                state?.locationId?.nudgePrev?.description ||
                "",
              quantity:
                nudgesCards?.quantity ||
                state?.locationId?.nudgePrev?.quantity ||
                "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, isValid }) => (
              <Form>
                {(nudgesCards || state?.locationId?.nudgePrev) && (
                  <>
                    <div className="tabPadding mb-20">
                      <div className="fs-24 fw-600">
                        {nudgesCards?.title ||
                          state?.locationId?.nudgePrev?.title}
                      </div>
                      <div className="divider"></div>
                      <div className="d-flex align-end gap-16 mb-20 flexWrapsm">
                        <div className="reflectImage">
                          <img
                            src={
                              uploadedImage ||
                              nudgesCards?.imageUrl[0] ||
                              state?.locationId?.nudgePrev?.imageUrl[0]
                            }
                            alt=""
                          />
                        </div>
                        <div className="btn w240" onClick={handleButtonClick}>
                          Change Photo
                        </div>
                      </div>
                      <input
                        id="fileUpload"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />
                      <div className="inputGrid gap-20">
                        <div>
                          <label
                            htmlFor="title"
                            className="grey mb-10 fs-16 fw-500"
                          >
                            Title*
                          </label>
                          <Field
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Free appetizer"
                            className={
                              errors.title && touched.title ? "input-error" : ""
                            }
                          />
                          {errors.title && touched.title && (
                            <div className="mt-10 fw-500 fs-14 error">
                              {errors.title}
                            </div>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="description"
                            className="grey mb-10 fs-16 fw-500"
                          >
                            Total Quantity*
                          </label>
                          <Field
                            id="quantity"
                            name="quantity"
                            type="text"
                            placeholder="Free appetizer on Happy Hours! From 07:00 PM to 08:00 PM"
                            className={
                              errors.quantity && touched.quantity
                                ? "input-error"
                                : ""
                            }
                          />
                          {errors.quantity && touched.quantity && (
                            <div className="mt-10 fw-500 fs-14 error">
                              {errors.quantity}
                            </div>
                          )}
                        </div>

                        <div className="twoSpace">
                          <label
                            htmlFor="description"
                            className="grey mb-10 fs-16 fw-500"
                          >
                            Description*
                          </label>
                          <Field
                            id="description"
                            name="description"
                            type="text"
                            placeholder="Free appetizer on Happy Hours! From 07:00 PM to 08:00 PM"
                            className={
                              errors.description && touched.description
                                ? "input-error"
                                : ""
                            }
                          />
                          {errors.description && touched.description && (
                            <div className="mt-10 fw-500 fs-14 error">
                              {errors.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      className="tabPadding mb-20"
                      onClick={() => {
                        navigate("/admin/merchant/details", {
                          state: { statePrev: state, nudgePrev: nudgesCards }
                        });
                      }}
                    >
                      <div className="d-flex justify-between align-center gap-20 w-100">
                        <div>
                          <div className="fs-20 fw-600 mb-10">
                            Select your audience
                          </div>
                          <div className="fs-16 darkBlack">
                            {/* By default all your followers will be sent this
                              Nudge. */}
                            {/* {state?.selectedItems?.length > 0 ||
                            state?.locationId?.state?.selectedItems?.length >
                              0 ? (
                              <div className="flexTagFull">
                                {(
                                  state?.locationId?.state?.selectedItems ||
                                  state?.selectedItems
                                )?.map((item, index) => (
                                  <div key={index}>
                                    {item?.userInfo?.displayName}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div>
                                By default all your followers will be sent this
                                Nudge.
                              </div>
                            )} */}
                            {state?.selectedItems?.length > 0 ? (
                              <div className="flexTagFull">
                                {state?.selectedItems?.map((item, index) => (
                                  <div key={index}>
                                    {item?.userInfo?.displayName}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div>
                                By default all your followers will be sent this
                                Nudge.
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <img src={arrowRight} alt="arrowRight" />
                        </div>
                      </div>
                    </div>
                    <div className="tabPadding mb-40">
                      <div className="fs-20 fw-700 mb-20">Preview</div>
                      <div className="d-flex gap-12">
                        <div className="image80">
                          <img
                            src={
                              uploadedImage ||
                              nudgesCards?.imageUrl?.[0] ||
                              state?.locationId?.nudgePrev?.imageUrl[0] ||
                              dish
                            }
                            alt="dish"
                          />
                        </div>
                        <div>
                          <div className="fs-20 fw-600">
                            {nudgesCards?.title ||
                              state?.locationId?.nudgePrev?.title}
                          </div>
                          <div className="fs-14">
                            {/* Free drink on Happy Hours! From <br /> 07:00 PM to
                              08:00 PM */}
                            {nudgesCards?.description ||
                              state?.locationId?.nudgePrev?.description}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-end">
                      <button
                        className="btn w164 "
                        onClick={
                          values?.quantity &&
                          values?.title &&
                          values?.description
                            ? toggleCart
                            : undefined
                        }
                        disabled={
                          !(
                            values?.quantity &&
                            values?.title &&
                            values?.description
                          )
                        }
                      >
                        Add to Cart
                      </button>
                    </div>
                    {/* <NudgeCart
                      isOpen={isCartOpen}
                      toggleCart={toggleCart}
                      uploadedImage={uploadedImage}
                      nudgesCards={nudgesCards}
                      values={values}
                      state={state}
                      fileuploadSelector={fileuploadSelector}
                      setIsCartOpen={setIsCartOpen}
                    /> */}
                  </>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </>
    </>
  );
};

export default NudgeTemplateMerchant;
