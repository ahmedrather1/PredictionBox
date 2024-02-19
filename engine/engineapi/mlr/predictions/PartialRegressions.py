import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from statsmodels.api import OLS, add_constant
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
            raise KeyError("Invalid predictors array")
    for predictor in predictors:
        if predictor not in data.columns:
            raise KeyError("Invalid predictors array")
    
    X = data[predictors]
    y = data[response]
    
    partialRegressionsData = {}
    
    for predictor in predictors:
        XOtherPredictors = X.drop(columns=[predictor])
        yModel = OLS(y, add_constant(XOtherPredictors)).fit()
        yResiduals = y - yModel.predict(add_constant(XOtherPredictors))
        
        predictorModel = OLS(X[predictor], add_constant(XOtherPredictors)).fit()
        predictorResiduals = X[predictor] - predictorModel.predict(add_constant(XOtherPredictors))
        
        partialRegressionsData[predictor] = {
            'x': predictorResiduals.tolist(),
            'y': yResiduals.tolist()
        }
    
    return partialRegressionsData