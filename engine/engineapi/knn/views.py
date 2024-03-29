from django.http import JsonResponse
from rest_framework.decorators import api_view

from knn.sampleknn.basicknn import basicknn
from knn.sampleknn.sampleknn import sampleKnnFullPrediction
from knn.sampleknn.sampleknn import sampleKnnIndividualPrediction
from knn.customknn.customknn import customKnnFullPrediction
from knn.customknn.customknn import customKnnIndividualPrediction

@api_view(['POST'])
def callSampleKnnFull(request):
    print(request.headers)
    print(request)
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
def callCustomKnnIndividual(request):

    file = request.FILES.get('csv-file')
    predictor = request.data.get('predictor')
    response = request.data.get('response')
    customFolds = request.data.get('customFolds')
    maxK = request.data.get('maxK')
    customK = request.data.get('customK')
    xToPredict = request.data.get('xToPredict')

    print(customFolds)
    print(maxK)
    print(customK)

    try:
        predictedY = customKnnIndividualPrediction(file, predictor, response, customFolds, maxK, customK, xToPredict)
    except Exception as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)
    return JsonResponse({'predictedY': predictedY, 'xToPredict': xToPredict})

@api_view(['POST'])
def callSampleKnnIndividual(request):
    file = request.FILES.get('csv-file')
    predictor = request.data.get('predictor')
    response = request.data.get('response')
    xToPredict = request.data.get('xToPredict')
    if not file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        predictedY = sampleKnnIndividualPrediction(file, predictor, response, xToPredict)
    except Exception as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)

    return JsonResponse({'predictedY': predictedY, 'xToPredict': xToPredict })

# this endpoint is unused but is the first endpoint of this project, here for the memories
def callbasicknn():
    pred = basicknn()
    xrange = pred[0]
    ypred = pred[1]
    return JsonResponse({'xrange': xrange,'ypred': ypred})