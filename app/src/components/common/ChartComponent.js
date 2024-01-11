import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { ToggleButton, OverlayTrigger, Popover, Card } from "react-bootstrap";

const ChartComponent = ({
  samplePrediction,
  originalData,
  customPrediction,
  showCustomPrediction,
  setShowCustomPrediction,
  predictor,
  response,
}) => {
  const [showScatterPlot, setShowScatterPlot] = useState(true);
  const [showSamplePrediction, setShowSamplePrediction] = useState(true);
  const [combinedData, setCombinedData] = useState(null);
  const [customSeries, setCustomSeries] = useState(null);

  const generateSeries = (headers) => {
    let genSeries = {};
    headers.forEach((header, i) => {
      if (header === "Original Data") {
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
  };

  useEffect(() => {
    const updatedCombinedData = getChartData(
      showScatterPlot,
      showSamplePrediction,
      showCustomPrediction
    );
    let headers = updatedCombinedData[0];
    generateSeries(headers);

    setCombinedData(updatedCombinedData);
  }, [showScatterPlot, showSamplePrediction, showCustomPrediction]);

  const scatterData = originalData;

  const samplePredictionData = samplePrediction;

  const customPredictionData = customPrediction
    ? customPrediction
    : samplePrediction;

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
    let headers = ["x"];

    if (showScatterPlot) headers.push("Original Data");
    if (showSamplePrediction) headers.push("Sample Prediction");
    if (showCustomPrediction) headers.push("Custom Prediction");

    if (!showScatterPlot && !showSamplePrediction && !showCustomPrediction) {
      headers = ["x", "Original Data"];
      let defaultRow = [0, 0];
      return [headers, defaultRow];
    }

    let data = [headers];

    const allXValues = new Set([
      ...scatterData.map((item) => item[0]),
      ...samplePredictionData.map((item) => item[0]),
      ...customPredictionData.map((item) => item[0]),
    ]);

    const sortedXValues = Array.from(allXValues).sort((a, b) => a - b);

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
    <Card style={{ height: "70vh" }}>
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div
            style={{
              margin: "mt-6",
            }}
          >
            <ToggleButton
              id="toggle-scatter"
              type="checkbox"
              variant="outline-primary"
              checked={showScatterPlot}
              onChange={(e) => setShowScatterPlot(e.currentTarget.checked)}
              style={{ margin: "10px" }}
            >
              {showScatterPlot ? "Hide Original Data" : "Show Original Data"}
            </ToggleButton>
            <ToggleButton
              id="toggle-sample-prediction"
              type="checkbox"
              variant="outline-secondary"
              checked={showSamplePrediction}
              onChange={(e) => setShowSamplePrediction(e.currentTarget.checked)}
              style={{ margin: "10px" }}
            >
              {showSamplePrediction
                ? "Hide Sample Prediction"
                : "Show Sample Prediction"}
            </ToggleButton>

            {customPrediction ? (
              <ToggleButton
                id="toggle-custom-prediction"
                type="checkbox"
                variant="outline-success"
                checked={showCustomPrediction}
                disabled={false}
                onChange={(e) =>
                  setShowCustomPrediction(e.currentTarget.checked)
                }
                style={{ margin: "10px" }}
              >
                {showCustomPrediction
                  ? "Hide Custom Prediction"
                  : "Show Custom Prediction"}
              </ToggleButton>
            ) : (
              <OverlayTrigger
                placement="right"
                trigger="hover"
                overlay={
                  <Popover id={`popover-positioned-right`}>
                    <Popover.Header as="h3">{`Set some custom parameters first!`}</Popover.Header>
                    <Popover.Body>
                      Use the <strong>Set Custom Parameters</strong> section
                    </Popover.Body>
                  </Popover>
                }
              >
                <span>
                  <ToggleButton
                    id="toggle-custom-prediction"
                    type="checkbox"
                    variant="outline-success"
                    checked={showCustomPrediction}
                    disabled={true}
                    onChange={(e) =>
                      setShowCustomPrediction(e.currentTarget.checked)
                    }
                    style={{ margin: "10px" }}
                  >
                    {showCustomPrediction
                      ? "Hide Custom Prediction"
                      : "Show Custom Prediction"}
                  </ToggleButton>
                </span>
              </OverlayTrigger>
            )}
          </div>
          <div style={{ flexGrow: 1, width: "100%", height: "100%" }}>
            <Chart
              width="100%"
              height="100%"
              chartType="ComboChart"
              loader={<div>Loading Chart</div>}
              data={combinedData}
              options={{
                title: `${predictor} vs ${response}`,
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
        </div>
      </Card.Body>
    </Card>
  );
};

export default ChartComponent;
