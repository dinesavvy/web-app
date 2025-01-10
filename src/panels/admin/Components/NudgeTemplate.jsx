import React, { useEffect, useState } from "react";
import backButton from "../../../assets/images/backButton.svg";
import arrowRight from "../../../assets/images/arrowRight.svg";
import templateImage from "../../../assets/images/templateImage.png";
import dish from "../../../assets/images/dish.png";
import NudgeCart from "./NudgeCart";
import { useDispatch, useSelector } from "react-redux";
import { getNudgesTemplateHandler } from "../../../redux/action/getNudgesTemplate";
import Loader from "../../../common/Loader/Loader";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const NudgeTemplate = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [nudgesCards, setNudgesCard] = useState();
  const getNudgesTemplateSelector = useSelector(
    (state) => state?.getNudgesTemplate
  );
  // console.log(nudgesCards, "nudgesCards");

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .max(50, "Title must be 50 characters or less"),
    description: Yup.string()
      .required("Description is required")
      .max(200, "Description must be 200 characters or less"),
  });

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add("overflow-Hidden");
    } else {
      document.body.classList.remove("overflow-Hidden");
    }

    // Cleanup on component unmount
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
      locationId: location?.state?.locationId,
    };
    dispatch(getNudgesTemplateHandler(payload));
  }, []);

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    // setNudgesCards((prev) => ({
    //   ...prev,
    //   ...values,
    // }));
  };

  return (
    <>
      {getNudgesTemplateSelector?.isLoading ? (
        <Loader />
      ) : (
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
                {getNudgesTemplateSelector?.data?.data?.records?.map(
                  (item, index) => {
                    return (
                      <div
                        className="templateImage"
                        key={index}
                        onClick={() => setNudgesCard(item)}
                      >
                        <img src={item?.imageUrl[0]} alt={item?.title} className="cursor-pointer" />
                        <div className="fs-18 fw-600 absoluteTemplateText">
                          {item?.title}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            {/* {nudgesCards && (
              <>
                <div className="tabPadding mb-20">
                  <div className="fs-24 fw-600">{nudgesCards?.title}</div>
                  <div className="divider"></div>
                  <div className="d-flex align-end gap-16 mb-20 flexWrapsm">
                    <div className="reflectImage">
                      <img src={nudgesCards?.imageUrl[0]} alt="" />
                    </div>
                    <div className="btn w240">Change Photo</div>
                  </div>
                  <div className="inputGrid gap-20">
                    <div>
                      <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                        Title
                      </label>
                      <input type="text" placeholder="Free appetizer" />
                    </div>
                    <div>
                      <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                        Description
                      </label>
                      <input
                        type="text"
                        placeholder="Free appetizer on Happy Hours! From 07:00 PM to 08:00 PM"
                      />
                    </div>
                  </div>
                </div>
                <div className="tabPadding mb-20">
                  <div className="d-flex justify-between align-center gap-20 w-100">
                    <div>
                      <div className="fs-20 fw-600 mb-10">
                        Select your audience
                      </div>
                      <div className="fs-16 darkBlack">
                        By default all your followers will be sent this Nudge.
                      </div>
                    </div>
                    <div>
                      <img src={arrowRight} alt="arrowRight" />
                    </div>
                  </div>
                </div>
                <div className="tabPadding mb-20">
                  <div className="d-flex align-center justify-between gap-20">
                    <div className="fs-20 fw-700">Total</div>
                    <div className="fs-16 darkBlack">$99.99</div>
                  </div>
                </div>
                <div className="tabPadding mb-40">
                  <div className="fs-20 fw-700 mb-20">Preview</div>
                  <div className="d-flex gap-12">
                    <div className="image80">
                      <img src={dish} alt="dish" />
                    </div>
                    <div>
                      <div className="fs-20 fw-600">Free drink</div>
                      <div className="fs-14">
                        Free drink on Happy Hours! From <br /> 07:00 PM to 08:00
                        PM
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )} */}
            <Formik
              enableReinitialize
              initialValues={{
                title: nudgesCards?.title || "",
                description: nudgesCards?.description || "",
                quantity: nudgesCards?.quantity || "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  {nudgesCards && (
                    <>
                      <div className="tabPadding mb-20">
                        <div className="fs-24 fw-600">{nudgesCards?.title}</div>
                        <div className="divider"></div>
                        <div className="d-flex align-end gap-16 mb-20 flexWrapsm">
                          <div className="reflectImage">
                            <img src={nudgesCards?.imageUrl[0]} alt="" />
                          </div>
                          <div className="btn w240">Change Photo</div>
                        </div>
                        <div className="inputGrid gap-20">
                          <div>
                            <label
                              htmlFor="title"
                              className="grey mb-10 fs-16 fw-500"
                            >
                              Title
                            </label>
                            <Field
                              id="title"
                              name="title"
                              type="text"
                              placeholder="Free appetizer"
                              className={
                                errors.title && touched.title
                                  ? "input-error"
                                  : ""
                              }
                            />
                            {errors.title && touched.title && (
                              <div className="error-message">
                                {errors.title}
                              </div>
                            )}
                          </div>
                          <div>
                          <label
                              htmlFor="description"
                              className="grey mb-10 fs-16 fw-500"
                            >
                              Total Quantity
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

                          </div>

                          <div className = "twoSpace">
                          <label
                              htmlFor="description"
                              className="grey mb-10 fs-16 fw-500"
                            >
                              Description
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
                              <div className="error-message">
                                {errors.description}
                              </div>
                            )}
                          </div>

                        </div>
                      </div>
                      <div className="tabPadding mb-20">
                        <div className="d-flex justify-between align-center gap-20 w-100">
                          <div>
                            <div className="fs-20 fw-600 mb-10">
                              Select your audience
                            </div>
                            <div className="fs-16 darkBlack">
                              By default all your followers will be sent this
                              Nudge.
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
                            <img src={dish} alt="dish" />
                          </div>
                          <div>
                            <div className="fs-20 fw-600">Free drink</div>
                            <div className="fs-14">
                              Free drink on Happy Hours! From <br /> 07:00 PM to
                              08:00 PM
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tabPadding mb-20">
                        <button type="submit" className="btn-primary">
                          Submit
                        </button>
                      </div>
                    </>
                  )}
                </Form>
              )}
            </Formik>
            {/* <div className="d-flex justify-end">
              <div className="btn w164 " onClick={toggleCart}>
                Add to Cart
              </div>
            </div> */}
          </div>
          <NudgeCart isOpen={isCartOpen} toggleCart={toggleCart} />
        </>
      )}
    </>
  );
};

export default NudgeTemplate;
