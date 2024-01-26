import pandas as pd
import numpy as np
from slr.models.slrModel import sampleSlrModel
from slr.models.customSlrModel import CustomSlrModel

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

def customSlrIndividualPrediction(file, predictor, response, b0, b1, xToPredict):
    df = pd.read_csv(file)

    # x and y currently not needed for this, remove later
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
    
    try:
        b0int = int(b0)
    except Exception:
        raise ValueError("Invalid b0")
    
    try:
        b1int = int(b1)
    except Exception:
        raise ValueError("Invalid b1")

    customSlrModel = CustomSlrModel(b0=b0int, b1=b1int)

    predictedY = customSlrModel.predict(xToPredict)
    return (predictedY)
