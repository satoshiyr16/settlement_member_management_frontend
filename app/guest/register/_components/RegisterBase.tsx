'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterForm } from '@/app/guest/register/_components/RegisterForm'
import { RegisterConfirm } from '@/app/guest/register/_components/RegisterConfirm'
import { registerAction } from '@/app/guest/register/_lib/action'
import {
  registerSchema,
  type RegisterFormType,
} from '@/app/guest/register/_schemas/register-schema'
import { HTTP_STATUS } from '@/constants/api-status'

export const RegisterBase = () => {
  const [formMode, setFormMode] = useState<'form' | 'confirm'>('form')

  const methods = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      password_confirmation: '',
      nickname: '',
      birth_date: '',
      gender: undefined,
    },
  })

  const onSubmit = async (data: RegisterFormType) => {
    try {
      const result = await registerAction(data)

      if (result?.errors && result.status === HTTP_STATUS.BAD_REQUEST) {
        setFormMode('form')
        Object.entries(result.errors).forEach(([field, messages]) => {
          methods.setError(field as keyof RegisterFormType, {
            type: 'server',
            message: Array.isArray(messages) ? messages[0] : messages,
          })
        })
      }
    } catch (error) {
      console.error('フォーム送信エラー:', error)
    }
  }

  return (
    <div className=''>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className='w-[80%] mx-auto min-h-[70vh]'
        >
          <div className='min-h-[70vh] flex flex-col justify-between'>
            {formMode === 'form' ? (
              <RegisterForm methods={methods} setFormMode={setFormMode} />
            ) : (
              <RegisterConfirm
                methods={methods}
                setFormMode={setFormMode}
                onSubmit={onSubmit}
              />
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
