from django.urls import path
from base.views import post_views as views

urlpatterns = [  
     path('create/', views.createCategory, name="create-category"),
     path('<str:pk>/', views.getCategory, name="category"),
     path('update/<str:pk>/', views.updateCategory, name="update-category"),
     path('delete/<str:pk>/', views.deleteCategory, name="delete-category"),
]