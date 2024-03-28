import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import MultipleModelFileUploadComponent from "../../fileUploadComponents/MultipleModelFileUploadComponent";
import Header from "../../common/Header";
import CustomForestPlotChart from "../../chartComponents/CustomForestChartComponent";
import ChoosePredictorsCard from "../../common/ChoosePredictorsCard";
import PaginationComponent from "../../common/PaginationComponent";
import MultipleParameterIndividualPredictionCard from "../../individualPredictionCards/MultipleParameterIndividualPredictionCard";
import { parseFile, processFileColumns } from "../CommonUtils/ParseFile";
import {
  buildDataPoint,
  callCoefficientAnalysis,
  callIndividualPrediction,
  callPartialRegressions,
  generatePredictionFormSchema,
  processAndSetFinalPredictors,
  processAndSetInitialPredictors,
} from "./PenaltyModelPageUtils";
import ChooseAlphaCard from "../../common/ChooseAlphaCard";
import { AlphaSelectorInputFormSchema } from "../../../formSchemas/AlphaSelectorInputFormSchema";
import PartialRegressionsCharts from "../../common/PartialRegressionsCharts";
import ReactGA from "react-ga"

function PenaltyModelPage({
  Endpoints,
  ChoosePredictorsFormSchema,
  FinalPlotsInfoCard,
  GeneralInfoCard,
  ChooseDataCard,
  PredictorSelectionInfoCard,
  AboutAlphaCard,
  Variant,
  ModelName,
}) {
  // TODO too many usestates! use redux instead
  const [columns, setColumns] = useState(null);
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);

  const [showCustomCoefs, setShowCustomCoefs] = useState(false);
  const [customCoefs, setCustomCoefs] = useState(null);

  const [alphaVal, setAlphaVal] = useState(null);
  const [partialRegressions, setPartialRegressions] = useState(null);

  const [partialRegressionsCustom, setPartialRegressionsCustom] =
    useState(null);

  const [showCustomModel, setShowCustomModel] = useState(false);

  const [initialPredictors, setInitialPredictors] = useState(null);
  const [finalPredictors, setFinalPredictors] = useState(null);
  const [finalPredictorsObject, setFinalPredictorsObject] = useState(null);

  const [coefs, setCoefs] = useState(null);

  const [response, setResponse] = useState(null);

  const [individualPrediction, setIndividualPrediction] = useState(null);
  const [customIndividualPrediction, setCustomIndividualPrediction] =
    useState(null);
  const [dataPointRaw, setDataPointRaw] = useState(null);

  const [predictionInputFormSchema, setPredictionInputFormSchema] =
    useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const chartsPerPage = 1;

  useEffect(() => {
    ReactGA.pageview(window.location.pathname)
  }, [])

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
    if (response && initialPredictors) {
      callCoefficientAnalysis(
        file,
        initialPredictors,
        response,
        setCoefs,
        Endpoints.COEFFICIENT_ANALYSIS_URL
      );
    }
  }, [response, initialPredictors]);

  useEffect(() => {
    if (alphaVal) {
      callCoefficientAnalysis(
        file,
        initialPredictors,
        response,
        setCustomCoefs,
        Endpoints.CUSTOM_COEFFICIENT_ANALYSIS_URL,
        alphaVal
      );
    }
  }, [alphaVal]);

  useEffect(() => {
    if (finalPredictors) {
      generatePredictionFormSchema(
        columns,
        response,
        finalPredictors,
        setFinalPredictorsObject,
        setPredictionInputFormSchema
      );
    }
  }, [finalPredictors]);

  useEffect(() => {
    if (alphaVal && finalPredictors) {
      callPartialRegressions(
        file,
        finalPredictors,
        response,
        setPartialRegressionsCustom,
        alphaVal,
        Endpoints.CUSTOM_PARTIAL_REGRESSIONS_URL
      );
    }
  }, [alphaVal]);

  useEffect(() => {
    if (finalPredictors && response) {
      setAlphaVal(null);
      callPartialRegressions(
        file,
        finalPredictors,
        response,
        setPartialRegressions,
        null,
        Endpoints.PARTIAL_REGRESSIONS_URL
      );
    }
  }, [finalPredictors, response]);

  const handleFileUpload = async (uploadedFile) => {
    setFile(uploadedFile);
  };

  const handleDataFromResponseSelector = (data) => {
    setResponse(data.response);
    processAndSetInitialPredictors(columns, data, setInitialPredictors);
  };

  const handleDataFromPredictorsSelectorForm = (data) => {
    processAndSetFinalPredictors(data, initialPredictors, setFinalPredictors);
  };

  const handleDataFromAlphaSelectorForm = (data) => {
    if (data?.alpha) {
      setAlphaVal(data.alpha);
    }
  };

  useEffect(() => {
    if (alphaVal && dataPointRaw) {
      handleDataFromPredictionForm(dataPointRaw);
    }
  }, [alphaVal, dataPointRaw]);

  const handleDataFromPredictionForm = (data) => {
    setDataPointRaw(data);
    let predictorsFullSorted = buildDataPoint(data, finalPredictorsObject);
    if (alphaVal) {
      callIndividualPrediction(
        file,
        finalPredictors,
        response,
        predictorsFullSorted,
        alphaVal,
        setCustomIndividualPrediction,
        Endpoints.CUSTOM_INDIVIDUAL_PREDICTION_URL
      );
    }
    callIndividualPrediction(
      file,
      finalPredictors,
      response,
      predictorsFullSorted,
      null,
      setIndividualPrediction,
      Endpoints.INDIVIDUAL_PREDICTION_URL
    );
  };

  const renderContent = () => {
    if (partialRegressions) {
      return (
        <Container fluid>
          <h1 style={{ fontSize: "4rem", textAlign: "center" }}>{ModelName}</h1>
          <Row>
            <Col sm={8} className="mt-4 animate__animated animate__fadeInLeft">
              {!showCustomModel && (
                <PartialRegressionsCharts
                  partialRegressions={partialRegressions}
                  currentPage={currentPage}
                  chartsPerPage={chartsPerPage}
                  response={response}
                  setShowCustomModel={setShowCustomModel}
                  showCustomModel={showCustomModel}
                  alphaVal={alphaVal}
                  variant={Variant}
                  modelType={"standard"}
                />
              )}
              {showCustomModel && (
                <PartialRegressionsCharts
                  partialRegressions={partialRegressionsCustom}
                  currentPage={currentPage}
                  chartsPerPage={chartsPerPage}
                  response={response}
                  setShowCustomModel={setShowCustomModel}
                  showCustomModel={showCustomModel}
                  alphaVal={alphaVal}
                  variant={Variant}
                  modelType={"custom"}
                />
              )}
              <PaginationComponent
                currentPage={currentPage}
                itemCount={Object.keys(partialRegressions).length}
                itemsPerPage={chartsPerPage}
                onPageChange={setCurrentPage}
              />
            </Col>
            <Col className="mt-3 animate__animated animate__fadeInRight">
              <div className="mt-3">
                <ChooseAlphaCard
                  onSubmit={handleDataFromAlphaSelectorForm}
                  schema={AlphaSelectorInputFormSchema(alphaVal)}
                />
              </div>
              <div className="mb-3 mt-3">
                <MultipleParameterIndividualPredictionCard
                  onSubmit={handleDataFromPredictionForm}
                  schema={predictionInputFormSchema}
                  individualPrediction={individualPrediction}
                  customPrediction={customIndividualPrediction}
                  response={response}
                  titles={{
                    standard: "Cross Validated Alpha Prediction",
                    custom: "Custom Alpha Prediction",
                  }}
                />
                <div className="mt-3 animate__animated animate__fadeInUp">
                  <FinalPlotsInfoCard />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      );
    } else if (coefs) {
      return (
        <Container fluid>
          <h1 style={{ fontSize: "4rem", textAlign: "center" }}>{ModelName}</h1>
          <Row>
            <Col sm={8} className="">
              <div className="mt-3 animate__animated animate__fadeInLeft">
                <CustomForestPlotChart
                  coefs={coefs}
                  customcoefs={customCoefs}
                  showCustomCoefs={showCustomCoefs}
                  setShowCustomCoefs={setShowCustomCoefs}
                />
              </div>
            </Col>
            <Col sm={4} className="">
              <div className="mb-3 mt-3  animate__animated animate__fadeInRight">
                <ChoosePredictorsCard
                  onSubmit={handleDataFromPredictorsSelectorForm}
                  schema={ChoosePredictorsFormSchema(initialPredictors)}
                />
              </div>
              <div className="animate__animated animate__fadeInRight">
                <ChooseAlphaCard
                  onSubmit={handleDataFromAlphaSelectorForm}
                  schema={AlphaSelectorInputFormSchema()}
                />
              </div>
              <div className="mt-3 animate__animated animate__fadeInUp">
                <PredictorSelectionInfoCard />
              </div>
              <div className="mt-3 mb-2  animate__animated animate__fadeInUp">
                <AboutAlphaCard />
              </div>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <MultipleModelFileUploadComponent
          onFileUpload={handleFileUpload}
          columns={columns}
          handleDataFromResponseSelector={handleDataFromResponseSelector}
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

export default PenaltyModelPage;
