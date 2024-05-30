from rest_framework.serializers import ModelSerializer, ValidationError


# models
from account.models import User, Passwords


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ('password',)


class UserRegistrationSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only':True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
            instance.save()
            return instance
        else:
            raise ValidationError({
                "password":'Password is not valid'
            })
        
class PasswordSerializer(ModelSerializer):
    class Meta:
        model = Passwords
        fields = ['id', 'account', 'passwords']
