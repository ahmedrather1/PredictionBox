import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap"; // Assuming you're using react-bootstrap
import CustomForm from "./CustomForm"; // Adjust the import path as needed

const MultipleParameterIndividualPredictionCard = ({
  onSubmit,
  schema,
  individualPrediction,
  response,
}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Get a Prediction</Card.Title>
        <Container>
          <Row>
            <CustomForm onSubmit={onSubmit} schema={schema} />
          </Row>
          <Row>
            {individualPrediction && (
              <div className="d-flex justify-content-center my-3">
                <Card className="mt-2">
                  <Card.Body>
                    <Card.Title style={{ fontSize: "12px" }}>
                      Your Model's Prediction
                    </Card.Title>
                    <Row>
                      {response + " = "}
                      {individualPrediction.predictedY}
                    </Row>
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
