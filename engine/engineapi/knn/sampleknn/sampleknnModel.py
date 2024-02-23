import numpy as np
from sklearn.neighbors import KNeighborsRegressor
from sklearn.model_selection import cross_val_score, KFold

def sampleKnnModel(X, y):
    kf = KFold(n_splits=5, shuffle=True, random_state=42)
    k_range = range(1, 31)
    k_scores = []

    for k in k_range:
        knn = KNeighborsRegressor(n_neighbors=k)
        scores = cross_val_score(knn, X, y, cv=kf, scoring='neg_mean_squared_error')
        k_scores.append(scores.mean())

    best_k = k_range[np.argmax(k_scores)]
    
    knn_final = KNeighborsRegressor(n_neighbors=best_k)
    return knn_final
