import { MultipleParameterPredictionInputFormSchema } from "../../../formSchemas/MultipleParameterPredictionInputFormSchema";

export const generatePredictionFormSchema = async (
  columns,
  response,
  finalPredictors,
  setFinalPredictorsObject,
  setPredictionInputFormSchema
) => {
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
  let schema = MultipleParameterPredictionInputFormSchema(finalPredictorsObj);
  setPredictionInputFormSchema(schema);
};

export const processAndSetInitialPredictors = async (
  columns,
  data,
  setInitialPredictors
) => {
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

export const processAndSetFinalPredictors = async (
  data,
  initialPredictors,
  setFinalPredictors
) => {
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
  chosenPredictors.sort();
  setFinalPredictors(chosenPredictors);
};

export const callPartialRegressions = async (
  file,
  finalPredictors,
  response,
  setPartialRegressions,
  Endpoints
) => {
  if (finalPredictors.length > 0) {
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
};

export const callCoefficientAnalysis = async (
  file,
  initialPredictors,
  response,
  setCoefAnalysis,
  Endpoints
) => {
  let predictorsRaw = [];

  Object.keys(initialPredictors).forEach((key) => predictorsRaw.push(key));

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
};

export const callIndividualPrediction = async (
  file,
  finalPredictors,
  response,
  predictorsFullSorted,
  setIndividualPrediction,
  Endpoints
) => {
  const formData = new FormData();

  formData.append("csv-file", file);
  formData.append("predictors", finalPredictors);
  formData.append("response", response);
  formData.append("datapoint", JSON.stringify(predictorsFullSorted));

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

export const buildDataPoint = (data, finalPredictorsObject) => {
  let predictorsRaw = Object.keys(data);
  let predictorsFullUnsorted = {};

  predictorsRaw.forEach((value) => {
    const key = Object.keys(finalPredictorsObject).find(
      (key) => finalPredictorsObject[key] === value
    );
    if (key) {
      predictorsFullUnsorted[key] = data[value];
    }
  });

  let predictorsFullSorted = {};
  let predictorsFullKeys = Object.keys(predictorsFullUnsorted).sort();

  predictorsFullKeys.forEach(
    (key) => (predictorsFullSorted[key] = predictorsFullUnsorted[key])
  );
  return predictorsFullSorted;
};
