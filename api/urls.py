from django.urls import path, include

app_name = 'api'

urlpatterns = [
    path('articles/', include('articles.urls', namespace="articles"))
]
