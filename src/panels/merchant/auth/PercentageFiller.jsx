import React from "react";

const PercentageFiller = ({ percentage }) => {
  const strokeDasharray = 2 * Math.PI * 50; // Circumference of the circle
  const strokeDashoffset = strokeDasharray - (percentage / 100) * strokeDasharray;

  return (
    <div className="percentageFiller" >
      <svg
        className=""
        width="110"
        height="110"
        viewBox="0 0 110 110"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="55"
          cy="55"
          r="50"
          fill="none"
          stroke="#005CDE33"
          strokeWidth="10"
        />
        <circle
          cx="55"
          cy="55"
          r="50"
          fill="none"
          stroke="#005CDE"
          strokeWidth="10"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 55 55)"
        />
      </svg>
      <span className="absolutetext fs-24 fw-700">{percentage}%</span>
    </div>
  );
};

export default PercentageFiller;
