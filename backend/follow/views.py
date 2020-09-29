from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import Following
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response

# Create your views here.


# class FollowerSet(APIView):
#     permission_class = [IsAuthenticated, ]

#     def post(self, request, format=None):
#         user = get_user_model().objects.get(
#             id=self.request.data.get['username'])
#         follow = get_user_model().objects.get(
#             id=self.request.data.get['follow'])
#         Following.objects.create(user_id=user, following_user_id=follow)
#         # Followers.save()
#         return JsonResponse(status=status.HTTP_200_OK, messege="")

#     def delete(self, request, format=None):
#         user = get_user_model().objects.get(
#             id=self.request.data.get['username'])
#         follow = get_user_model().objects.get(
#             id=self.request.data.get['follow'])
#         Following.objects.filter(
#             user_id = self,
#             following_user_id = follow,
#         ).delete()
#         return JsonResponse(status=status.HTTP_200_OK, messege="")
