from django.shortcuts import render
from rest_framework import generics

from .models import Article
from .serializers import ArticleSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from articles.permissions import IsUserOrReadOnly, IsAdminOrReadOnly, UserPermsDetail, IsAdminOnly


class ArticleListApiView(generics.ListAPIView):
    queryset = Article.objects.filter(phase='PB')
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class ArticleListDetail(generics.RetrieveAPIView):
    queryset = Article.objects.filter(phase='PB')
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class ArticleListCreateApiView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        """
        Saves the user information and sets it to user field
        """
        serializer.save(author=self.request.user)


class AllArticleListApiView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAdminUser,)


class AdminArticleListDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAdminOrReadOnly,)


class AuthorArticleListApiView(generics.ListCreateAPIView):
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        """
        Retrieve list of articles belonging to specific author
        """
        user = self.request.user.id
        return Article.objects.filter(author=user)

    def perform_create(self, serializer):
        """
        Saves the user information and sets it to user field
        """
        serializer.save(author=self.request.user)


class AuthorArticleListDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (UserPermsDetail,)
