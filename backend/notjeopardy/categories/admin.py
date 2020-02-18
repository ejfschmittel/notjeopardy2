from django.contrib import admin
from .models import Category, UserCategoryFavorites
# Register your models here.

admin.site.register(Category)
admin.site.register(UserCategoryFavorites)
