import React, { useEffect, useState } from "react";
import pepsi from "../../../../assets/images/pepsi.svg";
import searchIcon from "../../../../assets/images/searchIcon.svg";
import addPlusIcon from "../../../../assets/images/addPlusIcon.svg";
import datePicker from "../../../../assets/images/datePicker.svg";
import closeIcon from "../../../../assets/images/closeIcon.svg";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DatePicker, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { merchantsListHandler } from "../../../../redux/action/merchantsList";
import DragMerchantItem from "../../../admin/Components/DragMerchantItem";
import moment from "moment";
import { ErrorMessage, Field, Form, Formik } from "formik";
import noImageFound from "../../../../assets/images/noImageFound.png";
// import {
//   createPromotionAction,
//   createPromotionHandler,
// } from "../../../../redux/action/createPromotion";

import {
  createDistributorPromotionHandler,
  createDistributorPromotionAction,
} from "../../../../redux/action/distributorsAction/createDistributorPromotion";
import { useCommonMessage } from "../../../../common/CommonMessage";
import DropBrandsZone from "../../../admin/Components/DropBrandsZone";
import DragBrandsItem from "../../../admin/Components/DragBrandsItem";
import DropMerchantZone from "../../../admin/Components/DropMerchantZone";
import Loader from "../../../../common/Loader/Loader";
import CustomDragLayer from "../../../admin/Components/CustomDragLayer";
import { supplierBrandListHandler } from "../../../../redux/action/supplierActions/supplierBrandList";
import { supplierMerchantListHandler } from "../../../../redux/action/supplierActions/supplierMerchantList";
import {
  addSupplierPromotionAction,
  addSupplierPromotionHandler,
} from "../../../../redux/action/supplierActions/addSupplierPromotion";
import { brandListDistributorHandler } from "../../../../redux/action/distributorsAction/brandListDistributor";
import { distributorMerchantListHandler } from "../../../../redux/action/distributorsAction/distributorMerchantList";

