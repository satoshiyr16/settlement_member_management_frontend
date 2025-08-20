'server-only'

import { redirect } from 'next/navigation'
import { apiServer } from '@/lib/api/api-server'
import { HTTP_STATUS } from '@/constants/api-status'
import { MemberAuthType } from '@/app/member/_types/member-auth'

export async function fetchMemberAuthInfo() {
  const memberAuthInfo = await apiServer.get<MemberAuthType>('/api/member/auth', {
    cache: 'no-store',
  })

  if (memberAuthInfo.success && memberAuthInfo.data) {
    return memberAuthInfo.data
  }

  if (memberAuthInfo.errors && memberAuthInfo.status === HTTP_STATUS.UNAUTHORIZED) {
    return redirect('/guest/login')
  }

  throw new Error(`メンバー認証情報の取得に失敗しました。`)
}
