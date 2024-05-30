from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# from utils.encryption import encrypt_password, decrypt_password
# Create your models here.


class MyAccountManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not email:
            raise ValueError('User Must Have An Email Address')
        
        user = self.model(
            email = self.normalize_email(email),
            username = username,

        )
        if password:
            user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, username, email, password):
        user = self.create_user(
            email = self.normalize_email(email),
            username = username,
            password=password
        )

        user.is_active = True
        user.is_superuser = True
        user.is_staff = True

        user.save(using=self._db)
        return user 
    




class User(AbstractBaseUser):
    username = models.CharField(max_length=50)
    email = models.EmailField(unique=True)

    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = MyAccountManager()

    def __str__(self):
        return self.username
    

    def has_perm(self,perm,obj=None):
        return self.is_superuser
    
    def has_module_perms(self,add_label):
        return True
    

class Passwords(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    account = models.CharField(max_length=100)
    passwords = models.CharField(max_length=100)

    def __str__(self):
        return self.account

   
