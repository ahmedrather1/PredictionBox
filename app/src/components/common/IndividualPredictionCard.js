import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap"; // Assuming you're using react-bootstrap
import CustomForm from "./CustomForm"; // Adjust the import path as needed

const IndividualPredictionCard = ({
  onSubmit,
  schema,
  sampleIndividualPrediction,
  customIndividualPrediction,
}) => {
  return (
    <Card>
      <Card.Title>Get a Prediction</Card.Title>
      <Card.Body>
        <Container>
          <Row>
            <CustomForm onSubmit={onSubmit} schema={schema} />
          </Row>
          <Row>
            <Col xs={6}>
              {sampleIndividualPrediction && (
                <Card>
                  <Card.Title>Sample Individual Prediction</Card.Title>
                  <Card.Body>
                    <Row>
                      {" X = "}
                      {sampleIndividualPrediction.xToPredict}
                    </Row>
                    <Row>
                      {" Y = "}
                      {sampleIndividualPrediction.predictedY}
                    </Row>
                  </Card.Body>
                </Card>
              )}
            </Col>
            <Col xs={6}>
              {customIndividualPrediction && (
                <Card>
                  <Card.Title>Custom Individual Prediction</Card.Title>
                  <Card.Body>
                    <Row>
                      {" X = "}
                      {customIndividualPrediction.xToPredict}
                    </Row>
                    <Row>
                      {" Y = "}
                      {customIndividualPrediction.predictedY}
                    </Row>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default IndividualPredictionCard;
