'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// import { registerAction } from '@/app/guest/register/_lib/action'
import { FiAlertTriangle } from 'react-icons/fi'
import { IoIosSend } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import { BasicButton } from '@/components/ui/button/BasicButton'
import { CustomModal } from '@/components/ui/modal/CustomModal'
import {
  provRegisterSchema,
  type ProvRegisterFormType,
} from '@/app/guest/provisional-register/_schemas/prov-register-schema'
import { Input } from '@/components/form/rhf/Input'

export const ProvRegisterForm = () => {
  const [showModal, setShowModal] = useState(false)

  const methods = useForm<ProvRegisterFormType>({
    resolver: zodResolver(provRegisterSchema),
    mode: 'all',
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ProvRegisterFormType) => {
    try {
      // const result = await registerAction(data)
      // if (result?.errors && result.status === 400) {
      //   Object.entries(result.errors).forEach(([field, messages]) => {
      //     methods.setError(field as keyof ProvRegisterFormType, {
      //       type: 'server',
      //       message: Array.isArray(messages) ? messages[0] : messages,
      //     })
      //   })
      // }
    } catch (error) {
      console.error('フォーム送信エラー:', error)
    }
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
            >
              はい
            </BasicButton>
          </div>
        </div>
      </CustomModal>
    </>
  )
}
