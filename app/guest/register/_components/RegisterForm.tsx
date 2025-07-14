'use client'

import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/form/rhf/Input'
import { RegisterFormType } from '@/app/guest/register/_schemas/schema'

interface RegisterFormProps {
  formMode: 'form' | 'confirm'
  setFormMode: (mode: 'form' | 'confirm') => void
}

export const RegisterForm = ({ formMode, setFormMode }: RegisterFormProps) => {
  return (
    <div className=''>
      <Input
        name='email'
        label='メールアドレス'
        inputType='email'
        placeholder='example@example.com'
        displayError={true}
      />

      <Input
        name='password'
        label='パスワード'
        inputType='password'
        placeholder='8文字以上で入力'
        displayError={true}
      />

      <Input
        name='name'
        label='お名前'
        inputType='text'
        placeholder='山田太郎'
        displayError={true}
      />

      <Input
        name='phone'
        label='電話番号（任意）'
        inputType='tel'
        placeholder='090-1234-5678'
      />

      <button
        type='button'
        onClick={() => setFormMode('confirm')}
      >
        確認する
      </button>
    </div>
  )
}
