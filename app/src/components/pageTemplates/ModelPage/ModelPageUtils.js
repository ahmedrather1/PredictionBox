export const callSampleModelFull = async (
  file,
  predictor,
  response,
  setYpred,
  setXrange,
  setOriginalData,
  Endpoints
) => {
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
};

export const callSampleModelIndividual = async (
  file,
  predictor,
  response,
  data,
  setSampleIndividualPrediction,
  Endpoints
) => {
  const formData = new FormData();
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
};

export const callCustomModelIndividual = async (
  file,
  predictor,
  response,
  data,
  PossibleCustomParams,
  setCustomIndividualPrediction,
  customParameters,
  Endpoints
) => {
  const formData = new FormData();
  formData.append("csv-file", file);
  formData.append("predictor", predictor);
  formData.append("response", response);
  formData.append("xToPredict", data.predictorCustom);
  Object.entries(PossibleCustomParams).forEach(([key, value]) => {
    formData.append(value, customParameters[value]);
  });

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
};

export const callCustomModelFull = async (
  file,
  predictor,
  response,
  PossibleCustomParams,
  setCustomYPred,
  data,
  Endpoints
) => {
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
