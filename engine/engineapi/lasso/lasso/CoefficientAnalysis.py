import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LassoCV
import numpy as np
from commonutils.utils.RemoveOutliers import remove_outliers

def coefficientAnalysis(file, predictorsString, response):

    data = pd.read_csv(file)
    predictors = predictorsString.split(',')

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

    alphas = np.logspace(-6, 6, 13)
    lasso_cv = LassoCV(alphas=alphas, cv=5, max_iter=10000)
    lasso_cv.fit(X_scaled, y)
    
    coefficients = {'coef': lasso_cv.intercept_}
    for i, predictor in enumerate(predictors):
        coefficients[predictor] = lasso_cv.coef_[i]
    return coefficients
