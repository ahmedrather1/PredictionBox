import numpy as np

def getOriginalData(X, y):
    Xarr = X.to_numpy().transpose()[0]
    yarr = y.to_numpy().transpose()[0]
    original_data = np.vstack((Xarr, yarr)).T
    return original_data    