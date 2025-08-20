'use client'

import { Provider } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { setMemberAuthAtom } from '@/app/member/_atoms/member-data-atom'
import { MemberAuthType } from '@/app/member/_types/member-auth'

interface JotaiMemberDataProviderProps {
  initialMemberAuthData: MemberAuthType
  children: React.ReactNode
}

export function JotaiMemberDataProvider({
  initialMemberAuthData,
  children,
}: JotaiMemberDataProviderProps) {

  return (
    <Provider>
      <HydratedAtoms initialMemberAuthData={initialMemberAuthData}>
        {children}
      </HydratedAtoms>
    </Provider>
  )
}

function HydratedAtoms({
  initialMemberAuthData,
  children
}: {
  initialMemberAuthData: MemberAuthType
  children: React.ReactNode
}) {
  useHydrateAtoms([[setMemberAuthAtom, initialMemberAuthData]])
  return <>{children}</>
}
