from django.shortcuts import render, redirect
from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.http import HttpResponse
import requests
import json

# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def instagram_login(request):
    """
    Redirect users to Instagram's authorization page
    """
    instagram_auth_url = f"https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=4083979101834500&redirect_uri=https://4ac5-223-123-94-24.ngrok-free.app/api/auth/instagram/callback/&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights"
    return Response({"auth_url": instagram_auth_url})

@api_view(['GET'])
@permission_classes([AllowAny])
def instagram_callback(request):
    """
    Handle the Instagram OAuth callback
    """
    code = request.GET.get('code')
    if not code:
        return redirect("https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=4083979101834500&redirect_uri=https://4ac5-223-123-94-24.ngrok-free.app/api/auth/instagram/callback/&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights")

    token_url = 'https://api.instagram.com/oauth/access_token'
    data = {
        'client_id': settings.INSTAGRAM_CLIENT_ID,
        'client_secret': settings.INSTAGRAM_CLIENT_SECRET,
        'grant_type': 'authorization_code',
        'redirect_uri': 'https://4ac5-223-123-94-24.ngrok-free.app/api/auth/instagram/callback/',
        'code': code
    }
    print(data)

    try:
        response = requests.post(token_url, data=data)
        if response.status_code != 200:
            print("Response Status:", response.status_code)
            print("Response Content:", response.content)  # Log the raw response content
            return Response({'error': 'Failed to exchange authorization code for access token'}, status=response.status_code)

        token_data = response.json()

        if 'error_type' in token_data:
            return Response({'error': token_data.get('error_message')}, status=400)

        access_token = token_data['access_token']
        user_id = token_data['user_id']

        # Get user info from Instagram
        user_info_url = f'https://graph.instagram.com/me?fields=id,username&access_token={access_token}'
        user_response = requests.get(user_info_url)


        if user_response.status_code != 200:
            print("Response Status:", user_response.status_code)
            print("Response Content:", user_response.content)  # Log the raw response content
            return Response({'error': 'Failed to fetch user information'}, status=user_response.status_code)

        user_data = user_response.json()
        username = user_data.get('username')

        if not username:
            return Response({'error': 'Failed to fetch username from Instagram'}, status=400)

        # Create or update user
        user, created = User.objects.get_or_create(
            username=username,
            defaults={
                'email': f"{username}@instagram.com",  # Placeholder email
            }
        )
        user.backend = 'allauth.account.auth_backends.AuthenticationBackend'

        if created:
            user.set_unusable_password()
            user.save()

        # Log the user in
        login(request, user)

        return Response({
            'message': 'Successfully authenticated with Instagram',
            'user_id': user.id,
            'username': user.username,
            'access_token': access_token
        })

    except requests.exceptions.RequestException as e:
        return Response({'error': f"An error occurred: {str(e)}"}, status=500)




VERIFY_TOKEN = "token@1234"

@api_view(['GET'])
@permission_classes([AllowAny])
def instagram_webhook(request):
    if request.method == "GET":
        verify_token = request.GET.get('hub.verify_token')
        challenge = request.GET.get('hub.challenge')

        if verify_token == VERIFY_TOKEN:
            return HttpResponse(challenge)  # Respond with the challenge token
        else:
            return HttpResponse("Invalid verify token", status=403)