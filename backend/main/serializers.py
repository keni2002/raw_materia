import rest_framework.serializers as serializers
import main.models as _models
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
class TrabajadorSerializer(serializers.ModelSerializer):
    evaluacion  = serializers.SerializerMethodField()
    def get_dp(self, obj):
        return obj.departamento.nombre
    def get_evaluacion(self, obj):
        return obj.evaluacion
    def get_group(self,obj):
        return obj.name_group
    
    # grupos = serializers.SerializerMethodField()
    # @staticmethod
    # def get_grupos(obj):
    #     return [{'name': group.name} for group in obj.groups.all()]
    # grupos = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model= _models.Trabajador
        
        # exclude = ('groups',)
        fields='__all__'
        
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
        #// groups son grupos solo que lo puse en singular para no sobresscribir el original
        token['grupos'] = user.name_group
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
    

    cntContratos = serializers.SerializerMethodField()
    depa = serializers.SerializerMethodField()
    def get_depa(self,obj):
        return _models.DpComercial.objects.get(comerciales=obj).nombre
    
    def get_cntContratos(self,obj):
        return obj.compras.count()

    
    class Meta(TrabajadorSerializer.Meta):
        model = _models.Comercial
        
        
        

    
        
class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = _models.Director
        

class AsistenteSerializer(serializers.ModelSerializer):
    depa = serializers.SerializerMethodField()
    def get_depa(self,obj):
        return _models.DpLegal.objects.get(comerciales=obj).nombre
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