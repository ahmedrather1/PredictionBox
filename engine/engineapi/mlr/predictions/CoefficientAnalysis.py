import pandas as pd
import numpy as np
from mlr.utils import getOriginalData
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import statsmodels.api as sm
import ast

def coefficientAnalysis(file, predictorsString, response):
    # print("-------------------------------------------------------")
    # predictors = "[" + predictors
    # print(predictors[0])
    # print(response)
    # print("-------------------------------------------------------")

    data = pd.read_csv(file)
    # predictors = ast.literal_eval(predictors)

    try:
        predictors = predictorsString.split(',')
        print("-------------------------------------------------------")
        print(predictors)
        print("-------------------------------------------------------")       
    except Exception as e:
        raise KeyError("Invalid predictors array", e)

    if response not in data.columns:
            raise KeyError("Invalid response")
    if len(predictors) == 0:
            raise KeyError("Invalid predictors array")
    for predictor in predictors:
        if predictor not in data.columns:
            raise KeyError("Invalid predictors array")


    X = data[predictors]
    y = data[response]

   # Standardize the features
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
