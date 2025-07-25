import React from 'react'
import { GuestHeader } from '@/app/guest/_components/GuestHeader'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GuestHeader />
      <main className='mx-auto lg:max-w-7xl p-4 h-full'>{children}</main>
    </>
  )
}
