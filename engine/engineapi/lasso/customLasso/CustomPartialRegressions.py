import pandas as pd
import numpy as np
from sklearn.linear_model import LassoCV
from sklearn.preprocessing import StandardScaler
from commonutils.utils.RemoveOutliers import remove_outliers
from slr.slr.slrModel import sampleSlrModel


def customPartialRegressions(file, predictorsString, response, alpha_value_str):
    data = pd.read_csv(file)

    try:
        alpha_value = float(alpha_value_str)
        if alpha_value < 0:
            raise ValueError("alpha_value must be non-negative")
    except ValueError as e:
        raise ValueError("alpha_value must be a valid number that is non-negative")

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

    scaler_X = StandardScaler()
    scaler_y = StandardScaler()
    X_scaled = scaler_X.fit_transform(X)
    y_scaled = scaler_y.fit_transform(y.values.reshape(-1, 1)).flatten()

    lasso_cv = LassoCV(alphas=[alpha_value], cv=5, max_iter=10000)
    lasso_cv.fit(X_scaled, y_scaled)

    partialRegressionsData = {}

    for predictor in predictors:
        if len(predictors) > 1:
            X_other_predictors_scaled = np.delete(X_scaled, predictors.index(predictor), axis=1)
            ridge_y = LassoCV(alphas=[alpha_value], cv=5, max_iter=10000)
            ridge_y.fit(X_other_predictors_scaled, y_scaled)
            yResiduals = y_scaled - ridge_y.predict(X_other_predictors_scaled)
            
            X_target_predictor_scaled = X_scaled[:, predictors.index(predictor)].reshape(-1, 1)
            ridge_x = LassoCV(alphas=[alpha_value], cv=5, max_iter=10000)
            ridge_x.fit(X_other_predictors_scaled, X_target_predictor_scaled)
            predictorResiduals = X_target_predictor_scaled.flatten() - ridge_x.predict(X_other_predictors_scaled).flatten()
        else:
            yResiduals = y_scaled
            predictorResiduals = X_scaled.flatten()

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