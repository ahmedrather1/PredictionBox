import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Papa from "papaparse";
import MultipleModelFileUploadComponent from "../../fileUploadComponents/MultipleModelFileUploadComponent";
import Header from "../../common/Header";
import CustomForestPlotChart from "../../chartComponents/CustomForestChartComponent";
import ChoosePredictorsCard from "../../common/ChoosePredictorsCard";
import PartialRegressionsChartComponent from "../../chartComponents/PartialRegressionsChartComponent";
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

function PenaltyModelPage({
  Endpoints,
  ChoosePredictorsFormSchema,
  FinalPlotsInfoCard,
  GeneralInfoCard,
  ChooseDataCard,
  PredictorSelectionInfoCard,
  AboutAlphaCard,
}) {
  // TODO too many usestates! use redux instead
  const [columns, setColumns] = useState(null);
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);

  const [showCustomCoefs, setShowCustomCoefs] = useState(false);
  const [customCoefs, setCustomCoefs] = useState(null);
  const [alphaVal, setAlphaVal] = useState(null);
  const [partialRegressions, setPartialRegressions] = useState(null);

  const [initialPredictors, setInitialPredictors] = useState(null);
  const [finalPredictors, setFinalPredictors] = useState(null);
  const [finalPredictorsObject, setFinalPredictorsObject] = useState(null);

  const [coefs, setCoefs] = useState(null);

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
    if (customCoefs) {
      console.log(customCoefs);
      console.log("------------");
      console.log(coefs);
    }
  }, [customCoefs]);

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
    setAlphaVal(data.alpha);
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
              {Object.keys(partialRegressions)
                .slice(currentPage, currentPage + chartsPerPage)
                .map((key) => {
                  let predictorsAccountedFor = Object.keys(
                    partialRegressions
                  ).filter((item) => item !== key);
                  const raw = partialRegressions[key]["raw"];
                  const regressed = partialRegressions[key]["regressed"];
                  return (
                    <PartialRegressionsChartComponent
                      raw={raw}
                      regressed={regressed}
                      response={response}
                      predictorsAccountedFor={predictorsAccountedFor}
                      predictor={key}
                    />
                  );
                })}
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
                  response={response}
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
    } else if (coefs) {
      return (
        <Container fluid>
          <Row>
            <Col sm={8} className="mt-2">
              <div className="mt-3">
                <CustomForestPlotChart
                  coefs={coefs}
                  customcoefs={customCoefs}
                  showCustomCoefs={showCustomCoefs}
                  setShowCustomCoefs={setShowCustomCoefs}
                />
              </div>
              <div className="mt-3 mb-2">
                <PredictorSelectionInfoCard />
              </div>
            </Col>
            <Col sm={4} className="mt-2">
              <div className="mb-3 mt-3">
                <ChoosePredictorsCard
                  onSubmit={handleDataFromPredictorsSelectorForm}
                  schema={ChoosePredictorsFormSchema(initialPredictors)}
                />
              </div>
              <ChooseAlphaCard
                onSubmit={handleDataFromAlphaSelectorForm}
                schema={AlphaSelectorInputFormSchema()}
              />
              <div className="mt-3">
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
