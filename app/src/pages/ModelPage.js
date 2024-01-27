import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Papa from "papaparse";
import ChartComponent from "../components/common/ChartComponent";
import { PredictionInputFormSchema } from "../formSchemas/common/PredictionInputFormSchema";
import CustomParameterCard from "../components/common/CustomParameterCard";
import IndividualPredictionCard from "../components/common/IndividualPredictionCard";
import FileUploadComponent from "../components/common/FileUploadComponent";
import Header from "../components/common/Header";
import KnnOptionsText from "../components/knn/text/KnnOptionsText";

function ModelPage({
  Endpoints,
  PossibleCustomParams,
  CustomParameterInputFormSchema,
  CustomParameterInfoCard,
  GeneralInfoCard,
  ChooseDataCard,
}) {
  // TODO too many usestates! use redux instead
  const [columns, setColumns] = useState(null);
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);

  const [xrange, setXrange] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  const [predictor, setPredictor] = useState(null);
  const [response, setResponse] = useState(null);

  const [ypred, setYpred] = useState(null);
  const [samplePrediction, setSamplePrediction] = useState(null);
  const [sampleIndividualPrediction, setSampleIndividualPrediction] =
    useState(null);

  const [customYPred, setCustomYPred] = useState(null);
  const [customPrediction, setCustomPrediction] = useState(null);
  const [showCustomPrediction, setShowCustomPrediction] = useState(false);
  const [customParameters, setCustomParameters] = useState(null);
  const [customIndividualPrediction, setCustomIndividualPrediction] =
    useState(null);

  const [predictionInputFormSchema, setPredictionInputFormSchema] =
    useState(null);
  const [customParameterInputFormSchema, setCustomParameterInputFormSchema] =
    useState(null);

  useEffect(() => {
    let schema = PredictionInputFormSchema(customParameters);
    setPredictionInputFormSchema(schema);
  }, [customParameters]);

  useEffect(() => {
    let schema = CustomParameterInputFormSchema(originalData);
    setCustomParameterInputFormSchema(schema);
  }, [originalData]);

  useEffect(() => {
    if (predictor && response) {
      const formData = new FormData();
      formData.append("csv-file", file);
      formData.append("predictor", predictor);
      formData.append("response", response);

      fetch(`${process.env.REACT_APP_API_URL}${Endpoints.SAMPLE_MODEL_URL}`, {
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

  const handleFileUpload = async (uploadedFile) => {
    setFile(uploadedFile);
  };

  const handleDataFromPredictorResponseSelector = (data) => {
    setPredictor(data.predictor);
    setResponse(data.response);
  };

  const handleDataFromParameterInputForm = (data) => {
    setShowCustomPrediction(false);
    setCustomYPred(null);
    setCustomPrediction(null);
    let CustomParameters = {};
    Object.entries(PossibleCustomParams).forEach(([key, value]) => {
      CustomParameters[value] = data[value];
    });
    setCustomParameters(CustomParameters);
    const formData = new FormData();
    formData.append("csv-file", file);
    formData.append("predictor", predictor);
    formData.append("response", response);
    Object.entries(PossibleCustomParams).forEach(([key, value]) => {
      formData.append(value, data[value]);
    });

    fetch(`${process.env.REACT_APP_API_URL}${Endpoints.CUSTOM_MODEL_URL}`, {
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
    const formData = new FormData();
    if (data.predictorCustom) {
      formData.append("csv-file", file);
      formData.append("predictor", predictor);
      formData.append("response", response);
      formData.append("xToPredict", data.predictorCustom);
      Object.entries(PossibleCustomParams).forEach(([key, value]) => {
        formData.append(value, customParameters[value]);
      });

      console.log(formData);
      fetch(
        `${process.env.REACT_APP_API_URL}${Endpoints.CUSTOM_INDIVIDUAL_PREDICTION_URL}`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setCustomIndividualPrediction({
            xToPredict: +parseFloat(data.xToPredict).toFixed(4),
            predictedY: +parseFloat(data.predictedY).toFixed(4),
          });
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
    if (data.predictorSample) {
      formData.append("csv-file", file);
      formData.append("predictor", predictor);
      formData.append("response", response);
      formData.append("xToPredict", data.predictorSample);
      fetch(
        `${process.env.REACT_APP_API_URL}${Endpoints.SAMPLE_INDIVIDUAL_PREDICTION_URL}`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setSampleIndividualPrediction({
            xToPredict: +parseFloat(data.xToPredict).toFixed(4),
            predictedY: +parseFloat(data.predictedY).toFixed(4),
          });
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  };

  const renderContent = () => {
    if (samplePrediction && originalData) {
      return (
        <Container fluid>
          <Row>
            <Col sm={8} className="mt-3">
              <ChartComponent
                samplePrediction={samplePrediction}
                originalData={originalData}
                customPrediction={customPrediction}
                showCustomPrediction={showCustomPrediction}
                setShowCustomPrediction={setShowCustomPrediction}
                predictor={predictor}
                response={response}
              />
            </Col>
            <Col>
              <div className="mb-3 mt-3">
                <CustomParameterCard
                  onSubmit={handleDataFromParameterInputForm}
                  schema={customParameterInputFormSchema}
                />
              </div>
              <div className="mb-3">
                <IndividualPredictionCard
                  onSubmit={handleDataFromPredictionForm}
                  schema={predictionInputFormSchema}
                  sampleIndividualPrediction={sampleIndividualPrediction}
                  customIndividualPrediction={customIndividualPrediction}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Container>
              <Col md={8}>
                <CustomParameterInfoCard />
              </Col>
            </Container>
          </Row>
        </Container>
      );
    } else {
      return (
        <FileUploadComponent
          onFileUpload={handleFileUpload}
          columns={columns}
          handleDataFromPredictorResponseSelector={
            handleDataFromPredictorResponseSelector
          }
          GeneralInfoCard={GeneralInfoCard}
          ChooseDataCard={ChooseDataCard}
        />
      );
    }
  };

  return (
    <div>
      <Header />
      <>{renderContent()}</>
    </div>
  );
}

export default ModelPage;
