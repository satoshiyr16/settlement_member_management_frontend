'use client'

import { useFormContext } from 'react-hook-form'
import type { ComponentPropsWithoutRef } from 'react'
import { ErrorContent } from '@/components/form/rhf/ErrorContent'
import { BaseMasterDataType } from '@/lib/types/master-data'
import { ColorOptionTypes } from '@/lib/types/color'

interface RadioButtonProps extends ComponentPropsWithoutRef<'input'> {
  name: string
  values: BaseMasterDataType[]
  label?: string
  color?: ColorOptionTypes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: Record<string, any>
  divOuterClassName?: string
  divInnerClassName?: string
  inputClassName?: string
  labelClassName?: string
  displayError?: boolean
}

const colorClasses: Record<string, string> = {
  pjGray:
    'focus:ring focus:ring-pjGray focus:ring-opacity-50 border-pjGray checked:border-pjGray before:bg-pjGray',
}

export function RadioButton({
  name,
  values,
  label,
  color = 'pjGray',
  options,
  divOuterClassName,
  divInnerClassName,
  inputClassName,
  labelClassName,
  displayError = true,
  ...props
}: RadioButtonProps) {
  const { register } = useFormContext()
  const registerOptions = {
    ...options,
  }

  const accentClass = colorClasses[color] || colorClasses.pjGray

  return (
    <div className={`${divOuterClassName} ${displayError && 'flex flex-col'} my-6`}>
      {label && <div className='mb-1 font-bold'>{label}</div>}
      <div className={`flex flex-wrap gap-4 ${divInnerClassName}`}>
        {values.map((value: BaseMasterDataType, index: number) => (
          <div key={index} className='flex flex-row items-center gap-2'>
            <input
              {...register(name, registerOptions)}
              type='radio'
              name={name}
              id={`input_radio_${name}_${index}`}
              value={value.value}
              className={`${inputClassName} ${accentClass} appearance-none cursor-pointer rounded-full border h-6 w-6 relative before:content-[''] before:w-4 before:h-4 before:rounded-full before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:scale-0 checked:before:scale-100`}
              {...props}
            />
            <label
              htmlFor={`input_radio_${name}_${index}`}
              className={`${labelClassName} cursor-pointer ml-2`}
            >
              {value.label}
            </label>
          </div>
        ))}
      </div>
      {displayError && <ErrorContent name={name} />}
    </div>
  )
}
