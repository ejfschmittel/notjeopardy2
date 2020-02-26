from .serializers import QuizSerializer
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import authentication, permissions
from django.db.models import Q
from .models import Quiz
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.http import Http404

'''
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

'''

class QuizViewset(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    permission_classes = (permissions.AllowAny,)

    def perform_create(self, serializer):
        category = serializer.save(creator=self.request.user)

    def get_serializer_class(self):
        return QuizSerializer

    def get_serializer_context(self):
        return {'request': self.request}