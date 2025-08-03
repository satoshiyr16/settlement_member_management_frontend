'server-only'

import { apiBase } from '@/lib/api/api-base'
import { HTTP_STATUS } from '@/constants/api-status'

export async function validateToken(token: string, email: string) {
  const response = await apiBase.get<{ email: string }>(
    `/api/member/validate-email-token`,
    {
      token,
      email,
    },
  )
  if (response.success && response.data?.email) {
    return {
      success: true,
      status: response.status,
      data: response.data.email,
    }
  }

  if (response.errors && response.status === HTTP_STATUS.NOT_FOUND) {
    return {
      success: false,
      status: response.status,
      errors: response.errors,
    }
  }

  // throw new Error(`登録に失敗しました。もう一度お試しください。`)
}
