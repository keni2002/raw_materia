import random

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group
from datetime import timedelta
from django.db import models
import uuid
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from random import randint
from django.db import models
name_regex = RegexValidator(r'^[a-zA-Z\s]+$', 'Solo se permiten letras y espacios')
apellidos_regex = RegexValidator(r'^[a-zA-Z\s]+$', 'Solo se permiten letras y espacios')
from django.contrib.auth.hashers import make_password


class UserManager(BaseUserManager):
    """Manager para usuarios"""

    def create_user(self, email, nombre, apellido,direccion, password=None, **extra_fields):
        """Crea un nuevo Usuario"""
        if not email:
            raise ValueError("El usuario debe tener un email")

        email = self.normalize_email(email)
        
        user = self.model(email=email, nombre=nombre,apellido=apellido, direccion = direccion, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, nombre, apellido,direccion, password, **extra_fields):
        user = self.create_user(email, nombre, apellido,direccion,
                                password, **extra_fields)

        user.is_superuser = True
        user.is_staff = True

        user.set_password(password)
        user.save(using=self._db)

        return user


class Trabajador(AbstractBaseUser, PermissionsMixin):
    """Modelo BD para Users"""
    email = models.EmailField(max_length=255, unique=True)
    nombre = models.CharField(max_length=255, validators=[name_regex])
    apellido = models.CharField(max_length=255, validators=[apellidos_regex])
    direccion = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nombre', 'apellido','direccion']
    
    
      

    def get_full_name(self):
        return "%s %s" % (self.nombre, self.apellido)

    def get_short_name(self):
        return self.nombre
    
    def get_address(self):
        return self.direccion

    def __str__(self):
        """Return String"""
        return self.email

    @property
    def name_group(self):
        return  [{'name': group.name} for group in self.groups.all()] or [
            {"name": "admin_group"},
        ]
    
    @property
    def fecha_latest_eval(self):
        if self.evaluaciones.count() > 0:
            ultima_evaluacion = self.evaluaciones.order_by("-fecha").first()
            if ultima_evaluacion:
                return ultima_evaluacion.fecha
            else:
                return 0
        else:
            return 0

    #I LOVE THIS METHOD CAUSE ADD TO SPECIFIC GROUP XD
    def save(self, *args,**kwargs):
        self.password = make_password(self.password)
        super().save(*args,**kwargs)
        for g in self.name_group:
            if g["name"] != 'admin_group':
                grupo = Group.objects.get(name=g["name"])
                self.groups.add(grupo)
        
    
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
   
ClASIFICACION = [
    ('A', 'Vegetal (A)'),
    ('B', 'Animal (B)'),
    ('C', 'Mineral (C)'),
    ('D', 'Fosil (D)'),
]

class Abogado(Trabajador):
    division = models.ManyToManyField('Division', related_name='abogados')
    salario = models.DecimalField(max_digits=10, decimal_places=2,default=2000)
    def __str__(self):
        return self.get_full_name()
    
   

class Division(models.Model):
    """Division de la empresa"""
    codigo = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=255)
    clasificacion = models.CharField(max_length=255,choices=ClASIFICACION)
    dp_legal = models.ForeignKey('DpLegal', on_delete=models.CASCADE, related_name='divisiones')
    def __str__(self):
        return self.nombre+'('+ self.clasificacion +')'



class DpLegal(Departamento):
    class Meta:
        db_table = 'dp_legal'
        verbose_name = 'Departamento Legal'
        verbose_name_plural = 'Departamentos Legales'
    def __str__(self):
        return self.nombre
    


class Comercial(Trabajador):
    
    departamento = models.ForeignKey('DpComercial', on_delete=models.CASCADE, related_name='comerciales')
    anioExperiencia = models.IntegerField(default=0)
    fechaNacimiento = models.DateField(default='2002-01-21')
    salario = models.DecimalField(max_digits=10, decimal_places=2,default=2000)

    def __str__(self):
        return self.get_full_name()
    @property
    def evaluacion(self):
        if self.evaluaciones.count() > 0:
            ultima_evaluacion = self.evaluaciones.order_by("-fecha").first()
            if ultima_evaluacion:
                return ultima_evaluacion.calificacion
            else:
                return 0
        else:
            return 0
        
    @property
    def fecha_latest_eval(self):
        if self.evaluaciones.count() > 0:
            ultima_evaluacion = self.evaluaciones.order_by("-fecha").first()
            if ultima_evaluacion:
                return ultima_evaluacion.fecha
            else:
                return 0
        else:
            return 0
    @property
    def name_group(self):
        return [
            {"name": "comercial_group"},
        ]
    

