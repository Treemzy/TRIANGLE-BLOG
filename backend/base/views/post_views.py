from django.shortcuts import render
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User

from base.serializers import PostSerializer, CategorySerializer, CommentSerializer
from base.models import Post, Comment, Like, Category

from rest_framework import status


@api_view(['GET'])
def getPosts(request):
    
    # query = request.query_params.get('keyword')

    # if query == None:
    #     query = ''

    posts = Post.objects.all()

    # page = request.query_params.get('page')
    # paginator = Paginator(posts, 4)

    # try:
    #     posts = paginator.page(page)
    # except PageNotAnInteger:
    #     posts = paginator.page(1)
    # except EmptyPage:
    #     posts = paginator.page(paginator.num_pages)

    # if page == None:
    #     page = 1
    # page = int(page)

    serializer = PostSerializer(posts, many=True)
    return Response({'posts': serializer.data})
    
    # return Response({'posts': serializer.data, 'page': page, 'pages': paginator.num_pages})

    # serializer = PostSerializer(posts, many=True)
    # return Response(serializer.data)

@api_view(['GET'])
def getTrendingPost(request):
    post = Post.objects.order_by('-comments')[:4] or Post.objects.order_by('likes')[:4]
    serializer = PostSerializer(post, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getPost(request, pk):
    post = Post.objects.get(_id=pk)
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)

    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPost(request):
    data = request.data
    user = request.user

    cat = Category.objects.get(_id=data['category'])

    post = Post.objects.create(
        user  = user,
        title = data['title'],
        description = data['description'],
        image = request.FILES.get('image'),
        category = cat,
        
    )
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPostComment(request, pk):

    user =  request.user
    post = Post.objects.get(_id=pk)
    data = request.data

    if data['comment'] != '':
        comment = Comment.objects.create(
            user=user,
            post=post,
            name=user.username,
            comment=data['comment'],
        )
        post.comments += 1 

        post.save()
    else:
       return Response('Comment Field is empty') 

    return Response('Comment Added')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPostLike(request, pk):

    user =  request.user
    post = Post.objects.get(_id=pk)
    data = request.data

    alreadyExists = post.like_set.filter(user=user).exists()

    if alreadyExists:
        post.like_set.filter(user=user).delete()

        post.likes -= 1 

        post.save()

    else:
        like = Like.objects.create(
            user=user,
            post=post,
            name=user.username,
            numLikes= 1,
        )

        
        post.likes += 1 

        post.save()
   

    return Response('Comment Added')

@api_view(['DELETE'])
@permission_classes([IsAdminUser | IsAuthenticated])
def deleteComment(request, pk):
    user = request.user
    comment = Comment.objects.get(_id=pk)
    userExists = Comment.objects.filter(user=user).exists()
    
    if userExists:
        comment.delete()
        post = Post.objects.get(_id=comment.post._id)
        post.comments -= 1 
        post.save()
    elif(user.is_staff == True):
        comment.delete()
        post = Post.objects.get(_id=comment.post._id)
        post.comments -= 1 
        post.save()
    return Response('Comment Deleted')

@permission_classes([IsAdminUser])
@api_view(['GET'])
def getComments(request):
    comments = Comment.objects.all()
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getCategories(request):
    category = Category.objects.all()
    serializer = CategorySerializer(category, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createCategory(request):

    data = request.data
    user = request.user

    category = Category.objects.create(
        user  = user,
        name = data['name'],
        
    )
    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getCategory(request, pk):
    category = Category.objects.get(_id=pk)
    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateCategory(request, pk):
    data = request.data
    user = request.user
    category = Category.objects.get(_id=pk) 
    userExists = Category.objects.filter(user=user).exists()

    if userExists:
        user  = user,
        category.name = data['name']

    category.save()
    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteCategory(request, pk):
    user = request.user
    category = Category.objects.get(_id=pk)
    userExists = Category.objects.filter(user=user).exists()
    if userExists:
        category.delete()
    return Response('Post Deleted')



@api_view(['DELETE'])
@permission_classes([IsAdminUser | IsAuthenticated])
def deletePost(request, pk):
    user = request.user
    post = Post.objects.get(_id=pk)
    userExists = Post.objects.filter(user=user).exists()
    if userExists:
        post.delete()
    elif(user.is_staff == True):
        pot.delete()
    return Response('Post Deleted')


@api_view(['PUT'])
@permission_classes([IsAdminUser | IsAuthenticated])
def updatePost(request, pk):
    data = request.data
    user = request.user
    cat = Category.objects.get(_id=data['category'])
    post = Post.objects.get(_id=pk)   

    userExists = Post.objects.filter(user=user).exists()

    if userExists:
        user  = user,
        post.title = data['title']

        if not request.FILES.get('image'):
           post.image = post.image
        else:
            post.image = request.FILES.get('image')

        post.category = cat
        post.description = data['description']
    elif(user.is_staff == True):
         user  = user,
         post.title = data['title']

         if not request.FILES.get('image'):
            post.image = post.image
         else:
            post.image = request.FILES.get('image')

         post.category = cat
         post.description = data['description']
    post.save()
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyPosts(request):
    user = request.user
    posts = user.post_set.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