const AddDistributorPromotion = () => {
  const [promotionTitle, setPromotionTitle] = useState("");
  const [searchString, setSearchString] = useState("");
  const [searchStringMerchant, setSearchStringMerchant] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState({
    fromDate: "",
    toDate: "",
    promotionTitle: "",
  });
  const [mercahnts, setMercahnts] = useState([]);
  const [droppedMerchants, setDroppedMerchants] = useState([]);
  const [selectedMerchants, setSelectedMerchants] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [droppedBrand, setDroppedBrand] = useState(null);
  const [draggingItem, setDraggingItem] = useState(null);
  const [brands, setBrands] = useState([{}]);

  const messageApi = useCommonMessage();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const brandListSelector = useSelector((state) => state?.brandListDistributor);
  const merchantsListSelector = useSelector(
    (state) => state?.distributorMerchantList
  );
  const createPromotionSelector = useSelector(
    (state) => state?.createDistributorPromotion
  );

  const validateDates = () => {
    let newErrors = { fromDate: "", toDate: "", promotionTitle: "" };

    if (!startDate) {
      newErrors.fromDate = "From date is required";
    }
    if (!endDate) {
      newErrors.toDate = "To date is required";
    }

    if (!promotionTitle) {
      newErrors.promotionTitle = "Promotion title is required";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedMerchants((prevSelected) =>
      prevSelected.includes(itemId) ? [] : [itemId]
    );
  };

  const handleDragStartMerchant = () => {
    setDragging(true);
  };

  const handleDragEndMerchant = () => {
    setDragging(false);
  };

  const handleRemoveDroppedMerchants = (id) => {
    const removedItem = droppedMerchants.find((item) => item?._id === id);
    setDroppedMerchants((prevDroppedMerchants) =>
      prevDroppedMerchants.filter((item) => item?._id !== id)
    );
    setMercahnts((prevMercahnts) => [...prevMercahnts, removedItem]);
  };

  const handleDropMerchant = (draggedItem) => {
    const draggedIds = draggedItem?.ids?.[0] || [];
    const draggedItems = merchantsListSelector?.data?.data?.records?.filter(
      (item) => draggedIds.includes(item?._id)
    );

    setMercahnts((prevMercahnts) =>
      prevMercahnts.filter((item) => !draggedIds.includes(item?._id))
    );

    setDroppedMerchants((prevDropped) => [...prevDropped, ...draggedItems]);
    setSelectedMerchants([]);
  };

  useEffect(() => {
    if (createPromotionSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: createPromotionSelector?.data?.message,
      });
      navigate("/distributors/promotion");
      dispatch(
        createDistributorPromotionAction.createDistributorPromotionReset()
      );
    } else if (
      createPromotionSelector?.message?.response?.data?.statusCode === 400
    ) {
      messageApi.open({
        type: "error",
        content: createPromotionSelector?.message?.response?.data?.message,
      });
      dispatch(addSupplierPromotionAction.createDistributorPromotionReset());
    }
  }, [createPromotionSelector]);

  useEffect(() => {
    let payload = {
      page: 1,
      limit: 10,
      searchString: searchString,
    };
    dispatch(brandListDistributorHandler(payload));
  }, [searchString]);

  useEffect(() => {
    const fetchMerchants = () => {
      const payload = {
        page: 1,
        limit: 10,
        timeFrame: "today",
        searchString: searchStringMerchant,
        searchArea: [],
      };
      dispatch(distributorMerchantListHandler(payload));
    };

    fetchMerchants();
  }, [searchStringMerchant]);

  const handleBrandDrop = (draggedItem) => {
    if (!droppedBrand) {
      setDroppedBrand(draggedItem);
      setDraggingItem(null);
    }
  };

  const handleBrandClick = (item) => {
    if (!droppedBrand) {
      setBrands((prevBrands) => prevBrands.filter((i) => i?._id !== item?._id));
      setDroppedBrand(item);
    }
  };

  const handleDragStart = (item) => {
    if (!droppedBrand) {
      setDraggingItem(item);
      setDragging(true);
    }
  };

  const handleRemoveBrand = () => {
    if (droppedBrand) {
      setBrands((prevBrands) => [...prevBrands, droppedBrand]);
      setDroppedBrand(null);
    }
  };

  const handleSubmit = (values) => {
    if (validateDates()) {
      let payload = {
        promotionTitle: promotionTitle,
        brandId: droppedBrand?.id,
        startDate: startDate ? moment(startDate).valueOf() : null,
        endDate: endDate ? moment(values.endDate).valueOf() : null,
        merchants: values?.merchants?.map((item, index) => {
          return {
            merchantId: droppedMerchants?.map((item) => item?._id).join(""),
            quantity: item?.quantity,
            promotionFund: item?.promotionalFunds.join(""),
            mSRP: item?.msrp,
            retailPrice: item?.priceForReimbursement,
            fundAmount: item?.fundAmount?.join(" "),
          };
        }),
      };
      // if (!promotionTitle) {
      //   setPromotionTitleError("Promotion title is required");
      //   return;
      // } else {
      //   dispatch(createPromotionHandler(payload));
      // }
      dispatch(createDistributorPromotionHandler(payload));
    }
  };

  return (
    <>
      {(brandListSelector?.isLoading || createPromotionSelector?.isLoading) && (
        <Loader />
      )}
      <div className="dashboard">
        <DndProvider backend={HTML5Backend}>
          <div className="d-flex gap-20 position-relative">
            {/* Brands List */}
            <div className="w-100 positionSticky">
              <div className="mb-20 ">
                <div className="padding20">
                  <div className="d-flex justify-between align-center gap-10">
                    <div className="fs-18 fw-700">Brands</div>
                    <div className="d-flex  align-center gap-16">
                      <div className="lineSearch w-100">
                        <input
                          type="text"
                          placeholder="Search Brands"
                          onChange={(e) => setSearchString(e.target.value)}
                        />
                        <img
                          src={searchIcon}
                          alt=""
                          className="absoluteImage"
                        />
                      </div>
                      <div
                        className="btn btnSecondary addPlus"
                        onClick={() => navigate("/admin/brands/add")}
                      >
                        <img src={addPlusIcon} alt="addPlusIcon" />
                        Add
                      </div>
                    </div>
                  </div>
                </div>
                <div className="paddingb20">
                  <div className="selectGrid3">
                    {brandListSelector?.data?.data?.records?.length > 0 ? (
                      <>
                        {brandListSelector?.data?.data?.records?.map(
                          (item, index) => {
                            return (
                              <>
                                <div
                                  key={index}
                                  // onClick={() => handleBrandClick(item)}
                                  style={{
                                    cursor:
                                      draggingItem || droppedBrand
                                        ? "not-allowed"
                                        : "pointer",
                                  }}
                                >
                                  <DragBrandsItem
                                    id={item?._id}
                                    name={item.brandName}
                                    info={item?.brandName}
                                    onDragEnd={handleDragEndMerchant}
                                    type="brand"
                                    onDragStart={() => handleDragStart(item)}
                                    disabled={!!draggingItem || !!droppedBrand}
                                    selectedBrands={item}
                                  />
                                </div>
                              </>
                            );
                          }
                        )}
                      </>
                    ) : (
                      <div className="noDataFound">No data available</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-20 ">
                <div className="padding20 ">
                  <div className="d-flex justify-between align-center gap-10 ">
                    <div className="fs-18 fw-700">Merchants</div>
                    <div className="d-flex  align-center gap-16">
                      <div className="lineSearch w-100">
                        <input
                          type="text"
                          placeholder="Search Merchants"
                          onChange={(e) =>
                            setSearchStringMerchant(e.target.value)
                          }
                        />
                        <img
                          src={searchIcon}
                          alt=""
                          className="absoluteImage"
                        />
                      </div>
                      {/* <div className="btn btnSecondary addPlus">
                        <img src={addPlusIcon} alt="addPlusIcon" />
                        Add
                      </div> */}
                    </div>
                  </div>
                  <div className="tabs-container tab3 tabFull marginminus">
                    <div className="tabs">
                      <button className="tab-button active">Merchants</button>
                      <button className="tab-button disabled">Groups</button>
                    </div>
                  </div>
                </div>

                <div className="paddingb20">
                  <div className="selectMerchant">
                    {merchantsListSelector?.data?.data?.records?.length > 0 ? (
                      <>
                        {merchantsListSelector?.data?.data?.records?.map(
                          (item, index) => {
                            return (
                              <>
                                <div
                                  key={index}
                                  className="cursor-pointer position-relative"
                                >
                                  <div className="custom-checkbox">
                                    <label className="checkLabel">
                                      <input
                                        type="checkbox"
                                        checked={selectedMerchants.includes(
                                          item?._id
                                        )}
                                        onChange={() =>
                                          handleCheckboxChange(item._id)
                                        }
                                      />
                                      <span className="checkmark"></span>
                                    </label>
                                  </div>
                                  <div
                                  // onClick={() => handleAddToDropZone(item)}
                                  >
                                    <DragMerchantItem
                                      type="merchant"
                                      id={item.id}
                                      name={item.logoUrl}
                                      selectedMerchants={selectedMerchants} // Pass selected items
                                      onDragStart={() =>
                                        handleDragStartMerchant(item)
                                      }
                                      items={item}
                                    />
                                  </div>
                                  <div className="divider2"></div>
                                  <CustomDragLayer merchants={mercahnts} />
                                </div>
                              </>
                            );
                          }
                        )}
                      </>
                    ) : (
                      <div className="noDataFound">No data available</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Drop Area */}
            <div className="w-100 positionSticky">
              <div className="tabPadding mb-20">
                <input
                  type="text"
                  name="addTitleInput"
                  id="addTitleInput"
                  className="addTitleInput"
                  placeholder="Add promotion title here"
                  autoComplete="off"
                  onChange={(e) => {
                    setPromotionTitle(e.target.value);
                    setErrors((prev) => ({ ...prev, promotionTitle: "" }));
                  }}
                />
              </div>
              {errors.promotionTitle && (
                <p className="mt-10 fw-500 fs-14 error">
                  {errors.promotionTitle}
                </p>
              )}
              <div className="tabPadding mb-20">
                <div className="fs-18 fw-700">Add Brand</div>
                <div className="divider2"></div>
                <div className="selectGrid3">
                  {!droppedBrand && (
                    <DropBrandsZone
                      allowedType="brand"
                      // onDropBrand={handleBrandDrop}
                      onDropBrand={(draggedItem) =>
                        handleBrandDrop(draggedItem)
                      }
                    />
                  )}
                  {droppedBrand && (
                    <div key={droppedBrand?.id} className="brandItem">
                      <img
                        src={
                          droppedBrand?.selectedBrands?.imageUrl?.[0] || pepsi
                        }
                        alt={droppedBrand?.name}
                      />
                      <div onClick={handleRemoveBrand} className="closeIcon">
                        <img src={closeIcon} alt="Remove" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="tabPadding mb-20">
                <div className="fs-18 fw-700">Add Merchants</div>
                <div className="divider2"></div>
                <div className="overflowy h310">
                  <div className="selectGrid3">
                    {droppedMerchants?.length === 0 && (
                      <DropMerchantZone
                        allowedType="merchant"
                        onDropMerchant={(draggedItem) =>
                          handleDropMerchant(draggedItem)
                        }
                      />
                    )}
                    {droppedMerchants?.map((item) => (
                      <div key={item?._id} className="brandItem">
                        {/* <img src={item.name} alt={item.name} /> */}
                        <img src={item?.logoUrl||noImageFound} alt={item.businessName} />
                        {/* <img src={noImageFound} alt={item.name} /> */}
                        <div
                          onClick={() =>
                            handleRemoveDroppedMerchants(item?._id)
                          }
                          className="closeIcon"
                        >
                          <img src={closeIcon} alt="Remove" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="tabPadding mb-20">
                <div className="fs-18 fw-700"> Promotion timeframe</div>
                <div className="divider2"></div>
                <div className=" d-flex align-end gap-10">
                  <div className="w-100">
                    <label htmlFor="" className="fs-14 fw-500 mb-10">
                      From
                    </label>
                    <div className="position-relative">
                      <DatePicker
                        className="customTime input"
                        format="YYYY-MM-DD"
                        onChange={(date, dateString) => {
                          setStartDate(dateString);
                          setErrors((prev) => ({ ...prev, fromDate: "" }));
                        }}
                        disabledDate={(current) => {
                          return current && current < moment().startOf("day");
                        }}
                      />
                      <img
                        src={datePicker}
                        alt="datePicker"
                        className="datePickerImg"
                      />
                    </div>
                    {errors.fromDate && (
                      <p className="mt-10 fw-500 fs-14 error">
                        {errors.fromDate}
                      </p>
                    )}
                  </div>
                  <div className="w-100">
                    <label htmlFor="" className="fs-14 fw-500 mb-10">
                      to
                    </label>
                    <div className="position-relative">
                      <DatePicker
                        className="customTime input"
                        format="YYYY-MM-DD"
                        onChange={(date, dateString) => {
                          setEndDate(dateString);
                          setErrors((prev) => ({ ...prev, toDate: "" }));
                        }}
                        disabledDate={(current) => {
                          return current && current < moment().startOf("day");
                        }}
                      />
                      <img
                        src={datePicker}
                        alt="datePicker"
                        className="datePickerImg"
                      />
                    </div>
                    {errors.toDate && (
                      <p className="mt-10 fw-500 fs-14 error">
                        {errors.toDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Merchant Component */}
              <div className="accordion-container">
                <Formik
                  enableReinitialize
                  initialValues={{
                    merchants: droppedMerchants?.map(() => ({
                      // quantity:
                      //   droppedBrand?.selectedBrands?.brandItem?.map(
                      //     (item) => item?.mSRP *item?.quantity
                      //   )/ (droppedBrand?.selectedBrands?.brandItem?.map(
                      //       (item) => item?.mSRP
                      //     )),
                      quantity: (
                        droppedBrand?.selectedBrands?.brandItem?.reduce(
                          (sum, item) =>
                            sum + (item?.mSRP * item?.quantity || 0),
                          0
                        ) /
                          droppedBrand?.selectedBrands?.brandItem?.reduce(
                            (sum, item) => sum + (item?.mSRP || 0),
                            0
                          ) || 0
                      ).toFixed(2),

                      // promotionalFunds:
                      // droppedBrand?.selectedBrands?.brandItem?.map(
                      //   (item) => item?.mSRP *item?.quantity
                      // ) || "",

                      promotionalFunds:
                      droppedBrand?.selectedBrands?.brandItem?.map((item) =>
                        (item?.mSRP * item?.quantity)?.toFixed(2)
                      ) || "",

                      msrp: "",
                      priceForReimbursement: "",
                      // fundAmount:
                      // droppedBrand?.selectedBrands?.brandItem?.map(
                      //   (item) => item?.mSRP*item?.quantity
                      // )  || "",
                      fundAmount:
                        droppedBrand?.selectedBrands?.brandItem?.map((item) =>
                          (item?.mSRP * item?.quantity)?.toFixed(2)
                        ) || "",
                    })),
                  }}
                  // validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values }) => (
                    <Form>
                      {droppedMerchants?.length > 0 &&
                        droppedMerchants.map(
                          (itemDropperMerchant, indexDroppedMerchant) => {
                            return (
                              <div
                                className="accordionItem accordion-item"
                                key={indexDroppedMerchant}
                              >
                                <div className={`accordionHeader fs-18 fw-700`}>
                                  <div>
                                    {itemDropperMerchant?.name
                                      ? itemDropperMerchant.name
                                          .charAt(0)
                                          .toUpperCase() +
                                        itemDropperMerchant.name.slice(1)
                                      : ""}
                                  </div>
                                </div>
                                <div className="accordion-content accordionContent">
                                  <div className="d-flex gap-20">
                                    <div className="brandItem mx167">
                                      <img src={itemDropperMerchant?.logoUrl || noImageFound} alt={itemDropperMerchant?.name} />
                                    </div>
                                    <div className="fs-14">
                                      <div className="d-flex gap-4 mb-10">
                                        <div className="w-80">Nudges:</div>
                                        <div className="fw-700">
                                          {
                                            itemDropperMerchant?.nudge
                                              ?.sentNudgeCount
                                          }
                                        </div>
                                      </div>
                                      <div className="d-flex gap-4 mb-10">
                                        <div className="w-80">Promotion:</div>
                                        <div className="fw-700">10</div>
                                      </div>
                                      <div className="d-flex gap-4 ">
                                        <div className="w-80">Location:</div>
                                        <div className="fw-700">
                                          {/* 123 Maple St, Springfield, IL */}
                                          {[
                                            itemDropperMerchant?.address
                                              ?.addressLine1,
                                            itemDropperMerchant?.address
                                              ?.administrativeDistrictLevel1,
                                            itemDropperMerchant?.address
                                              ?.locality,
                                            itemDropperMerchant?.address
                                              ?.postalCode,
                                          ]
                                            .filter((part) => part) // Filter out undefined or empty values
                                            .join(", ")}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="divider2"></div>
                                  <div className="grid2 gap-1020">
                                    <div>
                                      <label
                                        htmlFor={`merchants.${indexDroppedMerchant}.quantity`}
                                        className="fs-14 fw-500 mb-10"
                                      >
                                        Quantity/Nudge Credits
                                      </label>
                                      <Field
                                        type="text"
                                        name={`merchants.${indexDroppedMerchant}.quantity`}
                                        placeholder="Enter Quantity"
                                        disabled
                                      />
                                      <ErrorMessage
                                        name={`merchants.${indexDroppedMerchant}.quantity`}
                                        component="div"
                                        className="error"
                                      />
                                    </div>

                                    <div>
                                      <label
                                        htmlFor={`merchants.${indexDroppedMerchant}.promotionalFunds`}
                                        className="fs-14 fw-500 mb-10"
                                      >
                                        Promotional Funds
                                      </label>
                                      <Field
                                        type="text"
                                        name={`merchants.${indexDroppedMerchant}.promotionalFunds`}
                                        placeholder="Enter Amount"
                                        disabled
                                      />
                                      <ErrorMessage
                                        name={`merchants.${indexDroppedMerchant}.promotionalFunds`}
                                        component="div"
                                        className="error"
                                      />
                                    </div>

                                    <div>
                                      <label
                                        htmlFor={`merchants.${indexDroppedMerchant}.msrp`}
                                        className="fs-14 fw-500 mb-10"
                                      >
                                        MSRP
                                      </label>
                                      <Field
                                        type="text"
                                        name={`merchants.${indexDroppedMerchant}.msrp`}
                                        placeholder="Enter Price"
                                        autoComplete="off"
                                        // onChange = {()=>setErrors((prev) => ({ ...prev, msrp: "" }))}
                                      />
                                      <ErrorMessage
                                        name={`merchants.${indexDroppedMerchant}.msrp`}
                                        component="div"
                                        className="error"
                                      />
                                      {/* {errors.msrp && <p className="mt-10 fw-500 fs-14 error">{errors.msrp}</p>} */}
                                    </div>

                                    <div>
                                      <label
                                        htmlFor={`merchants.${indexDroppedMerchant}.priceForReimbursement`}
                                        className="fs-14 fw-500 mb-10"
                                      >
                                        Price for Reimbursement
                                      </label>
                                      <Field
                                        type="text"
                                        name={`merchants.${indexDroppedMerchant}.priceForReimbursement`}
                                        placeholder="Enter Price"
                                        autoComplete="off"
                                      />
                                      <ErrorMessage
                                        name={`merchants.${indexDroppedMerchant}.priceForReimbursement`}
                                        component="div"
                                        className="error"
                                      />
                                    </div>

                                    <div>
                                      <label className="fs-14 fw-500 mb-10">
                                        Fund Amount
                                      </label>
                                      {/* <input
                                        type="text"
                                        placeholder="$1000"
                                        disabled
                                      /> */}

                                      <Field
                                        type="text"
                                        name={`merchants.${indexDroppedMerchant}.fundAmount`}
                                        placeholder="Enter Price"
                                        disabled
                                      />
                                      <ErrorMessage
                                        name={`merchants.${indexDroppedMerchant}.fundAmount`}
                                        component="div"
                                        className="error"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                      {droppedMerchants?.length > 0 && (
                        <div className="d-flex justify-end">
                          <button type="submit" className="btn w164">
                            Submit
                          </button>
                        </div>
                      )}
                    </Form>
                  )}
                </Formik>

                {/* {accordionItems.map((item, index) => (
                  <div className="accordionItem accordion-item" key={index}>
                    <div
                      className={`accordionHeader fs-18 fw-700 ${
                        openIndex === index ? "open" : ""
                      }`}
                      onClick={() => handleToggle(index)}
                    >
                      <div>{item.title}</div>
                      <img
                        src={arrow}
                        alt=""
                        className={`arrow ${openIndex === index ? "open" : ""}`}
                      />
                    </div>
                    {openIndex === index && (
                      <div className="accordionContent">
                        <div className="d-flex gap-20">
                          <div className="brandItem mx167">
                            <img src={coke} alt="" />
                          </div>
                          <div className="fs-14">
                            <div className="d-flex gap-4 mb-10">
                              <div className="w-80">Nudges:</div>
                              <div className="fw-700">256</div>
                            </div>
                            <div className="d-flex gap-4 mb-10">
                              <div className="w-80">Promotion:</div>
                              <div className="fw-700">10</div>
                            </div>
                            <div className="d-flex gap-4 ">
                              <div className="w-80">Location:</div>
                              <div className="fw-700">
                                123 Maple St, Springfield, IL
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="divider2"></div>
                        <div className="grid2 gap-1020">
                          <div>
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
                              Quantity/Nudge Credits
                            </label>
                            <input type="text" placeholder="Enter Quantity" />
                          </div>
                          <div>
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
                              Promotional Funds
                            </label>
                            <input type="text" placeholder="Enter Amount" />
                          </div>
                          <div>
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
                              MSRP
                            </label>
                            <input type="text" placeholder="Enter Price" />
                          </div>
                          <div>
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
                              Price for Reimbursement
                            </label>
                            <input type="text" placeholder="Enter Price" />
                          </div>
                          <div>
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
                              Fund Amount
                            </label>
                            <input type="text" placeholder="$1000" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </DndProvider>
      </div>
    </>
  );
};

export default AddDistributorPromotion;
