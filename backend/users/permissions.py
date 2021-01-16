from rest_framework import permissions
from django.contrib.auth import get_user_model


class IsAuth(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.username == request.user.username
