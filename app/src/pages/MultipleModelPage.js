import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Papa from "papaparse";
import ChartComponent from "../components/common/ChartComponent";
import { PredictionInputFormSchema } from "../formSchemas/common/PredictionInputFormSchema";
import CustomParameterCard from "../components/common/CustomParameterCard";
import IndividualPredictionCard from "../components/common/IndividualPredictionCard";
import MultipleModelFileUploadComponent from "../components/common/MultipleModelFileUploadComponent";
import Header from "../components/common/Header";
import ForestPlotChart from "../components/common/ForestChartComponent";
import ChoosePredictorsCard from "../components/common/ChoosePredictorsCard";
import PartialRegressionsChartComponent from "../components/common/PartialRegressionsChartComponent";
import PaginationComponent from "../components/common/PaginationComponent";
import MultipleParameterIndividualPredictionCard from "../components/common/MultipleParameterIndividualPredictionCard";
import { MultipleParameterPredictionInputFormSchema } from "../components/common/MultipleParameterPredictionInputFormSchema";

function MultipleModelPage({
  Endpoints,
  CustomParameterInputFormSchema,
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

  const [xrange, setXrange] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  const [partialRegressions, setPartialRegressions] = useState(null);

  const [initialPredictors, setInitialPredictors] = useState(null);
  const [predictor, setPredictors] = useState(null);
  const [finalPredictors, setFinalPredictors] = useState(null);
  const [finalPredictorsObject, setFinalPredictorsObject] = useState(null);

  const [coefAnalysis, setCoefAnalysis] = useState(null);

  const [response, setResponse] = useState(null);

  const [ypred, setYpred] = useState(null);
  const [samplePrediction, setSamplePrediction] = useState(null);
  const [sampleIndividualPrediction, setSampleIndividualPrediction] =
    useState(null);

  const [customYPred, setCustomYPred] = useState(null);
  const [customPrediction, setCustomPrediction] = useState(null);
  const [showCustomPrediction, setShowCustomPrediction] = useState(false);
  const [customParameters, setCustomParameters] = useState(null);
  const [individualPrediction, setIndividualPrediction] = useState(null);

  const [predictionInputFormSchema, setPredictionInputFormSchema] =
    useState(null);
  const [customParameterInputFormSchema, setCustomParameterInputFormSchema] =
    useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const chartsPerPage = 1;

  useEffect(() => {
    if (finalPredictors) {
      const index = columns.indexOf(response);
      let predictorsRaw = finalPredictors;
      if (index > -1) {
        predictorsRaw.splice(index, 1);
      }
      let finalPredictorsObj = {};
      predictorsRaw.forEach((predictor) => {
        finalPredictorsObj[predictor] = predictor.replace(/\./g, " ");
      });
      setFinalPredictorsObject(finalPredictorsObj);
      let schema =
        MultipleParameterPredictionInputFormSchema(finalPredictorsObj);
      setPredictionInputFormSchema(schema);
    }
  }, [finalPredictors]);

  useEffect(() => {
    let schema = CustomParameterInputFormSchema(originalData);
    setCustomParameterInputFormSchema(schema);
  }, [originalData]);

  useEffect(() => {
    if (finalPredictors && response) {
      const formData = new FormData();
      formData.append("csv-file", file);
      formData.append("predictors", finalPredictors);
      formData.append("response", response);
      fetch(
        `${process.env.REACT_APP_API_URL}${Endpoints.PARTIAL_REGRESSIONS_URL}`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setPartialRegressions(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
    console.log("final predictors!", finalPredictors);
  }, [finalPredictors, response]);

  useEffect(() => {
    if (partialRegressions) {
      console.log(
        "------------partial regressions---------------!",
        partialRegressions
      );
    }
  }, [partialRegressions]);

  useEffect(() => {
    if (response && initialPredictors) {
      let predictorsRaw = [];
      console.log(initialPredictors);
      console.log(Object.keys(initialPredictors));
      Object.keys(initialPredictors).forEach((key) => predictorsRaw.push(key));

      console.log(predictorsRaw);

      const formData = new FormData();
      formData.append("csv-file", file);
      formData.append("response", response);
      formData.append("predictors", predictorsRaw);

      fetch(
        `${process.env.REACT_APP_API_URL}${Endpoints.COEFFICIENT_ANALYSIS_URL}`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          let coefInfo = data.result;
          let predictorKeys = Object.keys(coefInfo);
          let processedCoefInfo = predictorKeys
            .filter((key) => key !== "coef")
            .map((key) => {
              return [
                key,
                parseFloat(coefInfo[key].coefficient),
                parseFloat(coefInfo[key].lower),
                parseFloat(coefInfo[key].upper),
              ];
            });
          setCoefAnalysis(processedCoefInfo);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [response, initialPredictors]);

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

  const handleDataFromResponseSelector = (data) => {
    setResponse(data.response);
    const index = columns.indexOf(data.response);
    let predictorsRaw = columns;
    if (index > -1) {
      predictorsRaw.splice(index, 1);
    }
    let predictors = {};
    predictorsRaw.forEach((predictor) => {
      predictors[predictor] = predictor.replace(/\./g, " ");
    });
    setInitialPredictors(predictors);
  };

  const handleDataFromPredictorsSelectorForm = (data) => {
    let chosenPredictorsRaw = Object.keys(data).filter(
      (key) => data[key] === true
    );
    let chosenPredictors = [];

    chosenPredictorsRaw.forEach((value) => {
      const key = Object.keys(initialPredictors).find(
        (key) => initialPredictors[key] === value
      );
      if (key) {
        chosenPredictors.push(key);
      }
    });
    setFinalPredictors(chosenPredictors);
  };

  const handleDataFromPredictionForm = (data) => {
    console.log("FROM PREDICTION FORM ------------ ", data);
    let predictorsRaw = Object.keys(data);
    let predictorsFull = {};

    predictorsRaw.forEach((value) => {
      const key = Object.keys(finalPredictorsObject).find(
        (key) => finalPredictorsObject[key] === value
      );
      if (key) {
        predictorsFull[key] = data[value];
      }
    });

    const formData = new FormData();

    formData.append("csv-file", file);
    formData.append("predictors", finalPredictors);
    formData.append("response", response);
    formData.append("datapoint", JSON.stringify(predictorsFull));

    console.log(formData);
    fetch(
      `${process.env.REACT_APP_API_URL}${Endpoints.INDIVIDUAL_PREDICTION_URL}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setIndividualPrediction({
          predictedY: +parseFloat(data.result).toFixed(4),
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

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
