from django.http import JsonResponse, HttpResponseBadRequest
from rest_framework.decorators import api_view

from slr.slr.slr import sampleSlrFullPrediction
from slr.slr.slr import sampleSlrIndividualPrediction
from slr.customSlr.customSlr import customSlrIndividualPrediction
from slr.customSlr.customSlr import customSlrFullPrediction


@api_view(['POST'])
def callSampleSlrFull(request):
    file = request.FILES.get('csv-file')
    predictor = request.data.get('predictor')
    response = request.data.get('response')
    if not file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        pred = sampleSlrFullPrediction(file, predictor, response)
    except KeyError as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)
    xrange = pred[0]
    ypred = pred[1]
    originalData = pred[2]
    return JsonResponse({'xrange': xrange,'ypred': ypred, 'originalData': originalData})

@api_view(['POST'])
def callCustomSlrFull(request):
    file = request.FILES.get('csv-file')
    predictor = request.data.get('predictor')
    response = request.data.get('response')
    b0 = request.data.get('b0')
    b1 = request.data.get('b1')    
    if not file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        pred = customSlrFullPrediction(file, predictor, response, b0, b1)
    except Exception as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)
    xrange = pred[0]
    ypred = pred[1]
    originalData = pred[2]
    return JsonResponse({'xrange': xrange,'ypred': ypred, 'originalData': originalData})

@api_view(['POST'])
def callSampleSlrIndividual(request):
    file = request.FILES.get('csv-file')
    predictor = request.data.get('predictor')
    response = request.data.get('response')
    xToPredict = request.data.get('xToPredict')
    if not file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        predictedY = sampleSlrIndividualPrediction(file, predictor, response, xToPredict)
    except Exception as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)

    return JsonResponse({'predictedY': predictedY, 'xToPredict': xToPredict })

@api_view(['POST'])
def callCustomSlrIndividual(request):
    file = request.FILES.get('csv-file')
    predictor = request.data.get('predictor')
    response = request.data.get('response')
    b0 = request.data.get('b0')
    b1 = request.data.get('b1')  
    xToPredict = request.data.get('xToPredict')
 
    if not file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        predictedY = customSlrIndividualPrediction(file, predictor, response, b0, b1, xToPredict)
    except Exception as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)

    return JsonResponse({'predictedY': predictedY, 'xToPredict': xToPredict })

