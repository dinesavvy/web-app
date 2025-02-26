import React, { useEffect, useState } from "react";
import "../../../assets/css/merchant.css";
import backButton from "../../../assets/images/backButton.svg";
import breadCrumbIcon from "../../../assets/images/breadCrumb.svg";
import resturantIcon from "../../../assets/images/resturantIcon.svg";
import nudgeIcon from "../../../assets/images/nudgeIcon.svg";
import addTime from "../../../assets/images/addTime.svg";
import createAdd from "../../../assets/images/createAdd.svg";
import deleteList from "../../../assets/images/deleteList.svg";
import addnudge from "../../../assets/images/addnudge.svg";
import addCredits from "../../../assets/images/addCredits.svg";
import noImageFound from "../../../assets/images/noImageFound.png";
import dish from "../../../assets/images/dish.png";
import { Breadcrumb, Pagination, TimePicker } from "antd";
import SearchSelect from "../Components/SearchSelect";
import CustomSelect from "../Components/CustomSelect";
import CustomSwitch from "../Components/CustomSwitch";
import { useLocation, useNavigate } from "react-router-dom";
import { merchantDetailsHandler } from "../../../redux/action/merchantDetails";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/Loader/Loader";
import { nudgesDetailsHandler } from "../../../redux/action/nudgeDetails";
import moment from "moment";
import { followersListHandler } from "../../../redux/action/followersList";
import { nudgesListHandler } from "../../../redux/action/nudgesList";
import NudgeDetail from "./NudgeDetail";
import { followerDetailsHandler } from "../../../redux/action/followersDetails";
import { listByUserIdHandler } from "../../../redux/action/listByUserId";
import TeamMember from "./TeamMember";
import { nudgeAnalyticHandler } from "../../../redux/action/nudgeAnalytic";
import { tabs3 } from "./merchant/merchantCommon";
import AddNudgeCreditDrawer from "./merchant/AddCreditDrawer";

