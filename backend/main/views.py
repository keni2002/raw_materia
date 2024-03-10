from rest_framework import permissions, viewsets
from .models import Trabajador,DpComercial,DpLegal, Comercial, Asistente, Abogado,Compra
from .serializers import TrabajadorSerializer, DpComercialSerializer,DpLegaleSerializer,ComercialSerializer,DirectorSerializer,AsistenteSerializer,AbogadoSerializer,ComprasSerializer
# Create your views here.
class TrabajadorViewSet(viewsets.ModelViewSet):
    queryset = Trabajador.objects.all()
    
    serializer_class = TrabajadorSerializer
    # permission_classes = [permissions.IsAuthenticated]


class DpComercialViewSet(viewsets.ModelViewSet):
    queryset  = DpComercial.objects.all()
    serializer_class = DpComercialSerializer
    def get_view_name(self):
        return "Departamentos Comerciales"

class DpLegalesViewSet(viewsets.ModelViewSet):
    queryset = DpLegal.objects.all()
    serializer_class = DpLegaleSerializer
    def get_view_name(self):
        return "Departamentos Legales"
    
class ComercialViewSet(viewsets.ModelViewSet):
    queryset = Comercial.objects.all()
    serializer_class = ComercialSerializer
    def get_view_name(self):
        return "Comerciales"
    
class AsistenteViewSet(viewsets.ModelViewSet):
    queryset = Asistente.objects.all()
    serializer_class = AsistenteSerializer
    def get_view_name(self):
        return "Asistentes"
class DirectorViewSet(viewsets.ModelViewSet):
    queryset = DpComercial.objects.all()
    serializer_class = DirectorSerializer
    def get_view_name(self):
        return "Directores"
class AbogadoViewSet(viewsets.ModelViewSet):
    queryset = Abogado.objects.all()
    serializer_class = AbogadoSerializer
    def get_view_name(self):
        return "Abogados"

