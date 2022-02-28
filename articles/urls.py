from django.urls import path

from .views import ArticleListCreateApiView, ArticleListDetail, ArticleListApiView, AuthorArticleListApiView, AuthorArticleListDetail, AllArticleListApiView, AdminArticleListDetail

app_name = 'articles'

urlpatterns = [
    path('create/', ArticleListCreateApiView.as_view(),
         name='article_list_and_creation'),
    path('admin/', AllArticleListApiView.as_view(),
         name='admin_article_list_view'),
    path('admin/<int:pk>/', AdminArticleListDetail.as_view(),
         name='admin_article_list_detail'),
    path('creator/', AuthorArticleListApiView.as_view(),
         name='author_article_list'),
    path('creator/<int:pk>/', AuthorArticleListDetail.as_view(),
         name='author_article_list_detail'),
    path('', ArticleListApiView.as_view(), name='article_list'),
    path('<int:pk>/', ArticleListDetail.as_view(), name='article_list_detail'),
]
