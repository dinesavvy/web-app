import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import PropTypes from "prop-types";
import moment from "moment";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const AreaChart = ({
  labels,
  datas,
  topColor,
  bottomColor,
  borderColor,
  className,
  merchantPerformanceAnalyticsDetailsSelector
}) => {


  const sortedData = merchantPerformanceAnalyticsDetailsSelector
  // ? [...merchantPerformanceAnalyticsDetailsSelector].sort((a, b) => new Date(a._id) - new Date(b._id))
  // : [];
  // // Extract labels and data points
  // const labels = sortedData?.map((item) => moment(item?._id).format('DD HH:mm'));
  // const datas = sortedData?.map((item) => item.value);

  // Sample data
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Habitual Users",
        data: datas,
        fill: true, // Fill the area under the line
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, topColor); // Darker color at the top
          gradient.addColorStop(1, bottomColor); // Lighter color at the bottom
          return gradient;
        },
        borderColor: borderColor, // Blue border
        borderWidth: 2,
        tension: 0.4, // Smooth the line
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
        enabled: true, // Disable tooltips
      },
    },
    scales: {
      x: {
        title: {
          display: true,
        },
      },
      y: {
        display: false,
        title: {
          display: false,
        },
      },
    },
  };

  return <Line data={data} options={options} className={className} />;
};

AreaChart.propTypes = {
  labels: PropTypes.array,
  datas: PropTypes.array,
  className: PropTypes.string,
  topColor: PropTypes.any,
  bottomColor: PropTypes.any,
  borderColor: PropTypes.any,
};
export default AreaChart;
