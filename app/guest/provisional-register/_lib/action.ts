'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { apiBase } from '@/lib/api/api-base'
import { RegisterFormType } from '@/app/guest/register/_schemas/register-schema'
import { HTTP_STATUS } from '@/constants/api-status'

export async function registerAction(data: RegisterFormType) {
  try {
    const response = await apiBase.post('/api/member/provisional-register', data)
    if (response.success) {
      revalidatePath('/guest/register')
      redirect('/guest/login')
    }

    if (response.errors && response.status === HTTP_STATUS.BAD_REQUEST) {
      return {
        success: false,
        status: response.status,
        errors: response.errors,
      }
    }
  } catch {
    return {
      error: '登録に失敗しました。もう一度お試しください。',
    }
  }
}
