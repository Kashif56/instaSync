from django.contrib import admin
from .models import IGPost, Media



class IGPostAdmin(admin.ModelAdmin):
    list_display = ('postId', 'user', 'caption', 'tags', 'location', 'scheduledDateTime')
    list_filter = ('user', )
    search_fields = ('postId', 'user__username', 'user__email', 'caption', 'tags', 'location')
    list_editable = ('caption', 'tags', 'location', 'scheduledDateTime')
    list_per_page = 50


admin.site.register(IGPost, IGPostAdmin)
admin.site.register(Media)
