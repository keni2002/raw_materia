from rest_framework import permissions, viewsets, generics
from .models import Trabajador,DpComercial,DpLegal, Comercial, Asistente, Abogado,Compra, Evaluacion,Contrato
from .serializers import TrabajadorSerializer, DpComercialSerializer,DpLegaleSerializer,ComercialSerializer,DirectorSerializer,AsistenteSerializer,AbogadoSerializer,ComprasSerializer, EvaluacionSerializer,ContratoSerializer
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


class ContratoViewSet(viewsets.ModelViewSet):
    queryset = Contrato.objects.all()
    serializer_class = ContratoSerializer
    def get_view_name(self):
        return "Contratos"

class EvaluacionViewSet(viewsets.ModelViewSet):
    queryset = Evaluacion.objects.all()
    serializer_class = EvaluacionSerializer 

class EvaluacionesTrabajador(generics.ListAPIView):
    serializer_class = EvaluacionSerializer

    def get_queryset(self):
        trabajador_id = self.kwargs['id']
        return Evaluacion.objects.filter(trabajador=trabajador_id)
    
class ContratosComercial(generics.ListAPIView):
    serializer_class = ContratoSerializer
    def get_queryset(self):
        trabajador_id = self.kwargs['id']
        return Contrato.objects.filter(trabajador=trabajador_id)