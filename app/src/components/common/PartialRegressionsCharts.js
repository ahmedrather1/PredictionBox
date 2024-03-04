import React, { useEffect } from "react";
import PartialRegressionsChartComponent from "../chartComponents/PartialRegressionsChartComponent";
import { Card, Button, OverlayTrigger, Popover } from "react-bootstrap";

const PartialRegressionsCharts = ({
  partialRegressions,
  currentPage,
  chartsPerPage,
  response,
  variant,
  alphaVal,
  showCustomModel,
  setShowCustomModel,
  modelType,
}) => {
  const handleToggleCustomModel = () => {
    setShowCustomModel((shown) => !shown);
  };

  const alphaValPopover = (
    <Popover id="popover-alphaVal-undefined">
      <Popover.Header as="h3">
        {"Set a custom alpha value first!"}
      </Popover.Header>
      <Popover.Body>
        Use the <strong>Choose your Alpha Value</strong> section to define an
        alpha value.
      </Popover.Body>
    </Popover>
  );

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
          {(variant === "RIDGE" || variant === "LASSO") && (
            <div style={{ textAlign: "center", padding: "10px 0" }}>
              <OverlayTrigger
                placement="right"
                trigger="hover"
                overlay={alphaVal === null ? alphaValPopover : <></>}
              >
                <span>
                  <Button
                    variant={
                      alphaVal === null
                        ? "outline-dark"
                        : showCustomModel
                        ? "outline-primary"
                        : "primary"
                    }
                    onClick={handleToggleCustomModel}
                    disabled={alphaVal === null}
                  >
                    {showCustomModel
                      ? "Hide Custom Model"
                      : "Show Custom Model"}
                  </Button>
                </span>
              </OverlayTrigger>
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
                  modelType={modelType}
                />
              );
            })}
        </Card.Body>
      </Card>
    </>
  );
};

export default PartialRegressionsCharts;
