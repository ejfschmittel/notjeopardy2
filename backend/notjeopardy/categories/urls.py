from django.urls import path



from .views import CategoryViewset



category_list_create = CategoryViewset.as_view({'get': 'list', 'post':'create'})
category_detail = CategoryViewset.as_view({'get': 'retrieve', 'post': 'update', 'delete': 'destroy'})
cateogry_favorite = CategoryViewset.as_view({'post':'favorite_category'})
cateogry_unfavorite = CategoryViewset.as_view({'post': 'unfavorite_category'})
category_suggestions = CategoryViewset.as_view({'get': 'get_suggestions'})


urlpatterns = [
    path('', category_list_create, name="list-create"),
    path('suggestions/', category_suggestions, name="suggestions"),
    path('<uuid:pk>/', category_detail, name="detail"),
    path('<uuid:pk>/favorite/', cateogry_favorite, name="favorite"),
    path('<uuid:pk>/unfavorite/', cateogry_unfavorite, name="unfavorite"),
    

]