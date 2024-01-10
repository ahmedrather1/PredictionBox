import React, { useEffect, useState } from "react";
import GraphComponent from "../components/common/GraphComponent";
import PredictorResponseSelector from "../components/common/PredictorResponseSelector";
import { Navbar, Container, Nav } from "react-bootstrap";
import styled from "styled-components";
import Papa from "papaparse";
import ChartComponent from "../components/common/ChartComponent";
import CustomForm from "../components/common/CustomForm";

// Styled components
const StyledHeader = styled(Navbar)`
  background-color: #d7bde2;
  font-family: Georgia, serif;
  padding: 15px 0;
`;

const MainContent = styled.div`
  padding: 20px;
`;

const HeaderContainer = styled(Container)`
  max-width: 100%; // Allow full width
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: flex-start; // Align items to the start (left)
  align-items: center; // Center the content vertically
  padding: 20px;
`;

const GraphContainer = styled.div`
  flex: 0 0 40%; // The GraphComponent will take up 25% of the container width and will not grow or shrink
  // You can adjust the flex-basis percentage to control the width more precisely
`;

// Header Component
function Header() {
  return (
    <StyledHeader bg="purple" expand="lg">
      <HeaderContainer>
        <Navbar.Brand href="#home">Mess With ML</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </HeaderContainer>
    </StyledHeader>
  );
}

// CustomKnnPage Component
function CustomKnnPage() {
  const [columns, setColumns] = useState(null);
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);

  const [xrange, setXrange] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  const [predictor, setPredictor] = useState(null);
  const [response, setResponse] = useState(null);

  const [ypred, setYpred] = useState(null);
  const [samplePrediction, setSamplePrediction] = useState(null);

  const [customYPred, setCustomYPred] = useState(null);
  const [customPrediction, setCustomPrediction] = useState(null);
  const [showCustomPrediction, setShowCustomPrediction] = useState(false);
  const [customParameters, setCustomParameters] = useState(null);

  const PredictionInputFormSchema = {
    type: "object",
    title: "Custom Parameter Input",
    oneOf: [
      {
        title: "Sample Model", // Title for the first option
        properties: {
          predictorSample: {
            type: "integer",
            title: "Predictor (X value)",
            minimum: 1,
          },
        },
        required: ["predictorSample"],
      },
      {
        title: "Your Custom Model", // Title for the second option
        properties: {
          predictorCustom: {
            type: "integer",
            title: "Predictor (X value)",
            minimum: 1,
          },
        },
        required: ["predictorCustom"],
      },
    ],
  };

  const CustomParameterInputFormSchema = {
    type: "object",
    title: "Custom Parameter Input",
    oneOf: [
      {
        title: "Option 1: Custom K Value", // Title for the first option
        properties: {
          customK: {
            type: "integer",
            title: "Custom K value",
            minimum: 1,
            maximum: originalData ? originalData.length : 0,
          },
        },
        required: ["customK"],
      },
      {
        title: "Option 2: Custom Folds and Maximum K", // Title for the second option
        properties: {
          maxK: {
            type: "integer",
            title: "Maximum K value",
            minimum: 1,
            maximum: originalData ? originalData.length : 0,
          },
          customFolds: {
            type: "integer",
            title: "Number of cross validation folds",
            minimum: 1,
            maximum: originalData ? originalData.length : 0,
          },
        },
        required: ["maxK", "customFolds"],
      },
    ],
  };

  useEffect(() => {
    if (predictor && response) {
      const formData = new FormData();
      formData.append("csv-file", file);
      formData.append("predictor", predictor);
      formData.append("response", response);

      fetch("http://127.0.0.1:8000/call-sample-knn/", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setYpred(data.ypred.map((element) => element[0]));
          setXrange(data.xrange);
          setOriginalData(data.originalData);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [predictor, response]);

  useEffect(() => {
    if (xrange && ypred) {
      let prediction = xrange.map((e, i) => [e, ypred[i]]);
      console.log(prediction);
      setSamplePrediction(prediction);
    }
  }, [xrange, ypred]);

  useEffect(() => {
    if (customYPred) {
      let customPred = xrange.map((e, i) => [e, customYPred[i]]);
      setCustomPrediction(customPred);
      setShowCustomPrediction(true);
    }
  }, [customYPred]);

  useEffect(() => {
    if (file) {
      parseFile();
      console.log("File ready for processing: ", file);
    }
  }, [file]);

  useEffect(() => {
    if (fileData) {
      let sample = fileData[0];
      let colsRaw = Object.keys(sample);
      let cols = [];
      colsRaw.forEach((col) => {
        if (!isNaN(sample[col])) {
          cols.push(col);
        }
      });
      setColumns(cols);
    }
  }, [fileData]);

  const parseFile = async () => {
    await Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data);
        setFileData(results.data);
      },
    });
  };

  const handleFileChange = async (event) => {
    if (!file) {
      const uploadedFile = event.target.files[0];
      setFile(uploadedFile);
    }
  };

  const handleDataFromPredictorResponseSelector = (data) => {
    console.log("fromparent", data);
    setPredictor(data.predictor);
    setResponse(data.response);
  };

  const handleDataFromParameterInputForm = (data) => {
    setShowCustomPrediction(false);
    setCustomYPred(null);
    setCustomPrediction(null);
    setCustomParameters({
      maxK: data.maxK,
      customK: data.customK,
      customFolds: data.customFolds,
    });
    const formData = new FormData();
    formData.append("csv-file", file);
    formData.append("predictor", predictor);
    formData.append("response", response);
    formData.append("maxK", data.maxK);
    formData.append("customK", data.customK);
    formData.append("customFolds", data.customFolds);

    fetch("http://127.0.0.1:8000/call-custom-knn/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setCustomYPred(data.ypred.map((element) => element[0]));
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleDataFromPredictionForm = (data) => {
    console.log(data);
  };

  const renderContent = () => {
    if (!file) {
      return <input type="file" onChange={handleFileChange} />;
    }

    if (samplePrediction && originalData) {
      return (
        <GraphContainer>
          <ChartComponent
            samplePrediction={samplePrediction}
            originalData={originalData}
            customPrediction={customPrediction}
            showCustomPrediction={showCustomPrediction}
            setShowCustomPrediction={setShowCustomPrediction}
            predictor={predictor}
            response={response}
          />
          <CustomForm
            onSubmit={handleDataFromParameterInputForm}
            schema={CustomParameterInputFormSchema}
          />
          <CustomForm
            onSubmit={handleDataFromPredictionForm}
            schema={PredictionInputFormSchema}
          />
        </GraphContainer>
      );
    }

    if (columns) {
      return (
        <PredictorResponseSelector
          columns={columns}
          sendDataToParent={handleDataFromPredictorResponseSelector}
        />
      );
    }

    return <p>Loading data, please wait...</p>;
  };

  return (
    <div>
      <Header />
      <MainContent>
        <h3>K Nearest Neighbors</h3>
        <FlexContainer>{renderContent()}</FlexContainer>
      </MainContent>
    </div>
  );
}

export default CustomKnnPage;
