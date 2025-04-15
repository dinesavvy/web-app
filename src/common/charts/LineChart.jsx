import React from "react"
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = ({ labels, datas, className,businessDashBoardSelector,tempArray,nudges,promotion }) => {

  const data = {
    labels,
    datasets: [
      {
        label: nudges ? "Nudges" : (promotion ? "Promotions" : "Followers"),
        data:datas,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    // scales: {
    //   x: { display: false },
    //   y: { display: false },
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

export default LineChart;
