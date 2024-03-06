from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
import uuid
from django.core.validators import RegexValidator
name_regex = RegexValidator(r'^[a-zA-Z]+$', 'Solo se permiten letras')
apellidos_regex = RegexValidator(r'^[a-zA-Z]+$', 'Solo se permiten letras')



class UserManager(BaseUserManager):
    """Manager para usuarios"""

    def create_user(self, email, name, apellidos,direccion, password=None, **extra_fields):
        """Crea un nuevo Usuario"""
        if not email:
            raise ValueError("El usuario debe tener un email")

        email = self.normalize_email(email)
        
        user = self.model(email=email, name=name,apellidos=apellidos, direccion = direccion, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, apellidos,direccion, password, **extra_fields):
        user = self.create_user(email, name, apellidos,direccion,
                                password, **extra_fields)

        user.is_superuser = True
        user.is_staff = True

        user.set_password(password)
        user.save(using=self._db)

        return user


class Trabajador(AbstractBaseUser, PermissionsMixin):
    """Modelo BD para Users"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255, validators=[name_regex])
    apellidos = models.CharField(max_length=255, validators=[apellidos_regex])
    direccion = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'apellidos','direccion']

    def get_full_name(self):
        return "%s %s" % (self.name, self.apellidos)

    def get_short_name(self):
        return self.name
    
    def get_address(self):
        return self.direccion

    def __str__(self):
        """Return String"""
        return self.email
    
class Departamento(models.Model):
    class Meta:
        abstract = True
    codigo = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=255)
    funciones = models.TextField()
    direccion = models.CharField(max_length=255)

class DpComercial(Departamento):
    class Meta:
        db_table = 'dp_comercial'
        verbose_name = 'Departamento Comercial'
        verbose_name_plural = 'Departamentos Comerciales'
    def __str__(self):
        return self.nombre
    dp_legal = models.OneToOneField('DpLegal', on_delete=models.CASCADE, related_name='dp_comercial')

class DpLegal(Departamento):
    class Meta:
        db_table = 'dp_legal'
        verbose_name = 'Departamento Legal'
        verbose_name_plural = 'Departamentos Legales'
    def __str__(self):
        return self.nombre
    pass


class Comercial(Trabajador):
    departamento = models.ForeignKey('DpComercial', on_delete=models.CASCADE, related_name='comerciales')


NIVELES_ESCOLARES = [
    ('PRIM', 'Primaria'),
    ('SEC', 'Secundaria'),
    ('BACH', 'Bachillerato'),
    ('UNIV', 'Universidad'),
]
class Asistente(Trabajador):
    nivelEscolar = models.CharField(max_length=50, choices=NIVELES_ESCOLARES)
    departamento = models.ForeignKey('DpComercial', on_delete=models.CASCADE, related_name='asistentes')
    

GRADO_ACADEMICO = [
    ('TEC', 'Tecnico'),
    ('ING', 'Ingeniero'),
    ('LIC', 'Licenciado'),
    ('MAE', 'Maestria'),
    ('DOC', 'Doctorado'),
]
class Director(Trabajador):
    gradoAcademico = models.CharField(max_length=50, choices=GRADO_ACADEMICO)
    departamento = models.ForeignKey('DpComercial', on_delete=models.CASCADE, related_name='directores')
    def crear_comercial(self, **kwargs):
        return Comercial.objects.create_user(**kwargs)

    def crear_asistente(self, **kwargs):
        return Asistente.objects.create_user(**kwargs)


MATERIA = [
    ('VEG', 'Vegetal'),
    ('ANIM', 'Animal'),
    ('MIN', 'Mineral'),
    ('FOS', 'Fosil'),
]
class Direccion(models.Model):
    """Es una clase direccion solo compartida para Suminstradores"""
    calle = models.CharField(max_length=255)
    numero = models.IntegerField()
    municipio = models.CharField(max_length=255)
    provincia = models.CharField(max_length=255)
    def __str__(self):
        return f'{self.municipio}, {self.provincia}'

class Suministrador(models.Model):
    """Los suministradores de la empresa. Esas proporcionan materia prima"""
    nombre = models.CharField(max_length=255)
    clasificacion = models.CharField(max_length=255, choices=MATERIA)
    direccion = models.OneToOneField('Direccion', on_delete=models.CASCADE, related_name='suministrador')


class Producto(models.Model):
    """Los productos que la empresa vende"""
    codigo = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    suministrador = models.ForeignKey('Suministrador', on_delete=models.CASCADE, related_name='productos')