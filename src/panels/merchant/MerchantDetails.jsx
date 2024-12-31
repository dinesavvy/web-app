import React, { useState } from "react";
import "./merchant.css";
import backButton from "../../assets/images/backButton.svg";
import breadCrumbIcon from "../../assets/images/breadCrumb.svg";
import editBtn from "../../assets/images/editBtn.svg";
import cafeIcon from "../../assets/images/cafeIcon.svg";
import downloadIcon from "../../assets/images/downloadIcon.svg";
import resturantIcon from "../../assets/images/resturantIcon.svg";
import review from "../../assets/images/review.svg";
import nudgeIcon from "../../assets/images/nudgeIcon.svg";
import olive from "../../assets/images/olive.png";
import addTime from "../../assets/images/addTime.svg";
import createAdd from "../../assets/images/createAdd.svg";
import map from "../../assets/images/map.jpg";
import restaurantCard from "../../assets/images/restaurantCard.png";
import businessPhoto from "../../assets/images/businessPhoto.png";
import chart from "../../assets/images/chart.jpg";
import { Breadcrumb, Pagination, TimePicker } from "antd";
import SearchSelect from "../../shared/components/SearchSelect";
import CustomSelect from "../../shared/components/CustomSelect";
import CustomSwitch from "../../shared/components/CustomSwitch";
import ImageGallery from "../../shared/components/ImageGallery";
import CommonToast from "../../shared/components/commonToast";

