import React from 'react'
import { MemberHeader } from '@/app/member/_components/MemberHeader'
import { JotaiMemberDataProvider } from '@/app/member/_atoms/JotaiMemberDataProvider'
import { fetchMasterData } from '@/app/_lib/fetcher'
import { fetchMemberAuthInfo } from '@/app/member/_lib/fetcher'
import { SideBar } from '@/app/member/_components/SideBar'
import { FlashMessage } from '@/components/ui/message/FlashMessage'

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const masterData = await fetchMasterData()
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
            <JotaiMemberDataProvider
              initialMasterData={masterData}
              initialMemberAuthData={memberAuthData}
            >
              <FlashMessage />
              <div className='mx-auto p-6 bg-[#f5f5f5] rounded-sm min-h-[800px]'>
                {children}
              </div>
            </JotaiMemberDataProvider>
          </main>
        </div>
      </div>
    </>
  )
}
