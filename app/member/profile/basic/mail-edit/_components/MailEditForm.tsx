'use client'

import { useState, useTransition } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { Input } from '@/components/form/rhf/Input'
import { BasicButton } from '@/components/ui/button/BasicButton'
import { CustomModal } from '@/components/features/modal/CustomModal'
import { editMailAction } from '@/app/member/profile/basic/mail-edit/_lib/action'
import {
  editMailSchema,
  type EditMailFormType,
} from '@/app/member/profile/basic/mail-edit/_schemas/edit-mail-shema'
import { HTTP_STATUS } from '@/constants/api-status'

interface MailEditFormProps {
  email: string
}

export const MailEditForm = ({ email }: MailEditFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [showModal, setShowModal] = useState(false)

  const methods = useForm<EditMailFormType>({
    resolver: zodResolver(editMailSchema),
    mode: 'all',
    defaultValues: {
      current_email: email,
      new_email: '',
      new_email_confirmation: '',
    },
  })

  const onSubmit = async (data: EditMailFormType) => {
    setShowModal(false)
    startTransition(async () => {
      const response = await editMailAction(data)

      if (response?.errors && response.status === HTTP_STATUS.BAD_REQUEST) {
        Object.entries(response.errors).forEach(([field, messages]) => {
          methods.setError(field as keyof EditMailFormType, {
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
              <div>
                <p className='font-extrabold'>現在のメールアドレス</p>
                <p className='mt-4 ml-4 text-gray-500'>{email}</p>
              </div>
              <Input
                name='new_email'
                label='新しいメールアドレス'
                inputType='email'
                placeholder='メールアドレス'
              />
              <Input
                name='new_email_confirmation'
                label='新しいメールアドレス（確認用）'
                inputType='email_confirmation'
                placeholder='メールアドレス（確認用）'
              />
            </div>
            <div className='mt-35 flex justify-center gap-10'>
              <BasicButton
                type='link'
                href='/member/profile/basic'
                variant='outlined'
                outerClassName='w-[30%]'
                innerClassName='w-full'
                leftIcon={<FaArrowLeft size={20} />}
                // disabled={isPending}
              >
                戻る
              </BasicButton>
              <BasicButton
                type='button'
                buttonType='button'
                onClick={() => {
                  methods.trigger()
                  if (methods.formState.isValid) {
                    setShowModal(true)
                  }
                }}
                variant='outlined'
                outerClassName='w-[30%]'
                innerClassName='w-full'
                rightIcon={<FaArrowRight size={20} />}
                // disabled={isPending}
              >
                確認する
              </BasicButton>
            </div>
          </form>
        </FormProvider>
      </div>
      <CustomModal showModal={showModal} closeModal={() => setShowModal(false)}>
        <div>
          <p className='text-2xl font-bold'>メールアドレスを変更しますか？</p>
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
              color='pjSoftBlue'
              variant='contained'
              outerClassName='w-[20%]'
              innerClassName='w-full'
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
