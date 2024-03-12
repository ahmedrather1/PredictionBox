import React from "react";
import { Chart } from "react-google-charts";
import { Card } from "react-bootstrap";

const ForestPlotChart = ({ coefInfo }) => {
  const data = [
    [
      { type: "string", label: "Variable" },
      { type: "number", label: "Estimate" },
      { id: "i0", type: "number", role: "interval" },
      { id: "i1", type: "number", role: "interval" },
    ],
  ];

  coefInfo.forEach((element) => data.push(element));

  const options = {
    title: "Standardized Slope (ΔY/Δsd(X))",
    titleTextStyle: {
      color: "#2596be",
      fontSize: 30,
      fontName: "Arial",
      bold: true,
      italic: false,
    },
    backgroundColor: "#343434",

    hAxis: {
      title: "Variables",
      titleTextStyle: {
        color: "#2596be",
        fontSize: 18, 
        italic: true,
      },
      textStyle: {
        color: "#a955c2", 
        fontSize: 12, 
        fontName: "Arial", 
      },
      baselineColor: "transparent",
      gridlines: { color: "#484848" },
    },
    vAxis: {
      title: "Standardized Slope",
      minValue: -1,
      maxValue: 1,
      titleTextStyle: {
        color: "#2596be", 
        fontSize: 18, 
        italic: true, 
      },
      textStyle: {
        color: "#a955c2", 
        fontSize: 12, 
        fontName: "Arial", 
      },
      baselineColor: "white",
      gridlines: { color: "#484848" },
    },
    legend: "none",
    series: {
      0: { type: "scatter", color: "#a955c2", pointSize: 5 },
    },
    intervals: { style: "bars", color: "black" },
    interval: {
      i0: { style: "bars", lineWidth: 2, barWidth: 0, color: "#2596be",},
      i1: { style: "bars", lineWidth: 2, barWidth: 0, color: "#2596be", },
    },
  };

  return (
    <Card style={{ height: "60vh" }}>
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "auto",
        }}
      >
        <div style={{ flexGrow: 1, width: "100%", height: "100%" }}>
          <Chart
            chartType="ScatterChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
            loader={<div>Loading Chart</div>}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ForestPlotChart;
