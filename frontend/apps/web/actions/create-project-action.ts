'use server'

import {
  ApiError,
  type Project,
  type ProjectCreateError
} from '@frontend/types/api'
import type { z } from 'zod'
import { getApiClient } from '@/lib/api'
import type { projectFormSchema } from '@/lib/validation'

export type ProjectFormSchema = z.infer<typeof projectFormSchema>

export async function createProjectAction(
  data: ProjectFormSchema
): Promise<ProjectCreateError | boolean> {
  try {
    const apiClient = await getApiClient()

    // The generated request type also requires read-only fields (id, created_*)
    await apiClient.projects.projectsCreate({
      name: data.name,
      description: data.description,
      status: data.status
    } as Project)

    return true
  } catch (error) {
    if (error instanceof ApiError) {
      return error.body as ProjectCreateError
    }
  }

  return false
}
