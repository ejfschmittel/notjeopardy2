import graphene
from graphene_django.types import DjangoObjectType
from .models import Category, UserCategoryFavorites

class CategoryType(DjangoObjectType):
    class Meta:
        model = Category

class UserCategoryType(DjangoObjectType):
    class Meta:
        model = UserCategoryFavorites

class CategoryMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        id = graphene.UUID()

    category = graphene.Field(CategoryType)

    def mutate(self, info, name, id):
        category = Category.objects.get(pk=id)
        category.name = name
        category.save()
        
        return CategoryMutation(category=category)

class Mutation(graphene.ObjectType):
    update_category = CategoryMutation.Field()

class Query(graphene.ObjectType):
    category = graphene.Field(CategoryType, id=graphene.UUID(), name=graphene.String())
    all_categories = graphene.List(CategoryType)
    all_user_categories = graphene.List(UserCategoryType)

    def resolve_category(self, info, **kwargs):
          id = kwargs.get('id')
          name = kwargs.get('name')

          if id is not None:
              return Category.objects.get(pk=id)

          if name is not None:
              return Category.objects.get(name=name)

          return None

    def resolve_all_categories(self, info, **kwargs):
        return Category.objects.all()
    
    def resolve_all_user_categories(self, info, **kwargs):
        return UserCategoryFavorites.objects.all()