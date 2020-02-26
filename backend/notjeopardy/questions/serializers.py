from rest_framework import serializers
from categories.serializers import CategorySerializer
from .models import Question, Answer, UserQuestionFavorite
from categories.models import Category
## add liked by you field

class UserQuestionFavoriteSerializer(serializers.ModelSerializer):   
    class Meta:
        model = UserQuestionFavorite
        fields = ["question", "user"]

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["id", "answer", "correct"]



class QuestionSerializer(serializers.ModelSerializer):

    answers = AnswerSerializer(source='question_answers', many=True)
    is_favorited = serializers.SerializerMethodField()
    is_owner = serializers.SerializerMethodField()
    
    category_name_input = serializers.CharField(write_only=True)
    # add creator serializer
    # check if active for user

    
    def validate_category(self, value):
        category_instance = Category.objects.get(name=value)
        return category_instance


    def get_is_owner(self, obj):
        request = self.context['request']

        if request and obj.creator:
            if request.user and request.user == obj.creator:
                return True
        return False

    def get_is_favorited(self, obj):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user


            if user and user.id:
                like_count = UserQuestionFavorite.objects.filter(user=user.id, question=obj).count()
                if like_count > 0:
                    return True
        return False
        

    def create(self, validated_data):
        print(validated_data)
        category_name = validated_data.pop("category_name_input")
        answers = validated_data.pop("question_answers")

        if category_name:
            category, created = Category.objects.get_or_create(name=category_name, defaults={'creator': self.context.get("request").user})
            print(category)
            validated_data["category"] = category
    
        question = super().create(validated_data)

        
      
 
        answer_objects = []
        for answer in answers:
            created_answer = Answer.objects.create(**answer, question=question)

        return question

        
    class Meta:
        model = Question
        fields = ('id', 'question', 'is_official', 'creator', 'is_active', 'creation_date', 'last_edit_date', 'answers', 'is_owner','is_favorited', 'category', 'category_name_input')
        read_only_fields = ('id', 'is_official', 'creator', 'is_active', 'creation_date', 'last_edit_date', 'is_owner', 'is_favorited')
        extra_kwargs = {'category_name_input': {'write_only': True}}
        