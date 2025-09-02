'use client'

import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

interface ErrorProps {
  name: string | string[]
  className?: string
}

export function ErrorContent({ name, className }: ErrorProps) {
  const {
    formState: { errors },
  } = useFormContext()
  const keys = Array.isArray(name) ? name : [name]

  return (
    <>
      {keys.map((key, index) => (
        <ErrorMessage
          key={index}
          errors={errors}
          name={key}
          render={({ message }) => (
            <p
              className={`${className} text-sm my-1 text-start sm:text-sm text-red-500`}
              data-error-for={key}
            >
              {message}
            </p>
          )}
        />
      ))}
    </>
  )
}
