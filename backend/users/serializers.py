from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *
from dj_rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from posts.models import Post, Comment
from follow.models import Following


class getUserAndProfilePicture(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('username', 'profile_photo')


class PostCommentSerializer(serializers.ModelSerializer):
    #posted_by = serializers.StringRelatedField()
    posted_by = getUserAndProfilePicture()
    class Meta:
        model = Comment
        fields = ('data_created', 'body', 'posted_by')


class UserPostSerializer(serializers.ModelSerializer):
    user = getUserAndProfilePicture()
    users_like = serializers.StringRelatedField(many=True)
    comments = PostCommentSerializer(many=True)

    class Meta:
        model = Post
        ordering = ['-date_created']
        fields = '__all__'


# class FollowerSerializer(serializers.ModelSerializer):
#     following_user_id = serializers.StringRelatedField()
#     #user_id = serializers.StringRelatedField()

#     class Meta:
#         model = Following
#         fields = ['following_user_id']


class UserSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('first_name', 'last_name', 'username',
                  'profile_photo', 'city', 'country')


class UserSerializer(serializers.ModelSerializer):
    #posts = UserPostSerializer(many=True, read_only=True)
    #followers = FollowerSerializer(many=True, read_only=True)
    #following = serializers.StringRelatedField(many=True)
    #followers = serializers.StringRelatedField(many=True)

    class Meta:
        model = get_user_model()
        lookup_field = "username"
        fields = ('id', 'username', 'email', 'first_name',
                  'last_name', 'date_of_birth', 'gender', 'profile_photo', 'cover_photo', 'bio', 'city', 
                  #'posts', 'followers','following'
                  )
class UserDetailsSerializer(serializers.ModelSerializer):
    posts = UserPostSerializer(many=True, read_only=True)
    #followers = FollowerSerializer(many=True, read_only=True)
    following = serializers.StringRelatedField(many=True)
    followers = serializers.StringRelatedField(many=True)

    class Meta:
        model = get_user_model()
        lookup_field = "username"
        fields = (
                 'id', 'username', 'email', 'first_name',
                 'last_name', 'date_of_birth', 'gender', 'profile_photo', 'cover_photo', 'bio', 'city', 
                  'posts', 
                  'followers',
                  'following'
                  )


class AuthUserSerializer(serializers.ModelSerializer):
    posts = UserPostSerializer(many=True)
    following = serializers.StringRelatedField(many=True)
    followers = serializers.StringRelatedField(many=True)

    class Meta:
        model = get_user_model()
        lookup_field = "username"
        fields = (
            'posts',
            'followers',
            'following'
        )


class CustomRegisterSerializer(RegisterSerializer):
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female')
    )
    first_name = serializers.CharField(
        max_length=20, required=True, label='First Name')
    last_name = serializers.CharField(
        max_length=20, required=True, label='Last Name')
    date_of_birth = serializers.DateField(required=True)
    gender = serializers.ChoiceField(required=True, choices=GENDER_CHOICES)

    def get_cleaned_data(self):
        super(CustomRegisterSerializer, self).get_cleaned_data()
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'date_of_birth': self.validated_data.get('date_of_birth', ''),
            'gender': self.validated_data.get('gender', ''),
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
        user.gender = self.cleaned_data.get('gender')
        user.save()

        return user
