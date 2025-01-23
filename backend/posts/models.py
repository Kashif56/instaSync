from enum import unique
from django.db import models
from django.contrib.auth.models import User



class Media(models.Model):
    mediaFile = models.FileField(upload_to='media/')

    def __str__(self):
        return str(self.mediaFile.name)

class IGPost(models.Model):
    postId = models.CharField(max_length=255, unique=True, db_index=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    caption = models.TextField()
    tags = models.JSONField()
    location = models.CharField(max_length=255, null=True, blank=True)
    media = models.ManyToManyField(Media, related_name='posts', blank=True)

    scheduledDateTime = models.DateTimeField()
    
    postedAt = models.DateTimeField(null=True, blank=True)
    deletedAt = models.DateTimeField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    likes = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)
    shares = models.IntegerField(default=0)

    def __str__(self):
        return self.postId