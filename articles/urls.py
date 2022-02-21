from django.urls import path

from .views import ArticleListApiView

app_name = 'articles'

urlpatterns = [
    path('', ArticleListApiView.as_view(), name='article_list')
]
