import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import CustomForm from "../common/CustomForm";
import { DemoDataSelectorSchema } from "../../formSchemas/common/DemoDataSelectorSchema";
import { ResponseSelectorSchema } from "../../formSchemas/common/ResponseSelectorSchema";

// TODO rename this component, it now does more than just file upload
const MultipleModelFileUploadComponent = ({
  onFileUpload,
  columns,
  handleDataFromResponseSelector,
  GeneralInfoCard,
  ChooseDataCard,
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
    if (data.Dataset) {
      let datasetName = data.Dataset;

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/serve-demo-data/${datasetName}`
        );
        const blob = await response.blob();

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
            <ChooseDataCard />
          </div>
        </Col>
        {!columns && (
          <Col md={4}>
            <Row>
              <div className="mb-3 mt-3">
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
            <Row>
              <div className="">
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
          </Col>
        )}
        {columns && (
          <Col md={4}>
            <div className="mb-3 mt-3">
              <Card>
                <Card.Body>
                  <Card.Title>Choose Your Response (Y Variable)</Card.Title>
                  <CustomForm
                    schema={ResponseSelectorSchema(columns)}
                    onSubmit={handleDataFromResponseSelector}
                  />
                </Card.Body>
              </Card>
            </div>
          </Col>
        )}
      </Row>
      <div className="mb-3">
        <Row className="mt-3">
          <GeneralInfoCard />
        </Row>
      </div>
    </Container>
  );
};

export default MultipleModelFileUploadComponent;
