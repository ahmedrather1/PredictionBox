from django.http import JsonResponse
from knn.knn import knn

def callknn(request):
    pred = knn()
    xrange = pred[0]
    ypred = pred[1]
    return JsonResponse({'xrange': xrange,'ypred': ypred})