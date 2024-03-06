from django.db import models
import uuid
from django.contrib.auth.management.commands import createsuperuser
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# Create your models here.

class TrabajadorManager(BaseUserManager):
    def create_user(self, email, password=None,departamento=None, **extra_fields):
        if not email:
            raise ValueError('El Email es obligatorio')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.departamento = departamento
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)
    
class Command(createsuperuser.Command):
    def add_arguments(self, parser):
        super(Command, self).add_arguments(parser)
        parser.add_argument('--departamento', dest='departamento', default=None, help='Especifica el departamento para el superusuario')

    def handle(self, *args, **options):
        departamento = options['departamento']
        if not departamento:
            raise CommandError("Error: Debe especificar un departamento con --departamento")
        # Buscar el departamento en la base de datos aquí o cualquier otra lógica necesaria
        # Supongamos que Departamento es tu modelo y buscamos por nombre
        departamento_obj = DpComercial.objects.get(pk=departamento)
        options['departamento'] = departamento_obj

        super(Command, self).handle(*args, **options)


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


class Trabajador(AbstractBaseUser):
    class Meta:
        db_table = 'trabajador'
        verbose_name = 'Trabajador'
        verbose_name_plural = 'Trabajadores'
        

    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    direccion = models.CharField(max_length=100)
    fecha_nacimiento = models.DateField()
    salario = models.DecimalField(max_digits=10, decimal_places=2)
    anio_experiencia = models.IntegerField()
    departamento = models.ForeignKey('DpComercial', on_delete=models.CASCADE, related_name='trabajadores')
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    


    objects = TrabajadorManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nombre', 'apellido', 'direccion', 'fecha_nacimiento', 'salario', 'anio_experiencia']
    

class Comercial(Trabajador):
    pass


NIVELES_ESCOLARES = [
    ('PRIM', 'Primaria'),
    ('SEC', 'Secundaria'),
    ('BACH', 'Bachillerato'),
    ('UNIV', 'Universidad'),
]
class Asistente(Trabajador):
    nivelEscolar = models.CharField(max_length=50, choices=NIVELES_ESCOLARES)
    

GRADO_ACADEMICO = [
    ('TEC', 'Tecnico'),
    ('ING', 'Ingeniero'),
    ('LIC', 'Licenciado'),
    ('MAE', 'Maestria'),
    ('DOC', 'Doctorado'),
]
class Director(Trabajador):
    gradoAcademico = models.CharField(max_length=50, choices=GRADO_ACADEMICO)
    def crear_comercial(self, **kwargs):
        return Comercial.objects.create_user(**kwargs)

    def crear_asistente(self, **kwargs):
        return Asistente.objects.create_user(**kwargs)


