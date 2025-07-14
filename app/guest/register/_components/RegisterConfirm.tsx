'use client'

import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { RegisterFormType } from '@/app/guest/register/_schemas/schema'

interface RegisterConfirmProps {
  methods: UseFormReturn<RegisterFormType>
  formMode: 'form' | 'confirm'
  setFormMode: (mode: 'form' | 'confirm') => void
  onSubmit: (data: RegisterFormType) => void
}

export const RegisterConfirm = ({ methods, formMode, setFormMode, onSubmit }: RegisterConfirmProps) => {
  return (
    <div>

    </div>
  )
}
