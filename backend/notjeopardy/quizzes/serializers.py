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

    categories = QuizCategorySerializer(source="quiz_categories", many=True, read_only=True)

    creator = UserDisplaySerializer()

    class Meta:
        model = Quiz
        fields = ("id", "title", "creator", "categories", )
        read_only_fields = ("id", "title", "creator", "categories",)



class CategoryInputSerializer(serializers.Serializer):
    id = serializers.UUIDField(required=False)

    name = serializers.CharField(write_only=True, required=True)
    official = serializers.BooleanField(required=False)

class QuizReadSerializer(serializers.ModelSerializer):
    categories = QuizCategorySerializer(source="quiz_categories", many=True, read_only=True)
    questions = QuizQuestionSerializer(source="quiz_questions", many=True, required=False)

    creator = UserDisplaySerializer()

    class Meta:
        model = Quiz
        fields = ("id", "title", "creator", "categories", "questions")
        read_only_fields = ("id", "title", "creator", "categories","questions")  


class CategorySerializerWithoutUniqueCosntraint(CategorySerializer):
    class Meta:
        model = Category
        fields = ['id','name', 'official', 'is_favorited']
        read_only_fields = ('id', 'official', 'is_favorited')
        extra_kwargs = {
            'name': {'validators': []},
        }

class QuizWriteSerializer2(serializers.ModelSerializer):
    categories = CategorySerializerWithoutUniqueCosntraint(many=True, required=False)
    creator = UserDisplaySerializer(required=False)

    def get_fields(self):
        print("before get fields")
        fields = super().get_fields()
        print(fields)
        print("after get fields")
        return fields

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

    def to_internal_value(self, data):
        print("before internal value")
        data = super().to_internal_value(data)
        print("after internal value")
        return data
  
    def validate(self, attrs):
        print("before validation")
        data = super(QuizWriteSerializer2, self).validate(attrs)
        print("after validation")
        return data

    def create(self, validated_data):
        print(validated_data)
        categories = validated_data.pop("categories")
        
        quiz = Quiz.objects.create(**validated_data)

        print(categories)

        # add limit to categries => later
        # create quizCategory => override create
    
        for category in categories:
            categoryName = category.get("name", None)
            print(quiz.creator)
            instance, created = Category.objects.get_or_create(name=categoryName, defaults={"creator": quiz.creator})
            quiz_category = QuizCategory.objects.create(quiz=quiz, category=instance)
        '''
            instance, created = Category.objects.get_or_create(name=categoryName, defaults={"creator": quiz.creator})
            quiz_category = QuizCategory.objects.create(quiz=quiz, category=instance)
        '''

        return quiz

    class Meta:
        model = Quiz
        fields = ("id", "title", "creator", "categories")


class QuizWriteSerializer(serializers.ModelSerializer):
    categories = CategoryInputSerializer(many=True, required=False)
    # questions = QuizQuestionSerializer(source="quiz_questions", many=True, required=False)

    creator = UserDisplaySerializer(required=False)

    def to_internal_value(self, data):
        print(data)
        return super().to_internal_value(data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

    def create(self, validated_data):
        print(validated_data)
        categories = validated_data.pop("categories")
        
        quiz = Quiz.objects.create(**validated_data)

        print(categories)

        # add limit to categries => later
        # create quizCategory => override create
    
        for category in categories:
            categoryName = category.get("name", None)
            print(categoryName)
        '''
            instance, created = Category.objects.get_or_create(name=categoryName, defaults={"creator": quiz.creator})
            quiz_category = QuizCategory.objects.create(quiz=quiz, category=instance)
        '''

        return quiz

    class Meta:
        model = Quiz
        fields = ("id", "title", "creator", "categories")
        extra_kwargs = {
            'categories': {'validators': []},
            'quiz_categories': {'validators': []},
        }
     


class QuizSerializer(serializers.ModelSerializer):

    categories = QuizCategorySerializer(source="quiz_catgories", many=True, read_only=True)
    questions = QuizQuestionSerializer(source="quiz_questions", many=True, required=False)

    creator = UserDisplaySerializer(required=False)

    '''
    def to_internal_value(self, data):
        print(data)
        quiz_categories = data.get("categories", list())
        data = super(QuizSerializer, self).to_representation(data)
        
        data.update({
            "quiz_categories": quiz_categories
        })
        print(data)
        return data
    '''
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

    def validate_title(self, value):
        if not value:
            raise serializers.ValidationError("Title can not be empty!")
        return value

    class Meta:
        model = Quiz
        fields = ("id", "title", "creator", "categories", "questions")
