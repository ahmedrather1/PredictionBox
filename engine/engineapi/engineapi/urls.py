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
from engineapi.views import root_view

from knn.views import callSampleKnnFull
from knn.views import callCustomKnnFull
from knn.views import callSampleKnnIndividual
from knn.views import callCustomKnnIndividual

from slr.views import callSampleSlrFull
from slr.views import callCustomSlrFull
from slr.views import callSampleSlrIndividual
from slr.views import callCustomSlrIndividual

from mlr.views import callMlrCoefficientAnalysis
from mlr.views import callMlrPartialRegressions
from mlr.views import callMlrIndividualPrediction

from ridge.views import callRidgeCoefficientAnalysis
from ridge.views import callRidgePartialRegressions
from ridge.views import callRidgeIndividualPrediction
from ridge.views import callRidgeCustomCoefficientAnalysis
from ridge.views import callRidgeCustomPartialRegressions
from ridge.views import callRidgeCustomIndividualPrediction

from lasso.views import callLassoCoefficientAnalysis
from lasso.views import callLassoPartialRegressions
from lasso.views import callLassoIndividualPrediction
from lasso.views import callLassoCustomCoefficientAnalysis
from lasso.views import callLassoCustomPartialRegressions
from lasso.views import callLassoCustomIndividualPrediction


urlpatterns = [
    path('', root_view),
    path('call-sample-knn/', callSampleKnnFull),
    path('call-sample-knn-individual/', callSampleKnnIndividual),
    path('call-custom-knn/', callCustomKnnFull),
    path('call-custom-knn-individual/', callCustomKnnIndividual),
    path('call-sample-slr/', callSampleSlrFull),
    path('call-sample-slr-individual/', callSampleSlrIndividual),
    path('call-custom-slr/', callCustomSlrFull),
    path('call-custom-slr-individual/', callCustomSlrIndividual),
    path('call-mlr-coefficient-analysis/', callMlrCoefficientAnalysis),
    path('call-mlr-partial-regressions/', callMlrPartialRegressions),
    path('call-mlr-individual/', callMlrIndividualPrediction),
    path('call-ridge-coefficient-analysis/', callRidgeCoefficientAnalysis),
    path('call-ridge-partial-regressions/', callRidgePartialRegressions),
    path('call-ridge-individual/', callRidgeIndividualPrediction),
    path('call-ridge-custom-coefficient-analysis/', callRidgeCustomCoefficientAnalysis),
    path('call-ridge-custom-partial-regressions/', callRidgeCustomPartialRegressions),
    path('call-custom-ridge-individual/', callRidgeCustomIndividualPrediction),
    path('call-lasso-coefficient-analysis/', callLassoCoefficientAnalysis),
    path('call-lasso-partial-regressions/', callLassoPartialRegressions),
    path('call-lasso-individual/', callLassoIndividualPrediction),
    path('call-lasso-custom-coefficient-analysis/', callLassoCustomCoefficientAnalysis),
    path('call-lasso-custom-partial-regressions/', callLassoCustomPartialRegressions),
    path('call-custom-lasso-individual/', callLassoCustomIndividualPrediction),

]
