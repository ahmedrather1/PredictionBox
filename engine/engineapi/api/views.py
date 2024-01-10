from django.http import JsonResponse, HttpResponseBadRequest
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser

from knn.knn import basicknn
from knn.knn import sampleKnnFullPrediction
from knn.knn import customKnnFullPrediction

def callbasicknn(request):
    pred = basicknn()
    xrange = pred[0]
    ypred = pred[1]
    return JsonResponse({'xrange': xrange,'ypred': ypred})

@api_view(['POST'])
def callSampleKnn(request):

    file = request.FILES.get('csv-file')
    predictor = request.data.get('predictor')
    response = request.data.get('response')
    if not file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        pred = sampleKnnFullPrediction(file, predictor, response)
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
        pred = customKnnFullPrediction(file, predictor, response, customFolds, maxK, customK )
    except Exception as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)
    xrange = pred[0]
    ypred = pred[1]
    originalData = pred[2]
    return JsonResponse({'xrange': xrange,'ypred': ypred, 'originalData': originalData})




    