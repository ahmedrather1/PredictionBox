import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { ToggleButton } from "react-bootstrap";

const ChartComponent = ({ bestPrediction }) => {
  // State for toggling the visibility
  const [showScatterPlot, setShowScatterPlot] = useState(true);
  const [showBestPrediction, setShowBestPrediction] = useState(true);
  const [showCustomPrediction, setShowCustomPrediction] = useState(true);
  const [combinedData, setCombinedData] = useState(null);
  const [customSeries, setCustomSeries] = useState(null);

  const generateSeries = (headers) => {
    let genSeries = {};
    headers.forEach((header, i) => {
      if (header === "Scatter") {
        console.log("got here");
        genSeries[i - 1] = chartDataSets.scatter.options;
      } else if (header === "Best Prediction") {
        genSeries[i - 1] = chartDataSets.bestPrediction.options;
      } else if (header === "Custom Prediction") {
        genSeries[i - 1] = chartDataSets.customPrediction.options;
      }
    });
    setCustomSeries(genSeries);
    console.log("headers------------", headers);
    console.log("series------------", genSeries);
  };

  useEffect(() => {
    const updatedCombinedData = getChartData(
      showScatterPlot,
      showBestPrediction,
      showCustomPrediction
    );
    console.log("---------------", updatedCombinedData);
    let headers = updatedCombinedData[0];
    generateSeries(headers);

    setCombinedData(updatedCombinedData);
  }, [showScatterPlot, showBestPrediction, showCustomPrediction]); // Re-run when toggles change

  const scatterData = bestPrediction;

  const bestPredictionData = bestPrediction;

  const customPredictionData = bestPrediction;

  // Chart data and options logic here
  const chartDataSets = {
    scatter: {
      type: "scatter",
      options: {
        pointSize: 5,
        color: "blue",
        visibleInLegend: showScatterPlot,
      },
    },
    bestPrediction: {
      type: "line",
      options: {
        lineWidth: 2,
        color: "red",
        visibleInLegend: showBestPrediction,
      },
    },
    customPrediction: {
      type: "line",
      options: {
        lineWidth: 2,
        color: "green",
        visibleInLegend: showCustomPrediction,
      },
    },
  };

  const getChartData = (
    showScatterPlot,
    showBestPrediction,
    showCustomPrediction
  ) => {
    // Start with the header row
    let headers = ["x"];

    if (showScatterPlot) headers.push("Scatter");
    if (showBestPrediction) headers.push("Best Prediction");
    if (showCustomPrediction) headers.push("Custom Prediction");

    if (!showScatterPlot && !showBestPrediction && !showCustomPrediction) {
      headers = ["x", "Scatter"];
      let defaultRow = [0, 0];
      return [headers, defaultRow]; // Return only headers to display an empty chart
    }

    let data = [headers];

    // Create a list of all the x-values from all datasets
    const allXValues = new Set([
      ...scatterData.map((item) => item[0]),
      ...bestPredictionData.map((item) => item[0]),
      ...customPredictionData.map((item) => item[0]),
    ]);
    console.log("allXValues", allXValues);
    // Convert the Set to an array and sort it
    const sortedXValues = Array.from(allXValues).sort((a, b) => a - b);
    console.log("sortedXValues", sortedXValues);

    sortedXValues.forEach((x) => {
      let row = [x];
      if (showScatterPlot)
        row.push(scatterData.find((item) => item[0] === x)?.[1] ?? null);
      if (showBestPrediction)
        row.push(bestPredictionData.find((item) => item[0] === x)?.[1] ?? null);
      if (showCustomPrediction)
        row.push(
          customPredictionData.find((item) => item[0] === x)?.[1] ?? null
        );
      data.push(row);
    });

    return data;
  };

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
        chartType="ComboChart"
        loader={<div>Loading Chart</div>}
        data={combinedData}
        options={{
          series: customSeries,
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
