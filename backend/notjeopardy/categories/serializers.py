from rest_framework import serializers
from .models import Category, UserCategoryFavorites

## add liked by you field




class UserCategoryFavoriteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserCategoryFavorites
        fields = ["category", "user"]
        



class CategorySerializer(serializers.ModelSerializer):

    is_favorited = serializers.SerializerMethodField()

    creator = serializers.PrimaryKeyRelatedField(
        read_only=True, 
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = UserCategoryFavorites
        fields = ["category","user"]


    def get_is_favorited(self, obj):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

            if user and user.id:
                like_count = UserCategoryFavorites.objects.filter(user=user.id, category=obj).count()
                if like_count > 0:
                    return True

        return False

    class Meta: 
        model = Category
        fields = ['id','name', 'official', 'creator', 'is_favorited']
        read_only_fields = ('id', 'official', 'creator', 'is_favorited')


# official is not read only for admins
class CategoryAdminSerializer(CategorySerializer):
    class Meta: 
        model = Category
        fields = ['id','name', 'official', 'creator', 'is_favorited']
        read_only_fields = ('id', 'creator', 'is_favorited') 