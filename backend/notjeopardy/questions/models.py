from django.db import models
from accounts.models import MyUser
from categories.models import Category
import uuid
# Create your models here.

'''

support for answer possiblities ???

question

Many To many 

type: standard

question:

answers



right answer = mode
answers (cap at 4)

'''

class Answer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    answer = models.CharField(max_length=256, null=False, blank=False)

    def __str__(self):
        return self.id

STANDARD = 'STANDARD'
ANSWERS4 = '4ANSWERS'

question_modes = (
    (STANDARD, 'standard',),
    (ANSWERS4, '4 answers'),
)


class CorrectAnswer(models.IntegerChoices):
    ANSWER_1 = 1
    ANSWER_2 = 2
    ANSWER_3 = 3
    ANSWER_4 = 4

class Question(models.Model): 
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # add image option
    question = models.CharField(max_length=256, null=False, blank=False)

    correct_answer = models.IntegerField(choices=CorrectAnswer.choices, default=1)

 
    answer_1 = models.CharField(max_length=256, null=False, blank=False)
    answer_2 = models.CharField(max_length=256, null=False, blank=False)

    # pro easier to serialize
    	
    mode  = models.CharField(max_length=16, null=False, blank=False, choices=question_modes, default=STANDARD)

    # later add picture

    # maybe create a default category
    category = models.ForeignKey(to=Category, on_delete=models.SET_NULL, null=True)

    official = models.BooleanField(default=False)
    active = models.BooleanField(default=True)

    favorited = models.ManyToManyField(to=MyUser, related_name="favorite_questions")

    creation_date = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_edit_date = models.DateTimeField(auto_now=True, auto_now_add=False)
    creator = models.ForeignKey(to=MyUser, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.question

class UserQuestionFavorite(models.Model):
    user = models.ForeignKey(to=MyUser, on_delete=models.CASCADE)
    question = models.ForeignKey(to=Question, on_delete=models.CASCADE)
    crated = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username + " favorited " + self.question.id 

    class Meta:
        unique_together = ('user','question',)

