# Generated by Django 3.2.12 on 2022-02-22 17:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0003_article_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='img',
            field=models.ImageField(null=True, upload_to='articles/'),
        ),
    ]