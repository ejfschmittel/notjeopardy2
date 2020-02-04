from django.db import models
from accounts.models import MyUser
from categories.models import Category
import uuid
# Create your models here.

class Question(models.Model): 
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.CharField(max_length=256, null=False, blank=False)
    answer = models.CharField(max_length=256, null=False, blank=False)

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
