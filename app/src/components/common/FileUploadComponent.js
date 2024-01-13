import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import CustomForm from "./CustomForm";
import { DemoDataSelectorSchema } from "../../formSchemas/DemoDataSelectorSchema";
import { fetchCsvFileAsBlob } from "../../utils/fetchCsvFileAsBlob";

const FileUploadComponent = ({ onFileUpload }) => {
  const [currentFile, setCurrentFile] = useState(null);

  useEffect(() => {
    if (currentFile) {
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
    let datasetName = data.Dataset;
    console.log(datasetName);

    const dataset = await fetchCsvFileAsBlob(datasetName);
    console.log(dataset);

    setCurrentFile(dataset);
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <div className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title className="text-center">About Knn</Card.Title>
                some text
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
    </Container>
  );
};

export default FileUploadComponent;
