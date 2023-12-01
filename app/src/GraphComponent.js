import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

function GraphComponent({ xValues, yValues }) {
  // Prepare the data for Chart.js
  const data = {
    labels: xValues,
    datasets: [
      {
        label: "My Dataset",
        data: yValues,
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  // Options for the chart
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <Line data={data} options={options} />;
}

export default GraphComponent;
