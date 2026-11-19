from django.contrib.auth import get_user_model
from factory.django import DjangoModelFactory

from projects.models import Project


class UserFactory(DjangoModelFactory):
    username = "sample@example.com"
    email = "sample@example.com"

    class Meta:
        model = get_user_model()


class ProjectFactory(DjangoModelFactory):
    name = "Sample project"
    status = Project.Status.DRAFT

    class Meta:
        model = Project
