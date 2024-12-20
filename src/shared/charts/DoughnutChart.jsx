// DoughnutChart.js
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PropTypes from "prop-types";

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data, className }) => {
  const percentage = ((data?.progress / data?.total) * 100).toFixed(2);
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "My Dataset",
        data: [data?.progress, data?.total - data?.progress],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Progress color
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
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
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
