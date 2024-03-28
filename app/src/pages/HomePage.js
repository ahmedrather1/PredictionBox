import {React, useEffect} from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import "animate.css";
import RotatingCubeCard from "../components/visualcomponents/RotatingCubeCard";
import { FaArrowDown } from "react-icons/fa";
import TypeWriterCard from "../components/visualcomponents/TypewriterCard";
import ReactGA from "react-ga"

// TODO make the styling method consistent!
const HomePage = () => {
  const navigate = useNavigate();

  const redirectToKnnPage = () => {
    navigate("/knn");
  };

  useEffect(() => {
    ReactGA.pageview(window.location.pathname)
  }, [])

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
            <FaArrowDown
              size={50}
              color="#2596be"
              style={{ position: "absolute", top: "90%" }}
              className="animate__animated animate__pulse animate__infinite infinite"
            />
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
            <span style={{ color: "#a955c2" }}>Upload your data</span> and
            receive instant, insightful sample predictions from any of our
            models.
          </h3>
          <h3>
            <span style={{ color: "#a955c2" }}>Customize any model</span> to
            fine tune your predictions.
          </h3>
          <h3 className="mb-5">
            <span style={{ color: "#a955c2" }}>Visualize your Data</span> using
            interactive charts.
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
            height: "100vh",
          }}
        >
          <h1>Behind the Scenes</h1>
          <Row>
            <Col sm={4}>
              <h3 className="mb-3">
                PredictionBox leverages the power of{" "}
                <span style={{ color: "#2596be" }}>
                  Scikit-Learn and Statsmodels
                </span>{" "}
                libraries to enable model generation.
              </h3>
              <h3 className="mb-3">
                {" "}
                Statistical techniques are used to optimize sample model
                parameters, ensuring{" "}
                <span style={{ color: "#2596be" }}>
                  highly accurate predictions.
                </span>{" "}
              </h3>
              <h3>
                The platform provides the flexibility to{" "}
                <span style={{ color: "#2596be" }}>
                  customize model parameters
                </span>{" "}
                , allowing for a personalized experience tailored to specific
                data needs.
              </h3>
            </Col>
            <Col sm={8} className="mb-5 pb-5">
              <Container fluid>
                <Row className="mr-3 mb-5 justify-content-center align-items-center">
                  <TypeWriterCard />
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
