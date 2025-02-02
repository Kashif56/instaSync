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
def instagram_callback(request):
    """
    Handle the Instagram OAuth callback
    """
    code = request.GET.get('code')
    if not code:
        return Response({
            'error': 'No authorization code provided',
            'status': 'error'
        }, status=400)

    # Exchange code for access token
    token_url = 'https://api.instagram.com/oauth/access_token'
    data = {
        'client_id': settings.INSTAGRAM_CLIENT_ID,
        'client_secret': settings.INSTAGRAM_CLIENT_SECRET,
        'grant_type': 'authorization_code',
        'redirect_uri': settings.INSTAGRAM_REDIRECT_URI,
        'code': code
    }

    try:
        # Get access token
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

        access_token = token_data.get('access_token')
        user_id = token_data.get('user_id')

        if not access_token or not user_id:
            return Response({
                'error': 'Failed to obtain access token',
                'status': 'error'
            }, status=400)

        # Get user info from Instagram Graph API
        user_info_url = f'https://graph.instagram.com/me'
        params = {
            'fields': 'id,username,account_type',
            'access_token': access_token
        }
        user_response = requests.get(user_info_url, params=params)
        
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

        # Store Instagram data
        profile = user.profile
        profile.instagram_id = user_id
        profile.instagram_username = username
        profile.instagram_access_token = access_token
        profile.save()

        # Generate JWT tokens
        from rest_framework_simplejwt.tokens import RefreshToken
        refresh = RefreshToken.for_user(user)

        return Response({
            'status': 'success',
            'username': username,
            'email': user.email,
            'jwt_token': str(refresh.access_token),
            'refresh_token': str(refresh),
            'instagram_connected': True,
            'account_type': user_data.get('account_type', 'personal')
        })

    except requests.RequestException as e:
        return Response({
            'error': f'Network error: {str(e)}',
            'status': 'error'
        }, status=500)
    except Exception as e:
        return Response({
            'error': f'Unexpected error: {str(e)}',
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