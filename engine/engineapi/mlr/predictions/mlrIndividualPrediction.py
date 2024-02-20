import pandas as pd
from sklearn.linear_model import LinearRegression
import ast
import json

def mlrIndividualPrediction(file, predictorsString, response, dataPointRaw):
    data = pd.read_csv(file)

    try:
        predictors = predictorsString.split(',')
    except Exception:
        raise KeyError("Invalid predictors array")
    
    try:
        dataPoint = json.loads(dataPointRaw)
    except Exception as e:
        raise ValueError(f"Invalid data point format: {e}")

    if response not in data.columns:
            raise KeyError("Invalid response")
    if len(predictors) == 0:
            raise KeyError("Invalid predictors array")
    for predictor in predictors:
        if predictor not in data.columns:
            raise KeyError("Invalid predictors array")

    X = data[predictors]
    y = data[response]
    mlrModel = LinearRegression()
    mlrModel.fit(X, y)

    dataPointDf = pd.DataFrame([dataPoint])
    missingPredictors = set(predictors) - set(dataPointDf.columns)

    if missingPredictors:
        raise KeyError(f"Data point is missing predictors: {missingPredictors}")
    
    prediction = mlrModel.predict(dataPointDf)

    return prediction[0]