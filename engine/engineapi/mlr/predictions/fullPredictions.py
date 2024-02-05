import pandas as pd
import numpy as np
from mlr.utils import getOriginalData
from mlr.models.mlrModel import sampleMlrModel

def sampleMlrFullPrediction(file, predictor, response):
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
    slrModel = sampleMlrModel(X, y)
    minValue = X[predictor].min() 
    maxValue = X[predictor].max()  
    xRange = np.linspace(minValue, maxValue, 500).reshape(-1, 1)  
    yPred = slrModel.predict(xRange)
    return (xRange.flatten().tolist(), yPred.tolist(), original_data.tolist())