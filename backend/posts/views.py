from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes , parser_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User

from .models import IGPost, Media
from .serializer import IGPostSerializer, MediaSerializer

from userProfile.models import UserProfile
from userProfile.serializer import UserProfileSerializer

from datetime import datetime
import random

# API Views

# Generate Unqique postId
def generatePostId():
    id = 'IGP-' + str(random.randint(1000000, 9999999))
    return id

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def allPosts(request):
    try:
        user = request.user
        posts = IGPost.objects.filter(user=user)
        serializer = IGPostSerializer(posts, many=True)
        return Response({
            'status': 'success',
            'data': serializer.data
        })
    
    except User.DoesNotExist:
        return Response({'message': 'User not found'}, status=404)
    
    except Exception as e:
        return Response({'message': str(e)}, status=500)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def postDetail(request, postId):
    try:
        post = IGPost.objects.get(postId=postId)
        serializer = IGPostSerializer(post)
        return Response({
            'status': 'success',
            'data': serializer.data
        })
    
    except IGPost.DoesNotExist:
        return Response({'message': 'Post not found'}, status=404)
    
    except Exception as e:
        return Response({'message': str(e)}, status=500)



# Post Creation, Update, and Deletion
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPost(request):
    try:
        user = request.user
        data = request.data

        print("Received data:", data)
        print("Received files:", request.FILES)

        caption = data.get('caption')
        images = request.FILES.getlist('images')  # Get list of uploaded images
        scheduled_date = data.get('scheduledDate')
        scheduled_time = data.get('scheduledTime')

        # Validate required fields
        if not caption or not scheduled_date or not scheduled_time:
            return Response({
                'status': 'error',
                'message': 'Caption, date and time are required'
            }, status=400)

        if not images:
            return Response({
                'status': 'error',
                'message': 'At least one image is required'
            }, status=400)

        try:
            # Parse date and time strings
            scheduled_date = datetime.strptime(scheduled_date, '%Y-%m-%d').date()
            scheduled_time = datetime.strptime(scheduled_time, '%H:%M').time()
            scheduled_datetime = datetime.combine(scheduled_date, scheduled_time)
        except ValueError as e:
            return Response({
                'status': 'error',
                'message': 'Invalid date or time format'
            }, status=400)

        # Create post first
        new_post = IGPost.objects.create(
            postId=generatePostId(),
            user=user,
            caption=caption,
            scheduledDateTime=scheduled_datetime,
            tags=data.get('tags', '')
        )

        # Create and attach media objects
        media_objects = []
        for image in images:
            try:
                new_media = Media.objects.create(
                    mediaFile=image,
                   
                )
                media_objects.append(new_media)
                print(f"Created media object: {new_media.id} for file: {image.name}")
            except Exception as e:
                print(f"Error creating media for {image.name}: {str(e)}")
                # If media creation fails, delete the post and return error
                new_post.delete()
                return Response({
                    'status': 'error',
                    'message': f'Failed to upload image: {image.name}'
                }, status=500)

        # Add media to post (if you're using a ManyToMany relationship)
        for media in media_objects:
            new_post.media.add(media)

        print(f"Successfully created post {new_post.postId} with {len(media_objects)} images")

        return Response({
            'status': 'success',
            'message': 'Post created successfully',
            'data': {
                'postId': new_post.postId,
                'mediaCount': len(media_objects),
                'scheduledDateTime': scheduled_datetime.isoformat()
            }
        }, status=201)

    except Exception as e:
        print(f"Error creating post: {str(e)}")
        return Response({
            'status': 'error',
            'message': f'Failed to create post: {str(e)}'
        }, status=500)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def updatePost(request, postId):
    try:
        post = IGPost.objects.get(postId=postId)
        data = request.data

        # Update basic fields
        if 'caption' in data:
            post.caption = data['caption']
        if 'tags' in data:
            post.tags = data['tags']
        if 'location' in data:
            post.location = data['location']

        # Handle scheduled datetime
        if 'scheduledDate' in data and 'scheduledTime' in data:
            try:
                scheduled_date = datetime.strptime(data['scheduledDate'], '%Y-%m-%d').date()
                scheduled_time = datetime.strptime(data['scheduledTime'], '%H:%M').time()
                post.scheduledDateTime = datetime.combine(scheduled_date, scheduled_time)
            except ValueError:
                return Response({
                    'status': 'error',
                    'message': 'Invalid date or time format'
                }, status=400)

        # Handle media files
        if 'images' in request.FILES:
            images = request.FILES.getlist('images')
            
            # Remove old media if replace_media is True
            if data.get('replace_media') == 'true':
                # Delete old media files
                for media in post.media.all():
                    media.delete()
                post.media.clear()

            # Add new media files
            for image in images:
                try:
                    new_media = Media.objects.create(mediaFile=image)
                    post.media.add(new_media)
                except Exception as e:
                    return Response({
                        'status': 'error',
                        'message': f'Failed to upload image: {image.name}'
                    }, status=500)

        post.save()
        serializer = IGPostSerializer(post)
        
        return Response({
            'status': 'success',
            'message': 'Post updated successfully',
            'data': serializer.data
        })

    except IGPost.DoesNotExist:
        return Response({'message': 'Post not found'}, status=404)
    
    except Exception as e:
        return Response({'message': str(e)}, status=500)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletePost(request, postId):
    try:
        post = IGPost.objects.get(postId=postId)
        serializer = IGPostSerializer(post)
        post.delete()
        return Response({'message': 'Post deleted successfully'}, status=200)
    
    except IGPost.DoesNotExist: 
        return Response({'message': 'Post not found'}, status=404)
    
    except Exception as e:
        return Response({'message': str(e)}, status=500)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteMedia(request, postId, mediaId):
    try:
        post = IGPost.objects.get(postId=postId)
        media = Media.objects.get(id=mediaId)
        
        # Check if media belongs to the post
        if media not in post.media.all():
            return Response({
                'status': 'error',
                'message': 'Media not found in this post'
            }, status=404)
        
        # Remove media from post
        post.media.remove(media)
        
        # Delete the media file
        media.delete()
        
        return Response({
            'status': 'success',
            'message': 'Media deleted successfully'
        })
    
    except IGPost.DoesNotExist:
        return Response({
            'status': 'error',
            'message': 'Post not found'
        }, status=404)
    except Media.DoesNotExist:
        return Response({
            'status': 'error',
            'message': 'Media not found'
        }, status=404)
    except Exception as e:
        return Response({
            'status': 'error',
            'message': str(e)
        }, status=500)