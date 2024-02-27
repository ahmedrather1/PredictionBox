import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { ToggleButton, OverlayTrigger, Popover, Card } from "react-bootstrap";

const CustomForestPlotChart = ({
  coefs,
  customcoefs,
  showCustomCoefs,
  setShowCustomCoefs,
}) => {
  const [showCoefs, setShowCoefs] = useState(true);
  const [coefData, setCoefData] = useState(null);
  const [customSeries, setCustomSeries] = useState(null);

  useEffect(() => {
    const headers = ["Variable", "Coefs"];
    if (showCustomCoefs) headers.push("CustomCoefs");
    generateSeries(headers);
    combineData(headers, coefs, showCustomCoefs, customcoefs);
  }, [showCoefs, showCustomCoefs, coefs, customcoefs]);

  const generateSeries = (headers) => {
    let genSeries = {};
    headers.forEach((header, i) => {
      if (header === "Coefs") {
        genSeries[i - 1] = {
          ...chartDataSets.coefs.options,
          type: "scatter",
        };
      } else if (header === "CustomCoefs") {
        genSeries[i - 1] = {
          ...chartDataSets.customCoefs.options,
          type: "scatter",
        };
      }
    });
    setCustomSeries(genSeries);
  };

  const combineData = (headers, coefs, showCustomCoefs, customcoefs) => {
    const data = [headers];
    const allVariables = new Set(coefs.map((item) => item[0]));
    if (showCustomCoefs) {
      customcoefs.forEach((item) => allVariables.add(item[0]));
    }

    allVariables.forEach((variable) => {
      const coefValue = coefs.find((coef) => coef[0] === variable)?.[1] || null;
      let rowData = [variable, coefValue];

      if (showCustomCoefs) {
        const customCoefValue =
          customcoefs.find((coef) => coef[0] === variable)?.[1] || null;
        rowData.push(customCoefValue);
      }

      data.push(rowData);
    });

    setCoefData(data);
  };

  const chartDataSets = {
    coefs: {
      type: "scatter",
      options: {
        pointSize: 5,
        color: "blue",
        visibleInLegend: showCoefs,
      },
    },
    customCoefs: {
      type: "scatter",
      options: {
        pointSize: 5,
        color: "green",
        visibleInLegend: showCustomCoefs,
      },
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px 0",
          }}
        >
          {customcoefs ? (
            <ToggleButton
              id="toggle-custom-coefs"
              type="checkbox"
              variant={showCustomCoefs ? "outline-success" : "success"}
              checked={showCustomCoefs}
              disabled={false}
              onChange={(e) => setShowCustomCoefs(e.currentTarget.checked)}
              style={{ margin: "10px" }}
            >
              {showCustomCoefs
                ? "Hide Custom Analysis"
                : "Show Custom Analysis"}
            </ToggleButton>
          ) : (
            <OverlayTrigger
              placement="right"
              trigger="hover"
              overlay={
                <Popover id={`popover-positioned-right`}>
                  <Popover.Header as="h3">{`Set a custom alpha value first!`}</Popover.Header>
                  <Popover.Body>
                    Use the <strong>Set Custom Parameters</strong> section
                  </Popover.Body>
                </Popover>
              }
            >
              <span>
                <ToggleButton
                  id="toggle-custom-coefs"
                  type="checkbox"
                  variant="outline-dark"
                  checked={showCustomCoefs}
                  disabled={true}
                  onChange={(e) => setShowCustomCoefs(e.currentTarget.checked)}
                  style={{ margin: "10px" }}
                >
                  {showCustomCoefs
                    ? "Hide Custom Analysis"
                    : "Show Custom Analysis"}
                </ToggleButton>
              </span>
            </OverlayTrigger>
          )}
        </div>
        <div style={{ flexGrow: 1, width: "100%", height: "100%" }}>
          <Chart
            chartType="ScatterChart"
            width="100%"
            height="400px"
            data={coefData}
            options={{
              title: "Comparison of Two Sets",
              hAxis: { title: "Variables" },
              vAxis: { title: "Estimates" },
              legend: "none",
              seriesType: "scatter",
              series: customSeries,
            }}
            loader={<div>Loading Chart</div>}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default CustomForestPlotChart;
