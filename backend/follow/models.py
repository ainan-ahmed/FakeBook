from django.db import models

# Create your models here.
from django.contrib.auth import get_user_model
from django.conf import settings


RELATIONSHIP_FOLLOWING = 1
RELATIONSHIP_BLOCKED = 2
RELATIONSHIP_STATUSES = (
    (RELATIONSHIP_FOLLOWING, 'Following'),
    (RELATIONSHIP_BLOCKED, 'Blocked'),
)

class Following(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='rel_from',
                             )
    following_user_id = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='rel_to',
    )
    status =  models.IntegerField(choices=RELATIONSHIP_STATUSES, default=1)
    created_at = models.DateTimeField(auto_now_add=True,
                                      db_index=True)
    
    
    class Meta:
        unique_together = ("user_id", "following_user_id")
        ordering = ["-created_at"]
        
    def __str__(self):
        return f"{self.user_id} follows {self.following_user_id}"
