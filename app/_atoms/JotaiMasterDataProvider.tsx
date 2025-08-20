'use client'

import { Provider } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { setMasterDataAtom } from '@/app/_atoms/master-data-atom'
import { MasterDataType } from '@/types/master-data'

interface JotaiMasterDataProviderProps {
  initialMasterData: MasterDataType
  children: React.ReactNode
}

export function JotaiMasterDataProvider({
  initialMasterData,
  children,
}: JotaiMasterDataProviderProps) {
  return (
    <Provider>
      <HydratedAtoms initialMasterData={initialMasterData}>{children}</HydratedAtoms>
    </Provider>
  )
}

function HydratedAtoms({
  initialMasterData,
  children,
}: {
  initialMasterData: MasterDataType
  children: React.ReactNode
}) {
  useHydrateAtoms([[setMasterDataAtom, initialMasterData]])
  return <>{children}</>
}
