from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import QuizTag, Quiz, QuizCategory, QuizQuestion
from accounts.serializers import UserDisplaySerializer
from questions.serializers import QuestionSerializer
from categories.serializers import CategorySerializer

User = get_user_model()


class QuizCategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = QuizQuestion
        fields = ("id", "category")
 
class QuizQuestionSerializer(serializers.ModelSerializer):
    question = QuestionSerializer()
    category = QuizCategorySerializer()

    class Meta:
        model = QuizQuestion
        fields = ("id", "question", "category", "points")


class QuizSerializer(serializers.ModelSerializer):

    categories = QuizCategorySerializer(source="quiz_catgories", many=True)
    questions = QuizQuestionSerializer(source="quiz_questions", many=True)

    creator = UserDisplaySerializer()

    class Meta:
        model = Quiz
        fields = ("id", "title", "creator", "categories", "questions")