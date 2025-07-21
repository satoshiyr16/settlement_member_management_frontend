'use client'

import { useFormContext } from 'react-hook-form'
import type { ComponentProps } from 'react'
import { ErrorContent } from '@/components/form/rhf/ErrorContent'
import { ColorOptionTypes } from '@/lib/types/color'

interface InputProps extends ComponentProps<'input'> {
  name: string
  index?: number
  label?: string
  color?: ColorOptionTypes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: Record<string, any>
  disabled?: boolean
  displayError?: boolean
  inputType?: string
  placeholder?: string
  divOuterClassName?: string
  divInnerClassName?: string
}

const colorClasses: Record<string, string> = {
  pjGray:
    'border-pjGray border rounded-md focus:border-none focus:outline-none focus:ring-2 focus:ring-pjGray',
}

export function Input({
  name,
  index,
  label,
  color = 'pjGray',
  options,
  disabled = false,
  displayError = true,
  divOuterClassName,
  divInnerClassName,
  inputType,
  placeholder = '',
  ...props
}: InputProps) {
  const { register } = useFormContext()
  const registerOptions = {
    ...options,
  }

  const accentClass = colorClasses[color] || colorClasses.pjGray

  return (
    <div className={`${divOuterClassName} my-6`}>
      <div
        className={`${divInnerClassName} ${label || displayError ? 'flex flex-col' : ''} ${inputType === 'date' && 'w-[30%]'} ${inputType === 'password' && 'w-full'} ${inputType === 'email' && 'w-full'}  ${inputType === 'text' && 'w-full'}`}
      >
        {label && (
          <label htmlFor={`input_${name}_${index}`} className='mb-1 font-bold'>
            {label}
          </label>
        )}
        <input
          id={`input_${name}_${index}`}
          disabled={disabled}
          type={inputType}
          placeholder={placeholder}
          className={`h-10 p-4 ${accentClass}`}
          {...register(name, registerOptions)}
          {...props}
        />
      </div>
      {displayError && <ErrorContent name={name} />}
    </div>
  )
}
