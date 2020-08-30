from rest_framework import permissions


class IsAuthUser(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        print(request.user)
        return obj == request.user
    