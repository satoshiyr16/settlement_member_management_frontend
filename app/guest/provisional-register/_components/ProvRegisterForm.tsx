'use client'

import { useState, useTransition } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiAlertTriangle } from 'react-icons/fi'
import { IoIosSend } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import { BasicButton } from '@/components/ui/button/BasicButton'
import { CustomModal } from '@/components/ui/modal/CustomModal'
import { LoadingOverlay } from '@/components/ui/loading/LoadingOverlay'
import { Input } from '@/components/form/rhf/Input'
import { provRegisterAction } from '@/app/guest/provisional-register/_lib/action'
import {
  provRegisterSchema,
  type ProvRegisterFormType,
} from '@/app/guest/provisional-register/_schemas/prov-register-schema'
import { HTTP_STATUS } from '@/constants/api-status'

export const ProvRegisterForm = () => {
  const [isPending, startTransition] = useTransition()
  const [showModal, setShowModal] = useState(false)

  const methods = useForm<ProvRegisterFormType>({
    resolver: zodResolver(provRegisterSchema),
    mode: 'all',
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ProvRegisterFormType) => {
    setShowModal(false)
    startTransition(async () => {
      const result = await provRegisterAction(data)

      if (result?.errors && result.status === HTTP_STATUS.BAD_REQUEST) {
        Object.entries(result.errors).forEach(([field, messages]) => {
          methods.setError(field as keyof ProvRegisterFormType, {
            type: 'server',
            message: Array.isArray(messages) ? messages[0] : messages,
          })
        })
      }
    })
  }

  return (
    <>
      <div className=''>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className='w-[80%] mx-auto min-h-[30vh] flex flex-col justify-center'
          >
            <p className='my-4 text-center text-xl font-bold'>
              メールアドレスを登録して仮登録を完了します。
            </p>
            <Input
              name='email'
              label='メールアドレス'
              inputType='email'
              placeholder='example@example.com'
            />
            <div className='flex items-center mt-20'>
              <FiAlertTriangle size={40} style={{ color: 'var(--color-pjOrange)' }} />
              <div>
                <p className='ml-4 '>
                  ドメイン設定により、受信が拒否されている場合があります。
                  「@xxxxxxx.jp」からのメールが受信できるようご設定ください。
                </p>
                <p className='ml-4 '>
                  届いていない場合は、迷惑メールフォルダーをご確認ください。
                </p>
              </div>
            </div>
            <div className='mt-16 flex justify-center'>
              <BasicButton
                type='button'
                buttonType='button'
                onClick={() => {
                  methods.trigger()
                  if (methods.formState.isValid) {
                    setShowModal(true)
                  }
                }}
                variant='contained'
                color='pjGray'
                outerClassName='w-[30%]'
                innerClassName='w-full'
                rightIcon={<IoIosSend size={28} />}
                disabled={isPending}
              >
                送信する
              </BasicButton>
            </div>
          </form>
        </FormProvider>
      </div>
      <CustomModal showModal={showModal} closeModal={() => setShowModal(false)}>
        <div className='w-[80%] mx-auto'>
          <p className='text-2xl font-bold'>この内容で送信しますか？</p>
          <div className='mt-20 flex justify-center items-center gap-20'>
            <BasicButton
              type='button'
              buttonType='button'
              onClick={() => setShowModal(false)}
              color='pjGray'
              variant='outlined'
              outerClassName='w-[30%]'
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
              color='pjYellow'
              variant='contained'
              outerClassName='w-[30%]'
              innerClassName='w-full'
              disabled={isPending}
            >
              はい
            </BasicButton>
          </div>
        </div>
      </CustomModal>
      <LoadingOverlay isVisible={isPending} message='仮登録処理中...' />
    </>
  )
}
