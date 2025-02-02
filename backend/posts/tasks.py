import requests
from .models import IGPost
from userProfile.models import UserProfile
from django_q.tasks import async_task
from django.utils.timezone import now

INSTAGRAM_GRAPH_API_URL = "https://graph.facebook.com/v19.0"

def publish_post(post_id):
    """
    Publish a scheduled post to Instagram.
    """
    try:
        post = IGPost.objects.get(postId=post_id)
        profile = UserProfile.objects.get(user=post.user)

        if post.postedAt:
            return

        # Step 1: Upload Image to Instagram Container
        create_media_url = f"{INSTAGRAM_GRAPH_API_URL}/{profile.instagramUserId}/media"
        media_payload = {
            "image_url": post.media.first().mediaFile,
            "caption": post.caption,
            "access_token": profile.instagramPageAccessToken,  # Fetch dynamically from DB if needed
        }

        media_response = requests.post(create_media_url, data=media_payload).json()

        if "id" not in media_response:
            post.caption += " (Failed to upload)"
            post.save()
            return

        media_id = media_response["id"]

        # Step 2: Publish Image to Instagram
        publish_url = f"{INSTAGRAM_GRAPH_API_URL}/{profile.instagramUserId}/media_publish"
        publish_payload = {
            "creation_id": media_id,
            "access_token": profile.instagramPageAccessToken,
        }

        publish_response = requests.post(publish_url, data=publish_payload).json()

        if "id" in publish_response:
            post.postedAt = now()
        else:
            post.caption += " (Failed to publish)"
            

        post.save()
    except Exception as e:
        post = IGPost.objects.get(postId=post_id)
        post.caption += " (Failed to publish)"
        post.save()
