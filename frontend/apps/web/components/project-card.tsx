import type { Project } from '@frontend/types/api'
import type { ProjectStatus } from '@/lib/projects'
import { ProjectStatusBadge } from './project-status-badge'

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <li className="flex flex-col rounded-lg bg-white p-5 shadow-sm ring-1 ring-gray-900/5">
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-medium text-gray-900">{project.name}</h2>
        <ProjectStatusBadge status={project.status as ProjectStatus} />
      </div>

      {project.description && (
        <p className="mt-2 line-clamp-3 text-gray-600">{project.description}</p>
      )}

      <p className="mt-auto pt-4 text-xs text-gray-400">
        {project.created_by ?? 'Unknown user'} ·{' '}
        {new Date(project.created_at).toLocaleDateString('en-US', DATE_FORMAT)}
      </p>
    </li>
  )
}
