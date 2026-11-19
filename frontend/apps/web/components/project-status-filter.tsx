import Link from 'next/link'
import { type ProjectStatus, projectsHref, STATUS_LABELS } from '@/lib/projects'

const FILTERS: { label: string; status?: ProjectStatus }[] = [
  { label: 'All' },
  ...(Object.keys(STATUS_LABELS) as ProjectStatus[]).map((status) => ({
    label: STATUS_LABELS[status],
    status
  }))
]

export function ProjectStatusFilter({ active }: { active?: ProjectStatus }) {
  return (
    <nav
      aria-label="Filter projects by status"
      className="mb-4 flex gap-6 border-b border-gray-200"
    >
      {FILTERS.map(({ label, status }) => (
        <Link
          key={label}
          href={projectsHref(status)}
          aria-current={status === active ? 'page' : undefined}
          className={`-mb-px border-b-2 pb-3 font-medium ${
            status === active
              ? 'border-purple-600 text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
