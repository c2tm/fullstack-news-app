from rest_framework import permissions


class IsAdminOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_staff:
            return True
        else:
            False


class IsUserOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):

        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.author == request.user


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):

        if request.user.is_staff:
            return True
        elif request.method == 'POST':
            return False
        elif request.method in permissions.SAFE_METHODS:
            return True
        else:
            return False


class UserPermsDetail(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.author == request.user:
            if obj.phase == 'DR':
                return True
            elif obj.phase == 'RJ':
                if request.method in permissions.SAFE_METHODS:
                    return True
                elif request.method == 'DELETE':
                    return True
                else:
                    return False
            else:
                if request.method in permissions.SAFE_METHODS:
                    return True
                else:
                    return False
        else:
            return False
