import type { Metadata } from 'next'
import Link from 'next/link'
import { listProjectsAction } from '@/actions/list-projects-action'
import { ProjectList } from '@/components/project-list'
import { ProjectPagination } from '@/components/project-pagination'
import { ProjectStatusFilter } from '@/components/project-status-filter'
import { PAGE_NOT_FOUND, parsePage, parseStatus } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects - Turbo'
}

export default async function Projects({
  searchParams
}: {
  searchParams: Promise<{ page?: string; status?: string }>
}) {
  const params = await searchParams
  const status = parseStatus(params.status)
  const page = parsePage(params.page)
  const projects = await listProjectsAction(page, status)
  const pageData =
    projects === null || projects === PAGE_NOT_FOUND ? null : projects

  return (
    <>
      <header className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
          {pageData && (
            <p className="mt-1 text-gray-500">
              {pageData.count} {pageData.count === 1 ? 'project' : 'projects'}
            </p>
          )}
        </div>

        <Link
          href="/projects/new"
          className="rounded bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-700"
        >
          New project
        </Link>
      </header>

      <ProjectStatusFilter active={status} />
      <ProjectList projects={projects} status={status} />
      {pageData && (
        <ProjectPagination
          page={page}
          status={status}
          hasNext={Boolean(pageData.next)}
        />
      )}
    </>
  )
}
