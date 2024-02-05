from django.db import models

import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression


def sampleMlrModel(X, y):
    slr_model = LinearRegression()
    slr_model.fit(X, y)
    return slr_model
