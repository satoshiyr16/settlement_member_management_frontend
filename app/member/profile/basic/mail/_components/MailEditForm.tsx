'use client'

import { useState, useTransition } from 'react'
import { useAtomValue } from 'jotai'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaArrowLeft, FaCheck, FaCheckDouble } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { Input } from '@/components/form/rhf/Input'
import { BasicButton } from '@/components/ui/button/BasicButton'
import { CustomModal } from '@/components/features/modal/CustomModal'
import { editMailAction } from '@/app/member/profile/basic/mail/_lib/action'
import { getMemberAuthAtom } from '@/app/member/_atoms/member-data-atom'
import {
  editMailSchema,
  type EditMailFormType,
} from '@/app/member/profile/basic/mail/_schemas/edit-mail-schema'
import { HTTP_STATUS } from '@/constants/api-status'

export const MailEditForm = () => {
  const [isPending, startTransition] = useTransition()
  const [showModal, setShowModal] = useState(false)

  const memberAuth = useAtomValue(getMemberAuthAtom)
  const currentEmail = memberAuth?.user.email ?? 'メールアドレス取得エラー'
  const methods = useForm<EditMailFormType>({
    resolver: zodResolver(editMailSchema),
    mode: 'all',
    defaultValues: {
      current_email: currentEmail,
      new_email: '',
      new_email_confirmation: '',
    },
  })

  const onSubmit = async (data: EditMailFormType) => {
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
                <p className='mt-4 ml-4 text-gray-500'>
                  {currentEmail}
                </p>
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
                setShowModal(false)
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
