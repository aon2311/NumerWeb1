import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ result }) => {
  const data = {
    labels: result.map(item => `Iter ${item.iteration}`),
    datasets: [
      {
        label: 'Error',
        data: result.map(item => parseFloat(item.error)),
        borderColor: 'rgb(255, 115, 0)',
        backgroundColor: 'rgba(255, 115, 0, 0.5)',
        fill: false,
        tension: 0.1,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Error vs Iteration',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
