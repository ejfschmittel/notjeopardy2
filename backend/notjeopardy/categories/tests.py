import json
from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.test import APITestCase

from .serializers import CategorySerializer, CategoryAdminSerializer
from .models import Category, UserCategoryFavorites

User = get_user_model()

# Create your tests here.
class CategoryTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username="user", email="email@user.com", password="some_password?")

        login_data = {
            "username_or_email": "user",
            "password": "some_password?"
        }
        response = self.client.post("/api/users/login/", login_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
        self.token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION='JWT {0}'.format(self.token))
      

    def test_create_category(self):
        data = {"name": "test_category"}       
        response = self.client.post("/api/categories/", data)
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_category_duplicate(self):
        data = {"name": "test_category"}
        response = self.client.post("/api/categories/", data)
        response = self.client.post("/api/categories/", data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_favorite_category(self):
        category = Category.objects.create(name="test")
        post_data = {
            "category": category.id
        }
        response = self.client.post("/api/categories/favorite/", post_data)
        print(response.data)

        

