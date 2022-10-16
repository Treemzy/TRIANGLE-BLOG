from django.urls import path
from base.views import post_views as views

urlpatterns = [  
     path('', views.getComments, name="comments")
]