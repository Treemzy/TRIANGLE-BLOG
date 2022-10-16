from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

from .models import Post, Category, Comment, Like
from django.db import IntegrityError


class UserSerializer(serializers.ModelSerializer):
    #this method was used to return the email or firstname from the model to the serialized token which will be decoded.

    name  = serializers.SerializerMethodField(read_only=True)
    # because our frontend uses _id so we will send the api id as _id
    _id  = serializers.SerializerMethodField(read_only=True)
    isAdmin  = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['id','_id', 'isAdmin','username', 'email', 'name']

    #we used a double underscore cause the variable declared id _id
    def get__id(self,obj):
        return obj.id

    def get_isAdmin(self,obj):
        return obj.is_staff


    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.username
        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','_id', 'isAdmin','username', 'email', 'name', 'token']
    
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)




class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    posts = serializers.ReadOnlyField(source='post.title')
    users = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Comment
        fields = '__all__'


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    
    comments = serializers.SerializerMethodField(read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)  
    categories = serializers.ReadOnlyField(source='category.name')
    image = serializers.ImageField(required=False, max_length=None, allow_empty_file=True, use_url=True)
    

    class Meta:
        model = Post
        fields = '__all__'
    

    def get_comments(self, obj):
        comments = obj.comment_set.all()
        serializer = CommentSerializer(comments, many=True)
        return serializer.data
    
    def get_likes(self, obj):
        likes = obj.like_set.all()
        serializer = LikeSerializer(likes, many=True)
        return serializer.data
