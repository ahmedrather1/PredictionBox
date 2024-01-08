import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

function GraphComponent({ xValues, yValues }) {
  // Calculate step size for y-axis
  const yMax = Math.max(...yValues);
  const yMin = Math.min(...yValues);
  const yRange = yMax - yMin;
  const yStepSize = yRange / 10;

  // Calculate step size for x-axis
  const xMax = Math.max(...xValues);
  const xMin = Math.min(...xValues);
  const xRange = xMax - xMin;
  const xStepSize = xRange / 10;

  // Prepare the data for Chart.js
  const data = {
    labels: xValues,
    datasets: [
      {
        label: "Prediction",
        data: yValues,
        fill: false,
        backgroundColor: "red",
        borderColor: "red",
      },
    ],
  };

  // Options for the chart
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 10,

          callback: function (value) {
            return parseFloat(value.toFixed(2));
          },
        },
      },
      x: {
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 10,
          //   callback: function (value) {
          //     return parseFloat(value.toFixed(2));
          //   },
        },
      },
    },
    elements: {
      line: {
        borderColor: "#FF0000", // Set the line color to red
        borderWidth: 2, // Set the line width to be thin
        tension: 0.4, // Adjust for smoothness (0 is straight, 1 is very smooth)
      },
      point: {
        radius: 0, // Hide points on the line
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default GraphComponent;
