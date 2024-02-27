import React from "react";
import PartialRegressionsChartComponent from "../chartComponents/PartialRegressionsChartComponent";
import { Card, Button } from "react-bootstrap";

const PartialRegressionsCharts = ({
  partialRegressions,
  currentPage,
  chartsPerPage,
  response,
  variant,
  showCustomModel,
  setShowCustomModel,
}) => {
  const handleToggleCustomModel = () => {
    setShowCustomModel((shown) => !shown);
  };

  return (
    <>
      <Card style={{ height: "76vh" }}>
        <Card.Body
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "auto",
          }}
        >
          {variant === "RIDGE" && (
            <div style={{ textAlign: "center", padding: "10px 0" }}>
              <Button
                variant={showCustomModel ? "outline-primary" : "primary"}
                onClick={handleToggleCustomModel}
              >
                {showCustomModel ? "Hide Custom Model" : "Show Custom Model"}
              </Button>
            </div>
          )}
          {Object.keys(partialRegressions)
            .slice(currentPage, currentPage + chartsPerPage)
            .map((key) => {
              let predictorsAccountedFor = Object.keys(
                partialRegressions
              ).filter((item) => item !== key);
              const raw = partialRegressions[key]["raw"];
              const regressed = partialRegressions[key]["regressed"];
              return (
                <PartialRegressionsChartComponent
                  raw={raw}
                  regressed={regressed}
                  response={response}
                  predictorsAccountedFor={predictorsAccountedFor}
                  predictor={key}
                />
              );
            })}
        </Card.Body>
      </Card>
    </>
  );
};

export default PartialRegressionsCharts;
