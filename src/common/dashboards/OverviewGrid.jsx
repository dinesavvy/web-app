import React from "react";
import PropTypes from "prop-types";
import circleAbsolute2 from "../../assets/images/circleAbsolute2.gif";

const MerchantCard = ({ count, trend,value }) => {
  return (
    <>
      <div className="circleinfo mb-10">
        <img src={circleAbsolute2} className="circleAbsolute" alt="" />
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
//   const merchantData = [
//     { 
//         count: 256, 
//         trend:  "10%",
//         value: "Merchants" 
//     },
//     { 
//         count: 256, 
//         trend: "10%",
//         value: "Suppliers" 
//     },
//     { 
//         count: 256, 
//         trend: "10%",
//         value: "Brands" 
//     },
//     { 
//         count: 256, 
//         trend: "10%",
//         value: "Distributors" 
//     },
// ];
const merchantData = [
  { 
      count: analyticsDetailsSelector?.data?.data?.merchantCount?analyticsDetailsSelector?.data?.data?.merchantCount:0, 
      trend: `${analyticsDetailsSelector?.data?.data?.trendMerchantCount.toFixed(2)}%`?`${analyticsDetailsSelector?.data?.data?.trendMerchantCount.toFixed(2)}%`:"10%",
      value: "Merchants" 
  },
  { 
      count: analyticsDetailsSelector?.data?.data?.supplierCount?analyticsDetailsSelector?.data?.data?.supplierCount:0, 
      trend: `${analyticsDetailsSelector?.data?.data?.trendSupplierCount.toFixed(2)}%`?`${analyticsDetailsSelector?.data?.data?.trendSupplierCount.toFixed(2)}%`:"10%",
      value: "Suppliers" 
  },
  { 
      count: analyticsDetailsSelector?.data?.data?.brandCount?analyticsDetailsSelector?.data?.data?.brandCount:0, 
      trend: `${analyticsDetailsSelector?.data?.data?.trendBrandCount.toFixed(2)}%`?`${analyticsDetailsSelector?.data?.data?.trendBrandCount.toFixed(2)}%`:"10%",
      value: "Brands" 
  },
  { 
      count: analyticsDetailsSelector?.data?.data?.distributorCount?analyticsDetailsSelector?.data?.data?.distributorCount:0, 
      trend: `${analyticsDetailsSelector?.data?.data?.trendDistributorCount.toFixed(2)}%`?`${analyticsDetailsSelector?.data?.data?.trendDistributorCount.toFixed(2)}%`:"10%",
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
