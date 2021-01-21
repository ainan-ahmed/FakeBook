from rest_framework import serializers
from .models import Post,Comment

class PostSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Post
        fields = ('description', 'image', 'user')
        
    def validate(self, data):
        #data = super().validate(data)
        #print(type(data))
        if data["description"] or hasattr(data, 'image'):
        #if (data["description"] or   data["image"]):
            return data
        else:
            raise serializers.ValidationError({"description":"Both description and image can not be empty"})
        return data


class CommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Comment
        fields = '__all__'
    