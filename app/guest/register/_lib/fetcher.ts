'server-only'

import { apiServer } from '@/lib/api/api-server'
import { HTTP_STATUS } from '@/constants/api-status'

export async function validateToken(token: string, email: string) {
  const response = await apiServer.get<{ email: string }>(
    `/api/member/validate-email-token`,
    {
      token,
      email,
    },
    {
      cache: 'no-store'
    }
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
}
