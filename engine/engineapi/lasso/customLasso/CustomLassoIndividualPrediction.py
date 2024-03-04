import pandas as pd
from sklearn.linear_model import LassoCV
from commonutils.utils.RemoveOutliers import remove_outliers
import numpy as np
import json


def lassoCustomIndividualPrediction(file, predictorsString, response, alpha_value_str, dataPointRaw):
    data = pd.read_csv(file)

    try:
        alpha_value = float(alpha_value_str)
        if alpha_value < 0:
            raise ValueError("alpha_value must be non-negative")
    except ValueError as e:
        raise ValueError("alpha_value must be a valid number that is non-negative")

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
        
    for predictor in predictors + [response]:
        data = remove_outliers(data, predictor)

    X = data[predictors]
    y = data[response]

    lasso_cv = LassoCV(alphas=[alpha_value], cv=5, max_iter=10000)
    lasso_cv.fit(X, y)

    dataPointDf = pd.DataFrame([dataPoint])
    missingPredictors = set(predictors) - set(dataPointDf.columns)

    if missingPredictors:
        raise KeyError(f"Data point is missing predictors: {missingPredictors}")
    
    prediction = lasso_cv.predict(dataPointDf)

    return prediction[0]
