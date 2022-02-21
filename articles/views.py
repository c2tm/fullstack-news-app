from django.shortcuts import render
from rest_framework import generics

from .models import Article
from .Serializers import ArticleSerializer

# Create your views here.


class ArticleListApiView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
