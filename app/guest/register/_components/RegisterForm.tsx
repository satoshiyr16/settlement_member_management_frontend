'use client'

import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FaArrowRight } from 'react-icons/fa'
import { useAtomValue } from 'jotai'
import { Input } from '@/components/form/rhf/Input'
import { RadioButton } from '@/components/form/rhf/RadioButton'
import { getMasterDataAtom } from '@/app/_atoms/master-data-atom'
import { BasicButton } from '@/components/ui/button/BasicButton'
import { RegisterFormType } from '@/app/guest/register/_schemas/register-schema'

interface RegisterFormProps {
  methods: UseFormReturn<RegisterFormType>
  setFormMode: (mode: 'form' | 'confirm') => void
}

export const RegisterForm = ({ methods, setFormMode }: RegisterFormProps) => {
  const masterData = useAtomValue(getMasterDataAtom)

  return (
    <>
      <div>
        <Input
          name='email'
          label='メールアドレス'
          inputType='email'
          placeholder='example@example.com'
        />
        <Input
          name='password'
          label='パスワード'
          inputType='password'
          placeholder='8文字以上32文字以下で入力'
        />
        <Input
          name='password_confirmation'
          label='パスワード（確認用）'
          inputType='password'
        />
        <Input
          name='nickname'
          label='ニックネーム'
          inputType='text'
          placeholder='ニックネーム'
        />
        <Input name='birth_date' label='生年月日' inputType='date' type='date' />
        <RadioButton
          name='gender'
          values={masterData?.genders || []}
          color='pjGray'
          label='性別'
        />
      </div>
      <div className='mt-20 flex justify-center'>
        <BasicButton
          type='button'
          buttonType='button'
          onClick={() => {
            methods.trigger()
            if (methods.formState.isValid) {
              setFormMode('confirm')
            }
          }}
          variant='outlined'
          outerClassName='w-[30%]'
          innerClassName='w-full'
          rightIcon={<FaArrowRight size={20} />}
        >
          確認する
        </BasicButton>
      </div>
    </>
  )
}
