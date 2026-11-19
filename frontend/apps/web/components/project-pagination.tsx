import Link from 'next/link'
import type React from 'react'
import { type ProjectStatus, projectsHref } from '@/lib/projects'

const BUTTON = 'rounded border px-3 py-1.5 font-medium'

function PageButton({
  href,
  children
}: React.PropsWithChildren<{ href?: string }>) {
  if (!href) {
    return (
      <span
        aria-disabled="true"
        className={`${BUTTON} cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300`}
      >
        {children}
      </span>
    )
  }

  return (
    <Link
      href={href}
      className={`${BUTTON} border-gray-200 bg-white text-gray-700 hover:bg-gray-50`}
    >
      {children}
    </Link>
  )
}

export function ProjectPagination({
  page,
  status,
  hasNext
}: {
  page: number
  status?: ProjectStatus
  hasNext: boolean
}) {
  if (page <= 1 && !hasNext) {
    return null
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-6 flex items-center justify-between"
    >
      <PageButton href={page > 1 ? projectsHref(status, page - 1) : undefined}>
        ← Previous
      </PageButton>

      <span className="text-gray-500">Page {page}</span>

      <PageButton href={hasNext ? projectsHref(status, page + 1) : undefined}>
        Next →
      </PageButton>
    </nav>
  )
}
