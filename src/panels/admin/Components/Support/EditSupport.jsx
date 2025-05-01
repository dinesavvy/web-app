import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import backButton from "../../../../assets/images/backButton.svg";
import editIcon from "../../../../assets/images/editIcon.svg";
import addTime from "../../../../assets/images/addTime.svg";
import minusTime from "../../../../assets/images/minusTime.svg";
import dropdownArrow from "../../../../assets/images/dropdownArrow.svg";
import CustomSelect from "../CustomSelect";
import CustomSwitch from "../CustomSwitch";
import { Modal, TimePicker } from "antd";
import dayjs from "dayjs";
import ImageGallery from "../../../merchant/auth/ImageGallery";
import businessPhoto from "../../../../assets/images/businessPhoto.png";
import restaurantCard from "../../../../assets/images/restaurantCard.png";
import { useDispatch, useSelector } from "react-redux";
import { Country, State, City } from "country-state-city";
import addCircle from "../../../../assets/images/addCircle.svg";
import closeRightSidebar from "../../../../assets/images/closeRightSidebar.svg";
import { categoryListHandler } from "../../../../redux/action/categoryList";
import Loader from "../../../../common/Loader/Loader";
import { fileUploadHandler } from "../../../../redux/action/fileUpload";
import {
  addBusinessAction,
  addBusinessHandler,
} from "../../../../redux/action/addBusinessAdminSlice";
import { useCommonMessage } from "../../../../common/CommonMessage";

