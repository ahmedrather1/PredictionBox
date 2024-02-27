from django.http import JsonResponse, HttpResponseBadRequest
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser

from ridge.ridge.CoefficientAnalysis import coefficientAnalysis
from ridge.ridge.PartialRegressions import partialRegressions
from ridge.ridge.ridgeIndividualPrediction import ridgeIndividualPrediction

# from mlr.predictions.mlrIndividualPrediction import mlrIndividualPrediction


@api_view(['POST'])
def callRidgeCoefficientAnalysis(request):
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
def callRidgePartialRegressions(request):
    file = request.FILES.get('csv-file')
    predictorsString = request.data.get('predictors')
    response = request.data.get('response')
    if not file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        results = partialRegressions(file, predictorsString, response)
    except KeyError as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)
    return JsonResponse(results)

@api_view(['POST'])
def callRidgeIndividualPrediction(request):
    file = request.FILES.get('csv-file')
    predictorsString = request.data.get('predictors')
    response = request.data.get('response')
    dataPoint = request.data.get('datapoint')
    print(dataPoint)
    if not file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        result = ridgeIndividualPrediction(file, predictorsString, response, dataPointRaw=dataPoint)
    except Exception as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)
    return JsonResponse({"result":result })