NIVELES_ESCOLARES = [
    ('PRIM', 'Primaria'),
    ('SEC', 'Secundaria'),
    ('BACH', 'Bachillerato'),
    ('UNIV', 'Universidad'),
]
class Asistente(Trabajador):
    fechaNacimiento = models.DateField(default='2002-01-21')
    anioExperiencia = models.IntegerField(default=0)
    nivelEscolar = models.CharField(max_length=50, choices=NIVELES_ESCOLARES)
    salario = models.DecimalField(max_digits=10, decimal_places=2,default=2000)
    departamento = models.ForeignKey('DpComercial', on_delete=models.CASCADE, related_name='asistentes')
    def __str__(self):
        return self.get_full_name()
    
    @property
    def evaluacion(self):
        if self.evaluaciones.count() > 0:
            ultima_evaluacion = self.evaluaciones.order_by("-fecha").first()
            if ultima_evaluacion:
                return ultima_evaluacion.calificacion
            else:
                return 0
        else:
            return 0
        
    @property
    def fecha_latest_eval(self):
        if self.evaluaciones.count() > 0:
            ultima_evaluacion = self.evaluaciones.order_by("-fecha").first()
            if ultima_evaluacion:
                return ultima_evaluacion.fecha
            else:
                return 0
        else:
            return 0
        
    @property
    def name_group(self):
        return [
            {"name": "asistente_group"},
        ]
        

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
    salario = models.DecimalField(max_digits=10, decimal_places=2,default=2000)
    def crear_comercial(self, **kwargs):
        return Comercial.objects.create_user(**kwargs)

    def crear_asistente(self, **kwargs):
        return Asistente.objects.create_user(**kwargs)
    def __str__(self):
        return self.get_full_name()
    
    @property
    def name_group(self):
        return [
            {"name": "director_group"},
        ]


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
    codigo = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=255)
    clasificacion = models.CharField(max_length=255, choices=MATERIA)
    direccion = models.OneToOneField('Direccion', on_delete=models.CASCADE, related_name='suministrador')
    def __str__(self):
        return self.nombre

EVAL = [
    ('0', 'Indeterminado'),
    ('2', 'Mal'),
    ('3', 'Regular'),
    ('4', 'Bien'),
    ('5', 'Excelente')
]

class Evaluacion(models.Model):
    codigo = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    fecha = models.DateField(auto_now_add=True)
    calificacion = models.CharField(max_length=255,choices=EVAL, default='0')
    trabajador = models.ForeignKey('Trabajador', on_delete=models.CASCADE, related_name='evaluaciones')
    director = models.ForeignKey('Director', on_delete=models.CASCADE, related_name='evaluados')

    def save(self, *args, **kwargs):
            
        if Abogado.objects.filter(pk=self.trabajador_id).exists() or Director.objects.filter(pk=self.trabajador_id).exists():
             raise ValueError("No puede evaluarlo")
        super(Evaluacion, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.trabajador} - {self.calificacion}'



CALIDAD = [
    ('ALTA', 'Alta'),
    ('MEDIA', 'Media'),
    ('BAJA', 'Baja'),
]

class Producto(models.Model):
    """Productos que se venden"""
    codigo = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()   
    calidad = models.CharField(max_length=255, choices=CALIDAD,default='ALTA',editable=False)
    tipo = models.CharField(max_length=255, choices=MATERIA)
    fecha_producion = models.DateField()
    fecha_vencimiento = models.DateField()
    suministrador = models.ForeignKey('Suministrador',on_delete=models.CASCADE, related_name='productos')
    def save(self, *args, **kwargs):
        if self.fecha_producion > self.fecha_vencimiento:
            raise ValueError("La fecha de produccion no puede ser mayor a la fecha de vencimiento")
        if self.fecha_producion == self.fecha_vencimiento:
            raise ValueError("La fecha de produccion no puede ser igual a la fecha de vencimiento")
        
        if self.fecha_producion < self.fecha_vencimiento:
            if self.fecha_vencimiento - self.fecha_producion <= timedelta(days=30):
                self.calidad = 'BAJA'
            elif self.fecha_vencimiento - self.fecha_producion <= timedelta(days=90):
                self.calidad = 'MEDIA'
            else:
                self.calidad = 'ALTA'
        super(Producto, self).save(*args, **kwargs)
    def __str__(self):
        return self.nombre

class Factura(models.Model):
    """La Tabla Many to Many entre Producto y Comercial"""
    #la relacion
    id  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    producto = models.ManyToManyField('Producto',  related_name='compras')
    comercial = models.ForeignKey('Comercial', on_delete=models.CASCADE, related_name='compras')
    contrato = models.ForeignKey('Contrato',on_delete=models.CASCADE, related_name='compras')
    
    
    #campos de la relacion
    fecha_compra = models.DateField(auto_now_add=True)
    importe = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f'{self.producto} - {self.comercial} - {self.cantidad}'
    
    
ESTADO = [
    ('P','Pendiente'),
    ('A','Aprobado'),
    ('N', 'No Aprobado')

]
class Contrato(models.Model):
    codigo = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    fecha_creacion = models.DateField(auto_now=True)
    periodo_validez = models.DateField()
    descripcion = models.TextField()
    estado = models.CharField(max_length=255, choices=ESTADO, default='P')

    comercial = models.ForeignKey('Comercial', on_delete=models.CASCADE, related_name='contratos')
    suministrador = models.ForeignKey('Suministrador',on_delete=models.CASCADE, related_name='contratos')
    def __str__(self):
        return f'contrado de {self.comercial.nombre} - {self.estado}'

class Informe(models.Model):
    codigo = models.CharField(max_length=255,primary_key=True, editable=False)
    fecha = models.DateField(auto_now_add=True)
    contrato = models.OneToOneField(Contrato, on_delete=models.CASCADE, related_name='informes')
    descripcion = models.TextField()
    abogado = models.ForeignKey(Abogado,on_delete=models.CASCADE, related_name='informes',default='')
    def save(self, *args, **kwargs):
        if not self.codigo:
            randon = str(random.randint(100000, 999999))
            # Concatenamos el código de contrato y los dígitos aleatorios
            self.codigo = str(self.contrato.codigo)+ '--' + str(randon)
        super(Informe, self).save(*args, **kwargs)
    def __str__(self):
        return f'{self.codigo} - {self.fecha}'
    

    