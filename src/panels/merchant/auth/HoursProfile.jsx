import moment from "moment";
import React from "react";
// import pdfIcon from "../../../assets/images/pdfIcon.svg";
// import btnArrow from "../../../assets/images/btnArrow.svg";

const HoursProfile = ({ getProfileDetailsSelector }) => {

  const daysOfWeekMap = {
    SUN: "Sunday",
    MON: "Monday",
    TUE: "Tuesday",
    WED: "Wednesday",
    THU: "Thursday",
    FRI: "Friday",
    SAT: "Saturday",
  };


  // const groupedSchedule = getProfileDetailsSelector?.data?.data?.businessHours?.periods?.reduce((acc, item) => {
  //   if (!acc[item.dayOfWeek]) {
  //     acc[item.dayOfWeek] = [];
  //   }
  //   acc[item.dayOfWeek].push(
  //     `${moment(item.startLocalTime, "HH:mm:ss").format("h:mm A")} To ${moment(
  //       item.endLocalTime,
  //       "HH:mm:ss"
  //     ).format("h:mm A")}`
  //   );
  //   return acc;
  // }, {});
  const groupedSchedule =
  getProfileDetailsSelector?.data?.data?.businessHours?.periods?.reduce((acc, item) => {
    if (!acc[item.dayOfWeek]) {
      acc[item.dayOfWeek] = [];
    }
    acc[item.dayOfWeek].push(
      `${moment(item.startLocalTime, "HH:mm:ss").format("h:mm A")} To ${moment(
        item.endLocalTime,
        "HH:mm:ss"
      ).format("h:mm A")}`
    );
    return acc;
  }, {}) || {}; // Ensures groupedSchedule is always an object

  return (
    <>
      {/* <div>
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
      </div> */}
      {Object.entries(groupedSchedule).map(([day, times]) => (
      <div>
        <div className="d-flex align-center justify-between">
          <div className="grey fs-16">{daysOfWeekMap[day] || day}</div>
          <div>{times.join(" | ")}</div>
        </div>
        <div className="divider2"></div>
      </div>
    ))}
    </>
  );
};

export default HoursProfile;
