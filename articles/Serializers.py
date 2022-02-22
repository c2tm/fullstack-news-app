from rest_framework import serializers

from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Article
        fields = ('id', 'content', 'user', 'username', 'img', 'title')
