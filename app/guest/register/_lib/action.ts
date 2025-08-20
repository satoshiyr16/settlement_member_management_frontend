'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { apiServer } from '@/lib/api/api-server'
import { RegisterFormType } from '@/app/guest/register/_schemas/register-schema'
import { HTTP_STATUS } from '@/constants/api-status'

export async function registerAction(data: RegisterFormType) {
  const response = await apiServer.post('/api/member/register', data)

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

  throw new Error(`登録に失敗しました。もう一度お試しください。`)
}
