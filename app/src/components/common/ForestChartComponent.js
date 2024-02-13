import React from "react";
import { Chart } from "react-google-charts";

const ForestPlotChart = () => {
  const data = [
    [
      { type: "string", label: "Variable" },
      { type: "number", label: "Estimate" },
      { id: "i0", type: "number", role: "interval" },
      { id: "i1", type: "number", role: "interval" },
    ],
    ["X1", 0.1, 0.01, 0.12], // [Variable, Estimate, Lower CI, Upper CI]
    ["X2", 0.3, 0.2, 0.4],
    ["X3", -0.2, -0.3, 0],
    // Add more data points as needed
  ];

  const options = {
    title: "Standardized Slope (ΔY/Δsd(X))",
    hAxis: {
      title: "Standardized Slope",
    },
    vAxis: {
      title: "Variables",
      minValue: -1,
      maxValue: 1,
    },
    legend: "none",
    series: {
      0: { type: "scatter", color: "red", pointSize: 5 },
    },
    intervals: { style: "bars", color: "black" },
    // Customize the intervals here as needed
    interval: {
      i0: { style: "bars", lineWidth: 2, barWidth: 0 },
      i1: { style: "bars", lineWidth: 2, barWidth: 0 },
    },
  };

  return (
    <Chart
      chartType="ScatterChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
      loader={<div>Loading Chart</div>}
    />
  );
};

export default ForestPlotChart;
