import type { Metadata } from 'next'
import Link from 'next/link'
import { createProjectAction } from '@/actions/create-project-action'
import { ProjectForm } from '@/components/forms/project-form'

export const metadata: Metadata = {
  title: 'New project - Turbo'
}

export default function NewProject() {
  return (
    <div className="mx-auto w-96">
      <Link
        href="/projects"
        className="mb-8 inline-block text-gray-500 hover:text-gray-700"
      >
        ← Back to projects
      </Link>

      <ProjectForm onSubmitHandler={createProjectAction} />
    </div>
  )
}
