import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import CustomForm from "./CustomForm";
import { DemoDataSelectorSchema } from "../../formSchemas/DemoDataSelectorSchema";
import { PredictorResponseSelectorSchema } from "../../formSchemas/PredictorResponseSelectorSchema";

import { fetchCsvFileAsBlob } from "../../utils/fetchCsvFileAsBlob";
import AboutKnnText from "./text/AboutKnnText";
import ChooseDataText from "./text/ChooseDataText";

// TODO rename this component, it now does more than just file upload
const FileUploadComponent = ({
  onFileUpload,
  columns,
  handleDataFromPredictorResponseSelector,
}) => {
  const [currentFile, setCurrentFile] = useState(null);
  const [isDemoData, setIsDemoData] = useState(null);

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
    console.log(data);
    if (data.Dataset) {
      let datasetName = data.Dataset;
      console.log(datasetName);

      try {
        const response = await fetch(
          // TODO CHANGE THIS ASAP!!!! SET UP ENVIRONMENT VARS!!!!!
          `https://prediction-box-api-env.us-east-1.elasticbeanstalk.com/serve-demo-data/${datasetName}`
          //`http://localhost:8080/serve-demo-data/${datasetName}`
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
    <Container>
      <Row>
        <Col md={8}>
          <div className="mb-3 mt-3">
            <Card>
              <Card.Body>
                <Card.Title className="text-center">
                  <strong>Choose your Data!</strong>
                </Card.Title>
                <ChooseDataText />
              </Card.Body>
            </Card>
          </div>
        </Col>
        {!columns && (
          <Col md={4}>
            <Row>
              <div className="mb-3 mt-3">
                <Card>
                  <Card.Body>
                    <Card.Title className="text-center">
                      Upload Your own File
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
            <Row>
              <div className="mb-3">
                <Card>
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
          </Col>
        )}
        {columns && (
          <Col md={4}>
            <div className="mb-3 mt-3">
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
      <div className="mb-3">
        <Row className="mt-3">
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                <strong> About the K Nearest Neighbors Algorithm</strong>
              </Card.Title>
              <AboutKnnText />
            </Card.Body>
          </Card>
        </Row>
      </div>
    </Container>
  );
};

export default FileUploadComponent;
