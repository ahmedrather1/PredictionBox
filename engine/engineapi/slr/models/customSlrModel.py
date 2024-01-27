from sklearn.base import BaseEstimator, RegressorMixin

class CustomSlrModel(BaseEstimator, RegressorMixin):
    def __init__(self, b0, b1):
        self.b0 = b0
        self.b1 = b1

    def predict(self, X):
        return self.b0 + (self.b1 * X)