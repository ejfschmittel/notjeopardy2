from django.db import models
from accounts.models import MyUser
import uuid
# Create your models here.

class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=64, unique=True, null=False, blank=False)

    official = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
   
    creation_date = models.DateTimeField(auto_now=False, auto_now_add=True)
    creator = models.ForeignKey(to=MyUser, on_delete=models.SET_NULL, null=True,blank=True, default=None)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

    @property
    def favorites(self):
        return UserCategoryFavorites.objects.filter(category=self).count()

class UserCategoryFavorites(models.Model):
    user = models.ForeignKey(to=MyUser, on_delete=models.CASCADE)
    category = models.ForeignKey(to=Category, on_delete=models.CASCADE, related_name="favorited_category")
    crated = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username + " favorited " + self.category.name 

    class Meta:
        unique_together = ('user','category',)

