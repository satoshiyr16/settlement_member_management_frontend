import React from 'react'
import { GuestHeader } from '@/app/guest/_components/GuestHeader'
import { JotaiMemberDataProvider } from '@/app/member/_atoms/JotaiMemberDataProvider'
import { fetchMemberAuthInfo } from '@/app/member/_lib/fetcher'
import { SideBar } from '@/app/member/_components/SideBar'

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const memberAuthData = await fetchMemberAuthInfo()

  return (
    <>
      <GuestHeader />
      <div className='mx-auto lg:max-w-7xl p-4 h-full'>
        <div>パンクズリスト</div>
        <div className='flex justify-between mt-2'>
          <div className='w-[20%]'>
            <SideBar />
          </div>
          <main className='w-[80%]'>
            <JotaiMemberDataProvider initialMemberAuthData={memberAuthData}>
              {children}
            </JotaiMemberDataProvider>
          </main>
        </div>
      </div>
    </>
  )
}
