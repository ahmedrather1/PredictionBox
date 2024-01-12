import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();

  const redirectToKnnPage = () => {
    navigate("/knn"); // Use the path you want to redirect to
  };

  return (
    <Container fluid>
      <Row className="justify-content-md-center text-center">
        <Col xs={12}>
          <h1>ModelBox</h1>
          <p>A Beginner-Friendly Machine Learning Sandbox</p>
          <Button variant="primary" onClick={redirectToKnnPage}>
            Try the K-Nearest-Neighbors Model
          </Button>
        </Col>
      </Row>
      <Row>
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
  );
};

export default HomePage;
