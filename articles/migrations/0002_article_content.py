# Generated by Django 3.2.12 on 2022-02-21 19:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='content',
            field=models.TextField(max_length=267, null=True),
        ),
    ]
