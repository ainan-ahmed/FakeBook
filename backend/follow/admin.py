from django.contrib import admin
from .models import Following
# Register your models here.
@admin.register(Following)
class FollowersAdmin(admin.ModelAdmin):
    list_display = ('user_id','following_user_id','created_at')