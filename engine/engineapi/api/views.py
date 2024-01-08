from django.http import JsonResponse
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
    if not file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    pred = customknn(file)
    xrange = pred[0]
    ypred = pred[1]
    return JsonResponse({'xrange': xrange,'ypred': ypred})






    