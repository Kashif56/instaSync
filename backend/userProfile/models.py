from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profileImage = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    
    instagramUserId = models.CharField(max_length=255, null=True, blank=True)
    instagramAccessToken = models.CharField(max_length=255, null=True, blank=True)
    instagramUsername = models.CharField(max_length=255, null=True, blank=True)
    

    def __str__(self):
        return self.user.username
   