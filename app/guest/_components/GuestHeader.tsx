import React from 'react'
import Image from 'next/image'

export const GuestHeader = () => {
  return (
    <header className='w-full bg-white border-b-3 py-2'>
      <div className='max-w-[1500px] mx-auto flex justify-between items-center'>
        <div className='relative w-[20%] h-20'>
          <Image
            src='/images/header-logo.png'
            alt='ヘッダーロゴ'
            fill
            className='object-contain'
          />
        </div>
        <div>ボタン</div>
      </div>
    </header>
  )
}
