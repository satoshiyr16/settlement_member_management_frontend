'use client'

import { Provider } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { setMasterDataAtom } from '@/app/_atoms/master-data-atom'
import { setMemberAuthAtom } from '@/app/member/_atoms/member-data-atom'
import { MasterDataType } from '@/types/master-data'
import { MemberAuthType } from '@/app/member/_types/member-auth'

interface JotaiMemberDataProviderProps {
  initialMasterData: MasterDataType
  initialMemberAuthData: MemberAuthType
  children: React.ReactNode
}

export function JotaiMemberDataProvider({
  initialMasterData,
  initialMemberAuthData,
  children,
}: JotaiMemberDataProviderProps) {
  return (
    <Provider>
      <HydratedAtoms
        initialMasterData={initialMasterData}
        initialMemberAuthData={initialMemberAuthData}
      >
        {children}
      </HydratedAtoms>
    </Provider>
  )
}

function HydratedAtoms({
  initialMasterData,
  initialMemberAuthData,
  children,
}: {
  initialMasterData: MasterDataType
  initialMemberAuthData: MemberAuthType
  children: React.ReactNode
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const atomsToHydrate: [any, any][] = [[setMasterDataAtom, initialMasterData]]

  if (initialMemberAuthData) {
    atomsToHydrate.push([setMemberAuthAtom, initialMemberAuthData])
  }

  useHydrateAtoms(atomsToHydrate)
  return <>{children}</>
}
