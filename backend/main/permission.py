from django.contrib.auth.models import Group
from rest_framework import permissions

def is_in_group(user, group_name):
    try:
        return Group.objects.get(name=group_name).user_set.filter(id=user.id).exists()
    except Group.DoesNotExist:
        return False


class HasGroupPermission(permissions.BasePermission):
    def has_object_permission(self, request, view,obj):
        required_groups = view.permission_classes.get(view.action)
        if required_groups == None:
            return False
        elif '_Public' in required_groups:
            return True
        else:
            return any([is_in_group(request.user, group_name) for group_name in required_groups])