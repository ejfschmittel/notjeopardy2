from rest_framework import serializers
from .models import Question, Answer, UserQuestionFavorite

## add liked by you field



class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["id", "answer"]


'''
   id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # add image option
    question = models.CharField(max_length=256, null=False, blank=False)

    correct_answer = models.UUIDField(null=True, blank=True)
    category = models.ForeignKey(to=Category, on_delete=models.SET_NULL, null=True)

    official = models.BooleanField(default=False)
    active = models.BooleanField(default=True)

    favorited = models.ManyToManyField(to=MyUser, related_name="favorite_questions")

    creation_date = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_edit_date = models.DateTimeField(auto_now=True, auto_now_add=False)
    creator = models.ForeignKey(to=MyUser, on_delete=models.SET_NULL, null=True)
'''

class QuestionSerializer(serializers.ModelSerializer):

    answers = AnswerSerializer(source='question_answers', many=True)

    # add creator serializer
    # check if active for user

    def create(self, validated_data):
        answers = validated_data.pop("question_answers")
        question = super().create(validated_data)
 
        answer_objects = []
        for answer in answers:
            answer = Answer.objects.create(**answer, question=question)
            
        return question
        
    class Meta:
        model = Question
        fields = ('id', 'question', 'correct_answer', 'is_official', 'creator', 'is_active', 'creation_date', 'last_edit_date', 'answers')
        read_only_fields = ('id', 'is_official', 'creator', 'is_active', 'creation_date', 'last_edit_date')
        