import pandas as pd
import numpy as np
from slr.utils import getOriginalData
from slr.slr.slrModel import sampleSlrModel

def sampleSlrFullPrediction(file, predictor, response):
    df = pd.read_csv(file)

    try:
        X = df[[predictor]]
    except KeyError:
        raise KeyError("Predictor doesn't exist!")

    try:
        y = df[[response]]
    except KeyError:
        raise KeyError("Response doesnt exist!")
    
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
        X = df[[predictor]]
    except KeyError:
        raise KeyError("Predictor doesn't exist!")

    try:
        y = df[[response]]
    except KeyError:
        raise KeyError("Response doesnt exist!")
    
    try:
        xToPredict = float(xToPredict)
    except Exception as e:
        raise ValueError("Invalid X to predict")
    
    slrModel = sampleSlrModel(X, y)

    predictedY = slrModel.predict([[xToPredict]])
    return (predictedY[0][0])

