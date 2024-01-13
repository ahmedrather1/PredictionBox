import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import CustomForm from "./CustomForm";
import { DemoDataSelectorSchema } from "../../formSchemas/DemoDataSelectorSchema";
import { fetchCsvFileAsBlob } from "../../utils/fetchCsvFileAsBlob";
import AboutKnnText from "./text/AboutKnnText";
import ChooseDataText from "./text/ChooseDataText";

const FileUploadComponent = ({ onFileUpload }) => {
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

      const dataset = await fetchCsvFileAsBlob(datasetName);
      console.log(dataset);
      setIsDemoData(true);
      setCurrentFile(dataset);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <div className="mb-3">
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
        <Col md={4}>
          <Row>
            <div className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">
                    Upload Your own File
                  </Card.Title>
                  <Container>
                    <Row>
                      <input type="file" onChange={handleFileChange} />
                    </Row>
                    <Row className="mt-3">
                      <Button type="submit" onClick={handleSubmitUploadedFile}>
                        Submit
                      </Button>
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
      </Row>
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
    </Container>
  );
};

export default FileUploadComponent;
