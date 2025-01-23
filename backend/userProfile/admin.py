from django.contrib import admin
from .models import UserProfile


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'profileImage', 'location', 'instagramUserId', 'instagramAccessToken', 'instagramUsername')
    list_filter = ('user', )
    search_fields = ('user__username', 'user__email', 'location', 'instagramUsername')
    list_editable = ('profileImage', )
    list_per_page = 50

admin.site.register(UserProfile, UserProfileAdmin)