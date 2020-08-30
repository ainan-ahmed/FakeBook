from django.contrib import admin
from .models import Followers
# Register your models here.
@admin.register(Followers)
class FollowersAdmin(admin.ModelAdmin):
    list_display = ('user','follower','created_at')