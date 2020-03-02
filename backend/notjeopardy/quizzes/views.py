
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import authentication, permissions
from django.db.models import Q

from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.http import Http404

from .serializers import QuizSerializer, QuizCategorySerializer, QuizQuestionSerializer, QuizListSerializer, QuizReadSerializer, QuizWriteSerializer, QuizWriteSerializer2
from .models import Quiz, QuizCategory, QuizQuestion




class QuizViewset(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    permission_classes = (permissions.AllowAny,)

    def create(self, request, *args, **kwargs):
        serializer = QuizWriteSerializer2(data=request.data)
        serializer.is_valid(raise_exception=True)
        quiz = serializer.save(creator=self.request.user)
        headers = self.get_success_headers(serializer.data)

        output_serializer  = QuizReadSerializer(quiz)
        return Response(output_serializer.data, status=status.HTTP_201_CREATED, headers=headers)



    def get_serializer_class(self):
        if self.action == 'list':
            return QuizListSerializer
        if self.action == 'retrieve':
            return QuizReadSerializer
        return QuizWriteSerializer

    def get_serializer_context(self):
        return {'request': self.request}


class QuizCategoryViewset(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    def get_serializer_class(self):
        return QuizCategorySerializer


    @action(detail=False, methods=['post'], url_path="autofill_quiz_categories", url_name="autofill_quiz_categories")
    def autofill_quiz_categories(self,request, *args, **kwargs):
        # category array / existing / new
        # get categories from request
        # count categories
        # get existing / create new QuizCateogries
        # get quiz category set
        
        # fill 6 - count question set >  categries != category set
      
        # get categories from request
       # 
       return Response(status=status.HTTP_200_OK)

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
    