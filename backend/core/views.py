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
    instagram_auth_url = f"https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=4083979101834500&redirect_uri=https://e5b4-39-55-117-213.ngrok-free.app/api/auth/instagram/callback/&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights"

    return Response({"status": "success", "auth_url": instagram_auth_url})

@api_view(['GET'])
@permission_classes([AllowAny])
def instagram_callback(request):
    """
    Handle the Instagram OAuth callback
    """
    code = request.GET.get('code')
    if not code:
        return Response({'error': 'No authorization code provided'}, status=400)

    token_url = 'https://api.instagram.com/oauth/access_token'
    data = {
        'client_id': settings.INSTAGRAM_CLIENT_ID,
        'client_secret': settings.INSTAGRAM_CLIENT_SECRET,
        'grant_type': 'authorization_code',
        'redirect_uri': "https://8362-39-47-5-96.ngrok-free.app/api/auth/instagram/callback/",
        'code': code
    }

    try:
        response = requests.post(token_url, data=data)
        token_data = response.json()

        if 'error_type' in token_data:
            error_message = token_data.get('error_message', 'Unknown error occurred')
            if 'authorization code has been used' in error_message.lower():
                return Response({
                    'error': 'This login session has expired. Please try logging in again.',
                    'status': 'error',
                    'code': 'auth_code_used'
                }, status=400)
            return Response({
                'error': error_message,
                'status': 'error'
            }, status=400)

        if response.status_code != 200:
            return Response({
                'error': 'Failed to exchange authorization code for access token',
                'status': 'error'
            }, status=response.status_code)

        access_token = token_data['access_token']
        user_id = token_data['user_id']

        # Get user info from Instagram
        user_info_url = f'https://graph.instagram.com/me?fields=id,username&access_token={access_token}'
        user_response = requests.get(user_info_url)

        if user_response.status_code != 200:
            return Response({
                'error': 'Failed to fetch user information from Instagram',
                'status': 'error'
            }, status=user_response.status_code)

        user_data = user_response.json()
        username = user_data.get('username')

        if not username:
            return Response({
                'error': 'Failed to fetch username from Instagram',
                'status': 'error'
            }, status=400)

        # Create or update user
        user, created = User.objects.get_or_create(
            username=username,
            defaults={
                'email': f"{username}@instagram.com",  
            }
        )
        user.backend = 'allauth.account.auth_backends.AuthenticationBackend'

        if created:
            user.set_unusable_password()
            user.save()

        # Log the user in
        login(request, user)

        # Generate JWT tokens
        from rest_framework_simplejwt.tokens import RefreshToken
        refresh = RefreshToken.for_user(user)
        jwtToken = str(refresh.access_token)
        refresh_token = str(refresh)

        # Update or create UserProfile
        from userProfile.models import UserProfile
        userProfile, _ = UserProfile.objects.get_or_create(user=user)
        userProfile.instagramUserId = user_id
        userProfile.instagramAccessToken = access_token
        userProfile.instagramUsername = username
        userProfile.save()

        response_data = {
            'status': 'success',
            'message': 'Successfully authenticated with Instagram',
            'username': username,
            'email': user.email,
            'refresh_token': refresh_token,
            'jwt_token': jwtToken
        }

        return Response(response_data, status=200)

    except requests.exceptions.RequestException as e:
        return Response({
            'error': f"An error occurred while connecting to Instagram: {str(e)}",
            'status': 'error'
        }, status=500)
    except Exception as e:
        return Response({
            'error': f"An unexpected error occurred: {str(e)}",
            'status': 'error'
        }, status=500)


VERIFY_TOKEN = "token@1234"

@api_view(['GET'])
@permission_classes([AllowAny])
def instagram_webhook(request):
    if request.method == "GET":
        verify_token = request.GET.get('hub.verify_token')
        challenge = request.GET.get('hub.challenge')

        if verify_token == VERIFY_TOKEN:
            return HttpResponse(challenge)  
        else:
            return HttpResponse("Invalid verify token", status=403)