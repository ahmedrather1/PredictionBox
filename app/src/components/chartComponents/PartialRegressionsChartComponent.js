import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const PartialRegressionsChartComponent = ({
  raw,
  regressed,
  response,
  predictorsAccountedFor,
  predictor,
  modelType,
}) => {
  const [combinedData, setCombinedData] = useState(null);
  const [customSeries, setCustomSeries] = useState(null);
  const [xTitle, setXtitle] = useState("");
  const [yTitle, setYtitle] = useState("");
  const [title, setTitle] = useState("");

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
    setTitles();
    const updatedCombinedData = getChartData();
    let headers = updatedCombinedData[0];
    generateSeries(headers);

    setCombinedData(updatedCombinedData);
  }, [predictor, raw, regressed]);

  const chartDataSets = {
    scatter: {
      type: "scatter",
      options: {
        pointSize: 1,
        color: "white",
      },
    },
    samplePrediction: {
      type: "line",
      options: {
        lineWidth: 2,
        color: "#2596be",
      },
    },
  };

  const setTitles = () => {
    let controlledPredictors = "";
    predictorsAccountedFor.forEach((predictor) => {
      controlledPredictors += predictor + " & ";
    });
    controlledPredictors = controlledPredictors.slice(0, -2);
    let titleX = predictor + " | " + controlledPredictors;
    let titleY = response + " | " + controlledPredictors;

    let mainTitle =
      "Partial Regression Plot for " +
      response +
      " and " +
      predictor +
      " controlling for " +
      controlledPredictors;

    if (modelType === "custom") {
      mainTitle = "Custom Alpha: " + mainTitle;
    }

    if (modelType === "standard") {
      mainTitle = "Cross Validated Alpha: " + mainTitle;
    }

    setXtitle(titleX);
    setYtitle(titleY);
    setTitle(mainTitle);
    setXtitle(titleX);
    setYtitle(titleY);
  };

  const getChartData = () => {
    let headers = [xTitle];
    console.log("in getchartdata ");

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

    return data;
  };

  return (
    <div style={{ flexGrow: 1, width: "100%", height: "100%" }}>
      <Chart
        width="100%"
        height="100%"
        chartType="ComboChart"
        loader={<div>Loading Chart</div>}
        data={combinedData}
        options={{
          title: `${title}`,
          titleTextStyle: {
            color: "#2596be",
            fontSize: title.length > 100 ? 20 : 30,
            fontName: "Arial",
            bold: true,
            italic: false,
          },
          backgroundColor: "#343434",
          series: customSeries,
          hAxis: {
            title: xTitle,
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
            title: yTitle,
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
            gridlines: { color: "#484848" },
          },
          legend: {
            textStyle: {
              color: 'fff', // Here you change the legend text color
            }
          },
          interpolateNulls: true,
        }}
      />
    </div>
  );
};

export default PartialRegressionsChartComponent;
