'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiAlertTriangle } from 'react-icons/fi'
import { IoArrowBack } from 'react-icons/io5'
import { BasicButton } from '@/components/ui/button/BasicButton'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter()

  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='text-center max-w-md mx-auto p-6'>
        <div className='mb-8'>
          <FiAlertTriangle
            size={80}
            className='mx-auto text-red-500 mb-4'
          />
          <h1 className='text-2xl font-bold text-gray-800 mb-4'>
            エラーが発生しました
          </h1>
          <p className='text-gray-600 mb-6'>
            {error.message || '予期しないエラーが発生しました。'}
          </p>
        </div>

        <div className='space-y-4'>
          <BasicButton
            type='button'
            buttonType='button'
            onClick={reset}
            variant='contained'
            color='pjYellow'
            outerClassName='w-full'
            innerClassName='w-full'
          >
            もう一度お試しください
          </BasicButton>

          <BasicButton
            type='button'
            buttonType='button'
            onClick={() => router.push('/')}
            variant='outlined'
            color='pjGray'
            outerClassName='w-full'
            innerClassName='w-full'
            leftIcon={<IoArrowBack size={20} />}
          >
            ホームに戻る
          </BasicButton>
        </div>
      </div>
    </div>
  )
}