const MerchantDetails = () => {
  const [activeTab3, setActiveTab3] = useState("1");
  const [editInput, setEditInput] = useState(false);
  const [switchState, setSwitchState] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);

  const tabs3 = [
    {
      id: "1",
      label: "Google Business Profile",
    },
    {
      id: "2",
      label: "Dine Savvy Account",
    },
    {
      id: "3",
      label: "Followers",
    },
    {
      id: "4",
      label: "Nudges",
    },
  ];
  const handleToggle = (state) => {
    setSwitchState(state);
  };
  const images = [
    businessPhoto,
    restaurantCard,
    restaurantCard,
    businessPhoto,
    restaurantCard,
    businessPhoto,
    restaurantCard,
  ];
  const images2 = [
    restaurantCard,
    businessPhoto,
    restaurantCard,
    businessPhoto,
    restaurantCard,
    businessPhoto,
    restaurantCard,
  ];
  return (
    <>
      <div className="dashboard">
        <div className="tabs-container tab3 tabFull">
          <div className="tabs">
            {tabs3.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${
                  activeTab3 === tab.id ? "active" : ""
                }`}
                onClick={() => setActiveTab3(tab.id)}
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
                <img src={backButton} alt="" />
                <div>
                  <div className="fs-24 fw-600 mb-4">Merchants Details</div>
                  <Breadcrumb
                    separator={<img src={breadCrumbIcon} />}
                    items={[
                      {
                        title: "Merchants",
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
                  {!editInput && (
                    <div
                      className="editBtn cursor-pointer"
                      onClick={() => setEditInput(true)}
                    >
                      <img src={editBtn} alt="" />
                    </div>
                  )}
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
                      <div className="">Garden Grove Café & Bistro</div>
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
                      <div className="">Restaurant</div>
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
                      <div className="">
                        Whether you're joining us for a casual lunch, a special
                        dinner, or a weekend brunch, our elegant yet relaxed
                        atmosphere is perfect for any occasion.
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
                  {!editInput && (
                    <div
                      className="editBtn cursor-pointer"
                      onClick={() => setEditInput(true)}
                    >
                      <img src={editBtn} alt="" />
                    </div>
                  )}
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
                      <a className="anchor" href="tel:+911234567890">
                        +91 123 456 7890
                      </a>
                    )}
                  </div>
                  <div>
                    <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                      Email
                    </label>
                    {editInput === true ? (
                      <input
                        type="email"
                        className="input"
                        placeholder="Email"
                      />
                    ) : (
                      <a className="anchor" href="mailto:dinesavvy@gmail.com">
                        dinesavvy@gmail.com
                      </a>
                    )}
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
                      <a className="anchor" href="www.dinesavvy.com">
                        www.dinesavvy.com
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
                  {!editInput && (
                    <div
                      className="editBtn cursor-pointer"
                      onClick={() => setEditInput(true)}
                    >
                      <img src={editBtn} alt="" />
                    </div>
                  )}
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
                      <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                        Business location
                      </label>
                      <div className="mb-20">
                        4140 Parker Rd. Allentown, New Mexico 31134
                      </div>
                    </>
                  )}
                  <div className="iframeMap my228  ">
                    <img src={map} alt="" className="w-100 h-100" />
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
              <div className="card">
                <div className="d-flex align-center justify-between gap-20 mb-20 flexmd">
                  <div className="fs-20 fw-700">Hours of operation</div>
                  {!editInput && (
                    <div
                      className="editBtn cursor-pointer"
                      onClick={() => setEditInput(true)}
                    >
                      <img src={editBtn} alt="" />
                    </div>
                  )}
                </div>
                {!editInput && (
                  <div>
                    <div className="d-flex align-center justify-between">
                      <div className="grey fs-16">Sunday</div>
                      <div>Closed</div>
                    </div>
                    <div className="divider2"></div>
                    <div className="d-flex align-center justify-between">
                      <div className="grey fs-16">Monday</div>
                      <div>9:00 AM To 11:30</div>
                    </div>
                    <div className="divider2"></div>
                    <div className="d-flex align-center justify-between">
                      <div className="grey fs-16">Tuesday</div>
                      <div>9:00 AM To 11:30</div>
                    </div>
                    <div className="divider2"></div>
                    <div className="d-flex align-center justify-between">
                      <div className="grey fs-16">Wednesday</div>
                      <div>9:00 AM To 11:30</div>
                    </div>
                    <div className="divider2"></div>
                    <div className="d-flex align-center justify-between">
                      <div className="grey fs-16">Thurday</div>
                      <div>9:00 AM To 11:30</div>
                    </div>
                    <div className="divider2"></div>
                    <div className="d-flex align-center justify-between">
                      <div className="grey fs-16">Friday</div>
                      <div>9:00 AM To 11:30</div>
                    </div>
                    <div className="divider2"></div>
                    <div className="d-flex align-center justify-between">
                      <div className="grey fs-16">Saturday</div>
                      <div>9:00 AM To 11:30</div>
                    </div>
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
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
                              From
                            </label>
                            <TimePicker className="customTime input" />
                          </div>
                          <div className="w-100">
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
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
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
                              From
                            </label>
                            <TimePicker className="customTime input" />
                          </div>
                          <div className="w-100">
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
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
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
                              From
                            </label>
                            <TimePicker className="customTime input" />
                          </div>
                          <div className="w-100">
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
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
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
                              From
                            </label>
                            <TimePicker className="customTime input" />
                          </div>
                          <div className="w-100">
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
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
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
                              From
                            </label>
                            <TimePicker className="customTime input" />
                          </div>
                          <div className="w-100">
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
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
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
                              From
                            </label>
                            <TimePicker className="customTime input" />
                          </div>
                          <div className="w-100">
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
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
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
                              From
                            </label>
                            <TimePicker className="customTime input" />
                          </div>
                          <div className="w-100">
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
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
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
                              From
                            </label>
                            <TimePicker className="customTime input" />
                          </div>
                          <div className="w-100">
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
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
            <div className="tabPadding mb-30">
              <div className="card mb-30">
                <div className="d-flex align-center justify-between gap-20 mb-20">
                  <div className="fs-20 fw-700">Primary Business Photo</div>
                  <div
                    className="sc fs-16 fw-700 cursor-pointer wordno"
                    onClick={() => setOpenImage(true)}
                  >
                    {" "}
                    View All
                  </div>
                </div>
                <ImageGallery
                  images={images}
                  openImage={openImage}
                  setOpenImage={setOpenImage}
                />
              </div>
              <div className="card">
                <div className="d-flex align-center justify-between gap-20 mb-20">
                  <div className="fs-20 fw-700">Secondary Business Photo</div>
                  <div
                    className="sc fs-16 fw-700 cursor-pointer"
                    onClick={() => setOpenImage(true)}
                  >
                    {" "}
                    View All
                  </div>
                </div>
                <ImageGallery
                  images={images2}
                  openImage={openImage}
                  setOpenImage={setOpenImage}
                />
              </div>
            </div>
            <div className="card">
              <div className="fs-20 fw-700 mb-20">Reviews</div>
              <div className="reviewCard mb-20">
                <div className="d-flex gap-10 align-center justify-between mb-20 flexWrapsm">
                  <div className="d-flex gap-10 align-center fs-20 fw-500">
                    <img src={review} className="reviewImge" alt="" />
                    Jane Cooprer
                  </div>
                  <div className="reviewTag fs-14">
                    <div>Dine in</div>
                    <div>Lunch</div>
                    <div>$10 - $100</div>
                  </div>
                </div>
                <div className="mb-20">
                  I recently had a fantastic experience dining in for brunch at
                  Restaurant . The atmosphere was warm and welcoming, and the
                  staff was extremely friendly and attentive. The food was
                  delicious and of high quality, with a wide variety of options
                  to choose from.....More
                </div>
                <ImageGallery images={images} />
              </div>
              <div className="reviewCard mb-20">
                <div className="d-flex gap-10 align-center justify-between mb-20 flexWrapsm">
                  <div className="d-flex gap-10 align-center fs-20 fw-500">
                    <img src={review} className="reviewImge" alt="" />
                    Jane Cooprer
                  </div>
                  <div className="reviewTag fs-14">
                    <div>Dine in</div>
                    <div>Lunch</div>
                    <div>$10 - $100</div>
                  </div>
                </div>
                <div className="mb-20">
                  I recently had a fantastic experience dining in for brunch at
                  Restaurant . The atmosphere was warm and welcoming, and the
                  staff was extremely friendly and attentive. The food was
                  delicious and of high quality, with a wide variety of options
                  to choose from.....More
                </div>
                <ImageGallery images={images2} />
              </div>
              <div className="viewMoreBtn">View More</div>
            </div>
          </>
        ) : activeTab3 === "2" ? (
          <>
            <div className="tabPadding">
              <div className="d-flex align-center gap-20 mb-30 w-100">
                <img src={backButton} alt="" />
                <div>
                  <div className="fs-24 fw-600 mb-4">Dine Savvy Account</div>
                  <Breadcrumb
                    separator={<img src={breadCrumbIcon} />}
                    items={[
                      {
                        title: "Merchants",
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
                  <img src={olive} alt="" className="h-100" />
                </div>
                <div className="fs-22 fw-600">Garden Grove Café & Bistro</div>
                <div className="divider2"></div>
                <div className="d-flex justify-between align-center gap-10 fw-500 mb-16 flexsm">
                  <div className="grey">Member Since</div>
                  <div>September 19th, 2024</div>
                </div>
                <div className="d-flex justify-between align-center gap-10 fw-500 mb-16 flexsm">
                  <div className="grey">Restaurant owner</div>
                  <div>Cameron Williamson</div>
                </div>
                <div className="d-flex justify-between align-center gap-10 fw-500 flexsm">
                  <div className="grey">Nudge credits</div>
                  <div>120 Remaining</div>
                </div>
                <div className="divider2"></div>
                <div className="fw-600 mb-10">Payment history</div>
                <div className="overflow">
                  <table className="w-100 fs-14 text-center stripped">
                    <thead>
                      <tr>
                        <th style={{ minWidth: "150px", width: "50%" }}>
                          Date
                        </th>
                        <th style={{ minWidth: "150px", width: "50%" }}>
                          Amount
                        </th>
                        <th style={{ minWidth: "100px", width: "20%" }}>
                          sdds
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Oct 10, 2024</td>
                        <td>$200</td>
                        <td>
                          <div className="downloadIcon cursor-pointer">
                            <img src={downloadIcon} alt="" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Sep 15, 2024</td>
                        <td>$150</td>
                        <td>
                          <div className="downloadIcon cursor-pointer">
                            <img src={downloadIcon} alt="" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Aug 05, 2024</td>
                        <td>$100</td>
                        <td>
                          <div className="downloadIcon cursor-pointer">
                            <img src={downloadIcon} alt="" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : activeTab3 === "3" ? (
          <>
            {viewDetail ? (
              <>
                <div className="tabPadding mb-30">
                  <div className="d-flex align-center justify-between gap-20 mb-30 flexrightsm">
                    <div className="d-flex align-center gap-20 w-100">
                      <img
                        src={backButton}
                        alt=""
                        onClick={() => setViewDetail(false)}
                      />
                      <div>
                        <div className="fs-24 fw-600 mb-4">Followers</div>
                        <Breadcrumb
                          separator={<img src={breadCrumbIcon} />}
                          items={[
                            {
                              title: "Merchants",
                            },
                            {
                              title: "Followers",
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
                      <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                        Follower name
                      </label>
                      <div className="fs-20">Dianne Russell</div>
                    </div>
                    <div>
                      <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                        Began following
                      </label>
                      <div className="fs-20">June, 2024</div>
                    </div>
                    <div>
                      <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                        Restaurants following
                      </label>
                      <div className="fs-20">89k</div>
                    </div>
                  </div>
                </div>
                <div className="tabPadding mb-30">
                  <div className="fs-20 fw-700 mb-10">Nudges Info</div>
                  <div className="grid4"> 
                    <div className="card">
                      <div className="grey mb-10 fs-16 fw-500">
                        Nudges <br />
                        received
                      </div>
                      <div className="fs-22 fw-500">200</div>
                    </div>
                    <div className="card">
                      <div className="grey mb-10 fs-16 fw-500">
                        Nudges <br />
                        accepted
                      </div>
                      <div className="fs-22 fw-500">100/50%</div>
                    </div>
                    <div className="card">
                      <div className="grey mb-10 fs-16 fw-500">
                        Nudges <br />
                        declined
                      </div>
                      <div className="fs-22 fw-500">100/50%</div>
                    </div>
                    <div className="card">
                      <div className="grey mb-10 fs-16 fw-500">
                        Nudges with <br />
                        no action
                      </div>
                      <div className="fs-22 fw-500">0</div>
                    </div>
                  </div>
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
                  <div className="flexTag2">
                    <div>Garden Grove Café & Bistro</div>
                    <div>The Rolling Pin Bakery</div>
                    <div>Firefly Lounge & Bar</div>
                    <div>Golden Harvest Farmhouse</div>
                    <div>Sage & Stone Fine</div>
                    <div>Pine & Cedar Grille House</div>
                    <div>Blue Horizon Coastal Grill</div>
                    <div>Sweet Basil Wine Bar</div>
                    <div>Red Oak Smokehouse BBQ</div>
                    <div>See more</div>
                  </div>
                </div>
                <div className="tabPadding mb-30">
                  <div className="fs-20 fw-700 mb-20">Items favorited</div>
                  <div className="flexTagFull">
                    <div>French dip</div>
                    <div>Cioppino</div>
                    <div>Avocado toast</div>
                    <div>Mac and Cheese Pizza</div>
                    <div>Burrito</div>
                    <div>Mission burrito</div>
                  </div>
                </div>
                <div className="tabPadding mb-30">
                  <div className="fs-20 fw-700 mb-20">Preferences</div>
                  <div className="flexTagFull">
                    <div>Casual Dining</div>
                    <div>Weight Watchers</div>
                    <div>Drinks</div>
                    <div>Steak, Bar</div>
                    <div>Wine</div>
                  </div>
                </div>
                <div className="tabPadding mb-30">
                  <div className="fs-20 fw-700 mb-20">Dine Savvy Application Usage</div>
                  <div className="d-flex gap-30 flexWrap">
                      <div className="card w-100">
                        <div><img src={chart} className="w-100" alt="" /></div>
                        <div className="divider2"></div>
                        <div className="fw-600 text-center">
                        User opens Dine Savvy
                        </div>
                      </div>
                      <div className="card w-100">
                        <div><img src={chart} className="w-100" alt="" /></div>
                        <div className="divider2"></div>
                        <div className="fw-600 text-center">
                        User spends in Dine Savvy
                        </div>
                      </div>
                  </div>
                </div>
                <div className="tabPadding mb-30">
                  <div className="fs-20 fw-700 mb-20">Locations</div>
                  <div className="divider2"></div>
                  <div className="fw-500 text-center mb-20">
                  Weekly
                  </div>
                  <div className="w-100 mh400 ">
                    <img src={map} className="w-100 h-100" alt="" />
                  </div>
                  <div className="divider2"></div>
                  <div className="overflow">
                  <table className="w-100 fs-14 text-start">
                    <thead>
                      <tr>
                        <th style={{ minWidth: "200px" }}>
                        Date/Day
                        </th>
                        <th style={{ minWidth: "200px" }}>
                        Time
                        </th>
                        <th style={{ minWidth: "400px", width: "60%" }}>
                        Location
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Sunday</td>
                        <td>12:23 pm</td>
                        <td>8502 Preston Rd. Inglewood, Maine 98380</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>12:23 pm</td>
                        <td>8502 Preston Rd. Inglewood, Maine 98380</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>12:23 pm</td>
                        <td>8502 Preston Rd. Inglewood, Maine 98380</td>
                      </tr>
                      <tr>
                        <td>Monday</td>
                        <td>12:23 pm</td>
                        <td>8502 Preston Rd. Inglewood, Maine 98380</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                </div>
                <div className="tabPadding mb-30">
                  <div className="fs-20 fw-700 mb-20">Most common time used</div>
                  <div className="flexTagFull">
                    <div>12:00 to 01:00 PM</div>
                    <div>06:00 to 07:30 PM</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="tabPadding">
                  <div className="d-flex align-center justify-between gap-20 mb-30 flexrightsm">
                    <div className="d-flex align-center gap-20 w-100">
                      <img src={backButton} alt="" />
                      <div>
                        <div className="fs-24 fw-600 mb-4">Followers</div>
                        <Breadcrumb
                          separator={<img src={breadCrumbIcon} />}
                          items={[
                            {
                              title: "Merchants",
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
                      <div className="fs-26 sc fw-700">54</div>
                    </div>
                  </div>
                  <SearchSelect />
                  <div className="merchantGrid mb-30">
                    <div className="cardFollow">
                      <div className="d-flex justify-between gap-12">
                        <div className="d-flex align-center gap-12">
                          <div className="initialName">dr</div>
                          <div>
                            <div className="fw-700">Dianne Russell</div>
                            <div className="fs-14 fw-300 o5">June, 2024</div>
                          </div>
                        </div>
                        <div className="custom-checkbox">
                          <label className="checkLabel">
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                      </div>
                      <div className="divider2"></div>
                      <div className="d-flex justify-between align-center gap-12 fs-14 mb-10">
                        <div className="d-flex align-center gap-12">
                          <img src={resturantIcon} alt="" />
                          Restaurants following:
                        </div>
                        <div className=" fw-500">32</div>
                      </div>
                      <div className="d-flex justify-between align-center gap-12 fs-14">
                        <div className="d-flex align-center gap-12">
                          <img src={nudgeIcon} alt="" />
                          Nudges shared
                        </div>
                        <div className=" fw-500">32</div>
                      </div>
                      <div className="divider2"></div>
                      <div className="fs-14 mb-6">Preferences</div>
                      <div className="flexTag mb-20">
                        <div>Wine</div>
                        <div>Steak, Bar</div>
                        <div>Drinks</div>
                        <div>Weight Watchers</div>
                        <div>Casual Dining</div>
                      </div>
                      <div
                        className="btn btnSecondary"
                        onClick={() => setViewDetail(true)}
                      >
                        View Details
                      </div>
                    </div>
                    <div className="cardFollow">
                      <div className="d-flex justify-between gap-12">
                        <div className="d-flex align-center gap-12">
                          <div className="initialName">dr</div>
                          <div>
                            <div className="fw-700">Dianne Russell</div>
                            <div className="fs-14 fw-300 o5">June, 2024</div>
                          </div>
                        </div>
                        <div className="custom-checkbox">
                          <label className="checkLabel">
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                      </div>
                      <div className="divider2"></div>
                      <div className="d-flex justify-between align-center gap-12 fs-14 mb-10">
                        <div className="d-flex align-center gap-12">
                          <img src={resturantIcon} alt="" />
                          Restaurants following:
                        </div>
                        <div className=" fw-500">32</div>
                      </div>
                      <div className="d-flex justify-between align-center gap-12 fs-14">
                        <div className="d-flex align-center gap-12">
                          <img src={nudgeIcon} alt="" />
                          Nudges shared
                        </div>
                        <div className=" fw-500">32</div>
                      </div>
                      <div className="divider2"></div>
                      <div className="fs-14 mb-6">Preferences</div>
                      <div className="flexTag mb-20">
                        <div>Wine</div>
                        <div>Steak, Bar</div>
                        <div>Drinks</div>
                        <div>Weight Watchers</div>
                        <div>Casual Dining</div>
                      </div>
                      <div className="btn btnSecondary">View Details</div>
                    </div>
                    <div className="cardFollow">
                      <div className="d-flex justify-between gap-12">
                        <div className="d-flex align-center gap-12">
                          <div className="initialName">dr</div>
                          <div>
                            <div className="fw-700">Dianne Russell</div>
                            <div className="fs-14 fw-300 o5">June, 2024</div>
                          </div>
                        </div>
                        <div className="custom-checkbox">
                          <label className="checkLabel">
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                      </div>
                      <div className="divider2"></div>
                      <div className="d-flex justify-between align-center gap-12 fs-14 mb-10">
                        <div className="d-flex align-center gap-12">
                          <img src={resturantIcon} alt="" />
                          Restaurants following:
                        </div>
                        <div className=" fw-500">32</div>
                      </div>
                      <div className="d-flex justify-between align-center gap-12 fs-14">
                        <div className="d-flex align-center gap-12">
                          <img src={nudgeIcon} alt="" />
                          Nudges shared
                        </div>
                        <div className=" fw-500">32</div>
                      </div>
                      <div className="divider2"></div>
                      <div className="fs-14 mb-6">Preferences</div>
                      <div className="flexTag mb-20">
                        <div>Wine</div>
                        <div>Steak, Bar</div>
                        <div>Drinks</div>
                        <div>Weight Watchers</div>
                        <div>Casual Dining</div>
                      </div>
                      <div className="btn btnSecondary">View Details</div>
                    </div>
                    <div className="cardFollow">
                      <div className="d-flex justify-between gap-12">
                        <div className="d-flex align-center gap-12">
                          <div className="initialName">dr</div>
                          <div>
                            <div className="fw-700">Dianne Russell</div>
                            <div className="fs-14 fw-300 o5">June, 2024</div>
                          </div>
                        </div>
                        <div className="custom-checkbox">
                          <label className="checkLabel">
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                      </div>
                      <div className="divider2"></div>
                      <div className="d-flex justify-between align-center gap-12 fs-14 mb-10">
                        <div className="d-flex align-center gap-12">
                          <img src={resturantIcon} alt="" />
                          Restaurants following:
                        </div>
                        <div className=" fw-500">32</div>
                      </div>
                      <div className="d-flex justify-between align-center gap-12 fs-14">
                        <div className="d-flex align-center gap-12">
                          <img src={nudgeIcon} alt="" />
                          Nudges shared
                        </div>
                        <div className=" fw-500">32</div>
                      </div>
                      <div className="divider2"></div>
                      <div className="fs-14 mb-6">Preferences</div>
                      <div className="flexTag mb-20">
                        <div>Wine</div>
                        <div>Steak, Bar</div>
                        <div>Drinks</div>
                        <div>Weight Watchers</div>
                        <div>Casual Dining</div>
                      </div>
                      <div className="btn btnSecondary">View Details</div>
                    </div>
                    <div className="cardFollow">
                      <div className="d-flex justify-between gap-12">
                        <div className="d-flex align-center gap-12">
                          <div className="initialName">dr</div>
                          <div>
                            <div className="fw-700">Dianne Russell</div>
                            <div className="fs-14 fw-300 o5">June, 2024</div>
                          </div>
                        </div>
                        <div className="custom-checkbox">
                          <label className="checkLabel">
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                      </div>
                      <div className="divider2"></div>
                      <div className="d-flex justify-between align-center gap-12 fs-14 mb-10">
                        <div className="d-flex align-center gap-12">
                          <img src={resturantIcon} alt="" />
                          Restaurants following:
                        </div>
                        <div className=" fw-500">32</div>
                      </div>
                      <div className="d-flex justify-between align-center gap-12 fs-14">
                        <div className="d-flex align-center gap-12">
                          <img src={nudgeIcon} alt="" />
                          Nudges shared
                        </div>
                        <div className=" fw-500">32</div>
                      </div>
                      <div className="divider2"></div>
                      <div className="fs-14 mb-6">Preferences</div>
                      <div className="flexTag mb-20">
                        <div>Wine</div>
                        <div>Steak, Bar</div>
                        <div>Drinks</div>
                        <div>Weight Watchers</div>
                        <div>Casual Dining</div>
                      </div>
                      <div className="btn btnSecondary">View Details</div>
                    </div>
                    <div className="cardFollow">
                      <div className="d-flex justify-between gap-12">
                        <div className="d-flex align-center gap-12">
                          <div className="initialName">dr</div>
                          <div>
                            <div className="fw-700">Dianne Russell</div>
                            <div className="fs-14 fw-300 o5">June, 2024</div>
                          </div>
                        </div>
                        <div className="custom-checkbox">
                          <label className="checkLabel">
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                      </div>
                      <div className="divider2"></div>
                      <div className="d-flex justify-between align-center gap-12 fs-14 mb-10">
                        <div className="d-flex align-center gap-12">
                          <img src={resturantIcon} alt="" />
                          Restaurants following:
                        </div>
                        <div className=" fw-500">32</div>
                      </div>
                      <div className="d-flex justify-between align-center gap-12 fs-14">
                        <div className="d-flex align-center gap-12">
                          <img src={nudgeIcon} alt="" />
                          Nudges shared
                        </div>
                        <div className=" fw-500">32</div>
                      </div>
                      <div className="divider2"></div>
                      <div className="fs-14 mb-6">Preferences</div>
                      <div className="flexTag mb-20">
                        <div>Wine</div>
                        <div>Steak, Bar</div>
                        <div>Drinks</div>
                        <div>Weight Watchers</div>
                        <div>Casual Dining</div>
                      </div>
                      <div className="btn btnSecondary">View Details</div>
                    </div>
                  </div>
                  <div className="d-flex align-center justify-between flexPagination">
                    <div className="fs-16">
                      Showing 1 to 5 of 10 Restaurants
                    </div>
                    <Pagination defaultCurrent={1} total={50} />
                  </div>
                </div>
               <CommonToast image={createAdd}  text={"Create nudge"}/>
              </>
            )}
          </>
        ) : activeTab3 === "4" ? (
          <>
            <div className="tabPadding">
              <div className="d-flex align-center gap-20 mb-30 w-100">
                <img src={backButton} alt="" />
                <div>
                  <div className="fs-24 fw-600 mb-4">Nudges</div>
                  <Breadcrumb
                    separator={<img src={breadCrumbIcon} />}
                    items={[
                      {
                        title: "Merchants",
                      },
                      {
                        title: "Nudges",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="merchantGrid">
                <div className="merchantCard">
                  <div className="position-relative">
                    <img className="w-100" src={restaurantCard} alt="" />
                    <div className="freeAbsolute fs-16 fw-700">Free Drink</div>
                    <div className="nudgeTag">All Followers</div>
                  </div>
                  <div className="bottomPadding">
                    <div className="grid2">
                      <div>
                        <div class="fs-14 mb-4">Recipients:</div>
                        <div class="fs-14 fw-600">500</div>
                      </div>
                      <div>
                        <div class="fs-14 mb-4">Accepted:</div>
                        <div class="fs-14 fw-600">320/60%</div>
                      </div>
                      <div>
                        <div class="fs-14 mb-4">Declined:</div>
                        <div class="fs-14 fw-600">180/40%</div>
                      </div>
                      <div>
                        <div class="fs-14 mb-4">Cost:</div>
                        <div class="fs-14 fw-600">$10.00</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="merchantCard">
                  <div className="position-relative">
                    <img className="w-100" src={restaurantCard} alt="" />
                    <div className="freeAbsolute fs-16 fw-700">Free Drink</div>
                    <div className="nudgeTag">All Followers</div>
                  </div>
                  <div className="bottomPadding">
                    <div className="grid2">
                      <div>
                        <div class="fs-14 mb-4">Recipients:</div>
                        <div class="fs-14 fw-600">500</div>
                      </div>
                      <div>
                        <div class="fs-14 mb-4">Accepted:</div>
                        <div class="fs-14 fw-600">320/60%</div>
                      </div>
                      <div>
                        <div class="fs-14 mb-4">Declined:</div>
                        <div class="fs-14 fw-600">180/40%</div>
                      </div>
                      <div>
                        <div class="fs-14 mb-4">Cost:</div>
                        <div class="fs-14 fw-600">$10.00</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="merchantCard">
                  <div className="position-relative">
                    <img className="w-100" src={restaurantCard} alt="" />
                    <div className="freeAbsolute fs-16 fw-700">Free Drink</div>
                    <div className="nudgeTag">All Followers</div>
                  </div>
                  <div className="bottomPadding">
                    <div className="grid2">
                      <div>
                        <div class="fs-14 mb-4">Recipients:</div>
                        <div class="fs-14 fw-600">500</div>
                      </div>
                      <div>
                        <div class="fs-14 mb-4">Accepted:</div>
                        <div class="fs-14 fw-600">320/60%</div>
                      </div>
                      <div>
                        <div class="fs-14 mb-4">Declined:</div>
                        <div class="fs-14 fw-600">180/40%</div>
                      </div>
                      <div>
                        <div class="fs-14 mb-4">Cost:</div>
                        <div class="fs-14 fw-600">$10.00</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="merchantCard">
                  <div className="position-relative">
                    <img className="w-100" src={restaurantCard} alt="" />
                    <div className="freeAbsolute fs-16 fw-700">Free Drink</div>
                    <div className="nudgeTag">All Followers</div>
                  </div>
                  <div className="bottomPadding">
                    <div className="grid2">
                      <div>
                        <div class="fs-14 mb-4">Recipients:</div>
                        <div class="fs-14 fw-600">500</div>
                      </div>
                      <div>
                        <div class="fs-14 mb-4">Accepted:</div>
                        <div class="fs-14 fw-600">320/60%</div>
                      </div>
                      <div>
                        <div class="fs-14 mb-4">Declined:</div>
                        <div class="fs-14 fw-600">180/40%</div>
                      </div>
                      <div>
                        <div class="fs-14 mb-4">Cost:</div>
                        <div class="fs-14 fw-600">$10.00</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="merchantCard">
                  <div className="position-relative">
                    <img className="w-100" src={restaurantCard} alt="" />
                    <div className="freeAbsolute fs-16 fw-700">Free Drink</div>
                    <div className="nudgeTag">All Followers</div>
                  </div>
                  <div className="bottomPadding">
                    <div className="grid2">
                      <div>
                        <div class="fs-14 mb-4">Recipients:</div>
                        <div class="fs-14 fw-600">500</div>
                      </div>
                      <div>
                        <div class="fs-14 mb-4">Accepted:</div>
                        <div class="fs-14 fw-600">320/60%</div>
                      </div>
                      <div>
                        <div class="fs-14 mb-4">Declined:</div>
                        <div class="fs-14 fw-600">180/40%</div>
                      </div>
                      <div>
                        <div class="fs-14 mb-4">Cost:</div>
                        <div class="fs-14 fw-600">$10.00</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="merchantCard">
                  <div className="position-relative">
                    <img className="w-100" src={restaurantCard} alt="" />
                    <div className="freeAbsolute fs-16 fw-700">Free Drink</div>
                    <div className="nudgeTag">All Followers</div>
                  </div>
                  <div className="bottomPadding">
                    <div className="grid2">
                      <div>
                        <div class="fs-14 mb-4">Recipients:</div>
                        <div class="fs-14 fw-600">500</div>
                      </div>
                      <div>
                        <div class="fs-14 mb-4">Accepted:</div>
                        <div class="fs-14 fw-600">320/60%</div>
                      </div>
                      <div>
                        <div class="fs-14 mb-4">Declined:</div>
                        <div class="fs-14 fw-600">180/40%</div>
                      </div>
                      <div>
                        <div class="fs-14 mb-4">Cost:</div>
                        <div class="fs-14 fw-600">$10.00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default MerchantDetails;
