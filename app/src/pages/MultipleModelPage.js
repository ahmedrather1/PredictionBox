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

function MultipleModelPage({
  Endpoints,
  PossibleCustomParams,
  CustomParameterInputFormSchema,
  ChoosePredictorsFormSchema,
  CustomParameterInfoCard,
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
          //setOriginalData(data.originalData);
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
    if (partialRegressions) {
      return (
        <Container fluid>
          {Object.keys(partialRegressions).map((key) => {
            const x = partialRegressions[key]["x"];
            const y = partialRegressions[key]["y"];
            return <PartialRegressionsChartComponent x={x} y={y} />;
          })}
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
