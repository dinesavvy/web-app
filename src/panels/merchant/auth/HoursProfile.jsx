import React from "react";
import pdfIcon from "../../../assets/images/pdfIcon.svg";
import btnArrow from "../../../assets/images/btnArrow.svg";

const HoursProfile = () => {
  return (
    <>
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
    </>
  );
};

export default HoursProfile;
