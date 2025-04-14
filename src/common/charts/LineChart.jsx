import React from "react"
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = ({ labels, datas, className,businessDashBoardSelector,tempArray }) => {

  const data = {
    labels,
    datasets: [
      {
        label: "Line Chart Data",
        // data: datas?datas:tempArray,
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
    scales: {
      x: { display: true },
      y: { display: true },
    },
  };

  return <Line data={data} options={options} className={className} />;
};

export default LineChart;
