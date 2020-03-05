import graphene
from graphene_django.types import DjangoObjectType
from .models import Quiz

class QuizType(DjangoObjectType):
    class Meta:
        model = Quiz

class Query(graphene.ObjectType):
    
    all_quizzes = graphene.List(QuizType)

    def resolve_all_quizzes(self, info, **kwargs):
        return Quiz.objects.all()