'use client'

import type React from 'react'
import type {
  FieldValues,
  FormState,
  UseFormRegisterReturn
} from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export function SelectField({
  label,
  placeholder,
  options,
  register,
  formState
}: {
  label: string
  placeholder: string
  options: { value: string; label: string }[]
  register: UseFormRegisterReturn
  formState: FormState<FieldValues>
}): React.ReactElement {
  const hasError = formState.errors[register.name]

  return (
    <label className="mb-6 flex flex-col last:mb-0">
      <span className="mb-3 block font-medium leading-none">{label}</span>

      <select
        className={twMerge(
          'block h-10 max-w-lg rounded bg-white px-4 font-medium shadow-sm outline outline-1 outline-gray-900/10 focus:outline-purple-600 focus:ring-4 focus:ring-purple-300',
          hasError && 'outline-red-700 focus:outline-red-600 focus:ring-red-300'
        )}
        {...register}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {hasError && (
        <div className="mt-2 text-red-600">
          {formState.errors[register.name]?.message?.toString()}
        </div>
      )}
    </label>
  )
}
