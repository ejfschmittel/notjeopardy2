# Generated by Django 3.0.2 on 2020-02-19 16:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('questions', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='question',
            old_name='active',
            new_name='is_active',
        ),
        migrations.RenameField(
            model_name='question',
            old_name='official',
            new_name='is_official',
        ),
        migrations.RemoveField(
            model_name='question',
            name='answer',
        ),
        migrations.RemoveField(
            model_name='question',
            name='category',
        ),
        migrations.RemoveField(
            model_name='question',
            name='favorited',
        ),
        migrations.AddField(
            model_name='question',
            name='correct_answer',
            field=models.UUIDField(blank=True, null=True),
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('answer', models.CharField(max_length=256)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='question_answers', to='questions.Question')),
            ],
        ),
        migrations.CreateModel(
            name='UserQuestionFavorite',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('crated', models.DateTimeField(auto_now_add=True)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='question_favorites', to='questions.Question')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'question')},
            },
        ),
    ]
