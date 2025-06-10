import React, { useEffect, useState, useRef } from "react";
import backButton from "../../../../assets/images/backButton.svg";
import selectedImage from "../../../../assets/images/selectedImage.svg";
import calender from "../../../../assets/images/calender.svg";
import closeRightSidebar from "../../../../assets/images/closeRightSidebar.svg";
import pairingImg from "../../../../assets/images/pairingImg.png";
import destinationImg from "../../../../assets/images/destination.png";
import { DatePicker, Space } from "antd";
import addPlusIcon from "../../../../assets/images/addPlusIcon.svg";
import merchantMilesSelected from "../../../../assets/images/merchantMilesSelected.svg";
import playbtn from "../../../../assets/images/playbtn.svg";
import { Modal } from "antd";
import dayjs from "dayjs";
import CustomSelect from "../CustomSelect";
import { useNavigate } from "react-router-dom";
import SearchSelect from "../SearchSelect";
import SavvyNudgeDetail from "./SavvyNudgeDetail";
import MerchantViewAll from "./MerchantViewAll";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { validationSchema } from "./savvyNudgeValidation";
import MerchantListModal from "./MerchantListModal";
import moment from "moment";
import {
  createSavvyNudgeAction,
  createSavvyNudgeHandler,
} from "../../../../redux/action/createSavvyNudge";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../common/Loader/Loader";
import { useCommonMessage } from "../../../../common/CommonMessage";

