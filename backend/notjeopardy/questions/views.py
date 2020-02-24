from .serializers import AnswerSerializer, QuestionSerializer
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import authentication, permissions
from django.db.models import Q
from .models import Question, Answer
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
    print(request.user)
    print(not request.user.is_anonymous)
    print(request.user.id == obj.creator.id)
    print(obj.creator)
    if request.user and not request.user.is_anonymous and request.user.id == obj.creator.id:
        return True
    return False
 
class EditDeleteOnlyAsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ['DELETE', 'UPDATE','PATCH']:
            print("is method")
            if is_owner(request, obj):
                print("is owner")
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



    def get_serializer_class(self):
        return QuestionSerializer






            
        

