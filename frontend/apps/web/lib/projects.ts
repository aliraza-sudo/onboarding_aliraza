import type { PaginatedProjectList } from '@frontend/types/api'
import type { projectStatuses } from './validation'

export type ProjectStatus = (typeof projectStatuses)[number]

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  completed: 'Completed'
}

export function parseStatus(value?: string): ProjectStatus | undefined {
  return Object.keys(STATUS_LABELS).find((status) => status === value) as
    | ProjectStatus
    | undefined
}

export function parsePage(value?: string): number {
  const page = Number(value)
  return Number.isInteger(page) && page > 0 ? page : 1
}

export function projectsHref(status?: ProjectStatus, page = 1): string {
  const params = new URLSearchParams()
  if (status) params.set('status', status)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `/projects?${query}` : '/projects'
}

export const PAGE_NOT_FOUND = 'page-not-found'

export type ProjectsResult = PaginatedProjectList | typeof PAGE_NOT_FOUND | null
