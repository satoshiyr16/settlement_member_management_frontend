import { atom } from 'jotai'
import { MemberAuthType } from '@/app/member/_types/member-auth'

export const memberAuthAtom = atom<MemberAuthType | null>(null)

export const setMemberAuthAtom = atom(null, (_, set, newMemberAuth: MemberAuthType) => {
  set(memberAuthAtom, newMemberAuth)
})

export const getMemberAuthAtom = atom((get) => {
  const data = get(memberAuthAtom)
  return data
})
