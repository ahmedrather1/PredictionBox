from django.http import JsonResponse, HttpResponseBadRequest
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser

from mlr.predictions.CoefficientAnalysis import coefficientAnalysis
from mlr.predictions.PartialRegressions import partialRegressions

from mlr.predictions.mlrIndividualPrediction import mlrIndividualPrediction


@api_view(['POST'])
def callCoefficientAnalysis(request):
    file = request.FILES.get('csv-file')
    predictorsString = request.data.get('predictors')
    response = request.data.get('response')
    if not file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        results = coefficientAnalysis(file, predictorsString, response)
    except KeyError as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)
    return JsonResponse({'result': results})

@api_view(['POST'])
def callPartialRegressions(request):
    file = request.FILES.get('csv-file')
    predictors = request.data.get('predictors')
    response = request.data.get('response')
    if not file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        results = partialRegressions(file, predictors, response)
    except KeyError as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)
    return JsonResponse(results)

@api_view(['POST'])
def callMlrIndividualPrediction(request):
    file = request.FILES.get('csv-file')
    predictors = request.data.get('predictors')
    response = request.data.get('response')
    dataPoint = request.data.get('datapoint')
    print(dataPoint)
    if not file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        result = mlrIndividualPrediction(file, predictors, response, dataPointRaw=dataPoint)
    except Exception as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)
    return JsonResponse({"result":result })