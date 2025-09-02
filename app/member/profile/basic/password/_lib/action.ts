'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { apiServer } from '@/lib/api/api-server'
import { EditPasswordFormType } from '@/app/member/profile/basic/password/_schemas/schema'
import { HTTP_STATUS } from '@/constants/api-status'

export async function editPasswordAction(data: EditPasswordFormType) {
  const response = await apiServer.patch('/api/member/profile/password', data)

  if (response.success) {
    revalidatePath('/member/profile/basic/password')
    redirect('/member/profile/basic/password/complete')
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
