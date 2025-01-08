import React from "react";
import PropTypes from "prop-types";
import circleinfo from "../../assets/images/circleinfo.svg";

const MerchantCard = ({ count, trend }) => {
  return (
    <>
      <div className="circleinfo mb-10">
        <img src={circleinfo} className="circleAbsolute" alt="" />
        <div className="fs-34 fw-700 z1">{count}</div>
        <div className="fs-14 z1">Merchants</div>
      </div>
      <div className="trend">Trend {trend}</div>
    </>
  );
};

// Prop validation
MerchantCard.propTypes = {
  count: PropTypes.number.isRequired,
  trend: PropTypes.string.isRequired,
};

// eslint-disable-next-line no-unused-vars
const OverviewGrid = ({ data }) => {
  const merchantData = [
    { count: 256, trend: "10%" },
    { count: 256, trend: "10%" },
    { count: 256, trend: "10%" },
    { count: 256, trend: "10%" },
  ];

  return (
    <div className="card d-grid gap-20 overviewGrid2">
      {merchantData.map((data, index) => (
        <div key={index + 1}>
          <MerchantCard key={index} count={data.count} trend={data.trend} />
        </div>
      ))}
    </div>
  );
};

OverviewGrid.propTypes = {
  data: PropTypes.array,
};

export default OverviewGrid;
