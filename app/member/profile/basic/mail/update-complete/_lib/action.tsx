'server-only'

import { apiServer } from '@/lib/api/api-server'
import { HTTP_STATUS } from '@/constants/api-status'

export async function validateToken(token: string, email: string) {
  const response = await apiServer.patch<{ email: string }>(
    `/api/member/profile/mail`,
    {
      token,
      email,
    }
  )
  
  if (response.success) {
    return {
      success: true,
      status: response.status,
    }
  }

  if (!response.success && response.status === HTTP_STATUS.UNPROCESSABLE_ENTITY) {
    return {
      success: false,
      status: response.status,
      errors: response.errors,
    }
  }

  throw new Error('メールアドレスの変更に失敗しました。')
}
