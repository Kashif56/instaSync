from rest_framework import serializers
from .models import IGPost, Media


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'


class IGPostSerializer(serializers.ModelSerializer):
    media = MediaSerializer(many=True, read_only=True)
    class Meta:
        model = IGPost
        fields = '__all__'