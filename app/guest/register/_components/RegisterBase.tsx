'use client'

import { useState, useTransition } from 'react'
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

interface RegisterBaseProps {
  email: string
}

export const RegisterBase = ({ email }: RegisterBaseProps) => {
  const [isPending, startTransition] = useTransition()
  const [showModal, setShowModal] = useState(false)
  const [formMode, setFormMode] = useState<'form' | 'confirm'>('form')

  const methods = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    mode: 'all',
    defaultValues: {
      email: email,
      password: '',
      password_confirmation: '',
      nickname: '',
      birth_date: '',
      gender: undefined,
    },
  })

  const onSubmit = async (data: RegisterFormType) => {
    setShowModal(false)
    startTransition(async () => {
      const response = await registerAction(data)

      if (response?.errors && response.status === HTTP_STATUS.BAD_REQUEST) {
        setFormMode('form')
        Object.entries(response.errors).forEach(([field, messages]) => {
          methods.setError(field as keyof RegisterFormType, {
            type: 'server',
            message: Array.isArray(messages) ? messages[0] : messages,
          })
        })
      }
    })
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
              <RegisterForm email={email} methods={methods} setFormMode={setFormMode} />
            ) : (
              <RegisterConfirm
                showModal={showModal}
                setShowModal={setShowModal}
                methods={methods}
                setFormMode={setFormMode}
                onSubmit={onSubmit}
                isPending={isPending}
              />
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
