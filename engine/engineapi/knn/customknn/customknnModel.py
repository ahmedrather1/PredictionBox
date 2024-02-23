import pandas as pd
import numpy as np
from sklearn.neighbors import KNeighborsRegressor
from sklearn.model_selection import cross_val_score, KFold

def customKnnModel(X, y, customFolds, maxK, customK ):
    if (customFolds and maxK):
        try:
            intCustomFolds = int(customFolds)
            kf = KFold(n_splits=intCustomFolds, shuffle=True, random_state=42)
        except Exception as e:
            raise ValueError({"ValueError": str(e)})
        
        try:
            intMaxK = int(maxK)
            k_range = range(1, intMaxK)
            k_scores = []
            for k in k_range:
                knn = KNeighborsRegressor(n_neighbors=k)
                scores = cross_val_score(knn, X, y, cv=kf, scoring='neg_mean_squared_error')
                k_scores.append(scores.mean())

            best_k = k_range[np.argmax(k_scores)]
                
        except Exception as e:
            raise ValueError({"ValueError": str(e)})
    
    if customK:
        best_k = int(customK)

    knn_final = KNeighborsRegressor(n_neighbors=best_k)
    return knn_final
