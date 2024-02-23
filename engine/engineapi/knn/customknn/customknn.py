import pandas as pd
import numpy as np
from commonutils.utils.RemoveOutliers import remove_outliers
from knn.customknn.customknnModel import customKnnModel

def customKnnFullPrediction(file, predictor, response, customFolds, maxK, customK ):
    try:
        customFolds = int(customFolds)
    except Exception:
        customFolds = None
    try:
        maxK = int(maxK)
    except Exception:
        maxK = None    

    try:
        customK = int(customK)
    except Exception:
        customK = None   

    try:
        df = pd.read_csv(file)
    except Exception as e:
        raise ValueError("file doesnt exist!")


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
    
    if not (customFolds and maxK) and not customK:
        raise ValueError("You must provide either a customFold+maxK or a customK")
    
    if (customFolds  or maxK ) and customK :
        raise ValueError("Either customFolds XOR customK must be undefined")
    
    knn_final = customKnnModel(X, y, customFolds, maxK, customK)
    knn_final.fit(X, y)
    min_value = X[predictor].min()  
    max_value = X[predictor].max()  
    x_range = np.linspace(X.min(), X.max(), 500)  
    x_range_to_return = np.linspace(min_value, max_value, 500) 
    y_pred = knn_final.predict(x_range)

    # TODO process data here instead of frontend

    Xarr = X.to_numpy().transpose()[0]
    yarr = y.to_numpy().transpose()[0]
    originalData = np.vstack((Xarr, yarr)).T

    return (x_range_to_return.tolist(), y_pred.tolist(), originalData.tolist())


def customKnnIndividualPrediction(file, predictor, response, customFolds, maxK, customK, xToPredict ):
    try:
        customFolds = int(customFolds)
    except Exception:
        customFolds = None
    try:
        maxK = int(maxK)
    except Exception:
        maxK = None    

    try:
        customK = int(customK)
    except Exception:
        customK = None   

    try:
        df = pd.read_csv(file)
    except Exception as e:
        raise ValueError("file doesnt exist!")


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
    
    if not (customFolds and maxK) and not customK:
        raise ValueError("You must provide either a customFold+maxK or a customK")
    
    knn_final = customKnnModel(X, y, customFolds, maxK, customK)
    knn_final.fit(X, y)
    xToPredict = float(xToPredict)
    predicted_y = knn_final.predict([[xToPredict]])
    return (predicted_y[0][0])



