import React from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa'
import { BasicButton } from '@/components/ui/button/BasicButton'

export default function ProvisionalRegisterCompletePage() {
  return (
    <div className='my-4 mx-6 flex justify-center items-center min-w-[60%]'>
      <div className='mt-30 py-6 px-10 bg-white rounded-lg shadow-md border-2 border-black w-[70%]'>
        <h1 className='text-3xl font-bold text-center mb-6'>本登録完了</h1>
        <div className='flex justify-center items-center mt-10'>
          <FaRegCheckCircle size={100} style={{ color: 'var(--color-pjLightGreen)' }} />
        </div>
        <div className='mt-20 text-lg mb-16'>
          <p className='mb-4'>本登録ありがとうございます。</p>
          <p>ログイン画面へ移動し、ログインしてください。</p>
        </div>

        <div className='mt-20 flex justify-center'>
          <BasicButton
            type='link'
            href='/guest/login'
            variant='outlined'
            outerClassName='w-[30%]'
            innerClassName='w-full'
            rightIcon={<FaArrowRight size={20} />}
          >
            ログイン画面へ
          </BasicButton>
        </div>
      </div>
    </div>
  )
}
