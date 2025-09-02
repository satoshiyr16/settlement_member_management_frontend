'use server'

import { apiServer } from '@/lib/api/api-server'
import { LoginFormType } from '@/app/guest/login/_schemas/login-schema'
import { HTTP_STATUS } from '@/constants/api-status'

export async function loginAction(data: LoginFormType) {
  const response = await apiServer.post('/api/member/login', data)

  if (response.errors && response.status === HTTP_STATUS.BAD_REQUEST) {
    return {
      success: false,
      status: response.status,
      errors: response.errors,
    }
  }

  throw new Error('ログインに失敗しました。もう一度お試しください。')
}
