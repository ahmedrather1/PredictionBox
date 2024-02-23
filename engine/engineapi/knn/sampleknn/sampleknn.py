import pandas as pd
import numpy as np
from sklearn.neighbors import KNeighborsRegressor
from sklearn.model_selection import cross_val_score, KFold
from django.conf import settings
from commonutils.utils.getOriginalData import getOriginalData
from commonutils.utils.RemoveOutliers import remove_outliers
from knn.sampleknn.sampleknnModel import sampleKnnModel
import os

def sampleKnnFullPrediction(file, predictor, response):
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
    knn_final = sampleKnnModel(X, y)
    knn_final.fit(X, y)
    min_value = X[predictor].min()  
    max_value = X[predictor].max()  
    x_range = np.linspace(X.min(), X.max(), 500)  
    x_range_to_return = np.linspace(min_value, max_value, 500) 
    y_pred = knn_final.predict(x_range)

    return (x_range_to_return.tolist(), y_pred.tolist(), original_data.tolist())


def sampleKnnIndividualPrediction(file, predictor, response, xToPredict ):
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
    
    knn_final = sampleKnnModel(X, y)
    knn_final.fit(X, y)
    xToPredict = float(xToPredict)
    predicted_y = knn_final.predict([[xToPredict]])
    return (predicted_y[0][0])

