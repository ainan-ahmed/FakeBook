from django.urls import path
from .views import *
from rest_framework.routers import SimpleRouter
#from follow.views import FollowerSet

# router = SimpleRouter()
# router.register('', UserViewSet, basename='users')


urlpatterns = [
    path('<username>/', UserDetail.as_view()),
    #path('<username>/profile/', AuthUserDetail.as_view()),
    path('',UserSearch.as_view()),
    #path('/follow',FollowerSet.as_view())
    ]
