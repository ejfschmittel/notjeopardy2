# Generated by Django 3.0.2 on 2020-02-25 14:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0003_auto_20200220_2200'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userquestionfavorite',
            old_name='crated',
            new_name='created',
        ),
    ]