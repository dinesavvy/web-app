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

const AreaChart = () => {
  // Sample data
  const data = {
    labels: ["M", "T", "W", "T", "F", "S"],
    datasets: [
      {
        label: "My Area Chart",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true, // Fill the area under the line
        backgroundColor: "rgba(0, 123, 255, 0.2)", // Light blue fill
        borderColor: "rgba(0, 123, 255, 1)", // Blue border
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

  return <Line data={data} options={options} className="w-100 mxh" />;
};

export default AreaChart;
