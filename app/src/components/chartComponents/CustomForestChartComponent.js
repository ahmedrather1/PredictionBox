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
    const headers = ["Variable", "Cross Validated Alpha"];
    if (showCustomCoefs) headers.push("Custom Alpha");
    generateSeries(headers);
    combineData(headers, coefs, showCustomCoefs, customcoefs);
  }, [showCoefs, showCustomCoefs, coefs, customcoefs]);

  const generateSeries = (headers) => {
    let genSeries = {};
    headers.forEach((header, i) => {
      if (header === "Cross Validated Alpha") {
        genSeries[i - 1] = {
          ...chartDataSets.coefs.options,
          type: "scatter",
        };
      } else if (header === "Custom Alpha") {
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
      const coefValue = coefs.find((coef) => coef[0] === variable)?.[1] || 0;
      let rowData = [variable, coefValue];

      if (showCustomCoefs) {
        const customCoefValue =
          customcoefs.find((coef) => coef[0] === variable)?.[1] || 0;
        rowData.push(customCoefValue);
      }
      console.log(rowData);
      data.push(rowData);
    });

    setCoefData(data);
  };

  const chartDataSets = {
    coefs: {
      type: "scatter",
      options: {
        pointSize: 5,
        color: "a955c2",
        visibleInLegend: showCoefs,
      },
    },
    customCoefs: {
      type: "scatter",
      options: {
        pointSize: 5,
        color: "2596be",
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
              style={{ 
                margin: "10px", 
                backgroundColor: showCustomCoefs ? "#2596be" : "transparent", 
                borderColor: "#2596be",
                color: showCustomCoefs ? "black" : "#2596be",  
             }}
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
                  <Popover.Header as="h3" style={{ backgroundColor: '#404040', color: '#fff' }}>{`Set a custom alpha value first!`}</Popover.Header>
                  <Popover.Body style={{ backgroundColor: '#555555', color: '#fff' }}>
                    Use the <strong>Choose your Alpha Value</strong> section
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
                  style={{ 
                    margin: "10px", 
                    backgroundColor: showCustomCoefs ? "#2596be" : "transparent", 
                    borderColor: "#2596be",
                    color: showCustomCoefs ? "black" : "#2596be",  
                 }}
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
              legend: {
                textStyle: {
                  color: 'fff', // Here you change the legend text color
                }
              },
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
