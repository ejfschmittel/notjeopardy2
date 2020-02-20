from .serializers import AnswerSerializer, QuestionSerializer
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import authentication, permissions
from django.db.models import Q
from .models import Question, Answer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.http import Http404

'''
TODO: FILTER CATEGORIES 
user / favorites / 


'''
class QuestionViewset(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    permission_classes = [permissions.AllowAny]
    #permission_classes = (IsAuthenticated,)

    # get questions

    # get question suggestions



    # add favorite
    # add unfavorite

    def get_serializer_class(self):
        return QuestionSerializer






            
        

