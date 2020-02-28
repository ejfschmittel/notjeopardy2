
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import authentication, permissions
from django.db.models import Q

from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.http import Http404

from .serializers import QuizSerializer, QuizCategorySerializer, QuizQuestionSerializer, QuizListSerializer
from .models import Quiz, QuizCategory, QuizQuestion




class QuizViewset(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    permission_classes = (permissions.AllowAny,)

    def perform_create(self, serializer):
        category = serializer.save(creator=self.request.user)

    def get_serializer_class(self):
        if self.action == 'list':
            return QuizListSerializer
        return QuizSerializer

    def get_serializer_context(self):
        return {'request': self.request}


class QuizCategoryViewset(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    def get_serializer_class(self):
        return QuizCategorySerializer

    # todo: override serializer create to 

    def get_queryset(self, *args, **kwargs):
        quizid = self.kwargs.get("quizid")
        return QuizCategory.objects.filter(quiz=quizid)
    
class QuizQuestionViewset(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    def get_serializer_class(self):
        return QuizQuestionSerializer

    # todo: override serializer create to 

    def get_queryset(self, *args, **kwargs):
        quizid = self.kwargs.get("quizid")
        return QuizQuestion.objects.filter(quiz=quizid)
    