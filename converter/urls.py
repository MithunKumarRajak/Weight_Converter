from django.urls import path
from . import views

urlpatterns = [
    path('', views.convert_weight, name='convert_weight'),
]
