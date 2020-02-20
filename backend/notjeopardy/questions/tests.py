import json
from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.test import APITestCase

from .serializers import QuestionSerializer, AnswerSerializer
from .models import Question

User = get_user_model()
# Create your tests here.
# Create your tests here.
class QuestionTests(APITestCase):

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

    def test_create_question(self):
        data = {
            "question": "test",
            "correct_answer": "",
            "answers": [{"answer":"test"}]
        }      
        response = self.client.post("/api/questions/", data)
       
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)