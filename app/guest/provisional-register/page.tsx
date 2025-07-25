import React from 'react'
import { ProvRegisterForm } from '@/app/guest/provisional-register/_components/ProvRegisterForm'

export default function ProvisionalRegisterPage() {
  return (
    <div className='my-4 mx-6 flex justify-center items-center'>
      <div className='mt-30 p-6 bg-white rounded-lg shadow-md border-2 border-black'>
        <h1 className='text-3xl font-bold text-center mb-6'>仮登録</h1>
        <ProvRegisterForm />
      </div>
    </div>
  )
}
