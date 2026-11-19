from rest_framework import serializers

from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(
        source="created_by.username", read_only=True, allow_null=True
    )

    class Meta:
        model = Project
        fields = ["id", "name", "description", "status", "created_by", "created_at"]
        read_only_fields = ["id", "created_at"]


class ProjectCreateErrorSerializer(serializers.Serializer):
    name = serializers.ListSerializer(child=serializers.CharField(), required=False)
    description = serializers.ListSerializer(
        child=serializers.CharField(), required=False
    )
    status = serializers.ListSerializer(child=serializers.CharField(), required=False)
