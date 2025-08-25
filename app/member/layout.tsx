import React from 'react'
import { MemberHeader } from '@/app/member/_components/MemberHeader'
import { JotaiMemberDataProvider } from '@/app/member/_atoms/JotaiMemberDataProvider'
import { fetchMemberAuthInfo } from '@/app/member/_lib/fetcher'
import { SideBar } from '@/app/member/_components/SideBar'

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const memberAuthData = await fetchMemberAuthInfo()

  return (
    <>
      <MemberHeader />
      <div className='mx-auto lg:max-w-[1500px] py-4 h-full'>
        <div>パンクズリスト</div>
        <div className='flex justify-between mt-2'>
          <div className='w-[20%]'>
            <SideBar />
          </div>
          <main className='w-[80%]'>
            <div className='mx-auto p-6 bg-[#f5f5f5] rounded-sm min-h-[800px]'>
              <JotaiMemberDataProvider initialMemberAuthData={memberAuthData}>
                {children}
              </JotaiMemberDataProvider>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
