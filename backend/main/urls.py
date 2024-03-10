from django.urls import path,include
from rest_framework import routers
from .views import TrabajadorViewSet, DpComercialViewSet,DpLegalesViewSet,ComercialViewSet,DirectorViewSet,AsistenteViewSet,AbogadoViewSet
router  = routers.DefaultRouter()
router.register(r'users',TrabajadorViewSet)
router.register(r'dplegales', DpLegalesViewSet)
router.register(r'comerciales', ComercialViewSet)
router.register(r'directores', DirectorViewSet) 
router.register(r'asistentes', AsistenteViewSet)
router.register(r'abogados', AbogadoViewSet)
router.register(r'dpcomerciales', DpComercialViewSet)

urlpatterns = [
    path('', include(router.urls))
]