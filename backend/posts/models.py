from enum import unique
from django.db import models
from django.contrib.auth.models import User
import os
from django.core.exceptions import ValidationError
from django_q.tasks import schedule
from datetime import datetime, timedelta

def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]
    valid_extensions = ['.jpg', '.jpeg', '.png', '.gif']
    if not ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file extension. Please use: jpg, jpeg, png, or gif')

def upload_to_path(instance, filename):
    # Get the file extension
    ext = os.path.splitext(filename)[1]
    # Create path: media/user_id/post_id/filename
    if hasattr(instance, 'post'):
        return f'media/user_{instance.post.user.id}/post_{instance.post.postId}/{filename}'
    return f'media/temp/{filename}'

class Media(models.Model):
    mediaFile = models.ImageField(
        upload_to=upload_to_path,
        validators=[validate_file_extension],
        help_text='Supported formats: JPG, JPEG, PNG, GIF'
    )
    uploadedAt = models.DateTimeField(auto_now_add=True)
    fileSize = models.IntegerField(editable=False, null=True)
    
    width = models.IntegerField(editable=False, null=True)
    height = models.IntegerField(editable=False, null=True)

    def save(self, *args, **kwargs):
        if self.mediaFile:
            # Set file size
            self.fileSize = self.mediaFile.size
            
            # Get image dimensions if it's an image
            try:
                from PIL import Image
                img = Image.open(self.mediaFile)
                self.width, self.height = img.size
            except Exception as e:
                print(f"Error getting image dimensions: {str(e)}")

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.mediaFile.name} ({self.fileSize} bytes)"

    class Meta:
        verbose_name = 'Media'
        verbose_name_plural = 'Media'

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



    def schedule_post(self):
        """
        Schedule this post to be published at the given time using Django Q.
        """
        schedule(
            "posts.tasks.publish_post",
            self.postId,
            schedule_type="O",  # One-time execution
            next_run=self.scheduledDateTime,
        )

    def __str__(self):
        return self.postId