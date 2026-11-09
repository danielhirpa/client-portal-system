from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Project, Task
from .serializers import ProjectSerializer, TaskSerializer
from core.permissions import HasTenantAccess, IsAgencyOrClientLead

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, HasTenantAccess, IsAgencyOrClientLead]

    def get_queryset(self):
        user = self.request.user
        if user.is_agency_staff():
            return Project.objects.all()
        return Project.objects.filter(tenant=user.tenant)

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, HasTenantAccess, IsAgencyOrClientLead]
    filterset_fields = ['status', 'priority', 'project']

    def get_queryset(self):
        user = self.request.user
        if user.is_agency_staff():
            return Task.objects.all()
        return Task.objects.filter(project__tenant=user.tenant)