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

  // TODO extract into smaller components
  const renderContent = () => {
    if (partialRegressions) {
      return (
        <Container fluid>
          <Row>
            <Col sm={8} className="mt-3">
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
            </Col>
            <Col>
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
            </Col>
          </Row>
          <Row>
            <Container>
              <Col md={8}>
                <FinalPlotsInfoCard />
              </Col>
            </Container>
          </Row>
        </Container>
      );
    } else if (coefAnalysis) {
      return (
        <Container fluid>
          <Row>
            <Col sm={8} className="mt-3">
              <ForestPlotChart coefInfo={coefAnalysis} />
            </Col>
            <Col>
              <div className="mb-3 mt-3">
                <ChoosePredictorsCard
                  onSubmit={handleDataFromPredictorsSelectorForm}
                  schema={ChoosePredictorsFormSchema(initialPredictors)}
                />
              </div>
              <div className="mb-3">
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
