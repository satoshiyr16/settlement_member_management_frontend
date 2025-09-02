'server-only'

import { redirect } from 'next/navigation'
import { apiServer } from '@/lib/api/api-server'
import { HTTP_STATUS } from '@/constants/api-status'

export async function fetchMemberAuthCheck() {
  const memberAuthInfo = await apiServer.get<null>('/api/member/auth', {
    cache: 'no-store'
  })

  if (memberAuthInfo.success && memberAuthInfo.data) {
    redirect('/member')
  }

  if (!memberAuthInfo.success && memberAuthInfo.status === HTTP_STATUS.UNAUTHORIZED) {
    return null
  }

  throw new Error(`メンバー認証の確認に失敗しました。`)
}
