from rest_framework import serializers
from .models import QuizTag, Quiz

class QuizSerializer(serializers.ModelSerializer):

    class Meta:
        model = Quiz
        fields = ("id", "title", "questions", "categories", "creator")