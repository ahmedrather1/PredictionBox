from django.http import JsonResponse, HttpResponseBadRequest
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser

from knn.knn import basicknn
from knn.knn import bestknn
from knn.knn import customKnn

def callbasicknn(request):
    pred = basicknn()
    xrange = pred[0]
    ypred = pred[1]
    return JsonResponse({'xrange': xrange,'ypred': ypred})

@api_view(['POST'])
def callBestKnn(request):

    file = request.FILES.get('csv-file')
    predictor = request.data.get('predictor')
    response = request.data.get('response')
    if not file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        pred = bestknn(file, predictor, response)
    except KeyError as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)
    xrange = pred[0]
    ypred = pred[1]
    originalData = pred[2]
    return JsonResponse({'xrange': xrange,'ypred': ypred, 'originalData': originalData})

@api_view(['POST'])
def callCustomKnn(request):

    file = request.FILES.get('csv-file')
    predictor = request.data.get('predictor')
    response = request.data.get('response')
    customFolds = request.data.get('customFolds')
    maxK = request.data.get('maxK')
    customK = request.data.get('customK')

    try:
        pred = customKnn(file, predictor, response, customFolds, maxK, customK )
    except Exception as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)
    xrange = pred[0]
    ypred = pred[1]
    originalData = pred[2]
    return JsonResponse({'xrange': xrange,'ypred': ypred, 'originalData': originalData})




    