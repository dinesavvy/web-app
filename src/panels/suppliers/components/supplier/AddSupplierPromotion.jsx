import React, { useEffect, useRef, useState } from "react";
import pepsi from "../../../../assets/images/pepsi.svg";
import searchIcon from "../../../../assets/images/searchIcon.svg";
import addPlusIcon from "../../../../assets/images/addPlusIcon.svg";
import datePicker from "../../../../assets/images/datePicker.svg";
import closeIcon from "../../../../assets/images/closeIcon.svg";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DatePicker, Spin, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { merchantsListHandler } from "../../../../redux/action/merchantsList";
import DragMerchantItem from "../../../admin/Components/DragMerchantItem";
import moment from "moment";
import { ErrorMessage, Field, Form, Formik } from "formik";
import noImageFound from "../../../../assets/images/noImageFound.png";
import {
  createPromotionAction,
  createPromotionHandler,
} from "../../../../redux/action/createPromotion";
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
import {
  handleKeyPressSpace,
  handleNumberFieldLength,
} from "../../../../common/commonFunctions/CommonFunctions";
import InfiniteScroll from "react-infinite-scroll-component";
import { scrollToTop } from "../../../../common/autoScroll/ScrollTotopError";

const AddSupplierPromotion = () => {
  const [promotionTitle, setPromotionTitle] = useState("");
  const [searchString, setSearchString] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchStringMerchant, setSearchStringMerchant] = useState("");
  const [startDate, setStartDate] = useState("");
  const [merchantItemMain, setMerchantItemMain] = useState(null);
  const [endDate, setEndDate] = useState("");
  const [merchantsData, setMerchantsData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [brandsPage, setBrandsPage] = useState(1);
  const [brandsHasMore, setBrandsHasMore] = useState(true);
  const [brandsData, setBrandsData] = useState([]);
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

  const brandListSelector = useSelector((state) => state?.supplierBrandList);
  const merchantsListSelector = useSelector(
    (state) => state?.supplierMerchantList
  );
  const createPromotionSelector = useSelector(
    (state) => state?.addSupplierPromotion
  );

  const promoTitleRef = useRef(null);
    const fromDateRef = useRef(null)
    const toDateRef = useRef(null)

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
    scrollToTop(newErrors, { promoTitleRef, fromDateRef, toDateRef });
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedMerchants((prevSelected) =>
      prevSelected.includes(itemId) ? [] : [itemId]
    );
    // Find the merchant item that was checked/unchecked
    const merchantItem = merchantsData?.find(item => item._id === itemId);
    setMerchantItemMain(merchantItem);
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
      navigate("/supplier/promotion");
      dispatch(addSupplierPromotionAction.addSupplierPromotionReset());
    } else if (
      createPromotionSelector?.message?.response?.data?.statusCode === 400
    ) {
      messageApi.open({
        type: "error",
        content: createPromotionSelector?.message?.response?.data?.message,
      });
      dispatch(addSupplierPromotionAction.addSupplierPromotionReset());
    }
  }, [createPromotionSelector]);

  useEffect(() => {
    let payload = {
      page: brandsPage,
      limit: 10,
      searchString: searchString,
    };
    dispatch(supplierBrandListHandler(payload));
  }, [searchString, brandsPage]);

  useEffect(() => {
    const fetchMerchants = () => {
      const payload = {
        // page: page,
        // limit: 10,
        timeFrame: "today",
        searchString: searchStringMerchant,
        searchArea: [],
      };
      dispatch(supplierMerchantListHandler(payload));
    };

    fetchMerchants();
  }, [searchStringMerchant, page]);

  useEffect(() => {
    if (merchantsListSelector?.data?.data?.records) {
      if (page === 1) {
        setMerchantsData(merchantsListSelector?.data?.data?.records);
      } else {
        setMerchantsData((prev) => [
          ...prev,
          ...merchantsListSelector?.data?.data?.records,
        ]);
      }
      // Check if we have more data to load
      setHasMore(merchantsListSelector?.data?.data?.records?.length === 10);
    }
  }, [merchantsListSelector?.data?.data?.records]);

  useEffect(() => {
    if (brandListSelector?.data?.data?.records) {
      if (brandsPage === 1) {
        setBrandsData(brandListSelector.data.data.records);
      } else {
        setBrandsData((prev) => [
          ...prev,
          ...brandListSelector.data.data.records,
        ]);
      }
      setBrandsHasMore(brandListSelector?.data?.data?.records?.length === 10);
    }
  }, [brandListSelector?.data?.data?.records]);

  const fetchMoreData = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const fetchMoreBrands = () => {
    if (brandsHasMore) {
      setBrandsPage((prev) => prev + 1);
    }
  };

  const handleBrandDrop = (draggedItem) => {
    if (!droppedBrand) {
      setDroppedBrand(draggedItem);
      setDraggingItem(null);
    }
  };

  // const handleBrandClick = (item) => {
  //   if (!droppedBrand) {
  //     setBrands((prevBrands) => prevBrands.filter((i) => i?._id !== item?._id));
  //     setDroppedBrand(item);
  //   }
  // };

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
    if (validateDates() && !errorMessage) {
      let payload = {
        promotionTitle: promotionTitle,
        brandId: droppedBrand?.id,
        startDate: startDate ? moment(startDate).valueOf() : null,
        // endDate: endDate ? moment(endDate).valueOf() : null,
        endDate: endDate
          ? moment(endDate).set({ hour: 12, minute: 0, second: 0 }).valueOf()
          : null,
        merchants: values?.merchants?.map((item, index) => {
          return {
            merchantId: droppedMerchants?.map((item) => item?._id).join(""),
            quantity: item?.quantity,
            promotionFund: item?.promotionalFunds.join(""),
            mSRP: item?.msrp.join(""),
            retailPrice: item?.priceForReimbursement
              ? item?.priceForReimbursement
              : undefined,
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
      dispatch(addSupplierPromotionHandler(payload));
    }
  };

  return (
    <>
      {(createPromotionSelector?.isLoading||merchantsListSelector?.isLoading) && (
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
                  <InfiniteScroll
                    dataLength={brandsData?.length}
                    next={fetchMoreBrands}
                    hasMore={brandsHasMore}
                    loader={
                      <div className="text-center">
                        <Spin />
                      </div>
                    }
                    scrollableTarget="selectBrands"
                    height={280}
                  >
                    <div className="selectGrid3">
                      {brandsData?.length > 0 ? (
                        brandsData?.map((item, index) => (
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
                        ))
                      ) : (
                        <div className="noDataFound">No data available</div>
                      )}
                    </div>
                  </InfiniteScroll>
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
                  {/* <InfiniteScroll
                    dataLength={merchantsData?.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={
                      <div className="text-center">
                        <Spin />
                      </div>
                    }
                    scrollableTarget="selectMerchant"
                    height={280}
                  > */}
                    {/* <div className="selectMerchant"> */}
                    {/* {merchantsListSelector?.data?.data?.records?.length > 0 ? ( */}
                    {merchantsData?.length>0 ?(

                    <div className="selectMerchant">
                      {merchantsData?.map((item, index) => {
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
                                  id={item?.id}
                                  name={item?.logoUrl}
                                  selectedMerchants={selectedMerchants} // Pass selected items
                                  onDragStart={() =>
                                    handleDragStartMerchant(item)
                                  }
                                  items={item}
                                />
                              </div>
                              <div className="divider2"></div>
                              <CustomDragLayer merchants={mercahnts} merchantItemMain={merchantItemMain}/>
                            </div>
                          </>
                        );
                      })}
                    </div>
                    ):(
                       <div className="noDataFound">No data available</div>
                    )}
                  {/* </InfiniteScroll> */}
                  {/* ) : (
                      <div className="noDataFound">No data available</div>
                    )} */}
                  {/* </div> */}
                </div>
              </div>
            </div>

            {/* Drop Area */}
            <div className="w-100 positionSticky">
              <div className="mb-20">
              <div className="tabPadding">
                <input
                  type="text"
                  name="addTitleInput"
                  id="addTitleInput"
                  className="addTitleInput"
                  placeholder="Add promotion title here"
                  autoComplete="off"
                  onKeyDown={handleKeyPressSpace}
                  ref={promoTitleRef}
                  onChange={(e) => {
                    setPromotionTitle(e.target.value);
                    setErrors((prev) => ({ ...prev, promotionTitle: "" }));
                  }}
                />
              </div>

              {errors?.promotionTitle && (
                <div className="fw-500 fs-14 error">
                  {errors?.promotionTitle}
                </div>
              )}
              </div>
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
                        {/* <img src={item?.logoUrl||noImageFound} alt={item.name} /> */}
                        <img
                          src={item?.logoUrl || noImageFound}
                          alt={item.name}
                        />
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
                <div className=" d-flex gap-10">
                  <div className="w-100">
                    <label htmlFor="" className="fs-14 fw-500 mb-10">
                      From
                    </label>
                    <div className="position-relative" ref={fromDateRef}>
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
                    {errors?.fromDate && (
                      <div className="mt-10 fw-500 fs-14 error">
                        {errors?.fromDate}
                      </div>
                    )}
                  </div>
                  <div className="w-100">
                    <label htmlFor="" className="fs-14 fw-500 mb-10">
                      to
                    </label>
                    <div className="position-relative" ref={toDateRef}>
                      <DatePicker
                        className="customTime input"
                        format="YYYY-MM-DD"
                        onChange={(date, dateString) => {
                          setEndDate(dateString);
                          setErrors((prev) => ({ ...prev, toDate: "" }));
                        }}
                        // disabledDate={(current) => {
                        //   return current && current < moment().startOf("day");
                        // }}
                        disabledDate={(current) => {
                          return (
                            current &&
                            (current < moment().startOf("day") ||
                              current < moment(startDate, "YYYY-MM-DD"))
                          );
                        }}
                      />
                      <img
                        src={datePicker}
                        alt="datePicker"
                        className="datePickerImg"
                      />
                    </div>
                    {errors?.toDate && (
                      <div className="mt-10 fw-500 fs-14 error">
                        {errors?.toDate}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Merchant Component */}
              {droppedMerchants?.length > 0 && droppedBrand && (
                <div className="accordion-container">
                  <Formik
                    enableReinitialize
                    initialValues={{
                      merchants: droppedMerchants?.map(() => ({
                        quantity:
                          droppedBrand?.selectedBrands?.brandItem?.map(
                            (item) => item?.mSRP * item?.quantity
                          ) /
                          droppedBrand?.selectedBrands?.brandItem?.map(
                            (item) => item?.mSRP
                          ),
                        promotionalFunds:
                          droppedBrand?.selectedBrands?.brandItem?.map(
                            (item) => item?.mSRP * item?.quantity
                          ) || "",
                        msrp: droppedBrand?.selectedBrands?.brandItem?.map(
                          (item) => item?.mSRP
                        ),
                        priceForReimbursement: "",
                        fundAmount:
                          droppedBrand?.selectedBrands?.brandItem?.map(
                            (item) => item?.mSRP * item?.quantity
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
                                  <div
                                    className={`accordionHeader fs-18 fw-700`}
                                  >
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
                                        <img
                                          src={
                                            itemDropperMerchant?.logoUrl ||
                                            noImageFound
                                          }
                                          alt={itemDropperMerchant?.name}
                                        />
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
                                        {/* <Field
                                        type="text"
                                        name={`merchants.${indexDroppedMerchant}.msrp`}
                                        placeholder="Enter Price"
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
                                        // onChange = {()=>setErrors((prev) => ({ ...prev, msrp: "" }))}
                                      /> */}
                                        {/* <Field
                                          name={`merchants.${indexDroppedMerchant}.msrp`}
                                        >
                                          {({ field, form }) => (
                                            <input
                                              {...field}
                                              type="text"
                                              placeholder="Enter Price"
                                              autoComplete="off"
                                              maxLength={5}
                                              onChange={(e) => {
                                                const msrpValue =
                                                  e.target.value;
                                                form.setFieldValue(
                                                  `merchants.${indexDroppedMerchant}.msrp`,
                                                  msrpValue
                                                );

                                                const calculatedQuantity = (
                                                  droppedBrand?.selectedBrands?.brandItem?.reduce(
                                                    (sum, item) =>
                                                      sum +
                                                      (item?.mSRP *
                                                        item?.quantity || 0),
                                                    0
                                                  ) / msrpValue
                                                )?.toFixed(2);

                                                form.setFieldValue(
                                                  `merchants.${indexDroppedMerchant}.quantity`,
                                                  e.target.value
                                                    ? calculatedQuantity
                                                    : droppedBrand?.selectedBrands?.brandItem?.reduce(
                                                        (sum, item) =>
                                                          sum +
                                                          (item?.mSRP *
                                                            item?.quantity ||
                                                            0),
                                                        0
                                                      ) /
                                                        droppedBrand?.selectedBrands?.brandItem?.reduce(
                                                          (sum, item) =>
                                                            sum +
                                                            (item?.mSRP || 0),
                                                          0
                                                        )
                                                );
                                              }}
                                            />
                                          )}
                                        </Field> */}

                                        <Field
                                          name={`merchants.${indexDroppedMerchant}.msrp`}
                                        >
                                          {({ field, form }) => (
                                            <input
                                              {...field}
                                              type="text"
                                              placeholder="Enter Price"
                                              autoComplete="off"
                                              maxLength={5}
                                              disabled
                                              // onChange={(e) => {
                                              //   const msrpValue =
                                              //     e.target.value;

                                              //   // Allow only numbers and one decimal point
                                              //   if (
                                              //     /^\d*\.?\d*$/.test(msrpValue)
                                              //   ) {
                                              //     form.setFieldValue(
                                              //       `merchants.${indexDroppedMerchant}.msrp`,
                                              //       msrpValue
                                              //     );

                                              //     const calculatedQuantity = (
                                              //       droppedBrand?.selectedBrands?.brandItem?.reduce(
                                              //         (sum, item) =>
                                              //           sum +
                                              //           (item?.mSRP *
                                              //             item?.quantity || 0),
                                              //         0
                                              //       ) / msrpValue
                                              //     )?.toFixed(2);

                                              //     form.setFieldValue(
                                              //       `merchants.${indexDroppedMerchant}.quantity`,
                                              //       msrpValue
                                              //         ? calculatedQuantity
                                              //         : droppedBrand?.selectedBrands?.brandItem?.reduce(
                                              //             (sum, item) =>
                                              //               sum +
                                              //               (item?.mSRP *
                                              //                 item?.quantity ||
                                              //                 0),
                                              //             0
                                              //           ) /
                                              //             droppedBrand?.selectedBrands?.brandItem?.reduce(
                                              //               (sum, item) =>
                                              //                 sum +
                                              //                 (item?.mSRP || 0),
                                              //               0
                                              //             )
                                              //     );
                                              //   }
                                              // }}
                                            />
                                          )}
                                        </Field>

                                        {/* <ErrorMessage
                                          name={`merchants.${indexDroppedMerchant}.msrp`}
                                          component="div"
                                          className="error"
                                        /> */}
                                        {/* {errors.msrp && <p className="mt-10 fw-500 fs-14 error">{errors.msrp}</p>} */}
                                      </div>

                                      <div>
                                        <label
                                          htmlFor={`merchants.${indexDroppedMerchant}.priceForReimbursement`}
                                          className="fs-14 fw-500 mb-10"
                                        >
                                          Price for Reimbursement
                                        </label>
                                        {/* <Field
                                          type="text"
                                          name={`merchants.${indexDroppedMerchant}.priceForReimbursement`}
                                          placeholder="Enter Price"
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
                                        /> */}

                                        <Field
                                          name={`merchants.${indexDroppedMerchant}.priceForReimbursement`}
                                        >
                                          {({ field, form }) => (
                                            <>
                                              <input
                                                type="text"
                                                name={`merchants.${indexDroppedMerchant}.priceForReimbursement`}
                                                placeholder="Enter Price"
                                                autoComplete="off"
                                                maxLength={5}
                                                onKeyPress={handleKeyPressSpace}
                                                onInput={
                                                  handleNumberFieldLength
                                                }
                                                onKeyDown={(event) => {
                                                  if (
                                                    event.key === "ArrowUp" ||
                                                    event.key === "ArrowDown"
                                                  ) {
                                                    event.preventDefault();
                                                  }
                                                }}
                                                onChange={(e) => {
                                                  let priceForReimbursement =
                                                    parseFloat(
                                                      e.target.value
                                                    ) || 0;

                                                  const promotionalFund =
                                                    form.values?.merchants?.[
                                                      indexDroppedMerchant
                                                    ]?.promotionalFunds || 0;

                                                  if (
                                                    priceForReimbursement >
                                                    promotionalFund
                                                  ) {
                                                    setErrorMessage(
                                                      "You cannot request reimbursement for an amount greater than the promotional funds"
                                                    );
                                                  } else {
                                                    setErrorMessage(""); // Clear error when valid
                                                  }

                                                  form.setFieldValue(
                                                    `merchants.${indexDroppedMerchant}.priceForReimbursement`,
                                                    priceForReimbursement
                                                  );

                                                  // Calculate total MSRP * quantity sum
                                                  const totalMSRP =
                                                    droppedBrand?.selectedBrands?.brandItem?.reduce(
                                                      (sum, item) =>
                                                        sum +
                                                        (item?.mSRP *
                                                          item?.quantity || 0),
                                                      0
                                                    );

                                                  const calculatedQuantity =
                                                    priceForReimbursement > 0
                                                      ? Math.round(
                                                          totalMSRP /
                                                            priceForReimbursement
                                                        )
                                                      : droppedBrand?.selectedBrands?.brandItem?.reduce(
                                                          (sum, item) =>
                                                            sum +
                                                            (item?.mSRP *
                                                              item?.quantity ||
                                                              0),
                                                          0
                                                        ) /
                                                          droppedBrand?.selectedBrands?.brandItem?.reduce(
                                                            (sum, item) =>
                                                              sum +
                                                              (item?.mSRP || 0),
                                                            0
                                                          ) || 0;

                                                  form.setFieldValue(
                                                    `merchants.${indexDroppedMerchant}.quantity`,
                                                    calculatedQuantity
                                                  );
                                                }}
                                              />

                                              {/* Display Validation Message */}
                                              {errorMessage && (
                                                <div className="mt-10 fw-500 fs-14 error">
                                                  {errorMessage}
                                                </div>
                                              )}
                                            </>
                                          )}
                                        </Field>

                                        {/* <ErrorMessage
                                        name={`merchants.${indexDroppedMerchant}.priceForReimbursement`}
                                        component="div"
                                        className="error"
                                      /> */}
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
                        {/* {droppedMerchants?.length > 0 && ( */}
                        <div className="d-flex justify-end">
                          <button type="submit" className="btn w164">
                            Submit
                          </button>
                        </div>
                        {/* )} */}
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
              )}
            </div>
          </div>
        </DndProvider>
      </div>
    </>
  );
};

export default AddSupplierPromotion;
