from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import Following
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from follow.models import Following
# Create your views here.

class UserFollowingView(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Following.objects.all()
    
    def follow(self, request, username):
        # your follow code
        user = self.request.user
        follow = get_user_model().objects.get(username = username)
        user.following.add(follow);
        return Response({'message': 'now you are following'}, status=status.HTTP_200_OK)

    def unfollow(self, request, username):
        # your unfollow code
        user = self.request.user
        follow = get_user_model().objects.get(username=username)
        user.following.remove(follow)
        return Response({'message': 'you are no longer following him'}, status=status.HTTP_200_OK)




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
