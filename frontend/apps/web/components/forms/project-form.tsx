'use client'

import type { ProjectCreateError } from '@frontend/types/api'
import { FormHeader } from '@frontend/ui/forms/form-header'
import { SelectField } from '@frontend/ui/forms/select-field'
import { SubmitField } from '@frontend/ui/forms/submit-field'
import { TextField } from '@frontend/ui/forms/text-field'
import { ErrorMessage } from '@frontend/ui/messages/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { type UseFormSetError, useForm } from 'react-hook-form'
import type {
  createProjectAction,
  ProjectFormSchema
} from '@/actions/create-project-action'
import { fieldApiError } from '@/lib/forms'
import { STATUS_LABELS } from '@/lib/projects'
import { projectFormSchema } from '@/lib/validation'

const STATUS_OPTIONS = Object.entries(STATUS_LABELS).map(([value, label]) => ({
  value,
  label
}))

const FIELDS = ['name', 'description', 'status'] as const

// Returns false when the API error has no field we can show it on
function showFieldErrors(
  errors: ProjectCreateError,
  setError: UseFormSetError<ProjectFormSchema>
): boolean {
  const fields = FIELDS.filter((field) => errors[field])
  for (const field of fields) {
    fieldApiError(field, field, errors, setError)
  }
  return fields.length > 0
}

// Resolves to true when the form should show the generic failure message
async function submitProject(
  data: ProjectFormSchema,
  onSubmitHandler: typeof createProjectAction,
  setError: UseFormSetError<ProjectFormSchema>
): Promise<boolean> {
  const res = await onSubmitHandler(data)

  if (res === true) {
    window.location.assign('/projects')
    return false
  }

  return res === false || !showFieldErrors(res, setError)
}

export function ProjectForm({
  onSubmitHandler
}: {
  onSubmitHandler: typeof createProjectAction
}) {
  const { formState, handleSubmit, register, setError } =
    useForm<ProjectFormSchema>({ resolver: zodResolver(projectFormSchema) })
  const [failed, setFailed] = useState(false)

  return (
    <>
      <FormHeader
        title="Create a new project"
        description="Share a project and its status with the team"
      />

      <form
        method="post"
        onSubmit={handleSubmit(async (data) =>
          setFailed(await submitProject(data, onSubmitHandler, setError))
        )}
      >
        {failed && (
          <ErrorMessage>
            Unable to create the project. Please try again.
          </ErrorMessage>
        )}

        <TextField
          type="text"
          register={register('name')}
          formState={formState}
          label="Name"
          placeholder="Project name"
        />

        <TextField
          type="text"
          register={register('description')}
          formState={formState}
          label="Description"
          placeholder="Short description (optional)"
        />

        <SelectField
          register={register('status')}
          formState={formState}
          label="Status"
          placeholder="Select a status"
          options={STATUS_OPTIONS}
        />

        <SubmitField>Create project</SubmitField>
      </form>
    </>
  )
}
