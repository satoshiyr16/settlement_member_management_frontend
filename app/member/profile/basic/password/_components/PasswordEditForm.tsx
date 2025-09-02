'use client'

import { useState, useTransition } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaArrowLeft, FaCheck, FaCheckDouble } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { Input } from '@/components/form/rhf/Input'
import { BasicButton } from '@/components/ui/button/BasicButton'
import { ShowPasswordButton } from '@/components/ui/button/ShowPasswordButton'
import { CustomModal } from '@/components/features/modal/CustomModal'
import { editPasswordAction } from '@/app/member/profile/basic/password/_lib/action'
import {
  editPasswordSchema,
  type EditPasswordFormType,
} from '@/app/member/profile/basic/password/_schemas/schema'
import { HTTP_STATUS } from '@/constants/api-status'

export const PasswordEditForm = () => {
  const [isPending, startTransition] = useTransition()
  const [showModal, setShowModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const methods = useForm<EditPasswordFormType>({
    resolver: zodResolver(editPasswordSchema),
    mode: 'all',
    defaultValues: {
      current_password: '',
      new_password: '',
      new_password_confirmation: '',
    },
  })

  const onSubmit = async (data: EditPasswordFormType) => {
    setShowModal(false)
    startTransition(async () => {
      const response = await editPasswordAction(data)

      if (response?.errors && response.status === HTTP_STATUS.BAD_REQUEST) {
        Object.entries(response.errors).forEach(([field, messages]) => {
          methods.setError(field as keyof EditPasswordFormType, {
            type: 'server',
            message: Array.isArray(messages) ? messages[0] : messages,
          })
        })
      }
    })
  }
  return (
    <>
      <div className='mx-auto px-10 pt-16 pb-8'>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className=''>
              <Input
                name='current_password'
                label='現在のパスワード'
                inputType={showPassword ? 'text' : 'password'}
                placeholder='パスワード'
              />
              <Input
                name='new_password'
                label='新しいパスワード'
                inputType={showPassword ? 'text' : 'password'}
                placeholder='パスワード'
              />
              <Input
                name='new_password_confirmation'
                label='新しいパスワード（確認用）'
                inputType={showPassword ? 'text' : 'password'}
                placeholder='パスワード（確認用）'
              />
              <div className='flex justify-end'>
                <ShowPasswordButton
                  showPassword={showPassword}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
            <div className='mt-20 flex justify-center gap-10'>
              <BasicButton
                type='link'
                href='/member/profile/basic'
                variant='outlined'
                outerClassName='w-[30%]'
                innerClassName='w-full'
                leftIcon={<FaArrowLeft size={20} />}
                disabled={isPending}
              >
                戻る
              </BasicButton>
              <BasicButton
                type='button'
                buttonType='button'
                onClick={async () => {
                  const isValid = await methods.trigger()
                  if (isValid) {
                    setShowModal(true)
                  }
                }}
                variant='outlined'
                outerClassName='w-[30%]'
                innerClassName='w-full'
                rightIcon={<FaCheck size={20} />}
                disabled={isPending}
              >
                確認する
              </BasicButton>
            </div>
          </form>
        </FormProvider>
      </div>
      <CustomModal showModal={showModal} closeModal={() => setShowModal(false)}>
        <div>
          <p className='text-2xl font-bold'>パスワードを変更しますか？</p>
          <div className='mt-10 flex justify-center gap-10'>
            <BasicButton
              type='button'
              onClick={() => setShowModal(false)}
              variant='outlined'
              outerClassName='w-[20%]'
              innerClassName='w-full'
              leftIcon={<IoClose size={28} />}
              disabled={isPending}
            >
              キャンセル
            </BasicButton>
            <BasicButton
              type='button'
              buttonType='button'
              onClick={() => {
                onSubmit(methods.getValues())
              }}
              variant='outlined'
              outerClassName='w-[20%]'
              innerClassName='w-full'
              rightIcon={<FaCheckDouble size={20} />}
              disabled={isPending}
            >
              変更する
            </BasicButton>
          </div>
        </div>
      </CustomModal>
    </>
  )
}
