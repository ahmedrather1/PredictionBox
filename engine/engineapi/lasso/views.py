from django.http import JsonResponse, HttpResponseBadRequest
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser

from lasso.lasso.CoefficientAnalysis import coefficientAnalysis
from lasso.lasso.PartialRegressions import partialRegressions
from lasso.lasso.LassoIndividualPrediction import lassoIndividualPrediction

from lasso.customLasso.CustomCoefficientAnalysis import customCoefficientAnalysis
from lasso.customLasso.CustomPartialRegressions import customPartialRegressions
from lasso.customLasso.CustomLassoIndividualPrediction import lassoCustomIndividualPrediction

@api_view(['POST'])
def callLassoCoefficientAnalysis(request):
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
def callLassoPartialRegressions(request):
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
def callLassoIndividualPrediction(request):
    file = request.FILES.get('csv-file')
    predictorsString = request.data.get('predictors')
    response = request.data.get('response')
    dataPoint = request.data.get('datapoint')
    print(dataPoint)
    if not file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        result = lassoIndividualPrediction(file, predictorsString, response, dataPointRaw=dataPoint)
    except Exception as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)
    return JsonResponse({"result":result })

@api_view(['POST'])
def callLassoCustomCoefficientAnalysis(request):
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
def callLassoCustomPartialRegressions(request):
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
def callLassoCustomIndividualPrediction(request):
    file = request.FILES.get('csv-file')
    predictorsString = request.data.get('predictors')
    response = request.data.get('response')
    dataPoint = request.data.get('datapoint')
    alpha_value_str = request.data.get('alpha_value')

    if not file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        result = lassoCustomIndividualPrediction(file, predictorsString, response, alpha_value_str, dataPointRaw=dataPoint)
    except Exception as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)
    return JsonResponse({"result":result })
