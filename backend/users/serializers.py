from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *
from dj_rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'first_name',
                  'last_name', 'date_of_birth')


class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(
        max_length=20, required=True, label='First Name')
    last_name = serializers.CharField(
        max_length=20, required=True, label='Last Name')
    date_of_birth = serializers.DateField(required=True)

    def get_cleaned_data(self):
        super(CustomRegisterSerializer, self).get_cleaned_data()
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'date_of_birth': self.validated_data.get('date_of_birth', ''),
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])

        user.fname = self.cleaned_data.get('fname')
        user.lname = self.cleaned_data.get('lname')
        user.date_of_birth = self.cleaned_data.get('date_of_birth')
        user.save()

        return user
