import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from slr.models.slrModel import sampleSlrModel
from statsmodels.api import OLS, add_constant
import numpy as np

import ast

def partialRegressions(file, predictorsString, response):
    data = pd.read_csv(file)

    try:
        predictors = predictorsString.split(',')
    except Exception as e:
        raise KeyError("Invalid predictors array", e)

    if response not in data.columns:
            raise KeyError("Invalid response")
    if len(predictors) == 0:
            raise KeyError("Invalid predictors array: no predictors!")
    for predictor in predictors:
        if predictor not in data.columns:
            raise KeyError("Invalid predictors array: " + predictor + " not in your dataset")
    
    X = data[predictors]
    y = data[response]
    
    partialRegressionsData = {}
    
    for predictor in predictors:
        XOtherPredictors = X.drop(columns=[predictor])
        yModel = OLS(y, add_constant(XOtherPredictors)).fit()
        yResiduals = y - yModel.predict(add_constant(XOtherPredictors))
        
        predictorModel = OLS(X[predictor], add_constant(XOtherPredictors)).fit()
        predictorResiduals = X[predictor] - predictorModel.predict(add_constant(XOtherPredictors))
        predictorResiduals2d = predictorResiduals.values.reshape(-1, 1)

        xRaw = predictorResiduals.tolist()
        yRaw = yResiduals.tolist()

        slrModel = sampleSlrModel(predictorResiduals2d, yResiduals)
        minValue = X[predictor].min() 
        maxValue = X[predictor].max()  
        xRange = np.linspace(minValue, maxValue, 500).reshape(-1, 1)  
        yPred = slrModel.predict(xRange)
        
        partialRegressionsData[predictor] = {
            'raw': {            
                'x': xRaw,
                'y': yRaw
            },
            'regressed': {
                'x': xRange.flatten().tolist(),
                'y': yPred.tolist()
            }

        }
    
    return partialRegressionsData