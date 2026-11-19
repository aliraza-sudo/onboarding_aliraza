import { type ProjectStatus, STATUS_LABELS } from '@/lib/projects'

const BADGE_STYLES: Record<ProjectStatus, { badge: string; dot: string }> = {
  draft: { badge: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' },
  active: { badge: 'bg-green-50 text-green-700', dot: 'bg-green-500' },
  completed: { badge: 'bg-blue-50 text-blue-700', dot: 'bg-blue-500' }
}

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const styles = BADGE_STYLES[status]

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${styles.badge}`}
    >
      <span className={`size-1.5 rounded-full ${styles.dot}`} />
      {STATUS_LABELS[status]}
    </span>
  )
}
