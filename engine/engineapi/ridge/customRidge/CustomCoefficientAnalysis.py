import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge
import numpy as np
from commonutils.utils.RemoveOutliers import remove_outliers

def customCoefficientAnalysis(file, predictorsString, response, alpha_value_str):
    data = pd.read_csv(file)
    predictors = predictorsString.split(',')

    try:
        alpha_value = float(alpha_value_str)
        if alpha_value < 0:
            raise ValueError("alpha_value must be non-negative")
    except Exception:
        raise ValueError("alpha_value must be a valid number that is non-negative")

    if response not in data.columns:
        raise KeyError("Invalid response")
    if not predictors:
        raise KeyError("Invalid predictors array")
    for predictor in predictors:
        if predictor not in data.columns:
            raise KeyError(f"Predictor {predictor} not found in data")
        
    for column in predictors + [response]:
        data = remove_outliers(data, column)

    X = data[predictors]
    y = data[response]

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    ridge = Ridge(alpha=alpha_value)
    ridge.fit(X_scaled, y)
    
    coefficients = {'intercept': ridge.intercept_}
    for i, predictor in enumerate(predictors):
        coefficients[predictor] = ridge.coef_[i]
    return coefficients
