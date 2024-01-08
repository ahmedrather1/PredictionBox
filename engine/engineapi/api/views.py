from django.http import JsonResponse
from knn.knn import basicknn
from knn.knn import customknn

def callbasicknn(request):
    pred = basicknn()
    xrange = pred[0]
    ypred = pred[1]
    return JsonResponse({'xrange': xrange,'ypred': ypred})

def callcustomknn(request):
    pred = customknn()
    xrange = pred[0]
    ypred = pred[1]
    return JsonResponse({'xrange': xrange,'ypred': ypred})