from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from django.urls import path,include
from rest_framework import routers
from .views import TrabajadorViewSet, DpComercialViewSet,DpLegalesViewSet,ComercialViewSet,DirectorViewSet,AsistenteViewSet,AbogadoViewSet, EvaluacionViewSet, EvaluacionesTrabajador,ContratosComercial,RegisterComercialView, LoginView, LogoutAllView
router  = routers.DefaultRouter()
router.register(r'users',TrabajadorViewSet)
router.register(r'dplegales', DpLegalesViewSet)
router.register(r'comerciales', ComercialViewSet)
router.register(r'directores', DirectorViewSet) 
router.register(r'asistentes', AsistenteViewSet)
router.register(r'abogados', AbogadoViewSet)
router.register(r'dpcomerciales', DpComercialViewSet)
router.register(r'evaluaciones', EvaluacionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('evalsof/<int:id>/', EvaluacionesTrabajador.as_view(), name='evaluaciones_trabajador'),
    path('contratsof/<int:id>/', ContratosComercial.as_view(), name='contratos_trabajador'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register_comercial/',RegisterComercialView.as_view(),name='register_comercial'),
    path('login/', LoginView.as_view(), name='token_obtain_pair'),
    path('logout/', LogoutAllView.as_view(), name='auth_logout'),

]