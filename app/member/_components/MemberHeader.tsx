import React from 'react'
import Image from 'next/image'

export const MemberHeader = () => {
  return (
    <header className='w-full bg-white border-b-3 pt-2 pb-1'>
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
