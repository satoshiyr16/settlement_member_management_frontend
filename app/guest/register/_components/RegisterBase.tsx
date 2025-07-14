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
} from '@/app/guest/register/_schemas/schema'

export const RegisterBase = () => {
  const [formMode, setFormMode] = useState<'form' | 'confirm'>('form')

  const methods = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      name: '',
      phone: '',
    },
  })

  const onSubmit = async (data: RegisterFormType) => {
    try {
      const result = await registerAction(data)

      if (result?.error) {
        console.error('登録エラー:', result.error)
      }
    } catch (error) {
      console.error('フォーム送信エラー:', error)
    }
  }

  return (
    <div className=''>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className=''>
          {formMode === 'form' ? (
            <RegisterForm formMode={formMode} setFormMode={setFormMode} />
          ) : (
            <RegisterConfirm methods={methods} formMode={formMode} setFormMode={setFormMode} onSubmit={onSubmit} />
          )}
        </form>
      </FormProvider>
    </div>
  )
}
