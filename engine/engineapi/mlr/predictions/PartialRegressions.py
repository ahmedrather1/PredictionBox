import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from statsmodels.api import OLS, add_constant
import ast

def partialRegressions(file, predictors, response):
    data = pd.read_csv(file)

    try:
        predictors = ast.literal_eval(predictors)
    except Exception:
        raise KeyError("Invalid predictors array")

    if response not in data.columns:
            raise KeyError("Invalid response")
    if len(predictors) == 0:
            raise KeyError("Invalid predictors array")
    for predictor in predictors:
        if predictor not in data.columns:
            raise KeyError("Invalid predictors array")
    
    # Step 2: Prepare X and Y for the MLR model
    X = data[predictors]
    y = data[response]
    
    # Fit the MLR model
    mlrModel = LinearRegression()
    mlrModel.fit(X, y)
    
    # Initialize a dictionary to hold residuals for plots
    partialRegressionsData = {}
    
    # Step 3: Calculate residuals for each predictor's partial regression plot
    for predictor in predictors:
        # Exclude the current predictor from the model for Y
        XOtherPredictors = X.drop(columns=[predictor])
        yModel = OLS(y, add_constant(XOtherPredictors)).fit()
        yResiduals = y - yModel.predict(add_constant(XOtherPredictors))
        
        # Exclude the current predictor and model it against other predictors
        predictorModel = OLS(X[predictor], add_constant(XOtherPredictors)).fit()
        predictorResiduals = X[predictor] - predictorModel.predict(add_constant(XOtherPredictors))
        
        # Store residuals for plotting
        partialRegressionsData[predictor] = {
            'x': predictorResiduals.tolist(),
            'y': yResiduals.tolist()
        }
    
    return partialRegressionsData