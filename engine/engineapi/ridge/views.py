from django.http import JsonResponse, HttpResponseBadRequest
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser

from ridge.ridge.CoefficientAnalysis import coefficientAnalysis
from ridge.ridge.PartialRegressions import partialRegressions
from ridge.ridge.ridgeIndividualPrediction import ridgeIndividualPrediction

from ridge.customRidge.CustomCoefficientAnalysis import customCoefficientAnalysis
from ridge.customRidge.CustomPartialRegressions import customPartialRegressions
from ridge.customRidge.CustomRidgeIndividualPrediction import ridgeCustomIndividualPrediction


@api_view(['POST'])
def callRidgeCoefficientAnalysis(request):
    file = request.FILES.get('csv-file')
    predictorsString = request.data.get('predictors')
    response = request.data.get('response')
    if not file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        results = coefficientAnalysis(file, predictorsString, response)
    except Exception as e:
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
    except Exception as e:
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

@api_view(['POST'])
def callRidgeCustomCoefficientAnalysis(request):
    file = request.FILES.get('csv-file')
    predictorsString = request.data.get('predictors')
    response = request.data.get('response')
    alpha_value_str = request.data.get('alpha_value')
    if not file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        results = customCoefficientAnalysis(file, predictorsString, response, alpha_value_str)
    except Exception as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)
    return JsonResponse({'result': results})

@api_view(['POST'])
def callRidgeCustomPartialRegressions(request):
    file = request.FILES.get('csv-file')
    predictorsString = request.data.get('predictors')
    response = request.data.get('response')
    alpha_value_str = request.data.get('alpha_value')
    if not file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        results = customPartialRegressions(file, predictorsString, response, alpha_value_str)
    except Exception as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)
    return JsonResponse(results)

@api_view(['POST'])
def callRidgeCustomIndividualPrediction(request):
    file = request.FILES.get('csv-file')
    predictorsString = request.data.get('predictors')
    response = request.data.get('response')
    dataPoint = request.data.get('datapoint')
    alpha_value_str = request.data.get('alpha_value')

    if not file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        result = ridgeCustomIndividualPrediction(file, predictorsString, response, alpha_value_str, dataPointRaw=dataPoint)
    except Exception as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)
    return JsonResponse({"result":result })
