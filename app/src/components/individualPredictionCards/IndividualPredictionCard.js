import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import CustomForm from "../common/CustomForm";

const IndividualPredictionCard = ({
  onSubmit,
  schema,
  sampleIndividualPrediction,
  customIndividualPrediction,
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
            <Col xs={6}>
              {sampleIndividualPrediction && (
                <Card className="mt-2">
                  <Card.Body>
                    <Card.Title style={{ fontSize: "12px", color:"#2596be"}}>
                      Sample Model Prediction
                    </Card.Title>
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
                <Card className="mt-2">
                  <div style={{ justifyContent: "center" }}>
                    <Card.Body>
                      <Card.Title style={{ fontSize: "12px", color:"#a955c2" }}>
                        Custom Model Prediction
                      </Card.Title>
                      <Card.Text>
                        <Row>
                          {" X = "}
                          {customIndividualPrediction.xToPredict}
                        </Row>
                        <Row>
                          {" Y = "}
                          {customIndividualPrediction.predictedY}
                        </Row>
                      </Card.Text>
                    </Card.Body>
                  </div>
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
