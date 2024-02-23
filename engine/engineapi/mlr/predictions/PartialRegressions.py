import pandas as pd
from slr.slr.slrModel import sampleSlrModel
from statsmodels.api import OLS, add_constant
import numpy as np
from commonutils.utils.RemoveOutliers import remove_outliers

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
        
    for predictor in predictors + [response]:
        data = remove_outliers(data, predictor)
    
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
        minValue = min(xRaw)
        maxValue = max(xRaw) 
        xRange = np.linspace(minValue, maxValue, 150).reshape(-1, 1)  
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