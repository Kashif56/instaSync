from django.contrib import admin
from .models import IGPost, Media



class IGPostAdmin(admin.ModelAdmin):
    list_display = ('postId', 'user', 'location', 'scheduledDateTime')
    list_filter = ('user', )
    search_fields = ('postId', 'user__username', 'user__email', 'location')
    list_editable = ('location', 'scheduledDateTime')
    list_per_page = 50


admin.site.register(IGPost, IGPostAdmin)
admin.site.register(Media)
