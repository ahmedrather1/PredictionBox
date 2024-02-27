import pandas as pd
import numpy as np
from sklearn.linear_model import RidgeCV
from sklearn.preprocessing import StandardScaler
from statsmodels.api import add_constant
from commonutils.utils.RemoveOutliers import remove_outliers
from slr.slr.slrModel import sampleSlrModel


def partialRegressions(file, predictorsString, response):
    data = pd.read_csv(file)

    try:
        predictors = predictorsString.split(',')
    except Exception as e:
        raise KeyError("Invalid predictors array", e)

    if response not in data.columns:
        raise KeyError("Invalid response")
    if len(predictors) == 0:
        raise KeyError("Invalid predictors array: no predictors!")
    for predictor in predictors:
        if predictor not in data.columns:
            raise KeyError(f"Invalid predictors array: {predictor} not in your dataset")

    for predictor in predictors + [response]:
        data = remove_outliers(data, predictor)

    X = data[predictors]
    y = data[response]

    print(predictors)
    print(response)

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    y_scaled = scaler.fit_transform(y.values.reshape(-1, 1)).flatten()

    alphas = np.logspace(-6, 6, 13)
    
    ridge_cv = RidgeCV(alphas=alphas, store_cv_values=True)
    ridge_cv.fit(X_scaled, y_scaled)
    
    optimal_alpha = ridge_cv.alpha_

    partialRegressionsData = {}

    for predictor in predictors:
        X_other_predictors_scaled = np.delete(X_scaled, predictors.index(predictor), axis=1)
        
        ridge_y = RidgeCV(alphas=[optimal_alpha])
        ridge_y.fit(X_other_predictors_scaled, y_scaled)
        yResiduals = y_scaled - ridge_y.predict(X_other_predictors_scaled)
        
        X_target_predictor_scaled = X_scaled[:, predictors.index(predictor)].reshape(-1, 1)
        ridge_x = RidgeCV(alphas=[optimal_alpha])
        ridge_x.fit(X_other_predictors_scaled, X_target_predictor_scaled)
        predictorResiduals = X_target_predictor_scaled.flatten() - ridge_x.predict(X_other_predictors_scaled).flatten()
        predictorResiduals2d = predictorResiduals.reshape(-1, 1)

        xRaw = predictorResiduals.tolist()
        yRaw = yResiduals.tolist()

        slrModel = sampleSlrModel(predictorResiduals2d, yResiduals)
        minValue = min(xRaw)
        maxValue = max(xRaw) 
        xRange = np.linspace(minValue, maxValue, 150).reshape(-1, 1)  
        yPred = slrModel.predict(xRange)
        

        partialRegressionsData[predictor] = {
            'raw': {            
                'x': xRaw,
                'y': yRaw
            },
            'regressed': {
                'x': xRange.flatten().tolist(),
                'y': yPred.tolist()
            }
        }

    return partialRegressionsData