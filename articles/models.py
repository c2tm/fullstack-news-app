from django.db import models
from django.conf import settings

# Create your models here.


class Article(models.Model):
    # user: models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField(null=True, max_length=267)

    def __str__(self):
        return self.user
