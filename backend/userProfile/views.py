from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes , parser_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User

from .models import UserProfile
from .serializer import UserProfileSerializer

from posts.models import IGPost
from posts.serializer import IGPostSerializer



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    try:
        if request.user.is_anonymous:
            return Response({'message': 'Unauthorized'}, status=401)
        
        if not UserProfile.objects.filter(user=request.user).exists():
            newProfile = UserProfile(user=request.user)
            newProfile.save()
      
        profile = UserProfile.objects.get(user=request.user)
        posts = IGPost.objects.filter(user=request.user)
        serializer = UserProfileSerializer(profile)
        return Response({
            'status': 'success',
            'data': serializer.data,
            'posts': posts.count(),
            'completedPosts': posts.filter(postedAt__isnull=False).count(),
            'pendingPosts': posts.filter(postedAt__isnull=True).count()

        })
    
    except UserProfile.DoesNotExist:
        return Response({'message': 'Profile not found'}, status=404)
    
    except Exception as e:
        return Response({'message': str(e)}, status=500)
