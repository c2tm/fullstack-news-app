# Create your tests here.

from django.contrib.auth import get_user_model
from django.test import TestCase


class userTests(TestCase):
    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(
            username="connor",
            email="connor@example.com",
            password="safepass1",
        )

        self.assertEqual(user.username, 'connor')
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertTrue(user.is_active)


class superuserTests(TestCase):
    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_superuser(
            username="connor",
            email="connor@example.com",
            password="safepass1",
        )

        self.assertEqual(user.username, 'connor')
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_active)
