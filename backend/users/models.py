from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager
from django.contrib.auth import get_user_model
from django.conf import settings
# Create your models here.
import uuid
from follow.models import Followers

class CustomUser(AbstractUser):
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female')
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    date_of_birth = models.DateField(null=True, blank=True)
    profile_photo = models.ImageField(
        upload_to="profile_photos", null=True, blank=True, default="images/default.png")
    cover_photo = models.ImageField(
        upload_to='cover_photos', blank=True, null=True, default="images/default.png")
    bio = models.TextField(max_length=500, blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)
    gender = models.CharField(
        max_length=20, choices=GENDER_CHOICES, default='male')
    following = models.ManyToManyField('self',through=Followers,related_name='followers',symmetrical=False)
    #objects = UserManager()
    
    def __str__(self):
        return self.username


    


