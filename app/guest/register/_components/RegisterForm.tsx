'use client'

import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FaArrowRight } from 'react-icons/fa'
import { useAtomValue } from 'jotai'
import { Input } from '@/components/form/rhf/Input'
import { RadioButton } from '@/components/form/rhf/RadioButton'
import { getMasterDataAtom } from '@/app/_atoms/master-data-atom'
import { BasicButton } from '@/components/ui/button/BasicButton'
import { ShowPasswordButton } from '@/components/ui/button/ShowPasswordButton'
import { RegisterFormType } from '@/app/guest/register/_schemas/register-schema'

interface RegisterFormProps {
  email: string
  methods: UseFormReturn<RegisterFormType>
  setFormMode: (mode: 'form' | 'confirm') => void
}

export const RegisterForm = ({ email, methods, setFormMode }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const masterData = useAtomValue(getMasterDataAtom)

  return (
    <>
      <div>
        <div>
          <p className='font-extrabold'>メールアドレス</p>
          <p className='mt-4 ml-4 text-gray-500'>{email}</p>
        </div>
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
        <div className='flex justify-end'>
          <ShowPasswordButton
            showPassword={showPassword}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
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
