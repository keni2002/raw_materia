import rest_framework.serializers as serializers
import main.models as _models
from django.contrib.auth.hashers import make_password
from rest_framework.serializers import PrimaryKeyRelatedField
class TrabajadorSerializer(serializers.ModelSerializer):
    evaluacion  = serializers.SerializerMethodField()
    def get_evaluacion(self, obj):
        return obj.evaluacion

    class Meta:
        model= _models.Trabajador
        fields ='__all__'
        extra_kwargs = {
            'password': {'write_only': True, 'required': False}
           }
    def validate_password(self, value: str) -> str:
        return make_password(value)

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
    
    def get_cntContratos(self,obj):
        return obj.compras.count()

    
    class Meta(TrabajadorSerializer.Meta):
        model = _models.Comercial
        fields = '__all__'

    
        
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

class EvaluacionSerializer(serializers.ModelSerializer):
    trabajador = serializers.SerializerMethodField()
    director = serializers.SerializerMethodField()
    def get_trabajador(self,obj):
        return obj.trabajador.nombre
    def get_director(self, obj):
        return obj.director.nombre
    class Meta:

        model = _models.Evaluacion
        fields = '__all__'