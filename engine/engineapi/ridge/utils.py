import pandas as pd
import numpy as np

# repeated code, abstract to general utils folder
def getOriginalData(X, y):
    print(y.to_numpy().transpose())
    Xarr = X.to_numpy().transpose()[0]
    yarr = y.to_numpy().transpose()[0]
    original_data = np.vstack((Xarr, yarr)).T
    return original_data    