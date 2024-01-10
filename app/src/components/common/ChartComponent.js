import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { ToggleButton } from "react-bootstrap";

const ChartComponent = ({
  samplePrediction,
  originalData,
  customPrediction,
  showCustomPrediction,
  setShowCustomPrediction,
  predictor,
  response,
}) => {
  // State for toggling the visibility
  const [showScatterPlot, setShowScatterPlot] = useState(true);
  const [showSamplePrediction, setShowSamplePrediction] = useState(true);
  const [combinedData, setCombinedData] = useState(null);
  const [customSeries, setCustomSeries] = useState(null);

  const generateSeries = (headers) => {
    let genSeries = {};
    headers.forEach((header, i) => {
      if (header === "Original Data") {
        console.log("got here");
        genSeries[i - 1] = {
          ...chartDataSets.scatter.options,
          type: "scatter",
        };
      } else if (header === "Sample Prediction") {
        genSeries[i - 1] = {
          ...chartDataSets.samplePrediction.options,
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
    console.log("------------------predictor------------------", predictor);
    console.log("------------------response------------------", response);

    const updatedCombinedData = getChartData(
      showScatterPlot,
      showSamplePrediction,
      showCustomPrediction
    );
    console.log("---------------", updatedCombinedData);
    let headers = updatedCombinedData[0];
    generateSeries(headers);

    setCombinedData(updatedCombinedData);
  }, [showScatterPlot, showSamplePrediction, showCustomPrediction]); // Re-run when toggles change

  const scatterData = originalData;

  const samplePredictionData = samplePrediction;

  const customPredictionData = customPrediction
    ? customPrediction
    : samplePrediction;

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
    samplePrediction: {
      type: "line",
      options: {
        lineWidth: 2,
        color: "red",
        visibleInLegend: showSamplePrediction,
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
    showSamplePrediction,
    showCustomPrediction
  ) => {
    // Start with the header row
    let headers = ["x"];

    if (showScatterPlot) headers.push("Original Data");
    if (showSamplePrediction) headers.push("Sample Prediction");
    if (showCustomPrediction) headers.push("Custom Prediction");

    if (!showScatterPlot && !showSamplePrediction && !showCustomPrediction) {
      headers = ["x", "Original Data"];
      let defaultRow = [0, 0];
      return [headers, defaultRow]; // Return only headers to display an empty chart
    }

    let data = [headers];

    // Create a list of all the x-values from all datasets
    const allXValues = new Set([
      ...scatterData.map((item) => item[0]),
      ...samplePredictionData.map((item) => item[0]),
      ...customPredictionData.map((item) => item[0]),
    ]);
    console.log(
      "SCATTER XVALS",
      scatterData.map((item) => item[0])
    );
    console.log(
      "BEST PREDICTION XVALS",
      samplePredictionData.map((item) => item[0])
    );

    console.log("allXValues", allXValues);
    // Convert the Set to an array and sort it
    const sortedXValues = Array.from(allXValues).sort((a, b) => a - b);
    console.log("sortedXValues", sortedXValues);

    console.log("DATASIZE", data.length);

    sortedXValues.forEach((x) => {
      let row = [x];
      if (showScatterPlot) row.push(null);
      if (showSamplePrediction)
        row.push(
          samplePredictionData.find((item) => item[0] === x)?.[1] ?? null
        );
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
          if (showSamplePrediction) row.push(null);
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
        Original Data
      </ToggleButton>

      <ToggleButton
        id="toggle-sample-prediction"
        type="checkbox"
        variant="outline-secondary"
        checked={showSamplePrediction}
        onChange={(e) => setShowSamplePrediction(e.currentTarget.checked)}
      >
        Sample Prediction
      </ToggleButton>

      <ToggleButton
        id="toggle-custom-prediction"
        type="checkbox"
        variant="outline-success"
        checked={showCustomPrediction}
        disabled={customPrediction ? false : true}
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
            title: predictor,
          },
          vAxis: {
            title: response,
          },
          interpolateNulls: true,
        }}
      />
    </div>
  );
};

export default ChartComponent;
