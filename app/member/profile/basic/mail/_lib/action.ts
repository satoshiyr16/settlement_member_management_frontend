'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { apiServer } from '@/lib/api/api-server'
import { EditMailFormType } from '@/app/member/profile/basic/mail/_schemas/edit-mail-schema'
import { HTTP_STATUS } from '@/constants/api-status'

export async function editMailAction(data: EditMailFormType) {
  const response = await apiServer.post('/api/member/profile/token', data)
  if (response.success) {
    revalidatePath('/member/profile/basic/mail')
    redirect('/member/profile/basic/mail/send-complete')
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
