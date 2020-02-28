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
    
    creation_date = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_edit_date = models.DateTimeField(auto_now=True, auto_now_add=False)
    creator = models.ForeignKey(to=MyUser, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        verbose_name_plural = "Quizzes"

    def __str__(self):
        return self.title

class QuizCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.ForeignKey(to=Category, on_delete=models.PROTECT)
    quiz = models.ForeignKey(to=Quiz, on_delete=models.CASCADE, related_name="quiz_catgories")   

    class Meta:
        verbose_name_plural = "Quiz categories"

    def __str__(self):
        return "QuizCategory: {} for {} ({})".format(self.category.name, self.quiz.title, self.quiz.id) 

class QuizQuestion(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.ForeignKey(to=Question, on_delete=models.PROTECT)
    category = models.ForeignKey(to=QuizCategory, on_delete=models.CASCADE)
    quiz = models.ForeignKey(to=Quiz, on_delete=models.CASCADE, related_name="quiz_questions")
    points = models.IntegerField(default=100, null=True, blank=True)

    def __str__(self):
        return  "QuizQuestion: {} for {} ({})".format(self.question.question, self.quiz.title, self.quiz.id) 
