import React from 'react'
import { GuestHeader } from '@/app/guest/_components/GuestHeader'
import { JotaiMemberDataProvider } from '@/app/member/_atoms/JotaiMemberDataProvider'
import { fetchMemberAuthInfo } from '@/app/member/_lib/fetcher'

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const memberAuthData = await fetchMemberAuthInfo()

  return (
    <>
      <GuestHeader />
      <div className='mx-auto lg:max-w-7xl p-4 h-full'>
        <div>パンクズリスト</div>
        <div className='flex justify-between'>
          <aside className='w-[20%]'>サイドバー</aside>
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
