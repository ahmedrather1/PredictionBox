import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { ToggleButton } from "react-bootstrap";

const ChartComponent = ({ bestPrediction, originalData }) => {
  // State for toggling the visibility
  const [showScatterPlot, setShowScatterPlot] = useState(true);
  const [showBestPrediction, setShowBestPrediction] = useState(true);
  const [showCustomPrediction, setShowCustomPrediction] = useState(false);
  const [combinedData, setCombinedData] = useState(null);
  const [customSeries, setCustomSeries] = useState(null);

  const generateSeries = (headers) => {
    let genSeries = {};
    headers.forEach((header, i) => {
      if (header === "Scatter") {
        console.log("got here");
        genSeries[i - 1] = {
          ...chartDataSets.scatter.options,
          type: "scatter",
        };
      } else if (header === "Best Prediction") {
        genSeries[i - 1] = {
          ...chartDataSets.bestPrediction.options,
          type: "line",
        };
      } else if (header === "Custom Prediction") {
        genSeries[i - 1] = {
          ...chartDataSets.customPrediction.options,
          type: "line",
        };
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

  const scatterData = originalData;

  const bestPredictionData = bestPrediction;

  const customPredictionData = bestPrediction;

  // Chart data and options logic here
  const chartDataSets = {
    scatter: {
      type: "scatter",
      options: {
        pointSize: 1,
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
    console.log(
      "SCATTER XVALS",
      scatterData.map((item) => item[0])
    );
    console.log(
      "BEST PREDICTION XVALS",
      bestPredictionData.map((item) => item[0])
    );

    console.log("allXValues", allXValues);
    // Convert the Set to an array and sort it
    const sortedXValues = Array.from(allXValues).sort((a, b) => a - b);
    console.log("sortedXValues", sortedXValues);

    console.log("DATASIZE", data.length);

    sortedXValues.forEach((x) => {
      let row = [x];
      if (showScatterPlot) row.push(null);
      if (showBestPrediction)
        row.push(bestPredictionData.find((item) => item[0] === x)?.[1] ?? null);
      if (showCustomPrediction)
        row.push(
          customPredictionData.find((item) => item[0] === x)?.[1] ?? null
        );
      data.push(row);
    });

    if (showScatterPlot) {
      sortedXValues.forEach((targetX) => {
        let targetPoints = scatterData.filter((item) => item[0] === targetX);
        targetPoints.forEach((targetPoint) => {
          let row = [targetX];
          row.push(targetPoint[1]);
          if (showBestPrediction) row.push(null);
          if (showCustomPrediction) row.push(null);
          data.push(row);
        });
      });
    }

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
          interpolateNulls: true,
        }}
      />
    </div>
  );
};

export default ChartComponent;
