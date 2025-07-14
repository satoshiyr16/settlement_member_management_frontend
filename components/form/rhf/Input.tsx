'use client'

import { useFormContext } from 'react-hook-form'
import type { ComponentProps } from 'react'
import { ErrorContent } from '@/components/form/rhf/ErrorContent'

interface InputProps extends ComponentProps<'input'> {
  name: string
  index?: number
  label?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: Record<string, any>
  disabled?: boolean
  displayError?: boolean
  inputType?: string
  placeholder?: string
  divOuterClassName?: string
}

export function Input({
  name,
  index,
  label,
  options,
  disabled = false,
  displayError = false,
  divOuterClassName,
  inputType,
  placeholder = '',
  ...props
}: InputProps) {
  const { register } = useFormContext()
  const registerOptions = {
    ...options,
  }

  return (
    <>
      <div className={`${divOuterClassName} w-full`}>
        {label && (
          <label htmlFor={`input_${name}_${index}`} className=''>
            {label}
          </label>
        )}
        <input
          id={`input_${name}_${index}`}
          disabled={disabled}
          type={inputType}
          placeholder={placeholder}
          className='h-10 border-black border rounded-md p-4 focus:border-none focus:outline-none focus:ring-2  focus:ring-gray-500'
          {...register(name, registerOptions)}
          {...props}
        />
      </div>
      {displayError && <ErrorContent name={name} />}
    </>
  )
}
