'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { apiBase } from '@/lib/api/api-base'
import { ProvRegisterFormType } from '@/app/guest/provisional-register/_schemas/prov-register-schema'
import { HTTP_STATUS } from '@/constants/api-status'

export async function provRegisterAction(data: ProvRegisterFormType) {
  const response = await apiBase.post('/api/member/provisional-register', data)
  if (response.success) {
    revalidatePath('/guest/provisional-register')
    redirect('/guest/provisional-register/complete')
  }

  if (response.errors && response.status === HTTP_STATUS.BAD_REQUEST) {
    return {
      success: false,
      status: response.status,
      errors: response.errors,
    }
  }

  throw new Error(`仮登録に失敗しました。もう一度お試しください。`)
}
