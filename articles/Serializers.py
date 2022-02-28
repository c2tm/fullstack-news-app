from rest_framework import serializers
from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    authorname = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Article
        fields = ('id', 'content', 'authorname', 'img', 'title', 'phase')
