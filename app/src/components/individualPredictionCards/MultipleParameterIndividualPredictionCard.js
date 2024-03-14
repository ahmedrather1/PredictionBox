import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import CustomForm from "../common/CustomForm";

const MultipleParameterIndividualPredictionCard = ({
  onSubmit,
  schema,
  individualPrediction,
  customPrediction,
  response,
  titles,
}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title
          style={{
            color: "#a955c2",
            fontSize: "26px",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          Get a Prediction
        </Card.Title>
        <Container>
          <Row>
            <CustomForm onSubmit={onSubmit} schema={schema} />
          </Row>
          <Row>
            {!isNaN(individualPrediction?.predictedY) && (
              <div className="d-flex justify-content-center my-3">
                <Card className="mt-2">
                  <Card.Body>
                    <Card.Title style={{ fontSize: "12px", color: "#2596be" }}>
                      {titles.standard}
                    </Card.Title>
                    {response + " = "}
                    {individualPrediction.predictedY}
                  </Card.Body>
                </Card>
              </div>
            )}
            {!isNaN(customPrediction?.predictedY) && (
              <div className="d-flex justify-content-center">
                <Card>
                  <Card.Body>
                    <Card.Title style={{ fontSize: "12px", color: "#a955c2" }}>
                      {titles.custom}
                    </Card.Title>
                    {response + " = "}
                    {customPrediction.predictedY}
                  </Card.Body>
                </Card>
              </div>
            )}
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default MultipleParameterIndividualPredictionCard;
