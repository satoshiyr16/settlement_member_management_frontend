'use client'

import { Provider } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { setMasterDataAtom } from '@/app/_atoms/master-data-atom'
import { MasterDataType } from '@/app/_types/master-data'

interface JotaiMasterDataProviderProps {
  initialMasterData: MasterDataType
  children: React.ReactNode
}

export function JotaiMasterDataProvider({
  initialMasterData,
  children,
}: JotaiMasterDataProviderProps) {
  useHydrateAtoms([[setMasterDataAtom, initialMasterData]])

  return <Provider>{children}</Provider>
}
