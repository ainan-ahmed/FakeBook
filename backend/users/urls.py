from django.urls import path
from .views import *
from rest_framework.routers import SimpleRouter


# router = SimpleRouter()
# router.register('', UserViewSet, basename='users')


urlpatterns = [
        path('<int:pk>/',UserDetail.as_view())
    ]