const MerchantDetails = () => {
  const { state } = useLocation();
  const [activeNudge, setActiveNudge] = useState(5);

  const [activeTab3, setActiveTab3] = useState("1");
  const [editInput, setEditInput] = useState(false);
  const [switchState, setSwitchState] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 9 });
  const [nudgeId, setNudgeId] = useState("");
  const [searchString, setSearchString] = useState("");
  const [searchArea, setSearchArea] = useState([]);
  const [activeNudgeClass, setActiveNudgeClass] = useState("Received");
  const [activeTab, setActiveTab] = useState(true);
  const [checkedItems, setCheckedItems] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [addNudgeCredit, setAddNudgeCredit] = useState(false);
  const [numberOfCredits, setNumberOfCredits] = useState("");

  const addCreditSelector = useSelector((state) => state?.addCredit);
  const listByUserIdSelector = useSelector((state) => state?.listByUserId);
  const followerListSelector = useSelector((state) => state?.followeList);
  const nudgesListSelector = useSelector((state) => state?.nudgesList);
  const merchantDetailsSelector = useSelector(
    (state) => state?.merchantDetails
  );

  // For Nudge Details Data
  const nudgeDetailsMainSelector = useSelector(
    (state) => state?.nudgeDetailsMain
  );
  const followerDetailsSelector = useSelector(
    (state) => state?.followerDetails
  );
  const nudgeAnalyticSelector = useSelector((state) => state?.nudgeAnalytic);

  const dispatch = useDispatch();

  const addCreditsFuntion = () => {
    setAddNudgeCredit(true);
  };

  useEffect(() => {
    if (
      (Array.isArray(state?.statePrev?.selectedItems) &&
        state?.statePrev?.selectedItems?.length > 0) ||
      state?.statePrev?.locationId?.locationId
    ) {
      setActiveTab3("3");
      const updatedCheckedItems = {};

      followerListSelector?.data?.data?.records?.forEach((item, index) => {
        const isSelected =
          Array.isArray(state?.statePrev?.selectedItems) &&
          state?.statePrev?.selectedItems?.some(
            (selectedItem) => selectedItem?._id === item?._id
          );
        updatedCheckedItems[index] = isSelected;
      });

      setCheckedItems(updatedCheckedItems);
      setSelectedItems(
        state?.statePrev?.selectedItems || state?.statePrev?.selectedItems || []
      );
    }
  }, [state?.statePrev?.selectedItems, followerListSelector]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCardClick = (cardType) => {
    setActiveNudgeClass(cardType);
  };
  // active and inactive nudge list
  useEffect(() => {
    if (activeNudgeClass) {
      let payload = {
        page: pagination?.page,
        limit: pagination?.limit,
        userId: followerDetailsSelector?.data?.data?.userId,
        nudgeType: activeNudgeClass, // "Received", "Accepted", "Denied", "NoAnswer", "Redeemed",
        isActive: activeNudgeClass === "Received" ? activeTab : undefined,
      };
      dispatch(listByUserIdHandler(payload));
    }
  }, [activeNudgeClass, followerDetailsSelector, activeTab, pagination]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("overflow-Hidden");
    } else {
      document.body.classList.remove("overflow-Hidden");
    }
    return () => {
      document.body.classList.remove("overflow-Hidden");
    };
  }, [isSidebarOpen]);

  const toggleSidebar = (item, index) => {
    setNudgeId(index);
    setIsSidebarOpen((prevState) => !prevState);
    if (!isSidebarOpen) {
      let payload = {
        nudgeId: item?._id,
      };
      dispatch(nudgesDetailsHandler(payload));
    }
  };

  const handleCheckboxChange = (index, isChecked, item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: isChecked,
    }));

    if (isChecked) {
      setSelectedItems((prev) =>
        prev.some((selectedItem) => selectedItem?._id === item?._id)
          ? prev
          : [...prev, item]
      );
    } else {
      setSelectedItems((prev) =>
        prev.filter((selectedItem) => selectedItem?._id !== item?._id)
      );
    }
  };

  const isAnyCheckboxChecked = Object.values(checkedItems).some(
    (checked) => checked
  );

  const handleToggle = (state) => {
    setSwitchState(state);
  };
  useEffect(() => {
    if (localStorage.getItem("merchantId")) {
      let payload = {
        locationId: localStorage.getItem("merchantId"),
      };
      dispatch(merchantDetailsHandler(payload));
    }
  }, []);

  const navigate = useNavigate();

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ page, limit: pageSize });
  };

  const handleSearchChange = (value) => {
    setSearchString(value);
    setCheckedItems({});
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSearchAreaChange = (selectedAreas) => {
    setSearchArea(selectedAreas);
    setCheckedItems({});
  };

  useEffect(() => {
    if (activeTab3 === "3") {
      const fetchMerchants = () => {
        const payload = {
          locationId: localStorage.getItem("merchantId"),
          page: pagination.page,
          limit: pagination.limit,
          status: "Active",
          searchString,
          searchArea,
        };
        dispatch(followersListHandler(payload));
      };

      fetchMerchants();
    }
  }, [pagination, searchString, searchArea, activeTab3]);

  useEffect(() => {
    if (activeTab3 === "4") {
      const fetchNudgesList = () => {
        const payload = {
          locationId: localStorage.getItem("merchantId"),
          page: pagination.page,
          limit: pagination.limit,
          searchString,
          isActive: activeTab,
        };
        dispatch(nudgesListHandler(payload));
      };

      fetchNudgesList();
    }
  }, [pagination, searchString, activeTab3, activeTab]);

  // Get Nudge Analytic
  useEffect(() => {
    if (activeTab3 === "4") {
      let payload = {
        locationId: localStorage.getItem("merchantId"),
      };
      dispatch(nudgeAnalyticHandler(payload));
    }
  }, [activeTab3, addCreditSelector]);

  const viewDetails = (item) => {
    if (item?._id) {
      let payload = {
        followerId: item?._id,
      };
      dispatch(followerDetailsHandler(payload));
      setViewDetail(true);
    }
  };

  const handleDelete = () => {
    const updatedCheckedItems = { ...checkedItems };
    Object.keys(checkedItems).forEach((key) => {
      if (checkedItems[key]) {
        delete updatedCheckedItems[key];
      }
    });
    setCheckedItems(updatedCheckedItems);
    const updatedSelectedItems = selectedItems.filter(
      (item, index) => !checkedItems[index]
    );
    setSelectedItems(updatedSelectedItems);
  };

  const handleCreditClick = (value) => {
    // setNumberOfCredits(value.toString());
    setActiveNudge(value);
  };

  const nudgeGoal = nudgeAnalyticSelector?.data?.data?.nudgeGoal || 0;
  const nudgeSent = nudgeAnalyticSelector?.data?.data?.nudgeSent || 0;
  const percentage = nudgeGoal > 0 ? (nudgeSent / nudgeGoal) * 100 : 0;

  return (
    <>
      {merchantDetailsSelector?.isLoading ||
      followerDetailsSelector?.isLoading ||
      nudgeAnalyticSelector?.isLoading ||
      addCreditSelector?.isLoading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <div className="tabs-container tab3 tabFull">
            <div className="tabs">
              {tabs3?.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-button ${
                    activeTab3 === tab.id ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveTab3(tab.id);
                    setViewDetail(false);
                    setCheckedItems({});
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          {activeTab3 === "1" ? (
            <>
              <div className="tabPadding mb-30">
                <div className="d-flex align-center gap-20 mb-30 w-100">
                  <img
                    src={backButton}
                    alt=""
                    className="cursor-pointer backButton"
                    onClick={() => navigate("/admin/merchant/list")}
                  />
                  <div>
                    <div className="fs-24 fw-600 mb-4">Merchants Details</div>
                    <Breadcrumb
                      className="cursor-pointer"
                      separator={<img src={breadCrumbIcon} />}
                      items={[
                        {
                          title: "Merchants",
                          onClick: () => navigate("/admin/merchant/list"),
                        },
                        {
                          title: "Merchants Details",
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="card mb-30">
                  <div className="d-flex align-center justify-between gap-20 mb-20">
                    <div className="fs-20 fw-700">About your business</div>
                  </div>
                  <div className="inputGrid">
                    <div>
                      <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                        Business name
                      </label>
                      {editInput === true ? (
                        <input
                          type="text"
                          className="input"
                          placeholder="Garden Grove Café & Bistro"
                        />
                      ) : (
                        <div className="fs-18">
                          {merchantDetailsSelector?.data?.data?.businessName}
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                        Business category
                      </label>
                      {editInput === true ? (
                        <input
                          type="text"
                          className="input"
                          placeholder="Restaurant"
                        />
                      ) : (
                        <div className="fs-18">Restaurant</div>
                      )}
                    </div>
                    <div className="twoSpace">
                      <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                        Description
                      </label>
                      {editInput === true ? (
                        <input
                          type="text"
                          className="input"
                          placeholder="Whether you're joining us for a casual lunch, a special dinner, or a weekend brunch, our elegant yet relaxed atmosphere is perfect for any occasion."
                        />
                      ) : (
                        <div className="fs-18">
                          {merchantDetailsSelector?.data?.data?.description ||
                            "N/A"}
                        </div>
                      )}
                    </div>
                  </div>
                  {editInput && (
                    <div className="d-flex gap-20 mt-20 justify-end flexBtn">
                      <div
                        className="btnSecondary saveBtn btn"
                        onClick={() => setEditInput(false)}
                      >
                        Cancel
                      </div>
                      <div
                        className="saveBtn btn"
                        onClick={() => setEditInput(false)}
                      >
                        Save
                      </div>
                    </div>
                  )}
                </div>
                <div className="card mb-30">
                  <div className="d-flex align-center justify-between gap-20 mb-20">
                    <div className="fs-20 fw-700">
                      Primary Contact information
                    </div>
                  </div>
                  <div className="inputGrid grid3">
                    <div>
                      <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                        Phone number
                      </label>
                      {editInput === true ? (
                        <input
                          type="number"
                          className="input"
                          placeholder="+91 123 456 7890"
                        />
                      ) : (
                        <a className="anchor fs-18" href="tel:+911234567890">
                          + {merchantDetailsSelector?.data?.data?.phoneNumber}
                        </a>
                      )}
                    </div>

                    <div>
                      {merchantDetailsSelector?.data?.data?.ownerDetails
                        ?.email && (
                        <>
                          <label
                            htmlFor="name"
                            className="grey mb-10 fs-16 fw-500"
                          >
                            Email
                          </label>
                          <a
                            className="anchor fs-18"
                            href={
                              merchantDetailsSelector?.data?.data?.ownerDetails
                                ?.email
                                ? `mailto:${merchantDetailsSelector.data.data.ownerDetails.email}`
                                : "#"
                            }
                          >
                            {
                              merchantDetailsSelector?.data?.data?.ownerDetails
                                ?.email
                            }
                          </a>
                        </>
                      )}
                      {/* )} */}
                    </div>
                    <div className="">
                      <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                        Website link
                      </label>
                      {editInput === true ? (
                        <input
                          type="text"
                          className="input"
                          placeholder="www.dinesavvy.com"
                        />
                      ) : (
                        <a
                          className="anchor fs-18"
                          href={merchantDetailsSelector?.data?.data?.websiteUrl}
                          target="_blank"
                        >
                          {merchantDetailsSelector?.data?.data?.websiteUrl}
                        </a>
                      )}
                    </div>
                  </div>
                  {editInput && (
                    <div className="d-flex gap-20 mt-20 justify-end flexBtn">
                      <div
                        className="btnSecondary saveBtn btn"
                        onClick={() => setEditInput(false)}
                      >
                        Cancel
                      </div>
                      <div
                        className="saveBtn btn"
                        onClick={() => setEditInput(false)}
                      >
                        Save
                      </div>
                    </div>
                  )}
                </div>
                <div className="card mb-30">
                  <div className="d-flex align-center justify-between gap-20 mb-20">
                    <div className="fs-20 fw-700">Location and areas</div>
                  </div>
                  <div>
                    {editInput === true ? (
                      <>
                        <div className="inputGrid grid3 mb-30">
                          <div>
                            <label
                              htmlFor="name"
                              className="grey mb-10 fs-16 fw-500"
                            >
                              Country/Region
                            </label>
                            <CustomSelect
                              options={["Option 1", "Option 2", "Option 3"]}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="name"
                              className="grey mb-10 fs-16 fw-500"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              className="input"
                              placeholder="Garden Grove Café & Bistro"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="name"
                              className="grey mb-10 fs-16 fw-500"
                            >
                              State
                            </label>
                            <CustomSelect
                              options={["Option 1", "Option 2", "Option 3"]}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="name"
                              className="grey mb-10 fs-16 fw-500"
                            >
                              Street address
                            </label>
                            <input
                              type="text"
                              className="input"
                              placeholder="4517 Street Ave. Manchester"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="name"
                              className="grey mb-10 fs-16 fw-500"
                            >
                              Street address line 2 (optional)
                            </label>
                            <input
                              type="text"
                              className="input"
                              placeholder="4517 Street Ave. Manchester"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="name"
                              className="grey mb-10 fs-16 fw-500"
                            >
                              Postal Code
                            </label>
                            <input
                              type="text"
                              className="input"
                              placeholder="39495"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <label
                          htmlFor="name"
                          className="grey mb-10 fs-16 fw-500"
                        >
                          Business location
                        </label>
                        <div className="mb-20 fs-18">
                          {[
                            merchantDetailsSelector?.data?.data?.address
                              ?.addressLine1,
                            merchantDetailsSelector?.data?.data?.address
                              ?.addressLine2,
                            merchantDetailsSelector?.data?.data?.address
                              ?.country,
                            merchantDetailsSelector?.data?.data?.address
                              ?.locality,
                            merchantDetailsSelector?.data?.data?.address
                              ?.postalCode,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </div>
                      </>
                    )}
                  </div>
                  {editInput && (
                    <div className="d-flex gap-20 mt-20 justify-end flexBtn">
                      <div
                        className="btnSecondary saveBtn btn"
                        onClick={() => setEditInput(false)}
                      >
                        Cancel
                      </div>
                      <div
                        className="saveBtn btn"
                        onClick={() => setEditInput(false)}
                      >
                        Save
                      </div>
                    </div>
                  )}
                </div>
                <div className="card">
                  <div className="d-flex align-center justify-between gap-20 mb-20 flexmd">
                    <div className="fs-20 fw-700">Hours of operation</div>
                  </div>
                  {!editInput && (
                    <div>
                      {merchantDetailsSelector?.data?.data?.businessHours?.periods?.map(
                        (item, index) => {
                          return (
                            <>
                              <div className="divider2"></div>
                              <div
                                className="d-flex align-center justify-between"
                                key={index}
                              >
                                <div className="grey fs-16">
                                  {item?.dayOfWeek}
                                </div>
                                <div className="fs-16">
                                  {item?.startLocalTime +
                                    " to " +
                                    item?.endLocalTime}
                                </div>
                              </div>
                            </>
                          );
                        }
                      )}
                    </div>
                  )}
                  {editInput && (
                    <>
                      <div className="overflow">
                        <div className="minw">
                          <div className="d-flex align-center justify-between">
                            <div className="grey fs-16">Sunday</div>
                            <div className="d-flex align-center gap-16">
                              <CustomSwitch
                                isOn={switchState}
                                onToggle={handleToggle}
                              />
                              <div>Closed</div>
                            </div>
                          </div>
                          {switchState && (
                            <div className="mt-10 d-flex align-end gap-10">
                              <div className="w-100">
                                <label
                                  htmlFor=""
                                  className="fs-14 fw-500 mb-10"
                                >
                                  From
                                </label>
                                <TimePicker className="customTime input" />
                              </div>
                              <div className="w-100">
                                <label
                                  htmlFor=""
                                  className="fs-14 fw-500 mb-10"
                                >
                                  to
                                </label>
                                <TimePicker className="customTime input" />
                              </div>
                              <div className="addTime">
                                <img src={addTime} alt="" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="divider2"></div>
                        <div className="minw">
                          <div className="d-flex align-center justify-between">
                            <div className="grey fs-16">Sunday</div>
                            <div className="d-flex align-center gap-16">
                              <CustomSwitch
                                isOn={switchState}
                                onToggle={handleToggle}
                              />
                              <div>Closed</div>
                            </div>
                          </div>
                          {switchState && (
                            <div className="mt-10 d-flex align-end gap-10">
                              <div className="w-100">
                                <label
                                  htmlFor=""
                                  className="fs-14 fw-500 mb-10"
                                >
                                  From
                                </label>
                                <TimePicker className="customTime input" />
                              </div>
                              <div className="w-100">
                                <label
                                  htmlFor=""
                                  className="fs-14 fw-500 mb-10"
                                >
                                  to
                                </label>
                                <TimePicker className="customTime input" />
                              </div>
                              <div className="addTime">
                                <img src={addTime} alt="" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="divider2"></div>
                        <div className="minw">
                          <div className="d-flex align-center justify-between">
                            <div className="grey fs-16">Sunday</div>
                            <div className="d-flex align-center gap-16">
                              <CustomSwitch
                                isOn={switchState}
                                onToggle={handleToggle}
                              />
                              <div>Closed</div>
                            </div>
                          </div>
                          {switchState && (
                            <div className="mt-10 d-flex align-end gap-10">
                              <div className="w-100">
                                <label
                                  htmlFor=""
                                  className="fs-14 fw-500 mb-10"
                                >
                                  From
                                </label>
                                <TimePicker className="customTime input" />
                              </div>
                              <div className="w-100">
                                <label
                                  htmlFor=""
                                  className="fs-14 fw-500 mb-10"
                                >
                                  to
                                </label>
                                <TimePicker className="customTime input" />
                              </div>
                              <div className="addTime">
                                <img src={addTime} alt="" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="divider2"></div>
                        <div className="minw">
                          <div className="d-flex align-center justify-between">
                            <div className="grey fs-16">Sunday</div>
                            <div className="d-flex align-center gap-16">
                              <CustomSwitch
                                isOn={switchState}
                                onToggle={handleToggle}
                              />
                              <div>Closed</div>
                            </div>
                          </div>
                          {switchState && (
                            <div className="mt-10 d-flex align-end gap-10">
                              <div className="w-100">
                                <label
                                  htmlFor=""
                                  className="fs-14 fw-500 mb-10"
                                >
                                  From
                                </label>
                                <TimePicker className="customTime input" />
                              </div>
                              <div className="w-100">
                                <label
                                  htmlFor=""
                                  className="fs-14 fw-500 mb-10"
                                >
                                  to
                                </label>
                                <TimePicker className="customTime input" />
                              </div>
                              <div className="addTime">
                                <img src={addTime} alt="" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="divider2"></div>
                        <div className="minw">
                          <div className="d-flex align-center justify-between">
                            <div className="grey fs-16">Sunday</div>
                            <div className="d-flex align-center gap-16">
                              <CustomSwitch
                                isOn={switchState}
                                onToggle={handleToggle}
                              />
                              <div>Closed</div>
                            </div>
                          </div>
                          {switchState && (
                            <div className="mt-10 d-flex align-end gap-10">
                              <div className="w-100">
                                <label
                                  htmlFor=""
                                  className="fs-14 fw-500 mb-10"
                                >
                                  From
                                </label>
                                <TimePicker className="customTime input" />
                              </div>
                              <div className="w-100">
                                <label
                                  htmlFor=""
                                  className="fs-14 fw-500 mb-10"
                                >
                                  to
                                </label>
                                <TimePicker className="customTime input" />
                              </div>
                              <div className="addTime">
                                <img src={addTime} alt="" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="divider2"></div>
                        <div className="minw">
                          <div className="d-flex align-center justify-between">
                            <div className="grey fs-16">Sunday</div>
                            <div className="d-flex align-center gap-16">
                              <CustomSwitch
                                isOn={switchState}
                                onToggle={handleToggle}
                              />
                              <div>Closed</div>
                            </div>
                          </div>
                          {switchState && (
                            <div className="mt-10 d-flex align-end gap-10">
                              <div className="w-100">
                                <label
                                  htmlFor=""
                                  className="fs-14 fw-500 mb-10"
                                >
                                  From
                                </label>
                                <TimePicker className="customTime input" />
                              </div>
                              <div className="w-100">
                                <label
                                  htmlFor=""
                                  className="fs-14 fw-500 mb-10"
                                >
                                  to
                                </label>
                                <TimePicker className="customTime input" />
                              </div>
                              <div className="addTime">
                                <img src={addTime} alt="" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="divider2"></div>
                        <div className="minw">
                          <div className="d-flex align-center justify-between">
                            <div className="grey fs-16">Sunday</div>
                            <div className="d-flex align-center gap-16">
                              <CustomSwitch
                                isOn={switchState}
                                onToggle={handleToggle}
                              />
                              <div>Closed</div>
                            </div>
                          </div>
                          {switchState && (
                            <div className="mt-10 d-flex align-end gap-10">
                              <div className="w-100">
                                <label
                                  htmlFor=""
                                  className="fs-14 fw-500 mb-10"
                                >
                                  From
                                </label>
                                <TimePicker className="customTime input" />
                              </div>
                              <div className="w-100">
                                <label
                                  htmlFor=""
                                  className="fs-14 fw-500 mb-10"
                                >
                                  to
                                </label>
                                <TimePicker className="customTime input" />
                              </div>
                              <div className="addTime">
                                <img src={addTime} alt="" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="divider2"></div>
                        <div className="minw">
                          <div className="d-flex align-center justify-between">
                            <div className="grey fs-16">Sunday</div>
                            <div className="d-flex align-center gap-16">
                              <CustomSwitch
                                isOn={switchState}
                                onToggle={handleToggle}
                              />
                              <div>Closed</div>
                            </div>
                          </div>
                          {switchState && (
                            <div className="mt-10 d-flex align-end gap-10">
                              <div className="w-100">
                                <label
                                  htmlFor=""
                                  className="fs-14 fw-500 mb-10"
                                >
                                  From
                                </label>
                                <TimePicker className="customTime input" />
                              </div>
                              <div className="w-100">
                                <label
                                  htmlFor=""
                                  className="fs-14 fw-500 mb-10"
                                >
                                  to
                                </label>
                                <TimePicker className="customTime input" />
                              </div>
                              <div className="addTime">
                                <img src={addTime} alt="" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  {editInput && (
                    <div className="d-flex gap-20 mt-20 justify-end flexBtn">
                      <div
                        className="btnSecondary saveBtn btn"
                        onClick={() => setEditInput(false)}
                      >
                        Cancel
                      </div>
                      <div
                        className="saveBtn btn"
                        onClick={() => setEditInput(false)}
                      >
                        Save
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : activeTab3 === "2" ? (
            <>
              <div className="tabPadding">
                <div className="d-flex align-center gap-20 mb-30 w-100">
                  <img
                    src={backButton}
                    alt=""
                    className="cursor-pointer backButton"
                    onClick={() => navigate("/admin/merchant/list")}
                  />
                  <div>
                    <div className="fs-24 fw-600 mb-4">Dine Savvy Account</div>
                    <Breadcrumb
                      className="cursor-pointer "
                      separator={<img src={breadCrumbIcon} />}
                      items={[
                        {
                          title: "Merchants",
                          onClick: () => navigate("/admin/merchant/list"),
                        },
                        {
                          title: "Dine Savvy Account",
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="card">
                  <div className="img54 mb-16">
                    <img
                      src={
                        merchantDetailsSelector?.data?.data?.owenerDetails
                          ?.photoURL || noImageFound
                      }
                      alt=""
                      className="h-100"
                    />
                  </div>
                  <div className="fs-22 fw-600">
                    {merchantDetailsSelector?.data?.data?.businessName}
                  </div>
                  <div className="divider2"></div>
                  <div className="d-flex justify-between align-center gap-10 fw-500 mb-16 flexsm fs-18">
                    <div className="grey">Member Since</div>
                    <div>{moment(state?.createdAt).format("MMM D, YYYY")}</div>
                  </div>
                  <div className="d-flex justify-between align-center gap-10 fw-500 mb-16 flexsm fs-18">
                    <div className="grey">Restaurant owner</div>
                    <div>
                      {merchantDetailsSelector.data.data.ownerDetails
                        ?.displayName || "N/A"}
                    </div>
                  </div>
                  <div className="d-flex justify-between align-center gap-10 fw-500 flexsm fs-18">
                    <div className="grey">Nudge credits</div>
                    <div>{state?.nudge?.nudgeCredit} Remaining</div>
                  </div>
                </div>
              </div>
            </>
          ) : activeTab3 === "3" ? (
            <>
              {viewDetail ? (
                <>
                  {listByUserIdSelector?.isLoading && <Loader />}
                  <div className="tabPadding mb-30">
                    <div className="d-flex align-center justify-between gap-20 mb-30 flexrightsm">
                      <div className="d-flex align-center gap-20 w-100">
                        <img
                          className="cursor-pointer backButton"
                          src={backButton}
                          alt={
                            followerDetailsSelector?.data?.data?.userInfo
                              ?.displayName
                          }
                          onClick={() => setViewDetail(false)}
                        />
                        <div>
                          <div className="fs-24 fw-600 mb-4">Followers</div>
                          <Breadcrumb
                            className="cursor-pointer"
                            separator={<img src={breadCrumbIcon} />}
                            items={[
                              {
                                title: "Merchants",
                                onClick: () => navigate("/admin/merchant/list"),
                              },
                              {
                                title: "Followers",
                                onClick: () => setViewDetail(false),
                              },
                              {
                                title: "Follower Details",
                              },
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="inputGrid grid3">
                      <div>
                        <label
                          htmlFor="name"
                          className="grey mb-10 fs-16 fw-500"
                        >
                          Follower name
                        </label>
                        <div className="fs-20">
                          {
                            followerDetailsSelector?.data?.data?.userInfo
                              ?.displayName
                          }
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="name"
                          className="grey mb-10 fs-16 fw-500"
                        >
                          Began following
                        </label>
                        <div className="fs-20">
                          {moment(
                            followerDetailsSelector?.data?.data?.createdAt
                          ).format("MMMM,YYYY")}
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="name"
                          className="grey mb-10 fs-16 fw-500"
                        >
                          Restaurants following
                        </label>
                        <div className="fs-20">
                          {
                            followerDetailsSelector?.data?.data
                              ?.totalFollowingCount
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tabPadding mb-30">
                    <div className="fs-20 fw-700 mb-20">Nudges Info</div>
                    <div className="grid5">
                      <div
                        className={
                          activeNudgeClass === "Received"
                            ? "card activeNudge"
                            : "card"
                        }
                        onClick={() => handleCardClick("Received")}
                      >
                        <div className="grey mb-10 fs-16 fw-500">
                          Nudges <br />
                          received
                        </div>
                        <div className="fs-22 fw-500">
                          {
                            followerDetailsSelector?.data?.data?.nudge
                              ?.totalNudge
                          }
                        </div>
                      </div>
                      <div
                        className={
                          activeNudgeClass === "Redeemed"
                            ? "card activeNudge"
                            : "card"
                        }
                        onClick={() => {
                          handleCardClick("Redeemed");
                          setActiveTab(false);
                        }}
                      >
                        <div className="grey mb-10 fs-16 fw-500">
                          Nudges <br />
                          Redeemed
                        </div>
                        <div className="fs-22 fw-500">
                          {
                            followerDetailsSelector?.data?.data?.nudge
                              ?.redeemedNudge
                          }
                        </div>
                      </div>
                      <div
                        className={
                          activeNudgeClass === "Accepted"
                            ? "card activeNudge"
                            : "card"
                        }
                        onClick={() => {
                          handleCardClick("Accepted");
                          setActiveTab(false);
                        }}
                      >
                        <div className="grey mb-10 fs-16 fw-500">
                          Nudges <br />
                          accepted
                        </div>
                        <div className="fs-22 fw-500">
                          {followerDetailsSelector?.data?.data?.nudge
                            ?.totalNudge > 0 &&
                          followerDetailsSelector?.data?.data?.nudge
                            ?.acceptNudge
                            ? `${
                                followerDetailsSelector?.data?.data?.nudge
                                  ?.acceptNudge || 0
                              }/${(
                                ((followerDetailsSelector?.data?.data?.nudge
                                  ?.acceptNudge || 0) /
                                  followerDetailsSelector?.data?.data?.nudge
                                    ?.totalNudge) *
                                100
                              ).toFixed(2)}%`
                            : "0"}
                        </div>
                      </div>
                      <div
                        className={
                          activeNudgeClass === "Denied"
                            ? "card activeNudge"
                            : "card"
                        }
                        onClick={() => {
                          handleCardClick("Denied");
                          setActiveTab(false);
                        }}
                      >
                        <div className="grey mb-10 fs-16 fw-500">
                          Nudges <br />
                          declined
                        </div>
                        <div className="fs-22 fw-500">
                          {followerDetailsSelector?.data?.data?.nudge
                            ?.totalNudge &&
                          followerDetailsSelector?.data?.data?.nudge
                            ?.declinedNudge > 0
                            ? `${
                                followerDetailsSelector?.data?.data?.nudge
                                  ?.declinedNudge || 0
                              }/${(
                                ((followerDetailsSelector?.data?.data?.nudge
                                  ?.declinedNudge || 0) /
                                  followerDetailsSelector?.data?.data?.nudge
                                    ?.totalNudge) *
                                100
                              ).toFixed(2)}%`
                            : "0"}
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          handleCardClick("NoAnswer");
                          setActiveTab(false);
                        }}
                        className={
                          activeNudgeClass === "NoAnswer"
                            ? "card activeNudge"
                            : "card"
                        }
                      >
                        <div className="grey mb-10 fs-16 fw-500">
                          Nudges with <br />
                          no action
                        </div>
                        <div className="fs-22 fw-500">
                          {followerDetailsSelector?.data?.data?.nudge
                            ?.totalNudge > 0 &&
                          followerDetailsSelector?.data?.data?.nudge
                            ?.acceptNudge
                            ? `${
                                followerDetailsSelector?.data?.data?.nudge
                                  ?.totalNudge -
                                ((followerDetailsSelector?.data?.data?.nudge
                                  ?.acceptNudge || 0) +
                                  (followerDetailsSelector?.data?.data?.nudge
                                    ?.declinedNudge || 0))
                              }/${(
                                ((followerDetailsSelector?.data?.data?.nudge
                                  ?.totalNudge -
                                  ((followerDetailsSelector?.data?.data?.nudge
                                    ?.acceptNudge || 0) +
                                    (followerDetailsSelector?.data?.data?.nudge
                                      ?.declinedNudge || 0))) /
                                  followerDetailsSelector?.data?.data?.nudge
                                    ?.totalNudge) *
                                100
                              ).toFixed(2)}%`
                            : "0"}
                        </div>
                      </div>
                    </div>
                    <div className="divider2"></div>
                    <div className="fs-20 fw-700 mb-20">
                      {{
                        Received: "Nudges Received",
                        Redeemed: "Nudges Redeemed",
                        Accepted: "Nudges Accepted",
                        Denied: "Nudges Declined",
                        NoAnswer: "Nudges with no action",
                      }[activeNudgeClass] || ""}
                    </div>
                    {activeNudgeClass === "Received" && (
                      <div className="tabs-container tab3 tabing mb-20">
                        <div className="tabs">
                          <button
                            className={`tab-button ${
                              activeTab === true ? "active" : ""
                            }`}
                            onClick={() => handleTabClick(true)}
                          >
                            Active
                          </button>
                          <button
                            className={`tab-button ${
                              activeTab === false ? "active" : ""
                            }`}
                            onClick={() => handleTabClick(false)}
                          >
                            Inactive
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="grid2 gap-20">
                      {listByUserIdSelector?.data?.data?.records?.length > 0 ? (
                        listByUserIdSelector?.data?.data?.records?.map(
                          (item, index) => {
                            return (
                              <div
                                className="card16 d-flex align-center gap-16"
                                key={index}
                              >
                                <div className="image80">
                                  <img
                                    src={item?.photoURL ?? dish}
                                    alt="dish"
                                  />
                                </div>
                                <div>
                                  <div className="fs-16 fw-500 grey mb-5">
                                    {item?.title}
                                  </div>
                                  <div className="fs-16 fw-500">
                                    {item?.message}
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )
                      ) : (
                        <div className="noDataFound">No Data Found</div>
                      )}
                    </div>

                    {listByUserIdSelector?.data?.data?.records?.length > 0 && (
                      <div className="d-flex align-center justify-between flexPagination">
                        <div className="fs-16">
                          {(() => {
                            const start =
                              (pagination.page - 1) * pagination.limit + 1;
                            const end = Math.min(
                              start +
                                listByUserIdSelector?.data?.data?.records
                                  ?.length -
                                1,
                              listByUserIdSelector?.data?.data?.recordsCount
                            );
                            return `Showing ${start} to ${end} of ${listByUserIdSelector?.data?.data?.recordsCount} Nudges`;
                          })()}
                        </div>
                        <Pagination
                          current={pagination?.page}
                          pageSize={pagination?.limit}
                          total={listByUserIdSelector?.data?.data?.recordsCount}
                          onChange={handlePaginationChange}
                        />
                      </div>
                    )}
                  </div>
                  <div className="tabPadding mb-30">
                    <div className="fs-20 fw-700 mb-10">Sharing</div>
                    <div className="grid3">
                      <div className="card">
                        <div className="grey mb-10 fs-16 fw-500">
                          Number of Sharing
                        </div>
                        <div className="fs-22 fw-500">25k</div>
                      </div>
                      <div className="card">
                        <div className="grey mb-10 fs-16 fw-500">
                          Sharing invitations sent
                        </div>
                        <div className="fs-22 fw-500">1.25k</div>
                      </div>
                      <div className="card">
                        <div className="grey mb-10 fs-16 fw-500">
                          Sharing invitations accepted
                        </div>
                        <div className="fs-22 fw-500">2.25k</div>
                      </div>
                    </div>
                  </div>
                  <div className="tabPadding mb-30">
                    <div className="fs-20 fw-700 mb-20">Merchants</div>
                    <div className="flexTag2">No data found</div>
                  </div>
                  <div className="tabPadding mb-30">
                    <div className="fs-20 fw-700 mb-20">Items favorited</div>
                    <div className="flexTagFull">
                      {followerDetailsSelector?.data?.data
                        ?.customerPreferenceData?.filterData?.length > 0 ? (
                        followerDetailsSelector.data.data.customerPreferenceData?.filterData?.map(
                          (item, index) => <div key={index}>{item}</div>
                        )
                      ) : (
                        <div>No data found</div>
                      )}
                    </div>
                  </div>
                  <div className="tabPadding mb-30">
                    <div className="fs-20 fw-700 mb-20">Preferences</div>
                    <div className="flexTagFull">
                      {followerDetailsSelector?.data?.data
                        ?.customerPreferenceData?.personalPreference?.length >
                      0 ? (
                        followerDetailsSelector.data.data.customerPreferenceData.personalPreference.map(
                          (item, index) => <div key={index}>{item}</div>
                        )
                      ) : (
                        <div className=" text-center fs-18">No data found</div>
                      )}
                    </div>
                  </div>
                  <div className="tabPadding mb-30">
                    <div className="fs-20 fw-700 mb-20">
                      Dine Savvy Application Usage
                    </div>
                    No data found
                  </div>
                  <div className="tabPadding mb-30">
                    <div className="fs-20 fw-700 mb-20">Locations</div>
                    No data found
                  </div>
                  <div className="tabPadding mb-30">
                    <div className="fs-20 fw-700 mb-20">
                      Most common time used
                    </div>
                    <div className="flexTagFull">No data found</div>
                  </div>
                </>
              ) : (
                <>
                  {followerListSelector?.isLoading && <Loader />}
                  <div className="tabPadding">
                    <div className="d-flex align-center justify-between gap-20 mb-30 flexrightsm">
                      <div className="d-flex align-center gap-20 w-100">
                        <img
                          src={backButton}
                          alt=""
                          className="cursor-pointer backButton"
                          onClick={() => navigate("/admin/merchant/list")}
                        />
                        <div>
                          <div className="fs-24 fw-600 mb-4">Followers</div>
                          <Breadcrumb
                            className="cursor-pointer"
                            separator={<img src={breadCrumbIcon} />}
                            items={[
                              {
                                title: "Merchants",
                                onClick: () => navigate("/admin/merchant/list"),
                              },
                              {
                                title: "Followers",
                              },
                            ]}
                          />
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="fs-14">Followers</div>
                        <div className="fs-26 sc fw-700">
                          {followerListSelector?.data?.data?.records?.length}
                        </div>
                      </div>
                    </div>
                    <SearchSelect
                      onSearchChange={handleSearchChange}
                      onSearchAreaChange={handleSearchAreaChange}
                    />
                    <div className="merchantGrid mb-30">
                      {followerListSelector?.data?.data?.records?.length > 0 ? (
                        followerListSelector?.data?.data?.records?.map(
                          (item, index) => (
                            <div className="cardFollow" key={index}>
                              <div className="d-flex justify-between gap-12">
                                <div className="d-flex align-center gap-12">
                                  <div className="initialName">
                                    {item?.userInfo?.displayName?.slice(0, 2)}
                                  </div>
                                  <div>
                                    <div className="fw-700">
                                      {item?.userInfo?.displayName &&
                                        item.userInfo.displayName
                                          .charAt(0)
                                          .toUpperCase() +
                                          item.userInfo.displayName.slice(1)}
                                    </div>
                                    <div className="fs-14 fw-300 o5">
                                      {moment(item?.createdAt).format(
                                        "MMMM, YYYY"
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="custom-checkbox">
                                  <label className="checkLabel">
                                    <input
                                      type="checkbox"
                                      checked={checkedItems[index] || false}
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          index,
                                          e.target.checked,
                                          item
                                        )
                                      }
                                    />
                                    <span className="checkmark"></span>
                                  </label>
                                </div>
                              </div>
                              <div className="divider2"></div>
                              <div className="d-flex justify-between align-center gap-12 fs-14 mb-10">
                                <div className="d-flex align-center gap-12">
                                  <img src={resturantIcon} alt="" />
                                  Restaurants following:
                                </div>
                                <div className="fw-500">
                                  {item?.followerCount}
                                </div>
                              </div>
                              <div className="d-flex justify-between align-center gap-12 fs-14">
                                <div className="d-flex align-center gap-12">
                                  <img src={nudgeIcon} alt="" />
                                  Nudges shared
                                </div>
                                <div className="fw-500">{item?.nudgeCount}</div>
                              </div>
                              <div className="divider2"></div>
                              <div className="fs-14 mb-6">Preferences</div>
                              <div className="flexTag mb-20">
                                {item?.customerPreferencesData
                                  ?.personalPreference?.length > 0 ? (
                                  item.customerPreferencesData.personalPreference.map(
                                    (preference, index) => (
                                      <div key={index}>{preference}</div>
                                    )
                                  )
                                ) : (
                                  <div>No preferences available</div>
                                )}
                              </div>
                              <div
                                className="btn btnSecondary"
                                onClick={() => viewDetails(item)}
                              >
                                View Details
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <div className="noDataFound">No data found</div>
                      )}
                    </div>
                    {followerListSelector?.data?.data?.records?.length > 0 && (
                      <div className="d-flex align-center justify-between flexPagination">
                        <div className="fs-16">
                          {(() => {
                            const start =
                              (pagination.page - 1) * pagination.limit + 1;
                            const end = Math.min(
                              start +
                                followerListSelector?.data?.data?.records
                                  ?.length -
                                1,
                              followerListSelector?.data?.data?.recordsCount
                            );
                            return `Showing ${start} to ${end} of ${followerListSelector?.data?.data?.recordsCount} Followers`;
                          })()}
                        </div>
                        <Pagination
                          current={pagination.page}
                          pageSize={pagination.limit}
                          total={followerListSelector?.data?.data?.recordsCount}
                          onChange={handlePaginationChange}
                        />
                      </div>
                    )}
                  </div>
                  {isAnyCheckboxChecked && !state?.statePrev?.selectedItems && (
                    <div className="floatAdd">
                      <div
                        className="btn fs-16"
                        onClick={() =>
                          navigate("/admin/nudges/template", {
                            state: { locationId: state, selectedItems },
                          })
                        }
                      >
                        <img src={createAdd} alt="image" />
                        <div>Create nudge</div>
                      </div>
                      <div
                        className="h-24 cursor-pointer"
                        onClick={handleDelete}
                      >
                        <img src={deleteList} className="w-100 h-100" alt="" />
                      </div>
                    </div>
                  )}

                  {isAnyCheckboxChecked && state?.statePrev?.selectedItems && (
                    <div className="floatAdd">
                      <div
                        className="btn fs-16"
                        onClick={() =>
                          navigate("/admin/nudges/template", {
                            state: { locationId: state, selectedItems },
                          })
                        }
                      >
                        <div>Continue</div>
                      </div>
                      <div
                        className="h-24 cursor-pointer"
                        onClick={handleDelete}
                      >
                        <img src={deleteList} className="w-100 h-100" alt="" />
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          ) : activeTab3 === "4" ? (
            <>
              {nudgesListSelector?.isLoading && <Loader />}
              <div className="tabPadding mb-30">
                <div className="d-flex align-center gap-20 mb-30 w-100">
                  <img
                    src={backButton}
                    alt=""
                    className="cursor-pointer backButton"
                    onClick={() => navigate("/admin/merchant/list")}
                  />
                  <div>
                    <div className="fs-24 fw-600 mb-4">Nudges</div>
                    <Breadcrumb
                      className="cursor-pointer"
                      separator={<img src={breadCrumbIcon} />}
                      items={[
                        {
                          title: "Merchants",
                          onClick: () => navigate("/admin/merchant/list"),
                        },
                        {
                          title: "Nudges",
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="divider2"></div>
                <div className="d-flex align-center justify-between mb-15">
                  <div>
                    <span className="fw-16">Nudges Goal: </span>
                    <span className="fw-700 fs-20">
                      {nudgeAnalyticSelector?.data?.data?.nudgeGoal}
                    </span>
                  </div>
                  <div>
                    <span className="fs-14">Sent </span>
                    <span className="fs-18 gc fw-700">
                      {nudgeAnalyticSelector?.data?.data?.nudgeSent}
                    </span>
                  </div>
                </div>
                <div className="range mb-15">
                  <div
                    className="rangePercentage"
                    style={{ width: percentage }}
                  ></div>
                </div>
                <div className="fs-14 fw-500 grey mb-20">
                  You are just {percentage}% behind to achieve Goal
                </div>
                <div className="weekNudge pc mb-20">
                  <div className="fs-18 fw-600">Nudges Expected This Week</div>
                  <div className="fw-700 fs-20">
                    {
                      nudgeAnalyticSelector?.data?.data
                        ?.remainingThisWeekNudgeSentCount
                    }
                  </div>
                </div>
                <div className="card">
                  <div className="fs-20 fw-700 d-flex gap-20 align-center justify-between">
                    <div>Nudge Credits</div>
                    <div>{nudgeAnalyticSelector?.data?.data?.nudgeCredit}</div>
                  </div>
                  <div className="divider2"></div>

                  <div className="d-flex justify-between align-center gap-20 mb-6">
                    <div className="fs-16 grey fw-500">Previous balance</div>
                    <div className="fs-20 fw-700">
                      {nudgeAnalyticSelector?.data?.data?.nudgeCredit -
                        (nudgeAnalyticSelector?.data?.data?.followerAddedToday +
                          nudgeAnalyticSelector?.data?.data
                            ?.promotionNudgeCreditAddedToday)}
                    </div>
                  </div>
                  <div className="d-flex justify-between align-center gap-20 mb-6">
                    <div className="fs-16 grey fw-500">
                      Followers added today
                    </div>
                    <div className="gc fs-20 fw-700">
                      {nudgeAnalyticSelector?.data?.data?.followerAddedToday}
                    </div>
                  </div>
                  <div className="d-flex justify-between align-center gap-20">
                    <div className="fs-16 grey fw-500">
                      Promotional credits added today
                    </div>
                    <div className="gc fs-20 fw-700">
                      {
                        nudgeAnalyticSelector?.data?.data
                          ?.promotionNudgeCreditAddedToday
                      }
                    </div>
                  </div>
                  <div className="divider2"></div>
                  <div className="d-flex justify-between align-center gap-20 mb-20">
                    <div className="fs-16 grey fw-500">
                      Nudge credits added today
                    </div>
                    <div className="gc fs-20 fw-700">
                      {
                        nudgeAnalyticSelector?.data?.data
                          ?.totalNudgeCreditAddedToday
                      }
                    </div>
                  </div>
                  {/* <div className="mb-16">
                      <input
                        type="text"
                        value={numberOfCredits}
                        placeholder="Enter number of credits"
                        onChange={(e) => setNumberOfCredits(e.target.value)}
                        disabled
                      />
                    </div> */}
                  <div className="d-flex justify-between align-center gap-20">
                    <div className="d-flex align-center gap-16 flex-wrap">
                      {[5, 10, 15, 20, 25]?.map((nudge,index) => (
                        <div
                          key={index}
                          className={`addNudge2 ${
                            activeNudge === nudge ? "active" : ""
                          }`}
                          onClick={() => handleCreditClick(nudge)}
                        >
                          {nudge} Nudges
                        </div>
                      ))}
                    </div>
                    <div
                      className={
                        activeNudge
                          ? "btn btnSecondary p16 gap-8"
                          : "btn btnSecondary p16 gap-8 disabled"
                      }
                      onClick={() => {
                        activeNudge ? addCreditsFuntion(true) : null;
                      }}
                    >
                      <img src={addCredits} alt="addCredits" />
                      Add Credits
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="d-flex justify-between align-center gap-20 mb-20">
                  <div className="fs-24 fw-600">Nudges</div>
                  <div
                    className="btn btnSecondary p16 gap-8"
                    onClick={() => {
                      navigate("/admin/nudges/template", {
                        state: { locationId: state },
                      });
                      localStorage.setItem("createNudgeFromMerchant", true);
                    }}
                  >
                    <img src={addCredits} alt="addCredits" />
                    Create a Nudge
                  </div>
                </div>
                <div className="tabs-container tab3 tabing mb-20">
                  <div className="tabs">
                    <button
                      className={`tab-button ${
                        activeTab === true ? "active" : ""
                      }`}
                      onClick={() => handleTabClick(true)}
                    >
                      Active
                    </button>
                    <button
                      className={`tab-button ${
                        activeTab === false ? "active" : ""
                      }`}
                      onClick={() => handleTabClick(false)}
                    >
                      Inactive
                    </button>
                  </div>
                </div>
                <div className="merchantGrid mb-20">
                  {nudgesListSelector?.data?.data?.records?.length > 0 ? (
                    nudgesListSelector?.data?.data?.records?.map(
                      (item, index) => (
                        <div className="merchantCard" key={index}>
                          <div className="position-relative">
                            <img
                              className="w-100 merchantImg"
                              src={item?.photoURL}
                              alt="Merchant"
                            />
                            <div className="freeAbsolute">
                              <div className="fs-16 fw-700 mb-2">
                                {item?.title}
                              </div>
                              <div className="fs-14">
                                {item?.locationDetails?.address?.addressLine1 +
                                  " " +
                                  item?.locationDetails?.address?.addressLine2 +
                                  " " +
                                  item?.locationDetails?.address
                                    ?.administrativeDistrictLevel1 +
                                  " " +
                                  item?.locationDetails?.address?.country +
                                  " " +
                                  item?.locationDetails?.address?.postalCode}
                              </div>
                            </div>
                          </div>
                          <div className="bottomPadding">
                            <div className="lightBlack fs-14 mb-20">
                              {item?.message}
                            </div>
                            <div className="d-flex justify-between align-center gap-20 mb-8">
                              <div className="fs-14 lightBlack">Sent date</div>
                              <div className="fs-14 fw-500">
                                {moment(item?.createdAt).format(
                                  "DD, MMMM YYYY"
                                )}
                              </div>
                            </div>
                            <div className="d-flex justify-between align-center gap-20 mb-8">
                              <div className="fs-14 lightBlack">
                                Expiration date
                              </div>
                              <div className="fs-14 fw-500">
                                {moment(item?.deactivateAt).format(
                                  "DD, MMMM YYYY"
                                )}
                              </div>
                            </div>
                            <div className="divider2"></div>
                            <div className="grid2 mb-20">
                              <div>
                                <div className="fs-14 mb-4 lightBlack">
                                  Recipients:
                                </div>
                                <div className="fs-14 fw-600">
                                  {item?.recipientCount}
                                </div>
                              </div>
                              <div>
                                <div className="fs-14 mb-4 lightBlack">
                                  Accepted:
                                </div>
                                <div className="fs-14 fw-600 gc">
                                  {item?.totalAcceptedFollowerList}/
                                  {(
                                    (item?.totalAcceptedFollowerList /
                                      item?.recipientCount) *
                                    100
                                  ).toFixed(0)}
                                  %
                                </div>
                              </div>
                              <div>
                                <div className="fs-14 mb-4 lightBlack">
                                  Declined:
                                </div>
                                <div className="fs-14 fw-600 rc">
                                  {item?.disLikeUserList}/
                                  {(
                                    (item?.disLikeUserList /
                                      item?.recipientCount) *
                                    100
                                  ).toFixed(0)}
                                  %
                                </div>
                              </div>
                              <div>
                                <div className="fs-14 mb-4 lightBlack">
                                  No Response
                                </div>
                                <div className="fs-14 fw-600 greyColor">
                                  {item?.recipientCount -
                                    (item?.totalAcceptedFollowerList +
                                      item?.disLikeUserList)}
                                  /
                                  {(
                                    ((item?.recipientCount -
                                      (item?.totalAcceptedFollowerList +
                                        item?.disLikeUserList)) /
                                      item?.recipientCount) *
                                    100
                                  ).toFixed(2)}
                                  %
                                </div>
                              </div>
                            </div>
                            <div
                              className="btn btnSecondary w-100"
                              onClick={() => toggleSidebar(item, index)}
                            >
                              View Details
                            </div>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <div className="noDataFound">No Data Found</div>
                  )}
                </div>
                {nudgesListSelector?.data?.data?.records?.length > 0 && (
                  <div className="d-flex align-center justify-between flexPagination">
                    <div className="fs-16">
                      {(() => {
                        const start =
                          (pagination.page - 1) * pagination.limit + 1;
                        const end = Math.min(
                          start +
                            nudgesListSelector?.data?.data?.records?.length -
                            1,
                          nudgesListSelector?.data?.data?.recordsCount
                        );
                        return `Showing ${start} to ${end} of ${nudgesListSelector?.data?.data?.recordsCount} Nudges`;
                      })()}
                    </div>
                    <Pagination
                      current={pagination?.page}
                      pageSize={pagination?.limit}
                      total={nudgesListSelector?.data?.data?.recordsCount}
                      onChange={handlePaginationChange}
                    />
                  </div>
                )}
              </div>
              <NudgeDetail
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                nudgeDetailsMainSelector={nudgeDetailsMainSelector}
                activeTab={activeTab}
                nudgeId={nudgeId}
              />
            </>
          ) : activeTab3 === "5" ? (
            <>
              <TeamMember
                merchantDetailsSelector={merchantDetailsSelector}
                activeTab3={activeTab3}
                setActiveTab3={setActiveTab3}
              />
            </>
          ) : null}
        </div>
      )}
      <AddNudgeCreditDrawer
        setAddNudgeCredit={setAddNudgeCredit}
        addNudgeCredit={addNudgeCredit}
        setNumberOfCredits={setNumberOfCredits}
        numberOfCredits={numberOfCredits}
        merchantDetailsSelector={merchantDetailsSelector}
        addCreditSelector={addCreditSelector}
        nudgeAnalyticSelector={nudgeAnalyticSelector}
        activeNudge = {activeNudge}
      />
    </>
  );
};

export default MerchantDetails;
