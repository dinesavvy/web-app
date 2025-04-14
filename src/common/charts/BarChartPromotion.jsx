/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import PropTypes from "prop-types";
import moment from "moment";

ChartJS.register(
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale
);

const BarChartProtion = ({
  labels,
  datas,
  className,
  barThickness,
  borderSkipped,
  xDisplay,
  yDisplay,
  isDatasMap,
  displayLegend,
  merchantPerformanceAnalyticsDetailsSelector,
  analyticsDetailsSelector,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const colors = [
    "#005CDE1A",
    "#005CDE",
    "rgba(255, 206, 86, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "#005CDE1A",
    "rgba(255, 99, 132, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(54, 162, 235, 0.6)",
  ];

  const newDataSet =
    isDatasMap === true
      ? Array.isArray(datas)  // Check if nextDatasets is an array
        ? datas.map((dataSet, index) => ({
            label: labels[index],
            data: [dataSet],
            backgroundColor: colors[index % colors.length],
            borderWidth: 1,
            borderRadius: 6,
            borderSkipped: borderSkipped,
          }))
        : [] // Fallback to an empty array if nextDatasets is not an array
      : [
          {
            label: "Target Count",
            data: Array.isArray(datas) ? datas : [], // Ensure datas is an array
            backgroundColor: (context) => {
              const index = context.dataIndex;
              return index === hoveredIndex
                ? "blue"
                : "rgba(75, 192, 192, 0.2)";
            },
            borderWidth: 1,
            borderRadius: 6,
            borderSkipped: borderSkipped,
          },
        ];

  const data = {
    labels: labels,
    datasets: newDataSet,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: displayLegend,
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            // Display the x-axis label for the hovered bar
            const dataset = context[0]?.dataset; // Current dataset
            const dataIndex = context[0]?.dataIndex; // Index of the hovered bar

            if (dataset && dataIndex != null) {
              return dataset.label; // Show the dataset label as the title
            }
          },
          label: function (context) {
            // Display the label and data for the hovered bar
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    onHover: (event, chartElement) => {
      if (chartElement.length) {
        const index = chartElement[0].index;
        setHoveredIndex(index);
      } else {
        setHoveredIndex(null);
      }
    },
    // scales: {
    //   x: {
    //     display: xDisplay,
    //     stacked: false, // Set to false to allow spacing
    //   },
    //   y: {
    //     beginAtZero: true,
    //     display: yDisplay,
    //   },
    // },
    scales: {
      x: {
        display: xDisplay,
        stacked: false,
      },
      y: {
        beginAtZero: true,
        display: yDisplay,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20, // This sets tick intervals at every 20 units
          callback: function (value) {
            return value; // Optional: format the ticks if needed
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} className={className} />;
};

BarChartProtion.propTypes = {
  labels: PropTypes.array,
  datas: PropTypes.array,
  className: PropTypes.string,
  barThickness: PropTypes.number,
  borderSkipped: PropTypes.any,
  xDisplay: PropTypes.bool,
  yDisplay: PropTypes.bool,
  isDatasMap: PropTypes.bool,
  displayLegend: PropTypes.bool,
};

export default BarChartProtion;
