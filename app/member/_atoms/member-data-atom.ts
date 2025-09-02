import { atom } from 'jotai'
import { MemberAuthType } from '@/app/member/_types/member-auth'

const memberAuthAtom = atom<MemberAuthType | null>(null)

export const setMemberAuthAtom = atom(null, (_, set, newMemberAuth: MemberAuthType) => {
  set(memberAuthAtom, newMemberAuth)
})

export const getMemberAuthAtom = atom((get) => {
  const data = get(memberAuthAtom)
  return data
})

export const updateMemberAuthAtom = atom(
  null,
  (_, set, updates: Partial<MemberAuthType['member']>) => {
    set(memberAuthAtom, (prev) => {
      if (!prev) return prev

      return {
        ...prev,
        member: {
          ...prev.member,
          ...updates,
        },
      }
    })
  }
)
