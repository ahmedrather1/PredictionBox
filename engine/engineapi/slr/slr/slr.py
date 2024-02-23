import pandas as pd
import numpy as np
from slr.utils import getOriginalData
from slr.slr.slrModel import sampleSlrModel
from commonutils.utils.RemoveOutliers import remove_outliers

def sampleSlrFullPrediction(file, predictor, response):
    df = pd.read_csv(file)

    try:
        df = remove_outliers(df, predictor)
    except Exception:
        raise KeyError("Predictor doesn't exist!")

    try:
        df = remove_outliers(df, response)
    except Exception:
        raise KeyError("Response doesnt exist!")
    
    X = df[[predictor]]
    y = df[[response]]

    original_data = getOriginalData(X, y)
    slrModel = sampleSlrModel(X, y)
    minValue = X[predictor].min() 
    maxValue = X[predictor].max()  
    xRange = np.linspace(minValue, maxValue, 500).reshape(-1, 1)  
    yPred = slrModel.predict(xRange)
    return (xRange.flatten().tolist(), yPred.tolist(), original_data.tolist())

def sampleSlrIndividualPrediction(file, predictor, response, xToPredict):
    df = pd.read_csv(file)

    try:
        df = remove_outliers(df, predictor)
    except Exception:
        raise KeyError("Predictor doesn't exist!")

    try:
        df = remove_outliers(df, response)
    except Exception:
        raise KeyError("Response doesnt exist!")
    
    X = df[[predictor]]
    y = df[[response]]
    
    try:
        xToPredict = float(xToPredict)
    except Exception as e:
        raise ValueError("Invalid X to predict")
    
    slrModel = sampleSlrModel(X, y)

    predictedY = slrModel.predict([[xToPredict]])
    return (predictedY[0][0])

