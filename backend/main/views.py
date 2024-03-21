from rest_framework import permissions, viewsets, generics
from .models import Trabajador,DpComercial,DpLegal, Comercial, Asistente, Abogado,Factura, Evaluacion,Contrato
from .serializers import TrabajadorSerializer, DpComercialSerializer,DpLegaleSerializer,ComercialSerializer,DirectorSerializer,AsistenteSerializer,AbogadoSerializer,FacturaSerializer, EvaluacionSerializer, ContratoSerializer, EvalsOneSerializer, MyTokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import OutstandingToken,BlacklistedToken
import rest_framework.permissions as _permissions
from .permission import HasGroupPermission


class LogoutAllView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        tokens = OutstandingToken.objects.filter(user_id=request.user.id)
        for token in tokens:
            t, _ = BlacklistedToken.objects.get_or_create(token=token)

        return Response(status=status.HTTP_205_RESET_CONTENT)

class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterComercialView(APIView):
    def post(self, request):
        serializer = ComercialSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TrabajadorViewSet(viewsets.ModelViewSet):
    queryset = Trabajador.objects.all()
    
    serializer_class = TrabajadorSerializer
    permission_classes = (_permissions.IsAuthenticated,
                          _permissions.DjangoModelPermissions)


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
    # permission_classes = [IsComercialOrReadOnly]
    def get_view_name(self):
        return "Comerciales"
    permission_classes = (_permissions.IsAuthenticated,
                          _permissions.DjangoModelPermissions)
    
    
class AsistenteViewSet(viewsets.ModelViewSet):
    queryset = Asistente.objects.all()
    serializer_class = AsistenteSerializer
    def get_view_name(self):
        return "Asistentes"
    permission_classes = (_permissions.IsAuthenticated,
                          _permissions.DjangoModelPermissions)
    
class DirectorViewSet(viewsets.ModelViewSet):
    queryset = DpComercial.objects.all()
    serializer_class = DirectorSerializer
    def get_view_name(self):
        return "Directores"
    permission_classes = (_permissions.IsAuthenticated,
                          _permissions.DjangoModelPermissions)
    

class AbogadoViewSet(viewsets.ModelViewSet):
    queryset = Abogado.objects.all()
    serializer_class = AbogadoSerializer
    def get_view_name(self):
        return "Abogados"
    permission_classes = (_permissions.IsAuthenticated,
                          _permissions.DjangoModelPermissions)


class ContratoViewSet(viewsets.ModelViewSet):
    queryset = Contrato.objects.all()
    serializer_class = ContratoSerializer
    def get_view_name(self):
        return "Contratos"
    permission_classes = (_permissions.IsAuthenticated,
                          _permissions.DjangoModelPermissions)

class EvaluacionViewSet(viewsets.ModelViewSet):
    queryset = Evaluacion.objects.all()
    serializer_class = EvaluacionSerializer 
    permission_classes = (_permissions.IsAuthenticated,
                          _permissions.DjangoModelPermissions)

class EvaluacionesTrabajador(generics.ListAPIView):
    serializer_class = EvalsOneSerializer

    def get_queryset(self):
        trabajador_id = self.kwargs['id']
        return Evaluacion.objects.filter(trabajador=trabajador_id)
    permission_classes = (_permissions.IsAuthenticated,
                          _permissions.DjangoModelPermissions)
    
class ContratosComercial(generics.ListAPIView):
    serializer_class = ContratoSerializer
    def get_queryset(self):
        trabajador_id = self.kwargs['id']
        return Contrato.objects.filter(trabajador=trabajador_id)
    permission_classes = (_permissions.IsAuthenticated,
                          _permissions.DjangoModelPermissions)