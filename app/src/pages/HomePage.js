import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import linegraph from "../images/linegraph.png";
import gears from "../images/gears.png";
import laptop from "../images/laptop.png";

const HomePage = () => {
  const navigate = useNavigate();

  const redirectToKnnPage = () => {
    navigate("/knn"); // Use the path you want to redirect to
  };

  return (
    <>
      <Header />
      <Container
        fluid
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f2f2f2",
        }}
        className="mt-0 pt-0"
      >
        <Row
          className="justify-content-md-center text-center mb-4 mt-0"
          style={{ flex: "0 1 auto" }}
        >
          <Col
            xs={12}
            style={{ height: "45vh", backgroundColor: "#a4c3b2" }}
            className="d-flex justify-content-center align-items-center mt-0"
          >
            <div className="d-flex flex-column align-items-center">
              <h1>
                <strong>PredictionBox</strong>
              </h1>
              <p>A Beginner-Friendly Machine Learning Sandbox</p>
              <Button variant="primary" onClick={redirectToKnnPage}>
                Try the K-Nearest-Neighbors Model
              </Button>
            </div>
          </Col>
        </Row>
        <Row style={{ flex: "1" }} className="mt-2">
          <Col md={4} className="mb-4">
            <Card style={{ border: "none", backgroundColor: "transparent" }}>
              <Card.Img
                variant="top"
                src={linegraph}
                style={{
                  width: "150px",
                  height: "150px",
                  display: "block",
                  margin: "auto",
                }}
                className="mb-2"
              />
              <Card.Body>
                <Card.Title className="text-center">
                  <strong>Sample Predictions</strong>
                </Card.Title>
                <Card.Text className="text-center">
                  Upload your data and receive instant, insightful sample
                  predictions. Discover the hidden stories and potential in your
                  data through our predictive analysis.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card style={{ border: "none", backgroundColor: "transparent" }}>
              <Card.Img
                variant="top"
                src={gears}
                style={{
                  width: "150px",
                  height: "150px",
                  display: "block",
                  margin: "auto",
                }}
                className="mb-2"
              />
              <Card.Body>
                <Card.Title className="text-center">
                  <strong>Model Customization</strong>
                </Card.Title>
                <Card.Text className="text-center">
                  Fine-tune the parameters of your chosen model for a tailored
                  analysis experience. With our customizable options, you have
                  the flexibility to mold the analysis to fit your data's unique
                  narrative.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card style={{ border: "none", backgroundColor: "transparent" }}>
              <Card.Img
                variant="top"
                src={laptop}
                style={{
                  width: "150px",
                  height: "150px",
                  display: "block",
                  margin: "auto",
                }}
                className="mb-2"
              />
              <Card.Body>
                <Card.Title className="text-center">
                  <strong>More Models!</strong>
                </Card.Title>
                <Card.Text className="text-center">
                  Choose from a variety of models - KNN, SLR, MLR, Ridge, LASSO
                  - and dive deeper into your data's story. Not only can you use
                  these models for diverse insights, but you can also learn
                  about each one to better understand and interpret your
                  results.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="my-row">
          <Col md={12}></Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
