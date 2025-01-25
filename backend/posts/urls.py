from django.urls import path

from .views import allPosts, postDetail, createPost, updatePost, deletePost, deleteMedia


urlpatterns = [
    path('', allPosts),
    path('<str:postId>/post-detail/', postDetail),
    path('create/', createPost),
    path('<str:postId>/update/', updatePost),
    path('<str:postId>/delete/', deletePost),
    path('<str:postId>/delete-media/<int:mediaId>/', deleteMedia, name='delete_media'),
]