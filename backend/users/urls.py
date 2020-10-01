from django.urls import path
from .views import *
from rest_framework.routers import SimpleRouter
from follow.views import UserFollowingView 
# router = SimpleRouter()
# router.register('', UserViewSet, basename='users')


urlpatterns = [
    path('<username>/', UserDetail.as_view()),
    #path('<username>/profile/', AuthUserDetail.as_view()),
    path('',UserSearch.as_view()),
    path('follow/<username>/', UserFollowingView.as_view({'post': 'follow'})),
    path('unfollow/<username>/',
         UserFollowingView.as_view({'post': 'unfollow'})),
    ]
