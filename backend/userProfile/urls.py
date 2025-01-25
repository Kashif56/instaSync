from django.urls import path

from .views import getUserProfile

urlpatterns = [
    path('getUserProfile/', getUserProfile)
]