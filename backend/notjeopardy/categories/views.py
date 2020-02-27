from .serializers import CategorySerializer, CategoryAdminSerializer, UserCategoryFavoriteSerializer
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import authentication, permissions
from django.db.models import Q
from .models import Category, UserCategoryFavorites
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.http import Http404

'''
TODO: FILTER CATEGORIES 
user / favorites / 


'''
class CategoryViewset(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    #permission_classes = (IsAuthenticated,permissions.)

    def perform_create(self, serializer):
        category = serializer.save(creator=self.request.user)
        UserCategoryFavorites.objects.create(category=category, user=self.request.user)



    def list(self,request, *args, **kwargs):
        # filter by official, searchTerm, owned, favorited
        # default include all
        searchTerm = request.query_params.get("s")
        includeFlags = request.query_params.get("include")

        
        flagQueryDict = {
            "official": Q(official=True),
            "owner":  (Q(creator__isnull=False) & Q(creator=request.user)) if request.user and not request.user.is_anonymous else Q(),
            "favorited": Q(favorited_category__user=request.user) if request.user and not request.user.is_anonymous  else Q(),
        }

        q = Q()
        if(includeFlags):
            q = Q()
            for flag in includeFlags.split(","):
                if flagQueryDict.get(flag):
                    q |= flagQueryDict.get(flag)

        
        offical = Category.objects.all()
        offical = offical.filter(q)
         
        if searchTerm:
            offical = offical.filter(name__contains=searchTerm)

        serializer = CategorySerializer(offical, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path="get_official", url_name="get_official")
    def get_official(self,request, *args, **kwargs):
        searchTerm = request.query_params.get("s")
        offical = Category.objects.filter(official=True)

      
        if searchTerm:
     
            offical = offical.filter(name__contains=searchTerm)

        serializer = CategorySerializer(offical, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], url_path="favorite_category", url_name="favorite_category")
    def favorite_category(self,request, pk, *args, **kwargs):
        serializer = UserCategoryFavoriteSerializer(data = {
            "category": pk,
            "user": request.user.id
        })
        serializer.is_valid(raise_exception=True)
        serializer.save()
        print(serializer.errors)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


    @action(detail=True, methods=['post'], url_path="unfavorite_category", url_name="unfavorite_category")
    def unfavorite_category(self,request, pk, *args, **kwargs):
        try:
            #instance = UserCategoryFavorites.objects.filter(user=request.user.id, category=pk)
            instance = UserCategoryFavorites.objects.get(user=request.user.id, category=pk)
            serializer = UserCategoryFavoriteSerializer(instance)
            data = serializer.data
            self.perform_destroy(instance)
            return Response(data, status=status.HTTP_200_OK)
        except Http404:
            pass
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path="get_suggestions", url_name="get_suggestions")
    def get_suggestions(self,request, *args, **kwargs):
        # official + favorited + creator
        # all, get, filter, exclude
        searchTerm = request.query_params.get("s")

        # official + created
        official_and_created = Category.objects.filter(
            Q(official=True) | ( Q(creator__isnull=False) & Q(creator=request.user)) | Q(favorited_category__user=request.user)
        ).filter(name__contains=searchTerm)

        serializer = CategorySerializer(official_and_created, many=True)
        return Response(serializer.data)


    def get_serializer_class(self):
        user = self.request.user
        if not user.is_anonymous and user.is_admin :
            return CategoryAdminSerializer
        return CategorySerializer






            
        

