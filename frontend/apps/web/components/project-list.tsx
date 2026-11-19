import { ErrorMessage } from '@frontend/ui/messages/error-message'
import Link from 'next/link'
import {
  PAGE_NOT_FOUND,
  type ProjectStatus,
  type ProjectsResult,
  projectsHref,
  STATUS_LABELS
} from '@/lib/projects'
import { ProjectCard } from './project-card'

function EmptyState({
  title,
  link
}: {
  title: string
  link?: { href: string; label: string }
}) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 px-6 py-12 text-center">
      <p className="font-medium text-gray-900">{title}</p>

      {link && (
        <Link
          href={link.href}
          className="mt-3 inline-block font-medium text-purple-600 hover:text-purple-700"
        >
          {link.label}
        </Link>
      )}
    </div>
  )
}

export function ProjectList({
  projects,
  status
}: {
  projects: ProjectsResult
  status?: ProjectStatus
}) {
  if (projects === null) {
    return (
      <ErrorMessage>Unable to load projects. Please try again.</ErrorMessage>
    )
  }

  if (projects === PAGE_NOT_FOUND) {
    return (
      <EmptyState
        title="This page doesn't exist"
        link={{ href: projectsHref(status), label: 'Go to the first page' }}
      />
    )
  }

  if (projects.results.length > 0) {
    return (
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.results.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ul>
    )
  }

  return status ? (
    <EmptyState title={`No ${STATUS_LABELS[status].toLowerCase()} projects`} />
  ) : (
    <EmptyState
      title="No projects yet"
      link={{ href: '/projects/new', label: 'Create your first project' }}
    />
  )
}
