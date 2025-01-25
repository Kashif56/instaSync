from rest_framework import serializers
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = UserProfile
        depth = 1
        fields = '__all__'