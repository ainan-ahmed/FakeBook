from django.db import models

# Create your models here.
from django.contrib.auth import get_user_model
from django.conf import settings


class Followers(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='rel_from_set',
                             )
    follower = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='rel_to_set',
    )
    created_at = models.DateTimeField(auto_now_add=True,
                                      db_index=True)
