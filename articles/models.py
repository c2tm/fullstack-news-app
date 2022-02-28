from django.db import models
from django.conf import settings

# Create your models here.

PHASES = [
    ('DR', 'Draft'),
    ('SB', 'Submitted'),
    ('RJ', 'Rejected'),
    ('PB', 'Published'),
    ('AR', 'Archived'),
]


class Article(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL,
                               on_delete=models.CASCADE, null=True)
    content = models.TextField(null=True, max_length=267)
    img = models.ImageField(upload_to=('article_photos/'), null=True)
    title = models.TextField(null=True, max_length=24)
    phase = models.TextField(max_length=2, choices=PHASES, default='DR')

    def __str__(self):
        return self.content[:10]
