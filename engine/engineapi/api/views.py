from django.http import JsonResponse, HttpResponseBadRequest
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser

from knn.knn import basicknn
from knn.knn import customknn

def callbasicknn(request):
    pred = basicknn()
    xrange = pred[0]
    ypred = pred[1]
    return JsonResponse({'xrange': xrange,'ypred': ypred})

@api_view(['POST'])
def callcustomknn(request):

    file = request.FILES.get('csv-file')
    predictor = request.data.get('predictor')
    response = request.data.get('response')
    if not file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        pred = customknn(file, predictor, response)
    except KeyError as e:
        errorMessage = str(e)
        return JsonResponse({'error': errorMessage}, status=400)
    
    xrange = pred[0]
    ypred = pred[1]
    return JsonResponse({'xrange': xrange,'ypred': ypred})






    