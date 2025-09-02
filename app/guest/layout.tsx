import React from 'react'
import { GuestHeader } from '@/app/guest/_components/GuestHeader'
import { fetchMasterData } from '@/app/_lib/fetcher'
import { JotaiGuestDataProvider } from '@/app/guest/_atoms/JotaiGuestDataProvider'

export default async function layout({ children }: { children: React.ReactNode }) {
  const masterData = await fetchMasterData()

  return (
    <>
      <GuestHeader />
      <main className='mx-auto lg:max-w-7xl p-4 h-full'>
        <JotaiGuestDataProvider initialMasterData={masterData}>
          {children}
        </JotaiGuestDataProvider>
      </main>
    </>
  )
}
