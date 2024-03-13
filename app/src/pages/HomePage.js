import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import "animate.css";
import RotatingCubeCard from "../components/visualcomponents/RotatingCubeCard";
import { FaArrowDown } from "react-icons/fa";
import TypeWriterCard from "../components/visualcomponents/TypewriterCard";
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
          <div
            className="d-flex justify-content-center align-items-end"
            style={{ flex: "1" }}
          >
            <FaArrowDown size={50} color="#2596be"  style={{position:"absolute", top:"90%"}} className="animate__animated animate__pulse animate__infinite infinite"></FaArrowDown>/>
          </div>
        </Row>
        <Row
          style={{
            flex: "0 1 auto",
            color: "#fff",
            textAlign: "center",
            backgroundColor: "#303030",
          }}
        >
          <h1 className="mt-3">About</h1>
          <h3>
            Upload your data and receive instant, insightful sample predictions
            from any of our models.
          </h3>
          <h3>Customize any model to fine tune your predictions.</h3>
          <h3 className="mb-5">
            Visualize your data using interactive charts.
          </h3>
          <Container fluid>
            <Row className="mb-5 justify-content-center align-items-center">
              <RotatingCubeCard />
            </Row>
          </Container>
        </Row>
        <Row
          className="mt-5 justify-content-center"
          style={{
            flex: "0 1 auto",
            color: "#fff",
            textAlign: "center",
            height:"100vh"
          }}
        >
          <h1>Behind the Scenes</h1>
          <Row>
          <Col sm={4} >
            <h3 className="mb-3">
            PredictionBox leverages the power of Scikit-Learn and Statsmodels libraries to enable model generation.
            </h3>
            <h3 className="mb-3"> Statistical techniques are employed to intelligently optimize model parameters, ensuring highly accurate predictions.</h3>
            <h3>
              The platform provides the flexibility to customize model parameters, allowing for a personalized experience tailored to specific data needs.
            </h3>
          </Col>
          <Col sm={8} className="mb-5 pb-5">
            <Container fluid>
              <Row className="mr-3 mb-5 justify-content-center align-items-center">
                <TypeWriterCard/>
              </Row>
            </Container>
          </Col>
          </Row>
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
