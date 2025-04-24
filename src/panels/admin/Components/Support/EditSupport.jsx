import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backButton from "../../../../assets/images/backButton.svg";
import editIcon from "../../../../assets/images/editIcon.svg";
import addTime from "../../../../assets/images/addTime.svg";
import minusTime from "../../../../assets/images/minusTime.svg";
import CustomSelect from "../CustomSelect";
import CustomSwitch from "../CustomSwitch";
import { TimePicker } from "antd";

const EditSupport = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const navigate = useNavigate();
  const [editDetail, setEditDetail] = useState(false);
  const [switchStates, setSwitchStates] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = false;
      return acc;
    }, {})
  );

  const handleToggle = (day) => {
    setSwitchStates((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const [dayData, setDayData] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = {
        enabled: false,
        slots: [{ from: "", to: "" }],
      };
      return acc;
    }, {})
  );

  const toggleDay = (day) => {
    setDayData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
        // Initialize with one slot if enabling for the first time
        slots: !prev[day].enabled ? [{ from: "", to: "" }] : [],
      },
    }));
  };

  const addSlot = (day) => {
    setDayData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { from: "", to: "" }],
      },
    }));
  };

  const removeSlot = (day, index) => {
    setDayData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <div className="dashboard">
      <div className="tabPadding mb-30">
        <div className="d-flex align-center justify-between gap-20  w-100">
          <div className="d-flex align-center gap-20  ">
            <img
              src={backButton}
              alt=""
              className="cursor-pointer backButton"
              onClick={() => navigate("/admin/support")}
            />
            <div>
              <div className="fs-24 fw-600 ">Jenny Wilson</div>
            </div>
          </div>
          {editDetail === false && (
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
            <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
              Business name
            </label>
            {editDetail === true ? (
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
            {editDetail === true ? (
              <input type="text" className="input" placeholder="Restaurant" />
            ) : (
              <div className="">Restaurant</div>
            )}
          </div>
          <div className="">
            <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
              Website link
            </label>
            {editDetail === true ? (
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
          <div>
            <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
              Phone number
            </label>
            {editDetail === true ? (
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
        </div>
      </div>
      <div className="tabPadding mb-30">
        <div className="fs-20 fw-600">Address</div>
        <div className="divider2"></div>
        <div className="inputGrid">
          <div>
            <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
              Country/Region
            </label>
            {editDetail === true ? (
              <CustomSelect options={["Option 1", "Option 2", "Option 3"]} />
            ) : (
              <div className="">India</div>
            )}
          </div>
          <div>
            <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
              State
            </label>
            {editDetail === true ? (
              <CustomSelect options={["Option 1", "Option 2", "Option 3"]} />
            ) : (
              <div className="">Kentucky</div>
            )}
          </div>
          <div>
            <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
              Street address
            </label>
            {editDetail === true ? (
              <input
                type="text"
                className="input"
                placeholder="4517 Street Ave. Manchester"
              />
            ) : (
              <div className="">4517 Street Ave. Manchester</div>
            )}
          </div>
          <div>
            <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
              City
            </label>
            {editDetail === true ? (
              <input type="text" className="input" placeholder="Washington" />
            ) : (
              <div className="">Washington</div>
            )}
          </div>

          <div>
            <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
              Postal Code
            </label>
            {editDetail === true ? (
              <input type="text" className="input" placeholder="39495" />
            ) : (
              <div className="">39495</div>
            )}
          </div>
        </div>
      </div>
      <div className="tabPadding mb-30">
        <div className="fs-20 fw-600 mb-20">Hours of operation</div>
        {!editDetail ? (
          <div>
            {daysOfWeek.map((day) => (
              <>
                <div key={day} className="d-flex align-center justify-between">
                  <div className="grey fs-16">{day}</div>
                  <div>{day === "Sunday" ? "Closed" : "9:00 AM To 11:30"}</div>
                </div>
                <div className="divider2"></div>
              </>
            ))}
          </div>
        ) : (
          <div className="overflow">
            {daysOfWeek.map((day) => (
              <>
                <div key={day} className="minw">
                  <div className="d-flex align-center justify-between">
                    <div className="grey fs-16">{day}</div>
                    <div className="d-flex align-center gap-16">
                      <CustomSwitch
                        isOn={!dayData[day].enabled}
                        onToggle={() => toggleDay(day)}
                      />
                      <div>Closed</div>
                    </div>
                  </div>

                  {dayData[day].enabled &&
                    dayData[day].slots.map((slot, index) => (
                      <div
                        key={index}
                        className="mt-10 d-flex align-end gap-10"
                      >
                        <div className="w-100">
                          <label className="fs-14 fw-500 mb-10">From</label>
                          <TimePicker className="customTime input" />
                        </div>
                        <div className="w-100">
                          <label className="fs-14 fw-500 mb-10">To</label>
                          <TimePicker className="customTime input" />
                        </div>
                        <div
                          className="addTime"
                          onClick={() => {
                            index === 0 ? addSlot(day) : removeSlot(day, index);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={index === 0 ? addTime : minusTime}
                            alt={
                              index === 0 ? "Add Time Slot" : "Remove Time Slot"
                            }
                          />
                        </div>
                      </div>
                    ))}
                </div>
                <div className="divider2"></div>
              </>
            ))}
          </div>
        )}
      </div>
      <div className="tabPadding mb-30">
        {/* <ImageGallery
          images={images}
          openImage={openImage}
          setOpenImage={setOpenImage}
          // galleryListSelector={galleryListSelector}
          activeTab={activeTab}
          addImageDataSelector={addImageDataSelector}
        /> */}
      </div>
      {editDetail && (
        <div className="d-flex align-center justify-end">
          <div className="btn w170" onClick={() => setEditDetail(false)}>
            Submit
          </div>
        </div>
      )}
    </div>
  );
};

export default EditSupport;
