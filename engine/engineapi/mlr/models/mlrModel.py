from django.db import models

import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

class MlrModel():
    def __init__(self, X, y):
        self.X = X
        self.y = y
        mlrModel = LinearRegression()
        mlrModel.fit(self.X, self.y)
        self.mlrModel = mlrModel

    def predict(self, X):
        return self.b0 + (self.b1 * X)
    

def mlrModel(X, y):
    mlrModel = LinearRegression()
    mlrModel.fit(X, y)
    return mlrModel

