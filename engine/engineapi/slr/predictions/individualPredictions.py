import pandas as pd
import numpy as np
from sklearn.neighbors import KNeighborsRegressor
from sklearn.model_selection import cross_val_score, KFold
from slr.utils import getOriginalData
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
