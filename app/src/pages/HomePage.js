import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
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
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Row
          className="justify-content-md-center text-center mb-4"
          style={{ flex: "0 1 auto" }}
        >
          <Col
            xs={12}
            style={{ height: "45vh", backgroundColor: "#92C7CF" }}
            className="d-flex justify-content-center align-items-center"
          >
            <div className="d-flex flex-column align-items-center">
              <h1>
                <strong>ModelBox</strong>
              </h1>
              <p>A Beginner-Friendly Machine Learning Sandbox</p>
              <Button variant="primary" onClick={redirectToKnnPage}>
                Try the K-Nearest-Neighbors Model
              </Button>
            </div>
          </Col>
        </Row>
        <Row style={{ flex: "1" }}>
          <Col md={4} className="mb-4">
            <Card>
              {/* <Card.Img
      variant="top"
      src="path-to-your-ai-metadata-store-image.png"
    /> */}
              <Card.Body>
                <Card.Title>Sample Predictions</Card.Title>
                <Card.Text>Get sample predictions</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card>
              {/* <Card.Img
      variant="top"
      src="path-to-your-model-registry-image.png"
    /> */}
              <Card.Body>
                <Card.Title>Model Customization</Card.Title>
                <Card.Text>customize your model</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card>
              {/* <Card.Img
      variant="top"
      src="path-to-your-continuous-model-evaluation-image.png"
    /> */}
              <Card.Body>
                <Card.Title>More Models!</Card.Title>
                <Card.Text>
                  more models coming soon, SLR, MLR, Ridge, LASSO
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
