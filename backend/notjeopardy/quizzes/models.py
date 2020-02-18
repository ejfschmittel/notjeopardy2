from django.db import models
from accounts.models import MyUser
from questions.models import Question
from categories.models import Category
import uuid
# Create your models here.

class Quiz(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=128, null=False, blank=False)

    official = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    public = models.BooleanField(default=True)
    
    categories = models.ManyToManyField(Category, related_name="quiz_categories")
    questions = models.ManyToManyField(Question, related_name="quiz_questions")

    creation_date = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_edit_date = models.DateTimeField(auto_now=True, auto_now_add=False)
    creator = models.ForeignKey(to=MyUser, on_delete=models.SET_NULL, null=True)

    class Meta:
        verbose_name_plural = "Quizzes"

    def __str__(self):
        return self.name
