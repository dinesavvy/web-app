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

const AreaChartStatic = ({
  labels,
  datas,
  topColor,
  bottomColor,
  borderColor,
  className,
  activeTab,
}) => {

  // Define labels conditionally based on activeTab
  let yAxisLabels = [];
  let xAxisLabels = [];
  if (activeTab === "1D") {
    yAxisLabels = ["9:00", "10:00", "11:00", "12:00", "1:00", "2:00"];
    xAxisLabels = ["0", "20", "40", "60", "80", "100","120"];
  } else {
    yAxisLabels = labels; // Default to provided labels
    xAxisLabels = datas.map((_, i) => i + 1); // Default x-axis labels as index
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Habitual Users",
        data: datas,
        fill: true,
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
          gradient.addColorStop(0, topColor);
          gradient.addColorStop(1, bottomColor);
          return gradient;
        },
        borderColor: borderColor,
        borderWidth: 2,
        tension: 0.4,
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
        enabled: true,
        mode: "nearest",
        intersect: false,
        label: function (context) {
          const label = context.dataset.label || '';
          const value = context.raw;
          return ` ${label}: ${value}`;
        }
      },
    },
    // scales: {
    //   x: {
    //     title: {
    //       display: true,
    //     },
        
    //     // ticks: {
    //     //   callback: function (value, index) {
    //     //     return yAxisLabels[index];
    //     //   },
    //     // },
        
    //   },
    //   y: {
    //     ticks: {
    //       display: false,
    //     },
    //     // ticks: {
    //     //   callback: function (value, index) {
    //     //     return xAxisLabels[index];
    //     //   },
    //     // },
    //   },
    // },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time", // or whatever label you want
        },
        ticks: {
          autoSkip: false, // show all labels even if crowded
        },
        grid: {
          display: true, // optional: improve visual
        },
      },
      y: {
        display: true,
        title: {
          display: false,
        },
        min: 0,
        max: 100, // Add some buffer so you can see the 0 line clearly
      },
    },
    
  };

  return <Line data={data} options={options} className={className} />;
};

AreaChartStatic.propTypes = {
  labels: PropTypes.array,
  datas: PropTypes.array,
  className: PropTypes.string,
  topColor: PropTypes.any,
  bottomColor: PropTypes.any,
  borderColor: PropTypes.any,
  activeTab: PropTypes.string,
};

export default AreaChartStatic;
