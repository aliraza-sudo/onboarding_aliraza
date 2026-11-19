import pytest
from django.urls import reverse
from rest_framework import status

from projects.models import Project

LIST_URL = "api-projects-list"


@pytest.fixture
def authenticated_client(api_client, regular_user):
    api_client.force_authenticate(user=regular_user)
    return api_client


@pytest.mark.django_db
def test_projects_list_unauthorized(api_client):
    response = api_client.get(reverse(LIST_URL))
    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
def test_projects_create_unauthorized(api_client):
    response = api_client.post(reverse(LIST_URL), {"name": "A", "status": "draft"})
    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
def test_projects_list_returns_project_fields(
    authenticated_client, project_factory, regular_user
):
    project_factory.create(name="Roadmap", description="Q1", created_by=regular_user)

    response = authenticated_client.get(reverse(LIST_URL))

    assert response.status_code == status.HTTP_200_OK
    [item] = response.data["results"]
    assert item["name"] == "Roadmap"
    assert item["description"] == "Q1"
    assert item["status"] == "draft"
    assert item["created_by"] == regular_user.username
    assert item["created_at"]


@pytest.mark.django_db
def test_projects_list_without_creator(authenticated_client, project_factory):
    project_factory.create(created_by=None)

    response = authenticated_client.get(reverse(LIST_URL))

    assert response.data["results"][0]["created_by"] is None


@pytest.mark.django_db
def test_projects_list_filters_by_status(authenticated_client, project_factory):
    project_factory.create(status=Project.Status.DRAFT)
    project_factory.create(status=Project.Status.ACTIVE)

    response = authenticated_client.get(reverse(LIST_URL), {"status": "active"})

    assert [p["status"] for p in response.data["results"]] == ["active"]


@pytest.mark.django_db
def test_projects_list_is_paginated(authenticated_client, project_factory):
    project_factory.create_batch(11)

    first = authenticated_client.get(reverse(LIST_URL))
    second = authenticated_client.get(reverse(LIST_URL), {"page": 2})

    assert len(first.data["results"]) == 10
    assert first.data["next"] is not None
    assert len(second.data["results"]) == 1
    assert second.data["next"] is None


@pytest.mark.django_db
def test_projects_create_sets_creator_and_date(authenticated_client, regular_user):
    payload = {"name": "New", "status": "active", "created_by": "someone-else"}

    response = authenticated_client.post(reverse(LIST_URL), payload)

    assert response.status_code == status.HTTP_201_CREATED
    project = Project.objects.get()
    assert project.created_by == regular_user
    assert project.created_at is not None
    assert project.description == ""


@pytest.mark.django_db
@pytest.mark.parametrize(
    ("payload", "field"),
    [
        ({"status": "draft"}, "name"),
        ({"name": "No status"}, "status"),
        ({"name": "Bad status", "status": "archived"}, "status"),
    ],
)
def test_projects_create_validation(authenticated_client, payload, field):
    response = authenticated_client.post(reverse(LIST_URL), payload)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert field in response.data
    assert not Project.objects.exists()


@pytest.mark.django_db
def test_projects_update_and_delete_not_exposed(authenticated_client, project):
    url = f"/api/projects/{project.pk}/"

    assert authenticated_client.patch(url, {"name": "x"}).status_code == 404
    assert authenticated_client.delete(url).status_code == 404
