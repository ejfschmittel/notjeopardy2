from django.urls import path





from .views import QuizViewset, QuizCategoryViewset, QuizQuestionViewset

quiz_list_create = QuizViewset.as_view({'get': 'list', 'post':'create'})
quiz_detail = QuizViewset.as_view({'get': 'retrieve', 'post': 'update', 'delete': 'destroy'})

quiz_category_list_create = QuizCategoryViewset.as_view({'get': 'list', 'post':'create'})
quiz_category_detail = QuizCategoryViewset.as_view({'get': 'retrieve', 'post': 'update', 'delete': 'destroy'})

quiz_question_list_create = QuizQuestionViewset.as_view({'get': 'list', 'post':'create'})
quiz_question_detail = QuizQuestionViewset.as_view({'get': 'retrieve', 'post': 'update', 'delete': 'destroy'})
#question_favorite = QuizViewset.as_view({'post':'favorite_question'})
#question_unfavorite = QuizViewset.as_view({'post': 'unfavorite_question'})


# /<uuid:quiz>/category/  => create list
# /<uuid:quiz>/category/<uuid:pk>  => detail / update / delete

# /<uuid:pk/question/ => create /list 

urlpatterns = [
    path('', quiz_list_create, name="list-create"),
    path('<uuid:pk>/', quiz_detail, name="detail"),
    path('<uuid:quizid>/category/',quiz_category_list_create,name="quiz-category-create"),
    path('<uuid:quizid>/category/<uuid:pk>/',quiz_category_detail,name="quiz-category-detail"),
    path('<uuid:quizid>/question/',quiz_question_list_create,name="quiz-questions-create"),
    path('<uuid:quizid>/question/<uuid:pk>/',quiz_question_detail,name="quiz-question-detail"),
    #path('<uuid:pk>/favorite/', question_favorite, name="favorite"),
    #path('<uuid:pk>/unfavorite/', question_unfavorite, name="unfavorite"),
]