from django.db import models
import uuid
# Create your models here.
from django.contrib.auth import get_user_model
class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description = models.TextField(max_length=500, blank=True, null=True)
    image = models.ImageField(
        upload_to='images_from_posts', null=True, blank=True)
    
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name='posts')
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    users_like =models.ManyToManyField(get_user_model(),related_name='posts_liked',blank=True)
    
    def __str__(self):
        return self.description
    

class Comment(models.Model):
    post = models.ForeignKey(Post,on_delete=models.CASCADE,related_name='comments')
    data_created = models.DateTimeField(auto_now_add=True)
    body = models.TextField()
    posted_by = models.ForeignKey(get_user_model(),on_delete=models.CASCADE)

    class Meta:
        ordering = ('data_created',)

    def __str__(self):
        return f'Comment by {self.posted_by} on {self.post}'
    
# class SharePost(models.Model):
#     post = models.ForeignKey(
#         Post, on_delete=models.CASCADE, related_name='comments')
#     user = models.ForeignKey(
#         get_user_model(), on_delete=models.CASCADE, related_name='posts')
#     description = models.CharField(max_length = 500 , blank=True)   
