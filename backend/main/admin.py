from django.contrib import admin
from .models import DpComercial, DpLegal, Trabajador, Comercial,Director,Asistente
# Register your models here.
@admin.register(DpComercial)
class DpComercialAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'direccion', 'funciones', 'dp_legal')
    search_fields = ('nombre', 'direccion')
    list_filter = ('nombre', 'direccion')

admin.site.register(DpLegal)
admin.site.register(Trabajador)
admin.site.register(Comercial)
admin.site.register(Director)
admin.site.register(Asistente)