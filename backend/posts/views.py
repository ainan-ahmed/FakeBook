from django.shortcuts import render
from .models import Post
from .serializers import PostSerializer
from rest_framework import viewsets, permissions
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
        