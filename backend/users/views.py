from django.shortcuts import render
from rest_framework import generics, permissions, viewsets
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .serializers import *
from rest_framework import authentication, permissions
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .permissions import IsUser

# class UserViewSet(viewsets.ModelViewSet):
#     queryset = get_user_model().objects.all()
#     serializer_class = UserSerializer

# class UserList(generics.ListCreateAPIView):
#     queryset = get_user_model().objects.all()
#     serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_class = IsUser
