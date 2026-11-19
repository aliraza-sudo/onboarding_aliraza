'use server'

import { ApiError } from '@frontend/types/api'
import { getApiClient } from '@/lib/api'
import {
  PAGE_NOT_FOUND,
  type ProjectStatus,
  type ProjectsResult
} from '@/lib/projects'

export async function listProjectsAction(
  page: number,
  status?: ProjectStatus
): Promise<ProjectsResult> {
  try {
    const apiClient = await getApiClient()
    return await apiClient.projects.projectsList(page, status)
  } catch (error) {
    // DRF answers 404 when the page number is past the last page
    if (error instanceof ApiError && error.status === 404) {
      return PAGE_NOT_FOUND
    }

    return null
  }
}
