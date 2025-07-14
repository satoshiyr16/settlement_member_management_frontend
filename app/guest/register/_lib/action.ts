'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { apiBase } from '@/lib/api/api-base'
import { RegisterFormType } from '@/app/guest/register/_schemas/schema'

interface RegisterResponse {
  message: string
  user: {
    id: string
    email: string
    name: string
  }
}

export async function registerAction(data: RegisterFormType) {
  try {
    const response = await apiBase.post<RegisterResponse>('/api/guest/register', data)

    // 成功時の処理
    revalidatePath('/guest/register')
    redirect('/guest/login') // または適切なページにリダイレクト

  } catch (error) {
    console.error('登録エラー:', error)
    return {
      error: '登録に失敗しました。もう一度お試しください。'
    }
  }
}
