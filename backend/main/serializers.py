import rest_framework.serializers as serializers
from  datetime import datetime, timedelta
from django.core.exceptions import ValidationError
import main.models as _models
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
class TrabajadorSerializer(serializers.ModelSerializer):
    evaluacion  = serializers.SerializerMethodField()
    fecha_latest_eval = serializers.SerializerMethodField()
    def get_fecha_latest_eval(self,obj):
        return obj.fecha_latest_eval

    def get_dp(self, obj):
        return obj.departamento.nombre
    def get_evaluacion(self, obj):
        if _models.Comercial.objects.filter(pk=obj.id):
            return _models.Comercial.objects.get(pk=obj.id).evaluacion
        elif  _models.Asistente.objects.filter(pk=obj.id):
            return _models.Asistente.objects.get(pk=obj.id).evaluacion
        else:
            return '0'

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
        return token
    def validate(self,attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['user'] = {
            'email': self.user.email,
            'nombre': self.user.nombre,
            'apellido': self.user.apellido,
            'is_staff': self.user.is_staff,
            'grupo': self.user.name_group[0]['name']
                
        }
        materias = []
        divisiones =[]
       
#         MATERIA = [
#     ('VEG', 'Vegetal'),
#     ('ANIM', 'Animal'),
#     ('MIN', 'Mineral'),
#     ('FOS', 'Fosil'),
# ]
#         ClASIFICACION = [
#     ('A', 'Vegetal (A)'),
#     ('B', 'Animal (B)'),
#     ('C', 'Mineral (C)'),
#     ('D', 'Fosil (D)'),
# ]
        def get_materias(m):
            c = 0
            """viene un texto asi A -> sale un asi Vegetal (A) y debe retornar <Veg>str"""
            #m = A for axample
            for i in _models.ClASIFICACION:
                if i[0] == m:
                    return _models.MATERIA[c][0]
                
                c+=1
            return ''
        def get_division(m):
           
            """viene un texto asi A -> sale un asi Vegetal (A)str"""
            #m = A for axample
            for i in _models.ClASIFICACION:
                if i[0] == m:
                    return f' {i[1][0:-4]} {m}'
        
            return ''

        def get_dep():
            
            dp='all'
            code=''
            if self.user.name_group[0]['name'] == 'comercial_group':
                dp =_models.Comercial.objects.get(pk=self.user.id).departamento.nombre
                code = _models.Comercial.objects.get(pk=self.user.id).departamento.codigo

            elif self.user.name_group[0]['name'] == 'asistente_group':
                dp =_models.Asistente.objects.get(pk=self.user.id).departamento.nombre
                code = _models.Asistente.objects.get(pk=self.user.id).departamento.codigo

            elif self.user.name_group[0]['name'] == 'director_group':
                dp =_models.Director.objects.get(pk=self.user.id).departamento.nombre
                code = _models.Director.objects.get(pk=self.user.id).departamento.codigo

            elif self.user.name_group[0]['name'] == 'abogado_group':
                
                dp =_models.Abogado.objects.get(pk=self.user.id).division.all()[0].dp_legal.nombre

                code = _models.Abogado.objects.get(pk=self.user.id).division.all()[0].dp_legal.codigo
               
                for i in _models.Abogado.objects.get(pk=self.user).division.all():
                    materias.append(get_materias(i.clasificacion))
                    divisiones.append(i.nombre + get_division(i.clasificacion))

            return [dp,code]
        data['user']['dep']=get_dep()
        
        if self.user.name_group[0]['name'] == 'abogado_group':
            data['user']['materias'] = materias
            data['user']['divisiones'] = divisiones
        else:
            data['user']['materias'] = ''
            data['user']['divisiones'] = ''
        
        
            
        return data


class DpComercialSerializer(serializers.ModelSerializer):
    
    class Meta:
        model= _models.DpComercial
        fields = ('codigo','nombre','funciones','direccion')
    
class DpLegaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = _models.DpLegal
        fields = '__all__'

#-----------------------------------------------------------------------Contratos-------------------
class ContratoSerializer(serializers.ModelSerializer):
    class Meta:
        model  = _models.Contrato
        fields = '__all__'
    suministradorName = serializers.SerializerMethodField()
    materia = serializers.SerializerMethodField()
    abogado_name = serializers.SerializerMethodField()
    informe_descripcion = serializers.SerializerMethodField()
    informe_codigo = serializers.SerializerMethodField()
    def get_informe_codigo(self,obj):
        return obj.informes.codigo if hasattr(obj, "informes") else ""
    def get_informe_descripcion(self,obj):
        return obj.informes.descripcion if hasattr(obj, "informes") else ""
    def get_abogado_name(self,obj):
        return f'{obj.informes.abogado.nombre} {obj.informes.abogado.apellido}' if hasattr(obj, "informes") else ""
    def get_suministradorName(self,obj):
        return _models.Suministrador.objects.filter(contratos=obj)[0].nombre
    def get_materia(self,obj):
        return _models.Suministrador.objects.filter(contratos=obj)[0].clasificacion
        
#----------------------------------------------------------------Informe----------------------------
class InformeSerializer(serializers.ModelSerializer):
    comercialyId  = serializers.SerializerMethodField()
    estado = serializers.SerializerMethodField()

    def get_estado(self,obj):
        return obj.contrato.estado
    def get_comercialyId(self, obj):
        return f'{obj.contrato.codigo} - {obj.contrato.comercial.nombre} {obj.contrato.comercial.apellido}'
    class Meta:
        model = _models.Informe
        fields = '__all__'   
    

class SuministradorSerializer(serializers.ModelSerializer):
    class Meta:
        model  = _models.Suministrador
        fields = '__all__'

class DireccionSerializer(serializers.ModelSerializer):
    class Meta:
        model  = _models.Direccion
        fields = '__all__'

class ComercialSerializer(TrabajadorSerializer):
    # departamento = DpComercialSerializer(read_only=True)
    # cntContratos = ContratoSerializer()
    fecha_latest_eval = serializers.SerializerMethodField()
    def get_fecha_latest_eval(self,obj):
        return obj.fecha_latest_eval
    
    cntContratos = serializers.SerializerMethodField()
    depa = serializers.SerializerMethodField()
    
    def get_depa(self,obj):
        return _models.DpComercial.objects.get(comerciales=obj).nombre
    
    def get_cntContratos(self,obj):
        #cuenta contratos de comerciales
        return obj.contratos.count()

    
    class Meta(TrabajadorSerializer.Meta):
        model = _models.Comercial
        
        
        

    
        
class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = _models.Director
        

class AsistenteSerializer(TrabajadorSerializer):
    depa = serializers.SerializerMethodField()
    fecha_latest_eval = serializers.SerializerMethodField()
    def get_fecha_latest_eval(self,obj):
        return obj.fecha_latest_eval
    def get_depa(self,obj):
        return _models.DpComercial.objects.get(asistentes=obj).nombre
    class Meta(TrabajadorSerializer.Meta):
        model = _models.Asistente

class AbogadoSerializer(TrabajadorSerializer):
    class Meta:
        model = _models.Abogado
        exclude = ('evaluaciones',)

class FacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = _models.Factura
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

    def validate(self, data):
        trabajador = data.get('trabajador')
        fecha_actual = datetime.now().date()
        print(fecha_actual)
        ultima_evaluacion = trabajador.fecha_latest_eval
        print(ultima_evaluacion)
        if ultima_evaluacion:
            dif = fecha_actual - ultima_evaluacion
            if dif.days < 30:
                raise ValidationError('No ha pasado un mes desde la ultima evaluacion.')
        return data
    def create(self, validated_data):
        return _models.Evaluacion.objects.create(**validated_data)
        