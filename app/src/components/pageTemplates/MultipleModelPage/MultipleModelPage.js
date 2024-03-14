import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Papa from "papaparse";
import MultipleModelFileUploadComponent from "../../fileUploadComponents/MultipleModelFileUploadComponent";
import Header from "../../common/Header";
import ForestPlotChart from "../../chartComponents/ForestChartComponent";
import ChoosePredictorsCard from "../../common/ChoosePredictorsCard";
import PartialRegressionsChartComponent from "../../chartComponents/PartialRegressionsChartComponent";
import PaginationComponent from "../../common/PaginationComponent";
import MultipleParameterIndividualPredictionCard from "../../individualPredictionCards/MultipleParameterIndividualPredictionCard";
import { parseFile, processFileColumns } from "../CommonUtils/ParseFile";
import PartialRegressionsCharts from "../../common/PartialRegressionsCharts";

import {
  buildDataPoint,
  callCoefficientAnalysis,
  callIndividualPrediction,
  callPartialRegressions,
  generatePredictionFormSchema,
  processAndSetFinalPredictors,
  processAndSetInitialPredictors,
} from "./MultipleModelPageUtils";

function MultipleModelPage({
  Endpoints,
  ChoosePredictorsFormSchema,
  FinalPlotsInfoCard,
  GeneralInfoCard,
  ChooseDataCard,
  PredictorSelectionInfoCard,
  ModelName,
}) {
  // TODO too many usestates! use redux instead
  const [columns, setColumns] = useState(null);
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);

  const [partialRegressions, setPartialRegressions] = useState(null);

  const [initialPredictors, setInitialPredictors] = useState(null);
  const [finalPredictors, setFinalPredictors] = useState(null);
  const [finalPredictorsObject, setFinalPredictorsObject] = useState(null);

  const [coefAnalysis, setCoefAnalysis] = useState(null);

  const [response, setResponse] = useState(null);

  const [individualPrediction, setIndividualPrediction] = useState(null);

  const [predictionInputFormSchema, setPredictionInputFormSchema] =
    useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const chartsPerPage = 1;

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
        setCoefAnalysis,
        Endpoints
      );
    }
  }, [response, initialPredictors]);

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
    if (finalPredictors && response) {
      callPartialRegressions(
        file,
        finalPredictors,
        response,
        setPartialRegressions,
        Endpoints
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

  const handleDataFromPredictionForm = (data) => {
    let predictorsFullSorted = buildDataPoint(data, finalPredictorsObject);
    callIndividualPrediction(
      file,
      finalPredictors,
      response,
      predictorsFullSorted,
      setIndividualPrediction,
      Endpoints
    );
  };

  const renderContent = () => {
    if (partialRegressions) {
      return (
        <Container fluid>
          <h1 style={{ fontSize: "4rem", textAlign: "center" }}>{ModelName}</h1>

          <Row className="mt-3">
            <Col sm={8} className="mt-3 ">
              <div className="animate__animated animate__fadeInLeft">
                <PartialRegressionsCharts
                  partialRegressions={partialRegressions}
                  currentPage={currentPage}
                  chartsPerPage={chartsPerPage}
                  response={response}
                />
                <PaginationComponent
                  currentPage={currentPage}
                  itemCount={Object.keys(partialRegressions).length}
                  itemsPerPage={chartsPerPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </Col>
            <Col className="animate__animated animate__fadeInRight">
              <div className="mb-3 mt-3">
                <MultipleParameterIndividualPredictionCard
                  onSubmit={handleDataFromPredictionForm}
                  schema={predictionInputFormSchema}
                  individualPrediction={individualPrediction}
                  customPrediction={null}
                  response={response}
                  titles={{ standard: "Your Model's Prediction" }}
                />
              </div>
              <FinalPlotsInfoCard />
            </Col>
          </Row>
        </Container>
      );
    } else if (coefAnalysis) {
      return (
        <Container
          fluid
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1 style={{ fontSize: "4rem", textAlign: "center" }}>{ModelName}</h1>
          <Row>
            <Col sm={8} className="mt-3 animate__animated animate__fadeInLeft">
              <ForestPlotChart coefInfo={coefAnalysis} />
            </Col>
            <Col>
              <div className="mb-3 mt-3 animate__animated animate__fadeInRight">
                <ChoosePredictorsCard
                  onSubmit={handleDataFromPredictorsSelectorForm}
                  schema={ChoosePredictorsFormSchema(initialPredictors)}
                />
              </div>
              <div className="mb-3 animate__animated animate__fadeInRight">
                <PredictorSelectionInfoCard />
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

export default MultipleModelPage;
