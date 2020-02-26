from .serializers import AnswerSerializer, QuestionSerializer, UserQuestionFavoriteSerializer
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import authentication, permissions
from django.db.models import Q
from .models import Question, Answer, UserQuestionFavorite
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.http import Http404


class IsCreator(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'DELETE':
            if request.user and not request.user.is_anonymous and request.user.id == obj.creator:
                return True
            return False 
        return True

class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'DELETE':
            if request.user and not request.user.is_anonymous and request.user.id == obj.owner:
                return True
            return False 
        return True

def is_owner(request, obj):

    if obj.creator and request.user and not request.user.is_anonymous and request.user.id == obj.creator.id:
        return True
    return False
 
class EditDeleteOnlyAsOwner(BasePermission):

    message = "Unable to delete / edit this object as you are not the owner."

    def has_object_permission(self, request, view, obj):
        if request.method in ['DELETE', 'UPDATE','PATCH']:
            print("is method")
            if is_owner(request, obj):
                return True
            return False                 
        return True

class CreateAuthenticatedOnly(IsAuthenticated):
    def has_permission(self, request, view):
        if view.action == "create":
            return True and super(CreateAuthenticatedOnly,self).has_permission(request, view)
        return True


class QuestionViewset(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    permission_classes = (permissions.AllowAny, EditDeleteOnlyAsOwner,CreateAuthenticatedOnly)
    #permission_classes = (IsAuthenticated, isCreator)

    # get questions

    # get question suggestions

    def perform_create(self, serializer):
        category = serializer.save(creator=self.request.user)

    @action(detail=True, methods=['post'], url_path="favorite_question", url_name="favorite_question")
    def favorite_question(self,request, pk, *args, **kwargs):
        serializer = UserQuestionFavoriteSerializer(data = {
            "question": pk,
            "user": request.user.id
        })
        serializer.is_valid(raise_exception=True)
        serializer.save()
        print(serializer.errors)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @action(detail=True, methods=['post'], url_path="unfavorite_question", url_name="unfavorite_question")
    def unfavorite_question(self,request, pk, *args, **kwargs):
        try:
            instance = UserQuestionFavorite.objects.get(user=request.user.id, question=pk)
            serializer = UserQuestionFavoriteSerializer(instance)
            data = serializer.data
            self.perform_destroy(instance)
            return Response(data, status=status.HTTP_200_OK)
        except Http404:
            pass
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def get_serializer_class(self):
        return QuestionSerializer

    def get_serializer_context(self):
        return {'request': self.request}






            
        

