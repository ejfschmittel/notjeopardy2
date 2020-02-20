from rest_framework import serializers
from .models import Question, Answer, UserQuestionFavorite

## add liked by you field



class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["id", "answer", "correct"]



class QuestionSerializer(serializers.ModelSerializer):

    answers = AnswerSerializer(source='question_answers', many=True)

    # add creator serializer
    # check if active for user

    def create(self, validated_data):
        print(validated_data)
        answers = validated_data.pop("question_answers")
        question = super().create(validated_data)
 
        answer_objects = []
        for answer in answers:
            print(answer)
            created_answer = Answer.objects.create(**answer, question=question)
            print(created_answer)


            
        return question
        
    class Meta:
        model = Question
        fields = ('id', 'question', 'is_official', 'creator', 'is_active', 'creation_date', 'last_edit_date', 'answers')
        read_only_fields = ('id', 'is_official', 'creator', 'is_active', 'creation_date', 'last_edit_date')
        