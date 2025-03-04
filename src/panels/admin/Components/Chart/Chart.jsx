import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = () => {
  const data = {
    labels: ["M", "T", "W", "T", "F", "S"], // Days of the week
    datasets: [
      {
        // label: "Followers",
        data: [5000, 6000, 7000, 8000, 6500, 5000], // Dynamic dataset
        // borderColor: "rgb(75, 192, 192)",
        // backgroundColor: "rgba(75, 192, 192, 0.2)",
        // tension: 0.4,
        // pointRadius: 6, // Ensure points are visible
        // pointHoverRadius: 8, // Make hover interaction better
        label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: true, // Ensure tooltip is enabled
        callbacks: {
          title: function () {
            return "Static Data"; // Custom static title
          },
          label: function () {
            return "Followers: 8,000"; // Always display static value
          },
        },
      },
    },
    hover: {
      mode: "nearest", // Ensure hover works on nearest point
      intersect: false, // Allow hovering without direct intersection
    },
  };

  return <Line data={data} options={options} />;
};

export default ChartComponent;
