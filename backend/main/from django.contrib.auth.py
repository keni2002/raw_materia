from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class TrabajadorManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El Email es obligatorio')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class Trabajador(AbstractBaseUser):
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    direccion = models.CharField(max_length=100)
    fecha_nacimiento = models.DateField()
    edad = models.IntegerField()
    anio_experiencia = models.IntegerField()

    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = TrabajadorManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nombre', 'apellido', 'direccion', 'fecha_nacimiento', 'edad', 'anio_experiencia']

class Director(Trabajador):
    def crear_comercial(self, **kwargs):
        return Comercial.objects.create_user(**kwargs)

    def crear_asistente(self, **kwargs):
        return Asistente.objects.create_user(**kwargs)

class Comercial(Trabajador):
    pass

class Asistente(Trabajador):
    pass