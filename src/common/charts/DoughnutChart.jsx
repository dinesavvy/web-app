// DoughnutChart.js
import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PropTypes from "prop-types";

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data,className,merchantPerformanceAnalyticsDetailsSelector }) => {

let totalNudgeAcceptCount = 0;
let totalNudgeSentCount = 0;

merchantPerformanceAnalyticsDetailsSelector?.data?.data?.nudgeData?.forEach(item => {
  totalNudgeAcceptCount += item.nudgeAcceptCount;
  totalNudgeSentCount += item.nudgeSentCount;
});

const percentage = merchantPerformanceAnalyticsDetailsSelector?.data?.data?.totalNudgeSentCount > 0
? ((merchantPerformanceAnalyticsDetailsSelector?.data?.data?.totalNudgeAcceptCount / merchantPerformanceAnalyticsDetailsSelector?.data?.data?.totalNudgeSentCount) * 100).toFixed(2)
: "0.00";

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "My Dataset",
        data: [merchantPerformanceAnalyticsDetailsSelector?.data?.data?.totalNudgeAcceptCount, merchantPerformanceAnalyticsDetailsSelector?.data?.data?.totalNudgeSentCount - merchantPerformanceAnalyticsDetailsSelector?.data?.data?.totalNudgeAcceptCount],
        backgroundColor: [
          "#005CDE", // Progress color
          "rgba(201, 203, 207, 0.6)", // Remaining color
        ],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const value = tooltipItem.raw;
            const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
            const percent = ((value / total) * 100).toFixed(2);
      
            const label = index === 0 ? 'Completed' : 'Remaining';
            return `${label}:  (${percent}%)`;
          }
        }
      }
    },
  };

  return (
    <div style={{ position: "relative", width: "50%", margin: "auto" }}>
      <Doughnut data={chartData} options={options} className={className} />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        {percentage}%
      </div>
    </div>
  );
};

DoughnutChart.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
};

export default DoughnutChart;
