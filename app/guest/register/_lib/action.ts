'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { apiBase } from '@/lib/api/api-base'
import { RegisterFormType } from '@/app/guest/register/_schemas/schema'

// interface RegisterResponse {
//   message: string
//   errors: {
//     [key: string]: string[]
//   }
// }

export async function registerAction(data: RegisterFormType) {
  try {
    const response = await apiBase.post('/api/member/register', data)
    if (response.success) {
      revalidatePath('/guest/register')
      redirect('/guest/login')
    }

    if (response.errors && response.status === 400) {
      return {
        success: false,
        status: response.status,
        errors: response.errors,
      }
    }
  } catch {
    return {
      error: '登録に失敗しました。もう一度お試しください。'
    }
  }
}
