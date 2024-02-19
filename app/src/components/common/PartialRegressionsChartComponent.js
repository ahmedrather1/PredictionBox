import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { ToggleButton, OverlayTrigger, Popover, Card } from "react-bootstrap";

const PartialRegressionsChartComponent = ({
  raw,
  regressed,
  response,
  xtitle,
}) => {
  const [combinedData, setCombinedData] = useState(null);
  const [customSeries, setCustomSeries] = useState(null);

  const generateSeries = (headers) => {
    let genSeries = {};
    headers.forEach((header, i) => {
      if (header === "Raw") {
        genSeries[i - 1] = {
          ...chartDataSets.scatter.options,
          type: "scatter",
        };
      } else if (header === "Regressed") {
        genSeries[i - 1] = {
          ...chartDataSets.samplePrediction.options,
          type: "line",
        };
      }
    });
    setCustomSeries(genSeries);
  };

  useEffect(() => {
    const updatedCombinedData = getChartData();
    let headers = updatedCombinedData[0];
    generateSeries(headers);

    setCombinedData(updatedCombinedData);
  }, []);

  const chartDataSets = {
    scatter: {
      type: "scatter",
      options: {
        pointSize: 1,
        color: "blue",
      },
    },
    samplePrediction: {
      type: "line",
      options: {
        lineWidth: 2,
        color: "red",
      },
    },
  };

  const getChartData = () => {
    let headers = [xtitle];

    headers.push("Raw");
    headers.push("Regressed");

    let data = [headers];

    const allXValues = new Set([...raw.x, ...regressed.x]);

    const sortedXValues = Array.from(allXValues).sort((a, b) => a - b);

    sortedXValues.forEach((targetX) => {
      let row = [targetX];
      row.push(null);
      let regressedIndex = regressed.x.findIndex((item) => item === targetX);
      if (regressedIndex !== -1) {
        row.push(regressed.y[regressedIndex]);
        data.push(row);
      }
    });

    console.log("---------chartdata regressed--------", data);

    sortedXValues.forEach((targetX) => {
      let targetIndexes = [];

      raw.x.forEach((xval, index) => {
        if (xval === targetX) {
          targetIndexes.push(index);
        }
      });

      targetIndexes.forEach((index) => {
        let row = [targetX];
        row.push(raw.y[index]);
        row.push(null);
        data.push(row);
      });
    });

    console.log("---------chartdata raw--------", data);

    return data;
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
            width="100%"
            height="100%"
            chartType="ComboChart"
            loader={<div>Loading Chart</div>}
            data={combinedData}
            options={{
              title: `${response}`,
              titleTextStyle: {
                color: "black",
                fontSize: 20,
                fontName: "Arial",
                bold: true,
                italic: false,
              },
              series: customSeries,
              hAxis: {
                title: xtitle,
              },
              vAxis: {
                title: response,
              },
              interpolateNulls: true,
            }}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default PartialRegressionsChartComponent;