const EditSupport = () => {
  const messageApi = useCommonMessage();
  const [openImage, setOpenImage] = useState(false);
  const [activeTab, setActiveTab] = useState("Additional");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSpecial, setIsSpecial] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const addImageDataSelector = useSelector((state) => state?.addImageData);
  const location = useLocation();
  const { state } = location;
  const dispatch = useDispatch();

  const businessDetailsData = state?.businessDetail;

  const getAllCountry = Country.getAllCountries();
  const getAllState = State.getAllStates();
  const getAllCities = City.getAllCities();

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [stateOptions, setStateOptions] = useState(getAllState);
  const [selectedState, setSelectedState] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const [editDetail, setEditDetail] = useState(true);

  useEffect(() => {
    if (state?.fromResolve === true) {
      setEditDetail(false);
    }
  }, [state]);

  // Initialize data when component mounts
  useEffect(() => {
    if (businessDetailsData?.result?.address_components) {
      // Get country from address components
      const countryName = getAddressComponent("country");
      const country = getAllCountry.find((c) => c.name === countryName);

      if (country) {
        setSelectedCountry(country);
        // Filter states for selected country
        const filteredStates = getAllState.filter(
          (state) => state.countryCode === country.isoCode
        );
        setStateOptions(filteredStates);

        // Get state from address components
        const stateName = getAddressComponent("administrative_area_level_1");
        const state = filteredStates.find((s) => s.name === stateName);

        if (state) {
          setSelectedState(state);
          // Get cities for selected state and country
          const cities = City.getCitiesOfState(country.isoCode, state.isoCode);
          setCityOptions(cities || []);
        }
      } else {
        // If no country found, show all states initially
        setStateOptions(getAllState);
      }
    }
  }, [businessDetailsData]);

  // Validation Schema
  const validationSchema = Yup.object().shape({
    businessName: Yup.string().required("Business name is required"),
    businessCategory: Yup.string().required("Business category is required"),
    website: Yup.string().url("Must be a valid URL"),
    phoneNumber: Yup.string().required("Phone number is required"),
    address: Yup.object().shape({
      country: Yup.string().required("Country is required"),
      state: Yup.string().required("State is required"),
      streetAddress: Yup.string().required("Street address is required"),
      city: Yup.string().required("City is required"),
      postalCode: Yup.string().required("Postal code is required"),
    }),
    operatingHours: Yup.object().shape({
      // We'll add validation for operating hours if needed
    }),
  });

  // Helper function to extract address components
  const getAddressComponent = (type) => {
    if (!businessDetailsData?.result?.address_components) return "";
    const component = businessDetailsData.result.address_components.find(
      (component) => component.types.includes(type)
    );
    return component ? component.long_name : "";
  };

  // Extract address components
  // const country = getAddressComponent("country");
  // const stateName = getAddressComponent("administrative_area_level_1");
  // const postalCode = getAddressComponent("postal_code");
  // const city = getAddressComponent("locality");
  // const streetAddress = getAddressComponent("premise");

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const hour = parseInt(timeStr.substring(0, 2));
    const minute = timeStr.substring(2, 4);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute} ${period}`;
  };

  const handleUploadImage = () => {
    let payload = {
      title: activeTab,
      imageUrl: fileuploadSelector?.data?.data
        ?.map((item) => item?.src)
        .join(""),
      isSpecial: isSpecial,
      imageCategoryType: activeTab,
    };
    setModalOpen(false);
    // dispatch(addImageHandler(payload));
  };

  const handleCheckboxChange = (event) => {
    setIsSpecial(event.target.checked);
  };

  const handleDelete = () => {
    // setUploadedImage(null);
    // setImagePreview(null);
    setModalOpen(false);
  };

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
      // dispatch(businessFileUploadHandler(payload));
      dispatch(fileUploadHandler(payload));
      reader.readAsDataURL(file);
    }
  };

  const formatTimeToDate = (timeStr) => {
    if (!timeStr) return null;
    const hour = timeStr.substring(0, 2);
    const minute = timeStr.substring(2, 4);
    return dayjs(`${hour}:${minute}`, "HH:mm");
  };
  // Initial form values with proper address components
  const initialValues = {
    businessName: businessDetailsData?.result?.name || "",
    businessCategory: "Restaurant",
    website: businessDetailsData?.result?.website || "",
    phoneNumber: businessDetailsData?.result?.formatted_phone_number || "",
    description: state?.supportItem?.description || "",
    address: {
      country: getAddressComponent("country") || "",
      state: getAddressComponent("administrative_area_level_1") || "",
      streetAddress: businessDetailsData?.result?.formatted_address || "",
      city: getAddressComponent("locality") || "",
      postalCode: getAddressComponent("postal_code") || "",
    },
    operatingHours: daysOfWeek.reduce((acc, day, index) => {
      const dayHours =
        businessDetailsData?.result?.opening_hours?.periods.filter(
          (hour) => hour.open.day === index
        );
      acc[day] = {
        enabled: dayHours?.length > 0,
        slots:
          dayHours?.length > 0
            ? dayHours?.map((hour) => ({
                from: hour?.open?.time,
                to: hour?.close?.time,
              }))
            : [{ from: "", to: "" }],
      };
      return acc;
    }, {}),
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
    let payload = {
      type: "industry",
    };
    dispatch(categoryListHandler(payload));
  }, []);

  const categoryListSelector = useSelector((state) => state?.categoryList);
  const addBusinessSelector = useSelector((state) => state?.addBusiness);

  useEffect(() => {
    if (addBusinessSelector?.data?.statusCode === 200) {
      navigate("/admin/support");
      dispatch(addBusinessAction.addBusinessReset());
    }
  }, [addBusinessSelector]);

  // Handle submit function when create business
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form values:", values);
    // setEditDetail(false)

    // Transform operating hours into the required format
    const transformedBusinessHours = {
      periods: [],
    };

    // Map of full day names to abbreviated day names
    const dayMap = {
      Sunday: "SUN",
      Monday: "MON",
      Tuesday: "TUE",
      Wednesday: "WED",
      Thursday: "THU",
      Friday: "FRI",
      Saturday: "SAT",
    };

    // Process each day's operating hours
    Object.entries(values.operatingHours).forEach(([day, dayData]) => {
      if (dayData?.enabled && dayData.slots) {
        dayData?.slots.forEach((slot) => {
          if (slot?.from && slot?.to) {
            // Convert time format from HHMM to HH:mm:00
            const startTime = `${slot?.from.substring(
              0,
              2
            )}:${slot.from.substring(2, 4)}:00`;
            const endTime = `${slot?.to.substring(0, 2)}:${slot?.to.substring(
              2,
              4
            )}:00`;

            transformedBusinessHours.periods.push({
              dayOfWeek: dayMap[day],
              startLocalTime: startTime,
              endLocalTime: endTime,
            });
          }
        });
      }
    });

    let payload = {
      // status:"Imported",
      // restaurantId:businessDetailsData?.result?.place_id,
      // businessId: state?.supportItem?.businessId,
      // locationId: businessDetailsData?.result?.place_id,
      // businessRequestId:state?.supportItem?._id,
      // country: values?.address?.country,
      // businessName: values?.businessName,
      // description: "",
      // busLoc: {
      //   type: "Point",
      //   coordinates: [
      //     businessDetailsData?.result.geometry?.location?.lng,
      //     businessDetailsData?.result.geometry?.location?.lat,
      //   ],
      // },
      // isLatLongSet:
      //   (businessDetailsData?.result.geometry?.location?.lng !== 0 &&
      //     businessDetailsData?.result.geometry?.location?.lat !==0),
      // phoneNumber: businessDetailsData?.result?.formatted_phone_number,
      // name: values?.businessName,
      //
      // status: "OPERATIONAL",
      // websiteUrl: values?.website,
      // businessHours: transformedBusinessHours,
      // mapsUri: businessDetailsData?.result?.url,
      // logoUrl: "",
      // otherImages: [],
      status: "Imported",
      businessRequestId: state?.supportItem?._id,
      businessDetails: {
        restaurantId: businessDetailsData?.result?.place_id,
        businessId: state?.supportItem?.businessId,
        locationId: businessDetailsData?.result?.place_id,
        businessRequestId: state?.supportItem?._id,
        country: values?.address?.country,
        businessName: values?.businessName,
        description: values?.description || "",
        busLoc: {
          type: "Point",
          coordinates: [
            businessDetailsData?.result.geometry?.location?.lng,
            businessDetailsData?.result.geometry?.location?.lat,
          ],
        },
        isLatLongSet:
          businessDetailsData?.result.geometry?.location?.lng !== 0 &&
          businessDetailsData?.result.geometry?.location?.lat !== 0,
        phoneNumber:
          businessDetailsData?.result?.formatted_phone_number ||
          values?.phoneNumber,
        name: values?.businessName,
        address: {
          addressLine1: "",
          // getAddressComponent("administrative_area_level_1") || "",
          addressLine2: "",
          // getAddressComponent("administrative_area_level_2") || "",
          locality: values?.address?.city || "",
          administrativeDistrictLevel1: values?.address?.state || "",
          postalCode: values?.address?.postalCode || "",
          country: values?.address?.country || "",
        },
        formattedAddress: businessDetailsData?.result?.formatted_address,
        status: "OPERATIONAL",
        websiteUrl: values?.website,
        businessHours: transformedBusinessHours,
        mapsUri: businessDetailsData?.result?.url,
        logoUrl: "",
        otherImages: [],
      },
    };
    dispatch(addBusinessHandler(payload));
    // Handle form submission here
    // setEditDetail(false);
    // setSubmitting(false);
  };

  useEffect(() => {
    if (addBusinessSelector?.message?.status === 400) {
      messageApi.open({
        type: "error",
        content: addBusinessSelector?.message?.response?.data?.message,
      });
      dispatch(addBusinessAction.addBusinessReset());
    }
  }, [addBusinessSelector]);

  const images = [
    businessPhoto,
    restaurantCard,
    restaurantCard,
    businessPhoto,
    restaurantCard,
    businessPhoto,
    restaurantCard,
    restaurantCard,
    businessPhoto,
    restaurantCard,
    businessPhoto,
    restaurantCard,
  ];

  const tabs = [
    { key: "additional", label: "Additional" },
    { key: "cover", label: "Cover" },
    { key: "profile", label: "Profile" },
    { key: "logo", label: "Logo" },
    { key: "food_drink", label: "Food & Drink" },
    { key: "menu", label: "Menu" },
    { key: "merchant_upload", label: "Merchant Upload" },
  ];

  const handleCountryChange = (e, setFieldValue) => {
    const countryName = e.target.value;
    const country = getAllCountry.find((c) => c.name === countryName);
    setSelectedCountry(country);
    setFieldValue("address.country", countryName);

    // Filter states by selected country
    const filteredStates = getAllState.filter(
      (state) => state.countryCode === country?.isoCode
    );
    setStateOptions(filteredStates);
    setFieldValue("address.state", "");
    setSelectedState(null);
    setCityOptions([]);
    setFieldValue("address.city", "");
  };

  const handleStateChange = (e, setFieldValue) => {
    const stateName = e.target.value;
    const state = stateOptions.find((s) => s.name === stateName);
    setSelectedState(state);
    setFieldValue("address.state", stateName);

    if (state && selectedCountry) {
      // Get cities only for selected state and country
      const cities = City.getCitiesOfState(
        selectedCountry.isoCode,
        state.isoCode
      );
      setCityOptions(cities || []);
      setFieldValue("address.city", "");
    } else {
      setCityOptions([]);
      setFieldValue("address.city", "");
    }
  };
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatTime1 = (timeStr) => {
    if (!timeStr) return "";
    const [hour, minute] = timeStr.split(":");
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <>
      {(categoryListSelector?.isLoading || addBusinessSelector?.isLoading) && (
        <Loader />
      )}
      <div className="dashboard">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form>
              <div className="tabPadding mb-30">
                <div className="d-flex align-center justify-between gap-20 w-100">
                  <div className="d-flex align-center gap-20">
                    <img
                      src={backButton}
                      alt=""
                      className="cursor-pointer backButton"
                      onClick={() => navigate("/admin/support")}
                    />
                    <div>
                      <div className="fs-24 fw-600">
                        {businessDetailsData?.result?.name ||
                          state?.businessDetail?.businessName ||
                          "N/A"}
                      </div>
                    </div>
                  </div>
                  {editDetail && state?.fromResolve === true && (
                    <div
                      className="btn btnSecondary p32"
                      onClick={() => setEditDetail(true)}
                    >
                      Edit Details <img src={editIcon} alt="" />
                    </div>
                  )}
                </div>
                <div className="divider2"></div>
                <div className="inputGrid">
                  <div>
                    <label
                      htmlFor="businessName"
                      className="grey mb-10 fs-16 fw-500"
                    >
                      Business name
                    </label>
                    {editDetail ? (
                      <>
                        <Field
                          type="text"
                          name="businessName"
                          className="input"
                          placeholder="Garden Grove Café & Bistro"
                        />
                        {errors.businessName && touched.businessName && (
                          <div className="mt-10 fw-500 fs-14 error">
                            {errors.businessName}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="">
                        {values.businessName ||
                          state?.businessDetail?.businessName ||
                          "N/A"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="businessCategory"
                      className="grey mb-10 fs-16 fw-500"
                    >
                      Business category
                    </label>
                    {editDetail ? (
                      <>
                        <div className="position-relative" ref={wrapperRef}>
                          <Field name="businessCategory">
                            {({ field, form }) => (
                              <select
                                {...field}
                                className="input"
                                onChange={(e) => {
                                  form.setFieldValue(
                                    "businessCategory",
                                    e.target.value
                                  );
                                  setIsSelectOpen(false); // Close after selection
                                }}
                                onFocus={() => setIsSelectOpen(true)}
                              >
                                <option value="">Select a category</option>
                                {categoryListSelector?.data?.data?.categoriesList?.map(
                                  (category, index) => (
                                    <option
                                      key={index}
                                      value={category.displayName}
                                    >
                                      {category.displayName}
                                    </option>
                                  )
                                )}
                              </select>
                            )}
                          </Field>
                          <img
                            src={dropdownArrow}
                            className={`dropdownArrow ${
                              isSelectOpen ? "rotate" : ""
                            }`}
                            alt=""
                          />
                        </div>
                        {errors?.businessCategory &&
                          touched?.businessCategory && (
                            <div className="mt-10 fw-500 fs-14 error">
                              {errors?.businessCategory}
                            </div>
                          )}
                      </>
                    ) : (
                      <div className="">{values?.businessCategory}</div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="website"
                      className="grey mb-10 fs-16 fw-500"
                    >
                      Website link
                    </label>
                    {editDetail ? (
                      <>
                        <Field
                          type="text"
                          name="website"
                          className="input"
                          placeholder="www.dinesavvy.com"
                        />
                        {errors.website && touched.website && (
                          <div className="mt-10 fw-500 fs-14 error">
                            {errors.website}
                          </div>
                        )}
                      </>
                    ) : (
                      <a className="anchor" href={values.website}>
                        {values.website ||
                          state?.businessDetail?.businessDetails?.websiteUrl ||
                          "N/A"}
                      </a>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="grey mb-10 fs-16 fw-500"
                    >
                      Phone number
                    </label>
                    {editDetail ? (
                      <>
                        <Field
                          type="text"
                          name="phoneNumber"
                          className="input"
                          placeholder="+91 123 456 7890"
                        />
                        {errors.phoneNumber && touched.phoneNumber && (
                          <div className="mt-10 fw-500 fs-14 error">
                            {errors.phoneNumber}
                          </div>
                        )}
                      </>
                    ) : (
                      <a className="anchor" href={`tel:${values.phoneNumber}`}>
                        {values.phoneNumber ||
                          state?.businessDetail?.businessDetails?.phoneNumber ||
                          "N/A"}
                      </a>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="grey mb-10 fs-16 fw-500"
                    >
                      Description
                    </label>
                    {editDetail ? (
                      <>
                        <Field
                          type="text"
                          name="description"
                          className="input"
                          placeholder="Please enter description"
                          maxLength={700}
                        />
                        {/* {errors.description && touched.description && (
                          <div className="mt-10 fw-500 fs-14 error">
                            {errors.description}
                          </div>
                        )} */}
                      </>
                    ) : (
                      <a className="anchor" href={values.description}>
                        {values.description ||
                          state?.businessDetail?.description ||
                          "N/A"}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="tabPadding mb-30">
                <div className="fs-20 fw-600">Address</div>
                <div className="divider2"></div>
                <div className="inputGrid">
                  <div>
                    <label
                      htmlFor="address.country"
                      className="grey mb-10 fs-16 fw-500"
                    >
                      Country/Region
                    </label>
                    {editDetail ? (
                      <>
                        <Field name="address.country">
                          {({ field, form }) => (
                            <select
                              {...field}
                              className="input disabled"
                              // onChange={(e) =>
                              //   handleCountryChange(e, form.setFieldValue)
                              // }
                            >
                              <option value="">Select a country</option>
                              {getAllCountry?.map((country, index) => (
                                <option key={index} value={country?.name}>
                                  {country?.name}
                                </option>
                              ))}
                            </select>
                          )}
                        </Field>
                        {errors?.address?.country &&
                          touched.address?.country && (
                            <div className="mt-10 fw-500 fs-14 error">
                              {errors?.address.country}
                            </div>
                          )}
                      </>
                    ) : (
                      <div className="">
                        {values?.address.country ||
                          state?.businessDetail?.businessDetails?.address
                            ?.country ||
                          "N/A"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="address.state"
                      className="grey mb-10 fs-16 fw-500"
                    >
                      State
                    </label>
                    {editDetail ? (
                      <>
                        <Field name="address.state">
                          {({ field, form }) => (
                            <select
                              {...field}
                              className="input disabled"
                              // onChange={(e) =>
                              //   handleStateChange(e, form.setFieldValue)
                              // }
                            >
                              <option value="">Select a state</option>
                              {stateOptions?.map((state, index) => (
                                <option key={index} value={state?.name}>
                                  {state?.name}
                                </option>
                              ))}
                            </select>
                          )}
                        </Field>
                        {errors.address?.state && touched.address?.state && (
                          <div className="mt-10 fw-500 fs-14 error">
                            {errors.address.state}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="">
                        {values.address.state ||
                          state?.businessDetail?.businessDetails?.address
                            ?.locality ||
                          "N/A"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="address.streetAddress"
                      className="grey mb-10 fs-16 fw-500"
                    >
                      Street address
                    </label>
                    {editDetail ? (
                      <>
                        <Field
                          type="text"
                          name="address.streetAddress"
                          className="input disabled"
                          placeholder="4517 Street Ave. Manchester"
                        />
                        {errors.address?.streetAddress &&
                          touched.address?.streetAddress && (
                            <div className="mt-10 fw-500 fs-14 error">
                              {errors.address.streetAddress}
                            </div>
                          )}
                      </>
                    ) : (
                      <div className="">
                        {values.address.streetAddress ||
                          state?.businessDetail?.businessDetails
                            ?.formattedAddress ||
                          "N/A"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="address.city"
                      className="grey mb-10 fs-16 fw-500"
                    >
                      City
                    </label>
                    {editDetail ? (
                      <>
                        <Field name="address.city">
                          {({ field, form }) => (
                            <select
                              {...field}
                              className="input disabled"
                              disabled={!selectedState}
                            >
                              <option value="">Select a city</option>
                              {cityOptions.map((city, index) => (
                                <option key={city.name} value={city.name}>
                                  {city.name}
                                </option>
                              ))}
                            </select>
                          )}
                        </Field>
                        {errors.address?.city && touched.address?.city && (
                          <div className="mt-10 fw-500 fs-14 error">
                            {errors.address.city}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="">{values.address.city || "N/A"}</div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="address.postalCode"
                      className="grey mb-10 fs-16 fw-500"
                    >
                      Postal Code
                    </label>
                    {editDetail ? (
                      <>
                        <Field
                          type="text"
                          name="address.postalCode"
                          className="input disabled"
                          placeholder="39495"
                        />
                        {errors?.address?.postalCode &&
                          touched?.address?.postalCode && (
                            <div className="mt-10 fw-500 fs-14 error">
                              {errors?.address?.postalCode}
                            </div>
                          )}
                      </>
                    ) : (
                      <div className="">
                        {values.address.postalCode ||
                          state?.businessDetail?.businessDetails?.address
                            ?.postalCode ||
                          "N/A"}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="tabPadding mb-30">
                <div className="fs-20 fw-600 mb-20">Hours of operation</div>
                {state?.fromResolve === false && (
                  <>
                    {!editDetail ? (
                      <div>
                        {daysOfWeek.map((day, index) => (
                          <React.Fragment key={day}>
                            <div className="d-flex align-center justify-between">
                              <div className="grey fs-16">{day}</div>
                              <div style={{ whiteSpace: "pre-line" }}>
                                {values.operatingHours[day].enabled
                                  ? values.operatingHours[day].slots
                                      .map(
                                        (slot) =>
                                          `${formatTime(
                                            slot?.from
                                          )} - ${formatTime(slot?.to)}`
                                      )
                                      .join(", ")
                                  : "Closed"}
                              </div>
                            </div>
                            <div className="divider2"></div>
                          </React.Fragment>
                        ))}
                      </div>
                    ) : (
                      <div className="overflow">
                        {daysOfWeek.map((day, index) => (
                          <React.Fragment key={day}>
                            <div className="minw">
                              <div className="d-flex align-center justify-between">
                                <div className="grey fs-16">{day}</div>
                                <div className="d-flex align-center gap-16">
                                  <CustomSwitch
                                    isOn={values.operatingHours[day].enabled}
                                    onToggle={() => {
                                      const newEnabled =
                                        !values.operatingHours[day].enabled;
                                      setFieldValue(
                                        `operatingHours.${day}.enabled`,
                                        newEnabled
                                      );
                                      if (!newEnabled) {
                                        // When turning off, set all slots to empty strings
                                        const newSlots = values.operatingHours[
                                          day
                                        ].slots.map((slot) => ({
                                          from: "",
                                          to: "",
                                        }));
                                        setFieldValue(
                                          `operatingHours.${day}.slots`,
                                          newSlots
                                        );
                                      }
                                    }}
                                  />
                                  <div>
                                    {values.operatingHours[day].enabled
                                      ? "Open"
                                      : "Closed"}
                                  </div>
                                </div>
                              </div>

                              {values.operatingHours[day].enabled &&
                                values.operatingHours[day].slots.map(
                                  (slot, slotIndex) => (
                                    <div
                                      key={slotIndex}
                                      className="mt-10 d-flex align-end gap-10"
                                    >
                                      <div className="w-100">
                                        <label className="fs-14 fw-500 mb-10">
                                          From
                                        </label>
                                        <TimePicker
                                          className="customTime input"
                                          value={formatTimeToDate(slot.from)}
                                          format="HH:mm"
                                          showOk={false}
                                          onSelect={(time) => {
                                            const timeValue = time
                                              ? time.format("HHmm")
                                              : "";
                                            const newSlots = [
                                              ...values.operatingHours[day]
                                                .slots,
                                            ];
                                            newSlots[slotIndex].from =
                                              timeValue;
                                            setFieldValue(
                                              `operatingHours.${day}.slots`,
                                              newSlots
                                            );
                                          }}
                                          onChange={(time, timeString) => {
                                            const timeValue = time
                                              ? time.format("HHmm")
                                              : "";
                                            const newSlots = [
                                              ...values.operatingHours[day]
                                                .slots,
                                            ];
                                            newSlots[slotIndex].from =
                                              timeValue;
                                            setFieldValue(
                                              `operatingHours.${day}.slots`,
                                              newSlots
                                            );
                                          }}
                                          disabledTime={() => {
                                            if (slot.to) {
                                              const toTime = dayjs(
                                                slot.to,
                                                "HHmm"
                                              );
                                              return {
                                                disabledHours: () => {
                                                  const toHour = toTime.hour();
                                                  return Array.from(
                                                    { length: 24 },
                                                    (_, i) => i
                                                  ).filter((h) => h > toHour);
                                                },
                                                disabledMinutes: (hour) => {
                                                  if (hour === toTime.hour()) {
                                                    return Array.from(
                                                      { length: 60 },
                                                      (_, i) => i
                                                    ).filter(
                                                      (m) =>
                                                        m >= toTime.minute()
                                                    );
                                                  }
                                                  return [];
                                                },
                                              };
                                            }
                                            return {};
                                          }}
                                        />
                                      </div>
                                      <div className="w-100">
                                        <label className="fs-14 fw-500 mb-10">
                                          To
                                        </label>
                                        <TimePicker
                                          className="customTime input"
                                          value={formatTimeToDate(slot.to)}
                                          format="HH:mm"
                                          showOk={false}
                                          onSelect={(time) => {
                                            const timeValue = time
                                              ? time.format("HHmm")
                                              : "";
                                            const newSlots = [
                                              ...values.operatingHours[day]
                                                .slots,
                                            ];
                                            newSlots[slotIndex].to = timeValue;
                                            setFieldValue(
                                              `operatingHours.${day}.slots`,
                                              newSlots
                                            );
                                          }}
                                          onChange={(time, timeString) => {
                                            const timeValue = time
                                              ? time.format("HHmm")
                                              : "";
                                            const newSlots = [
                                              ...values.operatingHours[day]
                                                .slots,
                                            ];
                                            newSlots[slotIndex].to = timeValue;
                                            setFieldValue(
                                              `operatingHours.${day}.slots`,
                                              newSlots
                                            );
                                          }}
                                          disabledTime={() => {
                                            if (slot.from) {
                                              const fromTime = dayjs(
                                                slot.from,
                                                "HHmm"
                                              );
                                              return {
                                                disabledHours: () => {
                                                  const fromHour =
                                                    fromTime.hour();
                                                  return Array.from(
                                                    { length: 24 },
                                                    (_, i) => i
                                                  ).filter((h) => h < fromHour);
                                                },
                                                disabledMinutes: (hour) => {
                                                  if (
                                                    hour === fromTime.hour()
                                                  ) {
                                                    return Array.from(
                                                      { length: 60 },
                                                      (_, i) => i
                                                    ).filter(
                                                      (m) =>
                                                        m <= fromTime.minute()
                                                    );
                                                  }
                                                  return [];
                                                },
                                              };
                                            }
                                            return {};
                                          }}
                                        />
                                      </div>
                                      <div
                                        className="addTime"
                                        onClick={() => {
                                          if (slotIndex === 0) {
                                            const newSlots = [
                                              ...values.operatingHours[day]
                                                .slots,
                                              { from: "", to: "" },
                                            ];
                                            setFieldValue(
                                              `operatingHours.${day}.slots`,
                                              newSlots
                                            );
                                          } else {
                                            const newSlots =
                                              values.operatingHours[
                                                day
                                              ].slots.filter(
                                                (_, i) => i !== slotIndex
                                              );
                                            setFieldValue(
                                              `operatingHours.${day}.slots`,
                                              newSlots
                                            );
                                          }
                                        }}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <img
                                          src={
                                            slotIndex === 0
                                              ? addTime
                                              : minusTime
                                          }
                                          alt={
                                            slotIndex === 0
                                              ? "Add Time Slot"
                                              : "Remove Time Slot"
                                          }
                                        />
                                      </div>
                                    </div>
                                  )
                                )}
                            </div>
                            <div className="divider2"></div>
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {state?.fromResolve === true && (
                  <div>
                    {(state?.businessDetail?.businessDetails?.businessHours
                      ?.periods?.length > 0
                      ? state.businessDetail.businessDetails.businessHours
                          .periods
                      : daysOfWeek.map((day, i) => ({
                          dayOfWeek: [
                            "SUN",
                            "MON",
                            "TUE",
                            "WED",
                            "THU",
                            "FRI",
                            "SAT",
                          ][i],
                          startLocalTime: null,
                          endLocalTime: null,
                        }))
                    ).map((day, index) => {
                      const dayIndex = [
                        "SUN",
                        "MON",
                        "TUE",
                        "WED",
                        "THU",
                        "FRI",
                        "SAT",
                      ].indexOf(day.dayOfWeek);
                      const fullDayName = daysOfWeek[dayIndex];

                      const hasTime = day?.startLocalTime && day?.endLocalTime;

                      return (
                        <React.Fragment key={index}>
                          <div className="d-flex align-center justify-between">
                            <div className="grey fs-16">{fullDayName}</div>
                            <div style={{ whiteSpace: "pre-line" }}>
                              {hasTime
                                ? `${formatTime1(
                                    day.startLocalTime
                                  )} To ${formatTime1(day.endLocalTime)}`
                                : "Closed"}
                            </div>
                          </div>
                          <div className="divider2"></div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="tabPadding mb-30">
                {/* {editDetail && (
                <div className="d-flex align-center justify-between mb-20">
                  <div className="fs-20 fw-600">Gallery</div>
                  <div
                    className="addCircle cursor-pointer"
                    onClick={() => toggleModal()}
                  >
                    <img src={addCircle} alt="" />
                  </div>
                </div>
                )} */}
                <div className="tabs-container tab3 tabFull mb-20">
                  <div className="tabs">
                    {tabs?.map((tab) => (
                      <button
                        key={tab.key}
                        className={`tab-button ${
                          activeTab === tab?.label ? "active" : ""
                        }`}
                        onClick={() => setActiveTab(tab?.label)}
                      >
                        {tab?.label}
                      </button>
                    ))}
                  </div>
                </div>
                <ImageGallery
                  images={images}
                  openImage={openImage}
                  setOpenImage={setOpenImage}
                  activeTab={activeTab}
                  addImageDataSelector={addImageDataSelector}
                  businessDetailsData={businessDetailsData}
                />
              </div>

              {editDetail && (
                <div className="d-flex align-center justify-end">
                  <button
                    type="submit"
                    className="btn w170"
                    // disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>

      {/* Upload Image modal */}
      <Modal
        centered
        visible={isModalOpen} // Control the visibility of the modal  // Handle close
        footer={null} // Hide the footer (buttons)
        closable={false}
        className="selecModal"
      >
        <div className="p20">
          <div className=" d-flex justify-between align-center">
            <div className="fs-18 fw-700">
              {!imagePreview ? "Upload Photo" : "Image Details"}{" "}
            </div>
            <div
              className="closeSidebar"
              onClick={() => {
                setModalOpen(false);
                setImagePreview(null);
              }}
            >
              <img src={closeRightSidebar} alt="closeRightSidebar" />
            </div>
          </div>
          <div className="divider2"></div>
          {!imagePreview ? (
            <label className="uploadDrag text-center" htmlFor="file">
              <input
                type="file"
                id="file"
                className="d-none"
                onChange={handleImageUpload}
              />
              <div>
                <div className="fs-14 mb-16">Drag images here</div>
                <div className="fs-14 grey mb-16">or</div>
                <div className="btn gap-8 px16 fw-500">
                  <img src="upload-icon.png" alt="" />
                  Choose from gallery
                </div>
              </div>
            </label>
          ) : (
            <div className="image-details">
              <div className="image-preview mb-20">
                <img
                  src={imagePreview}
                  // alt={uploadedImage.name}
                  className="w-100 h-100"
                />
              </div>
              <div className="details">
                {/* <div className="fs-20 fw-700 mb-20">{uploadedImage.name}</div> */}
                <div>
                  <div className="custom-checkbox">
                    <label className="checkLabel">
                      <input
                        type="checkbox"
                        checked={isSpecial}
                        onChange={handleCheckboxChange}
                      />
                      <span className="checkmark"></span>
                      Mark as Special
                    </label>
                  </div>
                </div>
                <div className="divider2 my-16"></div>
                <div className="d-flex gap-10 justify-end flexBtn">
                  <div
                    className="btnSecondary w-100 btn"
                    onClick={handleDelete}
                  >
                    Cancel
                  </div>
                  <div className="w-100 btn" onClick={handleUploadImage}>
                    Upload
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default EditSupport;
