'server-only'

import { apiServer } from '@/lib/api/api-server'
import { MemberAuthType } from '@/app/member/_types/member-auth'

export async function fetchMemberAuthInfo() {
  const memberAuthInfo = await apiServer.get<MemberAuthType>('/api/member/auth', {
    cache: 'no-store',
  })

  if (memberAuthInfo.success && memberAuthInfo.data) {
    return memberAuthInfo.data
  }

  return {
    user: {
      user_id: 0,
      email: '',
      role: 0,
      suspended_at: '',
      created_at: '',
      updated_at: '',
    },
    member: {
      member_id: 0,
      nickname: '',
      gender: 0,
      birth_date: '',
      enrollment_date: '',
      created_at: '',
      updated_at: '',
    },
  }
}