const CreateSavvyNudge = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectMerchantList, setSelectMerchantList] = useState(false);
  const todayPlus3 = dayjs().add(3, "day").startOf("day");
  const messageApi = useCommonMessage();
  const createSavvyNudgeSelector = useSelector(
    (state) => state?.createSavvyNudge
  );
  const firstErrorFieldRef = useRef(null);

  const handleKeyPress = (e) => {
    const regex = /[0-9/]/;
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  // Disable dates before today + 3 days
  const disableBeforeThreeDays = (current) => {
    return current && current < todayPlus3;
  };
  // Array of objects with image and name
  const images = [
    { src: pairingImg, name: "Pairing" },
    { src: destinationImg, name: "Destination" },
  ];

  // Video
  // const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoId, setVideoId] = useState(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);

  const extractVideoId = (url) => {
    const regExp =
      /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|watch\?.+&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };

  // const handleUrlChange = (e) => {
  //   const value = e.target.value;
  //   // setYoutubeUrl(value);
  //   const id = extractVideoId(value);
  //   setVideoId(id);
  // };

  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : "";

  const embeddedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : "";

  const [selectedMerchants, setSelectedMerchants] = useState([]);

  const options = ["25", "50", "100", "250", "National"];
  const [selectedDuration, setSelectedDuration] = useState("5");
  const [selected, setSelected] = useState("25");

  // Define field hierarchy order
  const fieldHierarchy = [
    'title',
    'description',
    'launchDate',
    'youtubeUrl',
    'requiredIngredients',
    'preparationInstructions',
    'foodSupplierLink',
    'beverageSupplierLink'
  ];

  const handleFormSubmit = (values, formikBag) => {
    if (selectedMerchants?.length === 0) {
      messageApi.open({
        type: "error",
        content: "Please select at least 1 merchant",
      });
      return;
    }

    // Check if title is empty
    if (!values.title.trim()) {
      messageApi.open({
        type: "error",
        content: "Title is required",
      });
      return;
    }

    let payload = {
      title: values?.title.trim(),
      description: values?.description.trim(),
      launchDate: values?.launchDate,
      duration: selectedDuration,
      youtubeUrl: values?.youtubeUrl,
      merchants: selectedMerchants.map((item) => ({ id: item?._id })),
      targetRadius: selected,
      requiredIngredients: values?.requiredIngredients.trim(),
      preparationInstructions: values?.preparationInstructions.trim(),
      foodSupplierLink: values?.foodSupplierLink,
      beverageSupplierLink: values?.beverageSupplierLink,
    };
    dispatch(createSavvyNudgeHandler(payload));
  };

  const durationOptions = ["5", "10", "15", "30"];

  const filteredOptions = selectedIndex === 0 ? ["5"] : durationOptions;

  const handleDurationChange = (value) => {
    setSelectedDuration(value);
  };

  const handleMerchantSelectionChange = (selected) => {
    setSelectedMerchants(selected);
  };

  useEffect(() => {
    if (createSavvyNudgeSelector?.message?.statusCode === 400) {
      messageApi.open({
        type: "error",
        content: createSavvyNudgeSelector?.message?.message,
      });
      dispatch(createSavvyNudgeAction.createSavvyNudgeReset());
    } else if (createSavvyNudgeSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: createSavvyNudgeSelector?.data?.message,
      });
      dispatch(createSavvyNudgeAction.createSavvyNudgeReset());
      navigate("/admin/savvy-nudge");
    }
  }, [createSavvyNudgeSelector]);

  const resetFormState = () => {
    setSelectedDuration(selectedIndex === 0 ? "5" : "5");
    setSelected("25");
    setVideoId(null);
    setActiveVideoUrl(null);
    setSelectedMerchants([]);
  };

  useEffect(() => {
    resetFormState();
  }, [selectedIndex]);

  // Function to handle error field focus
  const handleErrorFieldFocus = (errors, touched) => {
    // Find all fields with errors
    const errorFields = Object.keys(errors).filter(field => touched[field]);
    
    if (errorFields.length > 0) {
      // Find the first error field based on hierarchy
      const firstErrorField = fieldHierarchy.find(field => errorFields.includes(field));
      
      if (firstErrorField) {
        // Find the corresponding DOM element
        let errorElement;
        
        // Special handling for different field types
        if (firstErrorField === 'youtubeUrl') {
          errorElement = document.querySelector('input[name="youtubeUrl"]');
        } else if (firstErrorField === 'launchDate') {
          // For DatePicker, we need to find the input element inside the ant-picker
          errorElement = document.querySelector('.ant-picker-input > input');
        } else {
          errorElement = document.querySelector(`[name="${firstErrorField}"]`);
        }

        if (errorElement) {
          // First scroll to the element
          setTimeout(() => {
            errorElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center',
              inline: 'nearest'
            });
            
            // Then focus after a small delay
            setTimeout(() => {
              errorElement.focus();
            }, 300);
          }, 100);
        }
      }
    }
  };

  // Helper function to set error field ref
  const setErrorFieldRef = (el, fieldName, errors, touched) => {
    // Only set the ref if this field has an error and is touched
    if (errors[fieldName] && touched[fieldName]) {
      // If no error field is set yet, or if this field comes before the current error field
      if (!firstErrorFieldRef.current) {
        firstErrorFieldRef.current = el;
      }
    }
  };

  // Function to find the first field with an error
  const findFirstErrorField = (errors, touched) => {
    const errorFields = Object.keys(errors).filter(field => touched[field]);
    if (errorFields.length > 0) {
      return errorFields[0];
    }
    return null;
  };

  return (
    <>
      {createSavvyNudgeSelector?.isLoading && <Loader />}
      <Formik
        initialValues={{
          title: "",
          description: "",
          launchDate: null,
          requiredIngredients: "",
          preparationInstructions: "",
          foodSupplierLink: "",
          beverageSupplierLink: "",
          youtubeUrl: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, formikBag) => {
          handleFormSubmit(values, formikBag);
        }}
        validateOnMount={true}
      >
        {({ isSubmitting, values, setFieldValue, resetForm, errors, touched, submitForm, setTouched }) => (
          <Form>
            {console.log(errors,"errors")}
            <div className="dashboard">
              <div className="tabPadding mb-20">
                <div className="d-flex align-center gap-20 w-100">
                  <img
                    src={backButton}
                    alt="backButton"
                    className="cursor-pointer backButton"
                    onClick={() => navigate("/admin/savvy-nudge")}
                  />
                  <div>
                    <div className="fs-24 fw-600">Savvy Nudge Template</div>
                  </div>
                </div>
                <div className="divider2"></div>
                <div className="savvyGrid">
                  {images?.map((item, index) => (
                    <div
                      key={index}
                      className={`savvyImageSelect ${
                        selectedIndex === index ? "selectedBorder" : ""
                      }`}
                      onClick={() => {
                        setSelectedIndex(index);
                        resetForm();
                        setSelectedMerchants([]);
                      }}
                    >
                      <div className="gradiant"></div>
                      <div className="fs-18 fw-600 savvyname">{item?.name}</div>
                      <img
                        src={item?.src}
                        alt={`Dish ${index}`}
                        className="w-100 h-100"
                      />
                      {selectedIndex === index && (
                        <div className="selectedImage">
                          <img src={selectedImage} alt="Selected" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="tabPadding mb-20">
                <div className="fs-24 fw-600">Enter the Details</div>
                <div className="divider2"></div>
                <div className="savvyInputGrid gap-20">
                  <div className="threeSpace">
                    <label htmlFor="name" className=" mb-10 fs-16 fw-500">
                      Title*
                    </label>
                    <Field
                      type="text"
                      name="title"
                      className="input"
                      placeholder="Free appetizer"
                      maxLength={20}
                      innerRef={(el) => setErrorFieldRef(el, 'title', errors, touched)}
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    />
                  </div>
                  <div className="threeSpace position-relative">
                    <label htmlFor="name" className=" mb-10 fs-16 fw-500">
                      Description*
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      placeholder="Free appetizer on Happy Hours! From 07:00 PM to 08:00 PM"
                      maxLength={750}
                      innerRef={(el) => setErrorFieldRef(el, 'description', errors, touched)}
                    />
                    <div className="fs-12 textWord">
                      {values?.description?.length}/750
                    </div>
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    />
                  </div>
                  <div className=" position-relative">
                    <Field name="launchDate">
                      {({ field, form }) => (
                        <div className="position-relative">
                          <label
                            htmlFor="launchDate"
                            className="mb-10 fs-16 fw-500"
                          >
                            Savvy Nudge Launch Date*
                          </label>
                          <DatePicker
                            placeholder="Set merchant availability period"
                            onKeyPress={handleKeyPress}
                            disabledDate={disableBeforeThreeDays}
                            className="w-100 datePickerinput"
                            value={
                              field.value
                                ? dayjs(field.value, "YYYY-MM-DD")
                                : null
                            }
                            suffixIcon={
                              <img
                                src={calender}
                                className="calenderIcon"
                                alt=""
                              />
                            }
                            format="YYYY-MM-DD"
                            onChange={(date, dateString) => {
                              form.setFieldValue("launchDate", dateString);
                            }}
                            allowClear={false}
                            id="launchDate"
                          />
                          {form?.touched?.launchDate &&
                            form?.errors?.launchDate && (
                              <div className="mt-10 fw-500 fs-14 error">
                                {form?.errors?.launchDate}
                              </div>
                            )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div className=" position-relative">
                    <label htmlFor="name" className=" mb-10 fs-16 fw-500">
                      Savvy Nudge Duration
                    </label>

                    <CustomSelect
                      key={selectedIndex}
                      options={filteredOptions}
                      value={selectedDuration}
                      onChange={handleDurationChange}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="name" className=" mb-10 fs-16 fw-500">
                      Audience Targeting (Optional)
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Define target audience"
                    />
                  </div>
                </div>
              </div>
              <div className="tabPadding mb-20">
                <div className="fs-24 fw-600">Nudges Creation</div>
                <div className="divider2"></div>
                <div className="inputGrid gap-20">
                  <div className="">
                    <label htmlFor="youtubeUrl" className=" mb-10 fs-16 fw-500">
                      Youtube Video Link*
                    </label>
                    <Field
                      type="text"
                      className="input"
                      placeholder="https://www.youtube.com/embed/tgbNymZ7vqY"
                      onChange={(e) => {
                        setFieldValue("youtubeUrl", e.target.value);
                        const id = extractVideoId(e.target.value);
                        setVideoId(id);
                      }}
                      name="youtubeUrl"
                      id="youtubeUrl"
                    />
                    <ErrorMessage
                      name="youtubeUrl"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    />
                  </div>
                  {videoId && (
                    <div>
                      <label className="mb-10 fs-16 fw-500">Video</label>
                      <div
                        className="text-center videoThumbnail"
                        onClick={() => setActiveVideoUrl(embeddedUrl)}
                        style={{ position: "relative", cursor: "pointer" }}
                      >
                        <img
                          src={playbtn}
                          className="playbtn"
                          alt="Play"
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        />
                        <img
                          src={thumbnail}
                          alt="Video thumbnail"
                          className="w-100 h-100"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="tabPadding mb-20">
                <div className="fs-20 fw-700 mb-10">Merchant</div>
                <div className="d-flex flex-wrap mb-20 align-center gap-10">
                  {/* <div className="merchantSelectList fs-14">Starbucks</div> */}
                  {/* selectedMerchants */}
                  {selectedMerchants?.map((item) => {
                    return (
                      <div className="merchantSelectList fs-14" key={item?._id}>
                        {item?.businessName}
                      </div>
                    );
                  })}
                  <div
                    className="merchantAddList fs-14 cursor-pointer"
                    onClick={() => setSelectMerchantList(true)}
                  >
                    <img src={addPlusIcon} width={22} height={22} alt="" />
                    Add more
                  </div>
                </div>
                <div className="fs-16 fw-500 mb-10">Merchant Radius</div>
                <div className="d-flex flex-wrap mb-12 align-center gap-16">
                  {options.map((option) => (
                    <div
                      key={option}
                      onClick={() => setSelected(option)}
                      className={`merchantMiles fs-16 fw-500 cursor-pointer
              ${selected === option ? "selectedMiles" : ""}
            `}
                    >
                      {selected === option && (
                        <img src={merchantMilesSelected} alt="" />
                      )}
                      <span className={selected === option ? "pl-5" : ""}>
                        {option} {option === "National" ? "" : "miles"}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="fs-12 grey">
                  Selected merchants will target users within{" "}
                  {selected === "National"
                    ? "the entire country"
                    : `${selected} miles`}
                  .
                </div>
              </div>
              <div className="tabPadding mb-20">
                <div className="fs-24 fw-600">Enter the Recipe Details</div>
                <div className="divider2"></div>
                <div className="">
                  <div className="mb-20">
                    <label htmlFor="name" className=" mb-10 fs-16 fw-500">
                      Required ingredients*
                    </label>
                    {/* <textarea placeholder="Required ingredients"></textarea> */}
                    <Field
                      as="textarea"
                      name="requiredIngredients"
                      placeholder="Required ingredients"
                      // maxLength={750}
                      innerRef={(el) => setErrorFieldRef(el, 'requiredIngredients', errors, touched)}
                    />
                    <ErrorMessage
                      name="requiredIngredients"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    />
                  </div>
                </div>
                <div className="">
                  <div className="">
                    <label htmlFor="name" className=" mb-10 fs-16 fw-500">
                      Preparation instructions*
                    </label>
                    {/* <textarea placeholder="Preparation instructions"></textarea> */}
                    <Field
                      as="textarea"
                      name="preparationInstructions"
                      placeholder="Preparation instructions"
                      // maxLength={750}
                      innerRef={(el) => setErrorFieldRef(el, 'preparationInstructions', errors, touched)}
                    />

                    <ErrorMessage
                      name="preparationInstructions"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    />
                  </div>
                </div>
              </div>
              <div className="tabPadding mb-20">
                <div className="fs-24 fw-600">Supplier/Distributor Links</div>
                <div className="divider2"></div>
                <div className="inputGrid gap-20">
                  <div className="">
                    <label className=" mb-10 fs-16 fw-500">Food Ordering</label>
                    <Field
                      type="text"
                      className="input"
                      placeholder="Link to the Supplier/Distributor that provides the food ingredients"
                      name="foodSupplierLink"
                      innerRef={(el) => setErrorFieldRef(el, 'foodSupplierLink', errors, touched)}
                    />
                    <ErrorMessage
                      name="foodSupplierLink"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    />
                  </div>
                  <div className="">
                    <label className=" mb-10 fs-16 fw-500">
                      Beverage Ordering
                    </label>
                    <Field
                      type="text"
                      className="input"
                      placeholder="Link to the Supplier/Distributor that provides the beverage"
                      name="beverageSupplierLink"
                      innerRef={(el) => setErrorFieldRef(el, 'beverageSupplierLink', errors, touched)}
                    />
                    <ErrorMessage
                      name="beverageSupplierLink"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    />
                  </div>
                </div>
              </div>
              {videoId && (
                <div className="tabPadding mb-40">
                  <div className="fs-24 fw-600">Preview</div>
                  <div className="divider2"></div>
                  <div className="d-flex gap-20">
                    <div
                      className="text-center PreviewideoThumbnail"
                      onClick={() => setActiveVideoUrl(embeddedUrl)}
                      style={{ position: "relative", cursor: "pointer" }}
                    >
                      <img
                        src={playbtn}
                        className="playbtn"
                        alt="Play"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                      <img
                        src={thumbnail}
                        alt="Video thumbnail"
                        className="w-100 h-100"
                      />
                    </div>
                    <div>
                      <div className="fs-20 fw-600">{values?.title}</div>
                      <div className="fs-16">
                        {/* Free drink on Happy Hours! From 07:00 PM to 08:00 PM */}
                        {values?.description}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="d-flex justify-end">
                <button 
                  className="btn p32" 
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    
                    // Mark all fields as touched to trigger validation
                    const allFieldsTouched = {
                      title: true,
                      description: true,
                      launchDate: true,
                      requiredIngredients: true,
                      preparationInstructions: true,
                      foodSupplierLink: true,
                      beverageSupplierLink: true,
                      youtubeUrl: true
                    };
                    
                    setTouched(allFieldsTouched);
                    
                    submitForm().then(() => {
                      if (Object.keys(errors).length > 0) {
                        handleErrorFieldFocus(errors, allFieldsTouched);
                      }
                    });
                  }}
                >
                  Publish Savvy Nudge
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <Modal
        open={!!activeVideoUrl}
        onCancel={() => setActiveVideoUrl(null)}
        footer={null}
        centered
        destroyOnClose
        className="videoModal"
      >
        {activeVideoUrl && (
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src={`${activeVideoUrl}?autoplay=1`}
              title="YouTube Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        )}
      </Modal>
      {/* MerchantList Modal */}
      {selectMerchantList && (
        <MerchantListModal
          // selectMerchantList={selectMerchantList}
          // setSelectMerchantList={setSelectMerchantList}
          selectMerchantList={selectMerchantList}
          setSelectMerchantList={setSelectMerchantList}
          onSelectionChange={handleMerchantSelectionChange}
          setSelectedMerchants={setSelectedMerchants}
          selectedMerchants={selectedMerchants}
        />
      )}
    </>
  );
};

export default CreateSavvyNudge;
