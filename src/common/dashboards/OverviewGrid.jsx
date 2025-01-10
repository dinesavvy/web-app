import React from "react";
import PropTypes from "prop-types";
import circleinfo from "../../assets/images/circleinfo.svg";

const MerchantCard = ({ count, trend,value }) => {
  return (
    <>
      <div className="circleinfo mb-10">
        <img src={circleinfo} className="circleAbsolute" alt="" />
        <div className="fs-34 fw-700 z1">{count}</div>
        <div className="fs-14 z1">{value}</div>
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
const OverviewGrid = ({ analyticsDetailsSelector }) => {
  const merchantData = [
    { 
        count: analyticsDetailsSelector?.data?.data?.merchantCount, 
        trend: `${analyticsDetailsSelector?.data?.data?.trendMerchantCount}%`,
        value: "Merchants" 
    },
    { 
        count: analyticsDetailsSelector?.data?.data?.supplierCount, 
        trend: `${analyticsDetailsSelector?.data?.data?.trendSupplierCount}%`,
        value: "Suppliers" 
    },
    { 
        count: analyticsDetailsSelector?.data?.data?.brandCount, 
        trend: `${analyticsDetailsSelector?.data?.data?.trendBrandCount}%`,
        value: "Brands" 
    },
    { 
        count: analyticsDetailsSelector?.data?.data?.distributorCount, 
        trend: `${analyticsDetailsSelector?.data?.data?.trendDistributorCount}%`,
        value: "Distributors" 
    },
];


  return (
    <div className="card d-grid gap-20 overviewGrid2">
      {merchantData.map((data, index) => (
        <div key={index + 1}>
          <MerchantCard key={index} count={data.count} trend={data.trend} value = {data?.value}/>
        </div>
      ))}
    </div>
  );
};

OverviewGrid.propTypes = {
  data: PropTypes.array,
};

export default OverviewGrid;
