import { atom } from 'jotai'
import { MasterDataType } from '@/app/_types/master-data'

export const masterDataAtom = atom<MasterDataType | null>(null)

export const setMasterDataAtom = atom(
  null,
  (_, set, newMasterData: MasterDataType) => {
    set(masterDataAtom, newMasterData)
  }
)
