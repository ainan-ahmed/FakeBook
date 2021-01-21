from .views import PostViewSet,CommentViewSet
from rest_framework.routers import DefaultRouter
from django.urls import path,include
router = DefaultRouter()
router.register('',PostViewSet,basename="posts")
#router.register('comments',CommentViewSet,basename="comments")

urlpatterns = [
    path('comments/',CommentViewSet.as_view({'post':'create'})),
    path('comments/<pk>/', CommentViewSet.as_view({'put': 'update', 'delete': 'destroy'})),
    path('', include(router.urls)),
    ]
