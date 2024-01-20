"""
URL configuration for engineapi project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from views import root_view
from knn.views import callSampleKnnFull
from knn.views import callCustomKnnFull
from knn.views import callSampleKnnIndividual
from knn.views import callCustomKnnIndividual

urlpatterns = [
    path('', root_view),
    path('call-sample-knn/', callSampleKnnFull),
    path('call-sample-knn-individual/', callSampleKnnIndividual),
    path('call-custom-knn/', callCustomKnnFull),
    path('call-custom-knn-individual/', callCustomKnnIndividual),
]
