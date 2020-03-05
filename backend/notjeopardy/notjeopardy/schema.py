import graphene
from categories.schema import Query as category_query
from quizzes.schema import Query as quiz_schema
from categories.schema import Mutation as category_mutation

class Query(category_query, quiz_schema):
    pass

class Mutation(category_mutation):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)