import pandas as pd
import numpy as np
from mlr.utils import getOriginalData
from mlr.models.mlrModel import sampleMlrModel
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import statsmodels.api as sm

def sampleMlrFullPrediction(file, predictor, response):
    data = pd.read_csv(file)
    features = ['sepal.length', 'sepal.width', 'petal.width']  # Replace with your actual feature names
    target = 'petal.length'  # Replace with your actual target name

    X = data[features]
    y = data[target]

   # Standardize the features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    X_scaled_sm = sm.add_constant(X_scaled)

    model_sm = sm.OLS(y, X_scaled_sm).fit()

    coefficients = model_sm.params
    print("Coefficients:\n", coefficients)

    confidence_intervals = model_sm.conf_int()
    print("\nConfidence Intervals:\n", confidence_intervals)


    print("\nModel Summary:\n", model_sm.summary())