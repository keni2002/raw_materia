from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(DpComercial)
class DpComercialAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'direccion', 'funciones')
    search_fields = ('nombre', 'direccion')
    list_filter = ('nombre', 'direccion')

admin.site.register(DpLegal)
admin.site.register(Trabajador)
admin.site.register(Comercial)
admin.site.register(Director)
admin.site.register(Asistente)
admin.site.register(Producto)
admin.site.register(Factura)
admin.site.register(Suministrador)
admin.site.register(Direccion)
admin.site.register(Contrato)
admin.site.register(Informe)
admin.site.register(Evaluacion)
admin.site.register(Division)
admin.site.register(Abogado)