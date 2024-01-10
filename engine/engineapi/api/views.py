from django.http import JsonResponse, HttpResponseBadRequest
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser

from knn.knn import basicknn
from knn.knn import sampleKnnFullPrediction
from knn.knn import customKnnFullPrediction
from knn.knn import customKnnIndividualPrediction
from knn.knn import sampleKnnIndividualPrediction

def callbasicknn(request):
    pred = basicknn()
    xrange = pred[0]
    ypred = pred[1]
    return JsonResponse({'xrange': xrange,'ypred': ypred})

@api_view(['POST'])
def callSampleKnnFull(request):
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
def callCustomKnnFull(request):

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

@api_view(['POST'])
def callCustomKnnIndividual(request, xToPredict):

    file = request.FILES.get('csv-file')
    predictor = request.data.get('predictor')
    response = request.data.get('response')
    customFolds = request.data.get('customFolds')
    maxK = request.data.get('maxK')
    customK = request.data.get('customK')

    print(customFolds)
    print(maxK)
    print(customK)

    try:
        predictedY = customKnnIndividualPrediction(file, predictor, response, customFolds, maxK, customK, xToPredict)
    except Exception as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)
    return JsonResponse({'predictedY': predictedY})

@api_view(['POST'])
def callSampleKnnIndividual(request, xToPredict):
    file = request.FILES.get('csv-file')
    predictor = request.data.get('predictor')
    response = request.data.get('response')
    if not file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        predictedY = sampleKnnIndividualPrediction(file, predictor, response, xToPredict)
    except KeyError as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)

    return JsonResponse({'predictedY': predictedY})