from rest_framework import permissions

class IsComercialOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Si es una solicitud de lectura (GET, HEAD o OPTIONS), permitir siempre
        if request.method in permissions.SAFE_METHODS:
            return True

        # Solo permitir al usuario comercial si el objeto pertenece a él
        return obj.user == request.user and request.user.tipo == 'Comercial'