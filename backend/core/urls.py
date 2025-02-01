from django.urls import path
from . import views

urlpatterns = [
    path('auth/instagram/callback/', views.instagram_callback, name='instagram_callback'),
    path('auth/instagram/webhook/', views.instagram_webhook, name='instagram_webhook'),
]