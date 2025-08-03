'use client'

import { useTransition } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/form/rhf/Input'
import { BasicButton } from '@/components/ui/button/BasicButton'
import { LoadingOverlay } from '@/components/ui/loading/LoadingOverlay'
import { loginAction } from '@/app/guest/login/_lib/action'
import { loginSchema, type LoginFormType } from '@/app/guest/login/_schemas/login-schema'
import { HTTP_STATUS } from '@/constants/api-status'

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition()

  const methods = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormType) => {
    startTransition(async () => {
      try {
        const result = await loginAction(data)

        if (result?.errors && result.status === HTTP_STATUS.BAD_REQUEST) {
          Object.entries(result.errors).forEach(([field, messages]) => {
            methods.setError(field as keyof LoginFormType, {
              type: 'server',
              message: Array.isArray(messages) ? messages[0] : messages,
            })
          })
        }
      } catch (error) {
        console.error('ログインエラー:', error)
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
            <p className='my-4 text-center text-xl font-bold'>ログイン</p>
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
              placeholder='パスワードを入力'
            />
            <div className='mt-16 flex justify-center'>
              <BasicButton
                type='button'
                buttonType='submit'
                variant='contained'
                color='pjGray'
                outerClassName='w-[30%]'
                innerClassName='w-full'
                disabled={isPending}
              >
                {isPending ? 'ログイン中...' : 'ログイン'}
              </BasicButton>
            </div>
          </form>
        </FormProvider>
      </div>

      <LoadingOverlay isVisible={isPending} message='ログイン処理中...' />
    </>
  )
}
