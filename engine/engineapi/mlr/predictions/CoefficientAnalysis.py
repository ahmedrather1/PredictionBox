import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import statsmodels.api as sm
from commonutils.utils.RemoveOutliers import remove_outliers

def coefficientAnalysis(file, predictorsString, response):

    data = pd.read_csv(file)

    try:
        predictors = predictorsString.split(',')
    except Exception as e:
        raise KeyError("Invalid predictors array", e)

    if response not in data.columns:
            raise KeyError("Invalid response")
    if len(predictors) == 0:
            raise KeyError("Invalid predictors array")
    for predictor in predictors:
        if predictor not in data.columns:
            raise KeyError("Invalid predictors array")

    for predictor in predictors + [response]:
        data = remove_outliers(data, predictor)

    X = data[predictors]
    y = data[response]

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    X_scaled_sm = sm.add_constant(X_scaled)

    model_sm = sm.OLS(y, X_scaled_sm)
    model_sm.exog_names[:] = ["coef"] + predictors
    model_sm = model_sm.fit()
    coefficients = model_sm.params

    confidence_intervals = model_sm.conf_int()

    results = {}
    for index, coef in coefficients.items():
        lower, upper = confidence_intervals.loc[index]
        results[index] = {
            'coefficient': coef,
            'lower': lower,
            'upper': upper
        }

    return results
