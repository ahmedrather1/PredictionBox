import pandas as pd
import numpy as np
from sklearn.neighbors import KNeighborsRegressor
from sklearn.model_selection import cross_val_score, KFold
from django.conf import settings
import os

# this is a legacy function and it is no longer used. This was the code written for this project
def basicknn():
    file_path = os.path.join(settings.KNN_DATASET_PATH, 'iris.csv')
    df = pd.read_csv(file_path)
    X = df[['sepal.length']]
    y = df['sepal.width']


    kf = KFold(n_splits=5, shuffle=True, random_state=42)
    k_range = range(1, 31)
    k_scores = []

    for k in k_range:
        knn = KNeighborsRegressor(n_neighbors=k)
        scores = cross_val_score(knn, X, y, cv=kf, scoring='neg_mean_squared_error')
        k_scores.append(scores.mean())

    best_k = k_range[np.argmax(k_scores)]

    knn_final = KNeighborsRegressor(n_neighbors=best_k)
    knn_final.fit(X, y)
    min_value = X['sepal.length'].min()  # Extract the scalar minimum value
    max_value = X['sepal.length'].max()  
    x_range = np.linspace(X.min(), X.max(), 500)  # 500 points for a smooth curve
    x_range_to_return = np.linspace(min_value, max_value, 500) 
    y_pred = knn_final.predict(x_range)


    return (x_range_to_return.tolist(), y_pred.tolist())