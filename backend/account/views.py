from django.shortcuts import render
from rest_framework.views import APIView

from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed, ParseError
from rest_framework.response import Response

from django.contrib.auth import authenticate
# serializers 
from account.serializers import UserRegistrationSerializer, PasswordSerializer

# models
from account.models import User, Passwords

# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        try:
            serializer = UserRegistrationSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()

                return Response({'message':'Registration successfull'},
                                 status=status.HTTP_201_CREATED)
            else:
                error_messages = []
                for field, errors in serializer.errors.items():
                    for error in errors:
                        if field == 'email' and 'unique' in error:
                            error_messages.append("Email already exists")
                        elif field == 'password' and 'min_length' in error:
                            error_messages.append("Password must be at least 8 characters long")
                        # Add more conditions for other fields and error types as needed
                        else:
                            error_messages.append(f"{field.capitalize()}: {error}")
                content = {"message": error_messages}
                return Response(content, status=status.HTTP_406_NOT_ACCEPTABLE)
        except Exception as e:
            print(e)
            return Response(content=e, 
                            status=status.HTTP_400_BAD_REQUEST)
        

class LoginView(APIView):

    def post(self, request):
        try:
            email = request.data.get('email')
            password = request.data.get('password')
        except :
            raise ParseError("Username and password is reqired")
        
        if not User.objects.filter(email=email).exists():
            raise AuthenticationFailed('Invalid Email Address')
        user = authenticate(email=email, password=password)

        if user is None:
            raise AuthenticationFailed("Ivalid Password")
        
        refresh = RefreshToken.for_user(user)
        refresh['username'] = str(user.username)
        content = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'is_admin': user.is_superuser,
        }

        return Response(content,status=status.HTTP_200_OK)


class MyPasswordView(APIView):
    permission_classes = [IsAuthenticated]


    def post (self, request):
        try:
            account = request.data.get('account')
            password = request.data.get('password')
            new_password = Passwords.objects.create(
                user=request.user,
                passwords=password,
                account=account
                )
            new_password.save()
            return Response({"message":'Password added successfully'},
                             status=status.HTTP_201_CREATED)
        
        except Exception as e:
            print(e)
            return Response({'message':"something went wrong"},
                             status=status.HTTP_400_BAD_REQUEST)
        
    def get(self, request):
        try:
            passwords = Passwords.objects.filter(user=request.user)
            serializer = PasswordSerializer(passwords, many=True)
            return Response(serializer.data, 
                            status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'message':"something went wrong"},
                             status=status.HTTP_400_BAD_REQUEST)
        

    def delete(self,request):
        try:
            password = Passwords.objects.get(id=request.data.get('id'))
            if password.user == request.user:
                password.delete()
                return Response({'message':"Password Deleted Successfully"}, 
                                status=status.HTTP_200_OK)
            else:
                return Response({'message':"You don't have the permission"}, 
                                status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            print(e)
            return Response({'message':"something went wrong"},
                             status=status.HTTP_400_BAD_REQUEST)
            

            
        


