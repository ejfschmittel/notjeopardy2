from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import QuizTag, Quiz, QuizCategory, QuizQuestion
from accounts.serializers import UserDisplaySerializer
from questions.serializers import QuestionSerializer
from categories.serializers import CategorySerializer
from categories.models import Category

User = get_user_model()


class QuizCategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer(required=False)

    def create(self, validated_data):
        print(validated_data)
        #quiz_category = QuizCategory.objects.create(**validated_data)
        return QuizCategory.objects().all().first()

    def validate_category(self, value):
        print("category validation")
        return value

    class Meta:
        model = QuizQuestion
        fields = ("id", "category")

 
class QuizQuestionSerializer(serializers.ModelSerializer):
    question = QuestionSerializer()
    category = QuizCategorySerializer()

    class Meta:
        model = QuizQuestion
        fields = ("id", "question", "category", "points")

import json



class QuizListSerializer(serializers.ModelSerializer):

    categories = QuizCategorySerializer(source="quiz_catgories", many=True, read_only=True)

    creator = UserDisplaySerializer()

    class Meta:
        model = Quiz
        fields = ("id", "title", "creator", "categories", )
        read_only_fields = ("id", "title", "creator", "categories",)



class QuizSerializer(serializers.ModelSerializer):

    categories = QuizCategorySerializer(source="quiz_catgories", many=True, read_only=True)
    questions = QuizQuestionSerializer(source="quiz_questions", many=True, required=False)

    creator = UserDisplaySerializer(required=False)


    def to_internal_value(self, data):
        print(data)
        quiz_categories = data.get("categories", list())
        data = super(QuizSerializer, self).to_representation(data)
        
        data.update({
            "quiz_categories": quiz_categories
        })
        print(data)
        return data

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

    def create(self, validated_data):
        categories = validated_data.pop("quiz_categories")
        # questions = validated_data.pop("quiz_questions")

        quiz = Quiz.objects.create(**validated_data)

      

        # add limit to categries => later
        # create quizCategory => override create

        for categoryInfo in categories:
            categoryName = categoryInfo.get("name", None)
            instance, created = Category.objects.get_or_create(name=categoryName, defaults={"creator": quiz.creator})
            quiz_category = QuizCategory.objects.create(quiz=quiz, category=instance)

        #obj.save(foo=validated_data['foo'])
        return quiz

    class Meta:
        model = Quiz
        fields = ("id", "title", "creator", "categories", "questions")
