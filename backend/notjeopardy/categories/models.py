from django.db import models
from accounts.models import MyUser
import uuid
# Create your models here.

class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=64, unique=True, null=False, blank=False)

    official = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    favorited = models.ManyToManyField(to=MyUser, related_name="favorite_categories")

    creation_date = models.DateTimeField(auto_now=False, auto_now_add=True)
    creator = models.ForeignKey(to=MyUser, on_delete=models.SET_NULL, null=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

