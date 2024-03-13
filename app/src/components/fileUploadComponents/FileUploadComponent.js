import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Button from "@mui/material/Button";
import CustomForm from "../common/CustomForm";
import { DemoDataSelectorSchema } from "../../formSchemas/common/DemoDataSelectorSchema";
import { PredictorResponseSelectorSchema } from "../../formSchemas/common/PredictorResponseSelectorSchema";

// TODO rename this component, it now does more than just file upload
const FileUploadComponent = ({
  onFileUpload,
  columns,
  handleDataFromPredictorResponseSelector,
  GeneralInfoCard,
  ChooseDataCard,
}) => {
  const [currentFile, setCurrentFile] = useState(null);
  const [isDemoData, setIsDemoData] = useState(null);
  const [showDataUploadCard, setShowDataUploadCard] = useState(false);

  useEffect(() => {
    if (currentFile && isDemoData) {
      onFileUpload(currentFile);
    }
  }, [currentFile]);

  const handleFileChange = async (event) => {
    const uploadedFile = event.target.files[0];
    setCurrentFile(uploadedFile);
  };

  const handleSubmitUploadedFile = () => {
    onFileUpload(currentFile);
  };

  const handleSubmitDemoData = async (data) => {
    if (data.Dataset) {
      let datasetName = data.Dataset;
      console.log(datasetName);

      try {
        console.log(process.env.REACT_APP_API_URL);
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/serve-demo-data/${datasetName}`
        );
        const blob = await response.blob();

        console.log(blob);
        setIsDemoData(true);
        setCurrentFile(blob);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          fontSize: "5rem",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        {" "}
        K Nearest Neighbors
      </h1>
      <Row>
        <Col md={8}>
          {!columns && (
            <>
              <Card>
                <Card.Title className="text-center mt-3">
                  {" "}
                  <h2>Choose your Data!</h2>
                </Card.Title>
                <Card.Subtitle className="text-center">
                  {" "}
                  Click{" "}
                  <span
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={() => setShowDataUploadCard(!showDataUploadCard)}
                  >
                    here
                  </span>{" "}
                  to see data upload instructions
                </Card.Subtitle>
                <Card.Body>
                  <Row className="justify-content-md-center">
                    <div className="d-flex justify-content-center mb-3 animate__animated animate__fadeInRight">
                      <Card
                        className="custom-card-shadow"
                        style={{ minWidth: "80%", backgroundColor: "#454545" }}
                      >
                        <Card.Body>
                          <Card.Title className="text-center">
                            Choose Demo Data
                          </Card.Title>
                          <CustomForm
                            schema={DemoDataSelectorSchema()}
                            onSubmit={handleSubmitDemoData}
                          />
                        </Card.Body>
                      </Card>
                    </div>
                  </Row>
                  <Row className="justify-content-md-center">
                    <div className="mb-3 d-flex justify-content-center animate__animated animate__fadeInRight">
                      <Card
                        className="custom-card-shadow"
                        style={{ minWidth: "80%", backgroundColor: "#454545" }}
                      >
                        <Card.Body>
                          <Card.Title className="text-center">
                            Upload Your Own File
                          </Card.Title>
                          <Container>
                            <Row>
                              <input
                                type="file"
                                className="mt-2"
                                onChange={handleFileChange}
                              />
                            </Row>
                            <Row className="mt-3">
                              <Col md={3}>
                                <Button
                                  type="submit"
                                  onClick={handleSubmitUploadedFile}
                                  variant="outlined"
                                >
                                  Submit
                                </Button>
                              </Col>
                            </Row>
                          </Container>
                        </Card.Body>
                      </Card>
                    </div>
                  </Row>
                </Card.Body>
              </Card>
              {showDataUploadCard && (
            <div className="mb-3 mt-3 animate__animated animate__fadeInLeft">
              <ChooseDataCard />
            </div>
          )}
            </>
          )}
        </Col>
        <Col md={4}>

          <div className="mb-3 animate__animated animate__fadeInUp">
            <GeneralInfoCard />
          </div>
        </Col>

        {columns && (
          <Col md={4}>
            <div className="mb-3 mt-3 animate__animated animate__fadeInRight">
              <Card>
                <Card.Body>
                  <Card.Title>
                    Choose Your Predictor (X variable) and Response (Y Variable)
                  </Card.Title>
                  <CustomForm
                    schema={PredictorResponseSelectorSchema(columns)}
                    onSubmit={handleDataFromPredictorResponseSelector}
                  />
                </Card.Body>
              </Card>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default FileUploadComponent;
