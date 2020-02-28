from django.contrib import admin
from .models import Quiz, QuizCategory, QuizQuestion
# Register your models here.

admin.site.register(Quiz)
admin.site.register(QuizCategory)
admin.site.register(QuizQuestion)
