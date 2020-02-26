from django.urls import path





from .views import QuizViewset

question_list_create = QuizViewset.as_view({'get': 'list', 'post':'create'})
question_detail = QuizViewset.as_view({'get': 'retrieve', 'post': 'update', 'delete': 'destroy'})
#question_favorite = QuizViewset.as_view({'post':'favorite_question'})
#question_unfavorite = QuizViewset.as_view({'post': 'unfavorite_question'})


urlpatterns = [
    path('', question_list_create, name="list-create"),
    path('<uuid:pk>/', question_detail, name="detail"),
    #path('<uuid:pk>/favorite/', question_favorite, name="favorite"),
    #path('<uuid:pk>/unfavorite/', question_unfavorite, name="unfavorite"),
]