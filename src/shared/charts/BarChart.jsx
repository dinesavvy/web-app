import { useState } from "react";
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

ChartJS.register(
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale
);

const BarChart = ({
  labels,
  datas,
  className,
  barThickness,
  borderSkipped,
  xDisplay,
  yDisplay,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: datas,
        backgroundColor: (context) => {
          const index = context.dataIndex;
          return index === hoveredIndex ? "blue" : "rgba(75, 192, 192, 0.2)";
        },
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: barThickness,
        borderRadius: 10,
        borderSkipped: borderSkipped,
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
            return `Value: ${tooltipItem.raw}`;
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
    scales: {
      x: {
        display: xDisplay,
      },
      y: {
        beginAtZero: true,
        display: yDisplay,
      },
    },
  };

  return <Bar data={data} options={options} className={className} />;
};

BarChart.propTypes = {
  labels: PropTypes.array,
  datas: PropTypes.array,
  className: PropTypes.string,
  barThickness: PropTypes.number,
  borderSkipped: PropTypes.any,
  xDisplay: PropTypes.bool,
  yDisplay: PropTypes.bool,
};

export default BarChart;
