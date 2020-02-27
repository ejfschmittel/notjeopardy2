from django.db import models
from accounts.models import MyUser
from questions.models import Question
from categories.models import Category
import uuid
# Create your models here.

class QuizTag(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slug = models.SlugField(max_length=16)
    name = models.CharField(max_length=16)
    creation_date = models.DateTimeField(auto_now=False, auto_now_add=True)

class Quiz(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=128, null=False, blank=False)

    tags = models.ManyToManyField(to=QuizTag, blank=True)

    official = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    public = models.BooleanField(default=True)
    
    categories = models.ManyToManyField(Category, related_name="quiz_categories", blank=True)
    questions = models.ManyToManyField(Question, related_name="quiz_questions", blank=True)

    creation_date = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_edit_date = models.DateTimeField(auto_now=True, auto_now_add=False)
    creator = models.ForeignKey(to=MyUser, on_delete=models.SET_NULL, null=True)

    class Meta:
        verbose_name_plural = "Quizzes"

    def __str__(self):
        return self.title

class QuizCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.ForeignKey(to=Category, on_delete=models.PROTECT)
    quiz = models.ForeignKey(to=Quiz, on_delete=models.CASCADE)   

class QuizQuestion(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.ForeignKey(to=Question, on_delete=models.PROTECT)
    category = models.ForeignKey(to=QuizCategory, on_delete=models.CASCADE)
    quiz = models.ForeignKey(to=Quiz, on_delete=models.CASCADE)
    points = models.IntegerField()

    def __str__(self):
        return "question " + str(self.id) + " for " + Quiz.title
