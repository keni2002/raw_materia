from django.db import models
import uuid
# Create your models here.

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