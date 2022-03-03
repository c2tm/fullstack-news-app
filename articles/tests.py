from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
import json

from articles.serializers import ArticleSerializer
from .models import Article


# Create your tests here.


client = Client()


class ArticleTestModels(TestCase):

    def setUp(self):
        User = get_user_model()
        user = User.objects.create_user(
            username="connor",
            email="connor@example.com",
            password="safepass1",
        )
        Article.objects.create(
            author=user,
            content="example text 1",
            title="example title 1",
        )

        user2 = User.objects.create_user(
            username="gerald",
            email="gerald@example.com",
            password="safepass1",
        )
        Article.objects.create(
            author=user2,
            content="example text 2",
            title="example title 2",
            phase="PB"
        )

    def test_article_content(self):
        article = Article.objects.get(id=1)
        author = f'{article.author}'

        self.assertEqual(author, 'connor')
        self.assertTrue(article.phase == 'DR')

    def test_get_all_articles(self):
        response = client.get(reverse('api:articles:article_list'))

        articles = Article.objects.filter(phase='PB')
        serializer = ArticleSerializer(articles, many=True)

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_article(self):
        response = client.get(
            reverse('api:articles:article_list_detail', kwargs={'pk': 400}))

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CreateNewArticleTest(TestCase):
    def setUp(self):
        User = get_user_model()
        user = User.objects.create_user(
            username="connor",
            email="connor@example.com",
            password="safepass1",
        )

        user2 = User.objects.create_user(
            username="connor2",
            email="connor2@example.com",
            password="safepass1",
        )

        self.assertTrue(client.login(
            username="connor", password="safepass1"))

        self.valid_payload = {
            'author': user.username,
            'content': "example text 1",
            'title': "example title 1",
        }
        self.invalid_payload = {
            'author': user.username,
            'content': True,
            'title': "example title 1",
        }

        Article.objects.create(
            author=user,
            content="example text 1",
            title="example title 1",
        )

        Article.objects.create(
            author=user2,
            content="example text 2",
            title="example title 2",
        )

    def test_create_valid_article(self):
        response = client.post(
            reverse('api:articles:article_list_and_creation'),
            data=json.dumps(self.valid_payload),
            content_type='application/json',
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response2 = client.post(
            reverse('api:articles:article_list_and_creation'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json',
        )
        self.assertEqual(response2.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_article(self):

        response = client.delete(
            reverse('api:articles:author_article_list_detail',
                    kwargs={'pk': 1}),
            content_type='application/json',
        )

        response2 = client.delete(
            reverse('api:articles:author_article_list_detail',
                    kwargs={'pk': 2}),
            content_type='application/json',
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response2.status_code, status.HTTP_403_FORBIDDEN)
