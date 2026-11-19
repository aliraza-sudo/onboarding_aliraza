from drf_spectacular.utils import OpenApiParameter, extend_schema, extend_schema_view
from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Project
from .serializers import ProjectCreateErrorSerializer, ProjectSerializer


@extend_schema_view(
    list=extend_schema(
        parameters=[
            OpenApiParameter("status", enum=Project.Status.values, required=False)
        ]
    ),
    create=extend_schema(
        responses={201: ProjectSerializer, 400: ProjectCreateErrorSerializer}
    ),
)
class ProjectViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Project.objects.select_related("created_by")
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        status = self.request.query_params.get("status")

        if status in Project.Status.values:
            return self.queryset.filter(status=status)

        return self.queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
