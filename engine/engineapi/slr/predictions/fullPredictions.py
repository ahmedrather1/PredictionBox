import pandas as pd
import numpy as np
from slr.utils import getOriginalData
from slr.models.slrModel import sampleSlrModel
from slr.models.customSlrModel import CustomSlrModel

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

def customSlrFullPrediction(file, predictor, response, b0, b1):
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
        b0int = float(b0)
    except Exception:
        raise ValueError("Invalid b0")
    
    try:
        b1int = float(b1)
    except Exception:
        raise ValueError("Invalid b1")
    
    original_data = getOriginalData(X, y)
    customSlrModel = CustomSlrModel(b0=b0int, b1=b1int)
    minValue = X[predictor].min() 
    maxValue = X[predictor].max()  
    xRange = np.linspace(minValue, maxValue, 500).reshape(-1, 1)  
    yPred = customSlrModel.predict(xRange)
    return (xRange.flatten().tolist(), yPred.tolist(), original_data.tolist())