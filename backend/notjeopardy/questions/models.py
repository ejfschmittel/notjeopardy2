from django.db import models
from accounts.models import MyUser
from categories.models import Category
import uuid



class Question(models.Model): 
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # add image option
    question = models.CharField(max_length=256, null=False, blank=False)

    correct_answer = models.UUIDField(null=True, blank=True)

    is_official = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    creation_date = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_edit_date = models.DateTimeField(auto_now=True, auto_now_add=False)
    creator = models.ForeignKey(to=MyUser, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.question


class Answer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    answer = models.CharField(max_length=256, null=False, blank=False)
    question = models.ForeignKey(to=Question, on_delete=models.CASCADE, related_name="question_answers")

    def __str__(self):
        return str(self.id)



class UserQuestionFavorite(models.Model):
    user = models.ForeignKey(to=MyUser, on_delete=models.CASCADE)
    question = models.ForeignKey(to=Question, on_delete=models.CASCADE, related_name="question_favorites")
    crated = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username + " favorited " + self.question.id 

    class Meta:
        unique_together = ('user','question',)

