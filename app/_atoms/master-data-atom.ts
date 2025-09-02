import { atom } from 'jotai'
import { MasterDataType } from '@/types/master-data'

export const masterDataAtom = atom<MasterDataType | null>(null)

export const setMasterDataAtom = atom(null, (_, set, newMasterData: MasterDataType) => {
  set(masterDataAtom, newMasterData)
})

export const getMasterDataAtom = atom((get) => {
  const data = get(masterDataAtom)
  return data
})
