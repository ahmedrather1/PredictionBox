import pandas as pd
import numpy as np
from sklearn import datasets
from sklearn.neighbors import KNeighborsRegressor
from sklearn.model_selection import cross_val_score, KFold
import matplotlib.pyplot as plt
from django.conf import settings
import os

def basicknn():

    # Load Iris dataset
    file_path = os.path.join(settings.KNN_DATASET_PATH, 'iris.csv')
    df = pd.read_csv(file_path)
    X = df[['sepal.length']]
    y = df['sepal.width']


    kf = KFold(n_splits=5, shuffle=True, random_state=42)
    k_range = range(1, 31)
    k_scores = []

    for k in k_range:
        knn = KNeighborsRegressor(n_neighbors=k)
        scores = cross_val_score(knn, X, y, cv=kf, scoring='neg_mean_squared_error')
        k_scores.append(scores.mean())

    best_k = k_range[np.argmax(k_scores)]
    print(f"Best K value: {best_k}")

    knn_final = KNeighborsRegressor(n_neighbors=best_k)
    knn_final.fit(X, y)
    min_value = X['sepal.length'].min()  # Extract the scalar minimum value
    max_value = X['sepal.length'].max()  
    x_range = np.linspace(X.min(), X.max(), 500)  # 500 points for a smooth curve
    x_range_to_return = np.linspace(min_value, max_value, 500) 
    y_pred = knn_final.predict(x_range)


    return (x_range_to_return.tolist(), y_pred.tolist())

def customKnn(file, predictor, response, customFolds, maxK, customK ):

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
        X = df[[predictor]]
    except Exception as e:
        raise KeyError("Predictor doesn't exist!")

    try:
        y = df[[response]]
    except Exception as e:
        raise KeyError("Response doesnt exist!")
    
    if not (customFolds and maxK) and not customK:
        raise ValueError("You must provide either a customFold+maxK or a customK")
    
    if (customFolds  or maxK ) and customK :

        print(customFolds)
        print(maxK)
        print(customK)

        raise ValueError("Either customFolds XOR customK must be undefined")
    
    if (customFolds and maxK):
        try:
            intCustomFolds = int(customFolds)
            kf = KFold(n_splits=intCustomFolds, shuffle=True, random_state=42)
        except Exception as e:
            raise ValueError({"ValueError": str(e)})
        
        try:
            intMaxK = int(maxK)
            k_range = range(1, intMaxK)
            k_scores = []
            for k in k_range:
                knn = KNeighborsRegressor(n_neighbors=k)
                scores = cross_val_score(knn, X, y, cv=kf, scoring='neg_mean_squared_error')
                k_scores.append(scores.mean())

            best_k = k_range[np.argmax(k_scores)]
            print(f"Best K value: {best_k}")
                
        except Exception as e:
            raise ValueError({"ValueError": str(e)})
    
    if customK:
        best_k = int(customK)


    knn_final = KNeighborsRegressor(n_neighbors=best_k)
    

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

def bestknn(file, predictor, response):

    df = pd.read_csv(file)

    try:
        X = df[[predictor]]
    except KeyError:
        raise KeyError("Predictor doesn't exist!")

    try:
        y = df[[response]]
    except KeyError:
        raise KeyError("Response doesnt exist!")
    
    print(y.to_numpy().transpose())
    Xarr = X.to_numpy().transpose()[0]
    yarr = y.to_numpy().transpose()[0]


    original_data = np.vstack((Xarr, yarr)).T

    kf = KFold(n_splits=5, shuffle=True, random_state=42)
    k_range = range(1, 31)
    k_scores = []

    for k in k_range:
        knn = KNeighborsRegressor(n_neighbors=k)
        scores = cross_val_score(knn, X, y, cv=kf, scoring='neg_mean_squared_error')
        k_scores.append(scores.mean())

    best_k = k_range[np.argmax(k_scores)]
    print(f"Best K value: {best_k}")

    knn_final = KNeighborsRegressor(n_neighbors=best_k)
    knn_final.fit(X, y)
    min_value = X[predictor].min()  # Extract the scalar minimum value
    max_value = X[predictor].max()  
    x_range = np.linspace(X.min(), X.max(), 500)  # 500 points for a smooth curve
    x_range_to_return = np.linspace(min_value, max_value, 500) 
    y_pred = knn_final.predict(x_range)

    # TODO process data here instead of frontend

    return (x_range_to_return.tolist(), y_pred.tolist(), original_data.tolist())

          