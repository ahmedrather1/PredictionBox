import React from "react";
import { Chart } from "react-google-charts";
import { Card } from "react-bootstrap";

const PartialRegressionsChartComponent = ({ x, y, predictor }) => {
  if (!x || !y || x.length !== y.length) {
    return <div>Invalid data provided</div>;
  }
  const chartData = [
    ["x", "y"],
    ...x.map((xPoint, index) => [xPoint, y[index]]),
  ];

  const options = {
    title: predictor,
    hAxis: {
      title: "X",
    },
    vAxis: {
      title: "Y",
    },
    series: {
      1: { curveType: "function" },
    },
  };

  return (
    <Card style={{ height: "76vh" }}>
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
            data={chartData}
            options={options}
            loader={<div>Loading Chart</div>}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default PartialRegressionsChartComponent;
