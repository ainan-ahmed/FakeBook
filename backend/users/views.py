from django.shortcuts import render
from rest_framework import generics, permissions, viewsets
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .serializers import *
from .permissions import IsAuth
from rest_framework import authentication
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = get_user_model().objects.all()
#     serializer_class = UserSerializer

# class UserList(generics.ListCreateAPIView):
#     queryset = get_user_model().objects.all()
#     serializer_class = UserSerializer


class UserDetails(generics.RetrieveAPIView):
    lookup_field = "username"
    queryset = get_user_model().objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = (permissions.AllowAny,)


class UserSearch(generics.ListAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSearchSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email']
    


class AuthUserDetail(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = "username"
    queryset = get_user_model().objects.all()
    serializer_class = AuthUserSerializer
    permission_classes = (IsAuthenticated, IsAuth)
