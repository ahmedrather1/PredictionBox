import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ChartComponent from "../../chartComponents/ChartComponent";
import { PredictionInputFormSchema } from "../../../formSchemas/common/PredictionInputFormSchema";
import CustomParameterCard from "../../common/CustomParameterCard";
import IndividualPredictionCard from "../../individualPredictionCards/IndividualPredictionCard";
import FileUploadComponent from "../../fileUploadComponents/FileUploadComponent";
import Header from "../../common/Header";
import { parseFile, processFileColumns } from "../CommonUtils/ParseFile";
import {
  callCustomModelFull,
  callCustomModelIndividual,
  callSampleModelFull,
  callSampleModelIndividual,
} from "./ModelPageUtils";

function ModelPage({
  Endpoints,
  PossibleCustomParams,
  CustomParameterInputFormSchema,
  CustomParameterInfoCard,
  GeneralInfoCard,
  ChooseDataCard,
  ModelName,
}) {
  // TODO use a reducer, too many usestates!
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
    if (file) {
      parseFile(file, setFileData);
    }
  }, [file]);

  useEffect(() => {
    if (fileData) {
      processFileColumns(fileData, setColumns);
    }
  }, [fileData]);

  useEffect(() => {
    if (predictor && response) {
      callSampleModelFull(
        file,
        predictor,
        response,
        setYpred,
        setXrange,
        setOriginalData,
        Endpoints
      );
    }
  }, [predictor, response]);

  useEffect(() => {
    if (xrange && ypred) {
      let prediction = xrange.map((e, i) => [e, ypred[i]]);
      setSamplePrediction(prediction);
    }
  }, [xrange, ypred]);

  useEffect(() => {
    let schema = CustomParameterInputFormSchema(originalData);
    setCustomParameterInputFormSchema(schema);
  }, [originalData]);

  useEffect(() => {
    let schema = PredictionInputFormSchema(customParameters);
    setPredictionInputFormSchema(schema);
  }, [customParameters]);

  useEffect(() => {
    if (customYPred) {
      let customPred = xrange.map((e, i) => [e, customYPred[i]]);
      setCustomPrediction(customPred);
      setShowCustomPrediction(true);
    }
  }, [customYPred]);

  const handleFileUpload = async (uploadedFile) => {
    setFile(uploadedFile);
  };

  const handleDataFromPredictorResponseSelector = (data) => {
    setPredictor(data.predictor);
    setResponse(data.response);
  };

  const handleDataFromParameterInputForm = async (data) => {
    setShowCustomPrediction(false);
    setCustomYPred(null);
    setCustomPrediction(null);
    let CustomParameters = {};
    Object.entries(PossibleCustomParams).forEach(([key, value]) => {
      CustomParameters[value] = data[value];
    });
    setCustomParameters(CustomParameters);

    await callCustomModelFull(
      file,
      predictor,
      response,
      PossibleCustomParams,
      setCustomYPred,
      data,
      Endpoints
    );
  };

  const handleDataFromPredictionForm = async (data) => {
    if (data.predictorCustom) {
      await callCustomModelIndividual(
        file,
        predictor,
        response,
        data,
        PossibleCustomParams,
        setCustomIndividualPrediction,
        customParameters,
        Endpoints
      );
    }
    if (data.predictorSample) {
      await callSampleModelIndividual(
        file,
        predictor,
        response,
        data,
        setSampleIndividualPrediction,
        Endpoints
      );
    }
  };

  const renderContent = () => {
    if (samplePrediction && originalData) {
      return (
        <Container fluid>
          <h1 style={{fontSize:"4rem", textAlign:"center"}}>{ModelName}</h1>

          <Row>
            <Col sm={8} className="mt-3 animate__animated animate__fadeInLeft">
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
            <Col className="animate__animated animate__fadeInRight">
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
              <CustomParameterInfoCard />
            </Col>
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
          ModelName={ModelName}
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
