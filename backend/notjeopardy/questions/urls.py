from django.urls import path





from .views import QuestionViewset

question_list_create = QuestionViewset.as_view({'get': 'list', 'post':'create'})
question_detail = QuestionViewset.as_view({'get': 'retrieve', 'post': 'update', 'delete': 'destroy'})
#question_favorite = QuestionViewset.as_view({'post':'favorite_question'})
#question_unfavorite = QuestionViewset.as_view({'post': 'unfavorite_question'})


urlpatterns = [
    path('', question_list_create, name="list-create"),
    path('<uuid:pk>/', question_detail, name="detail"),
    #path('<uuid:pk>/favorite/', cateogry_favorite, name="favorite"),
    #path('<uuid:pk>/unfavorite/', cateogry_unfavorite, name="unfavorite"),


]