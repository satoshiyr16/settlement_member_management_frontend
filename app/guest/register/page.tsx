import React from 'react'
import { RegisterBase } from '@/app/guest/register/_components/RegisterBase'

export default function RegisterPage() {
  return (
    <div className='mt-4 mx-6'>
      <div className='mx-auto p-6 bg-white rounded-lg shadow-md border-2 border-black'>
        <h1 className='text-3xl font-bold text-center mb-6'>新規登録</h1>
        <RegisterBase />
      </div>
    </div>
  )
}
