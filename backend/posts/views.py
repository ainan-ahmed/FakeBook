from django.shortcuts import render
from .models import Post,Comment
from .serializers import PostSerializer,CommentSerializer
from rest_framework import viewsets, permissions,generics,mixins
from .permissions import IsAuthor

# Create your views here.


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated, IsAuthor, )

    def get_queryset(self):
        # after get all products on DB it will be filtered by its owner and return the queryset
        user_queryset = self.queryset.filter(user=self.request.user)
        return user_queryset    

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (permissions.IsAuthenticated,)
    # def get_queryset(self):
    #     # after get all products on DB it will be filtered by its owner and return the queryset
    #     queryset = self.queryset.filter(post=self.request.post,user=self.request.user)
    #     return queryset
