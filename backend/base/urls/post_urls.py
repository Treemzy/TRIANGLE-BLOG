from django.urls import path
from base.views import post_views as views


urlpatterns = [  
    path('', views.getPosts, name="posts"),
    path('create/', views.createPost, name="create-post"),
    path('myposts/', views.getMyPosts, name='my-posts'),
    path('category/', views.getCategories, name="Category"),
    path('trending/', views.getTrendingPost, name='top-post'),
    
    path('<str:pk>/likes/', views.createPostLike, name="post-like"),
    path('<str:pk>/comments/', views.createPostComment, name="post-comment"),
    path('<str:pk>/', views.getPost, name="post"),
    path('update/<str:pk>/', views.updatePost, name="update-post"),
   

    
    
    path('comments/delete/<str:pk>/', views.deleteComment, name="delete-comment"),   
    path('delete/<str:pk>/', views.deletePost, name="delete-post"),
       

]