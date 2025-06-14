import React, { useEffect, useRef, useState } from "react";
import backButton from "../../../assets/images/backButton.svg";
import arrowRight from "../../../assets/images/arrowRight.svg";
import templateImage from "../../../assets/images/templateImage.png";
import dish from "../../../assets/images/dish.png";
import NudgeCart from "./NudgeCart";
import { useDispatch, useSelector } from "react-redux";
import { getNudgesTemplateHandler } from "../../../redux/action/getNudgesTemplate";
import Loader from "../../../common/Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { fileUploadHandler } from "../../../redux/action/fileUpload";
// import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
// import rightactive from "../../../assets/images/rightactive.svg";
import { Modal } from "antd";
import FollowersModal from "./FollowersModal/FollowersModal";
import {
  handleKeyPressSpace,
  handleNumberFieldLength,
} from "../../../common/commonFunctions/CommonFunctions";

const NudgeTemplate = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [tempSelectedItems, setTempSelectedItems] = useState([]);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [archive, setArchive] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectMerchantList, setSelectMerchantList] = useState(false);
  const [nudgesCards, setNudgesCard] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(nudgesCards?.imageUrl[0]);
  const getNudgesTemplateSelector = useSelector(
    (state) => state?.getNudgesTemplate
  );
  const fileuploadSelector = useSelector((state) => state?.fileupload);

  useEffect(() => {
    if (state?.selectedItems) {
      setSelectedItems(state?.selectedItems);
    }
  }, [state?.selectedItems]);

  useEffect(() => {
    if (state?.selectedItems?.length > 0) {
      setNudgesCard(state?.locationId?.nudgePrev);
    }
  }, [state]);

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
      locationId: localStorage.getItem("merchantId"),
    };
    dispatch(getNudgesTemplateHandler(payload));
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
      fileInputRef.current.click();
    }
  };

  return (
    <>
      {(getNudgesTemplateSelector?.isLoading ||
        fileuploadSelector?.isLoading) && <Loader />}
      <>
        <div className="dashboard">
          <div className="tabPadding mb-20">
            <div className="d-flex align-center gap-20 mb-30 w-100">
              <img
                src={backButton}
                alt="backButton"
                className="cursor-pointer backButton"
                onClick={() => navigate("/admin/nudges")}
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
                nudgesCards?.title || state?.locationId?.nudgePrev?.title || "",
              description:
                nudgesCards?.description ||
                state?.locationId?.nudgePrev?.description ||
                "",
              quantity:
                nudgesCards?.quantity ||
                state?.locationId?.nudgePrev?.quantity ||
                localStorage.getItem("nudgeQuantity") ||
                "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                {nudgesCards && (
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
                            type="number"
                            autoComplete="off"
                            placeholder="Enter quantity"
                            className={
                              errors.quantity && touched.quantity
                                ? "input-error"
                                : ""
                            }
                            onKeyPress={handleKeyPressSpace}
                            onInput={handleNumberFieldLength}
                            onChange={(e) => {
                              const value = e.target.value;
                              localStorage.setItem("nudgeQuantity", value);
                              setFieldValue("quantity", value);
                            }}
                            onKeyDown={(event) => {
                              if (
                                event.key === "ArrowUp" ||
                                event.key === "ArrowDown"
                              ) {
                                event.preventDefault();
                              }
                            }}
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
                      className="tabPadding mb-20 cursor-pointer"
                      // onClick={() => {
                      //   if (!state?.dineSavvyNudge) {
                      //     navigate("/admin/merchant/details", {
                      //       state: { statePrev: state, nudgePrev: nudgesCards,fromSelectAudience:true,quantity:values },
                      //     });
                      //   } else if (state?.dineSavvyNudge) {
                      //     setSelectMerchantList(true);
                      //   }
                      // }}

                      onClick={() => setSelectMerchantList(true)}
                    >
                      <div className="d-flex justify-between align-center gap-20 w-100">
                        <div>
                          <div className="fs-20 fw-600 mb-10">
                            Select your audience
                          </div>
                          <div className="fs-16 darkBlack">
                            {/* {state?.selectedItems?.length > 0 ? (
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
                            )} */}
                            
                            {/* {state?.selectedItems?.length > 0 ||
                            selectedItems?.length > 0 ? (
                              <div className="flexTagFull">
                                {(selectedItems || [])
                                  .concat(state?.selectedItems || [])
                                  .map((item, index) => (
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

                            {selectedItems?.length > 0 ? (
                              <div className="flexTagFull">
                                {/* {(selectedItems || [])
                                  .concat(state?.selectedItems || [])
                                  .map((item, index) => (
                                    <div key={index}>
                                      {item?.userInfo?.displayName}
                                    </div>
                                  ))} */}
                                {selectedItems?.map((item, index) => (
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
                        className="btn w164"
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
                    <NudgeCart
                      isOpen={isCartOpen}
                      toggleCart={toggleCart}
                      uploadedImage={uploadedImage}
                      nudgesCards={nudgesCards}
                      values={values}
                      state={state}
                      fileuploadSelector={fileuploadSelector}
                      setIsCartOpen={setIsCartOpen}
                      selectedItems={selectedItems}
                    />
                  </>
                )}
              </Form>
            )}
          </Formik>
        </div>
        <Modal
          centered
          visible={selectMerchantList} // Control the visibility of the modal  // Handle close
          footer={null} // Hide the footer (buttons)
          closable={false}
          className="selecModalFollowerList"
          onOk={() => setSelectMerchantList(false)}
          onCancel={() => setSelectMerchantList(false)}
        >
          <div className="">
            {/* <div className="topPadding d-flex justify-between align-center">
              <div className="fs-26 fw-700">Followers</div>
              <div className="closeSidebar" onClick={() => {setSelectMerchantList(false);setArchive("")}}>
                <img src={closeRightSidebar} alt="closeRightSidebar" />
              </div>
            </div> */}
            {/* List of items */}
            {/* <div className="padding30"> */}
            <FollowersModal
              archive={archive}
              setArchive={setArchive}
              selectMerchantList={selectMerchantList}
              setSelectMerchantList={setSelectMerchantList}
              setSelectedItems={setTempSelectedItems}
              selectedItems={tempSelectedItems}
              state={state}
              onConfirm={() => {
                setSelectedItems(tempSelectedItems);
                setSelectMerchantList(false);
              }}
            />
            {/* </div> */}
          </div>
        </Modal>
      </>
    </>
  );
};

export default NudgeTemplate;
