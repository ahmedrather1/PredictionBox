import React, { useState } from "react";
import { Chart } from "react-google-charts";
import { ToggleButton } from "react-bootstrap";

const ChartComponent = ({ bestPrediction }) => {
  // State for toggling the visibility
  const [showScatterPlot, setShowScatterPlot] = useState(true);
  const [showBestPrediction, setShowBestPrediction] = useState(false);
  const [showCustomPrediction, setShowCustomPrediction] = useState(false);

  // Sample data arrays (replace with your actual data)
  const scatterData = bestPrediction;

  const bestPredictionData = bestPrediction;

  const customPredictionData = bestPrediction;

  // Chart data and options logic here
  const chartDataSets = {
    scatter: {
      type: "scatter",
      data: showScatterPlot ? scatterData : null,
      options: {
        pointSize: 5,
        color: "blue",
      },
    },
    bestPrediction: {
      type: "line",
      data: showBestPrediction ? bestPredictionData : null,
      options: {
        lineWidth: 2,
        color: "red",
      },
    },
    customPrediction: {
      type: "line",
      data: showCustomPrediction ? customPredictionData : null,
      options: {
        lineWidth: 2,
        color: "green",
      },
    },
  };

  const getChartData = () => {
    // Start with the header row
    let data = [["x", "Scatter", "Best Prediction", "Custom Prediction"]];

    // Create a list of all the x-values from all datasets
    const allXValues = new Set([
      ...scatterData.slice(0).map((item) => item[0]),
      ...bestPredictionData.slice(0).map((item) => item[0]),
      ...customPredictionData.slice(0).map((item) => item[0]),
    ]);
    console.log("allXValues", allXValues);
    // Convert the Set to an array and sort it
    const sortedXValues = Array.from(allXValues).sort((a, b) => a - b);
    console.log("sortedXValues", sortedXValues);

    sortedXValues.forEach((x) => {
      const scatterY = scatterData.find((item) => item[0] === x)?.[1] ?? null;
      const bestPredictionY =
        bestPredictionData.find((item) => item[0] === x)?.[1] ?? null;
      const customPredictionY =
        customPredictionData.find((item) => item[0] === x)?.[1] ?? null;

      // Push a new row with the x-value and corresponding y-values
      data.push([
        x,
        scatterY !== null ? Number(scatterY) : null,
        bestPredictionY !== null ? Number(bestPredictionY) : null,
        customPredictionY !== null ? Number(customPredictionY) : null,
      ]);
    });

    // console.log("data", data);

    return data;
  };

  const combinedData = getChartData();

  return (
    <div>
      <ToggleButton
        id="toggle-scatter"
        type="checkbox"
        variant="outline-primary"
        checked={showScatterPlot}
        onChange={(e) => setShowScatterPlot(e.currentTarget.checked)}
      >
        Scatter Plot
      </ToggleButton>

      <ToggleButton
        id="toggle-best-prediction"
        type="checkbox"
        variant="outline-secondary"
        checked={showBestPrediction}
        onChange={(e) => setShowBestPrediction(e.currentTarget.checked)}
      >
        Best Prediction
      </ToggleButton>

      <ToggleButton
        id="toggle-custom-prediction"
        type="checkbox"
        variant="outline-success"
        checked={showCustomPrediction}
        onChange={(e) => setShowCustomPrediction(e.currentTarget.checked)}
      >
        Custom Prediction
      </ToggleButton>

      <Chart
        width={"600px"}
        height={"400px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={combinedData}
        options={{
          series: {
            // Series 0 - Scatter Plot
            0: chartDataSets.scatter.options,
            // Series 1 - Best Prediction
            1: chartDataSets.bestPrediction.options,
            // Series 2 - Custom Prediction
            2: chartDataSets.customPrediction.options,
          },
          hAxis: {
            title: "X Axis",
          },
          vAxis: {
            title: "Y Axis",
          },
        }}
      />
    </div>
  );
};

export default ChartComponent;
