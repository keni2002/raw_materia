import rest_framework.serializers as serializers
import main.models as _models
from django.contrib.auth.hashers import make_password
from rest_framework.serializers import PrimaryKeyRelatedField
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
class TrabajadorSerializer(serializers.ModelSerializer):
    
    # evaluacion  = serializers.SerializerMethodField()
    def get_dp(self, obj):
        return obj.departamento.nombre
    def get_evaluacion(self, obj):
        return obj.evaluacion

    class Meta:
        model= _models.Trabajador
        
        exclude = ('groups',)

        
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
           }
    # def validate_password(self, value: str) -> str:
    #     return make_password(value)
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['nombre'] = user.nombre
        token['is_staff'] = user.is_staff
        token['apellido'] = user.apellido
        token['email'] = user.email
        return token
    def validate(self,attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        return data


class DpComercialSerializer(serializers.ModelSerializer):
    
    class Meta:
        model= _models.DpComercial
        fields = ('codigo','nombre','funciones','direccion')
    
class DpLegaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = _models.DpLegal
        fields = '__all__'

class ContratoSerializer(serializers.ModelSerializer):
    class Meta:
        model  = _models.Contrato
        fields = '__all__'


class ComercialSerializer(TrabajadorSerializer):
    # departamento = DpComercialSerializer(read_only=True)
    # cntContratos = ContratoSerializer()
    group = serializers.SerializerMethodField()
    cntContratos = serializers.SerializerMethodField()
    
    def get_group(self,obj):
        return obj.name_group
    
    def get_cntContratos(self,obj):
        return obj.compras.count()

    
    class Meta(TrabajadorSerializer.Meta):
        model = _models.Comercial
        
        
        

    
        
class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = _models.Director
        

class AsistenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = _models.Asistente
        fields = '__all__'

class AbogadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = _models.Abogado
        exclude = ('evaluaciones',)

class ComprasSerializer(serializers.ModelSerializer):
    class Meta:
        model = _models.Compra
        fields = '__all__'


class ContratoSerializer(serializers.ModelSerializer):
    class Meta:
        model  = _models.Contrato
        fields = '__all__'

class EvalsOneSerializer(serializers.ModelSerializer): #para devolver las evaluaciones
    trabajador = serializers.SerializerMethodField()
    director = serializers.SerializerMethodField()
    def get_trabajador(self,obj):
        return obj.trabajador.nombre
    def get_director(self, obj):
        return obj.director.nombre
    class Meta:

        model = _models.Evaluacion
        fields = '__all__'



class EvaluacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = _models.Evaluacion
        fields = '__all__'