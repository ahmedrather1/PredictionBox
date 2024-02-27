import pandas as pd
from sklearn.linear_model import RidgeCV
import json
from commonutils.utils.RemoveOutliers import remove_outliers
import numpy as np


def ridgeIndividualPrediction(file, predictorsString, response, dataPointRaw):
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
        
    for predictor in predictors + [response]:
        data = remove_outliers(data, predictor)

    X = data[predictors]
    y = data[response]

    alphas = np.logspace(-6, 6, 13)

    ridge_cv = RidgeCV(alphas=alphas, store_cv_values=True)
    ridge_cv.fit(X, y)

    dataPointDf = pd.DataFrame([dataPoint])
    missingPredictors = set(predictors) - set(dataPointDf.columns)

    if missingPredictors:
        raise KeyError(f"Data point is missing predictors: {missingPredictors}")
    
    prediction = ridge_cv.predict(dataPointDf)

    return prediction[0]
