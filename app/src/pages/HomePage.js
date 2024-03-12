import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import linegraph from "../images/linegraph.png";
import gears from "../images/gears.png";
import laptop from "../images/laptop.png";
import "animate.css";
import RotatingCube from "../components/visualcomponents/RotatingCube";
import { Canvas } from "@react-three/fiber";

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
          display: "flex",
          flexDirection: "column",
        }}
        className=" mt-5 pt-0"
      >
        <Row
          className="justify-content-md-center text-center mb-4 title-mt"
          style={{ flex: "0 1 auto", height: "100vh" }}
        >
          <div className="d-flex flex-column align-items-center">
            <h1 className="animate__animated animate__fadeInDown">
              <strong>PredictionBox</strong>
            </h1>
            <div className="animate__animated animate__fadeInUp">
              <p class="purple-text">
                A Beginner-Friendly Machine Learning Sandbox
              </p>
              <Button variant="primary" onClick={redirectToKnnPage}>
                Try the K-Nearest-Neighbors Model
              </Button>
            </div>
          </div>
        </Row>
        <Row style={{ flex: "0 1 auto", height: "100vh", color: "#fff" }}>
          <h1>about</h1>
          <h3>
            Upload your data and receive instant, insightful sample predictions.
            Discover the hidden stories and potential in your data through our
            predictive analysis.
          </h3>
          <Container fluid>
            <Row className="mr-3 justify-content-center align-items-center">
              <Card style={{ width: "80%", height: "60%" }} className="mt-5">
                <Card.Body>
                  <div
                    className="flex-container"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Canvas
                      shadows
                      style={{
                        height: "600px",
                        width: "600px",
                      }}
                    >
                      <ambientLight />
                      <pointLight position={[10, 10, 10]} />
                      <RotatingCube />
                    </Canvas>
                    <Card style={{ flex: 1 }}>
                      <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          Card Subtitle
                        </Card.Subtitle>
                        <Card.Text>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </Card.Text>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                      </Card.Body>
                    </Card>
                  </div>
                </Card.Body>
              </Card>
            </Row>
          </Container>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;

{
  /* <Row style={{ flex: "1" }} className="mt-2">
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
        </Row> */
}
