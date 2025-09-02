'use server'

import { revalidatePath } from 'next/cache'
import { apiServer } from '@/lib/api/api-server'
import { EditProfileFormType } from '@/app/member/profile/edit/_schemas/edit-profile-schema'
import { HTTP_STATUS } from '@/constants/api-status'
import { MemberEntityType } from '@/types/entity'

export async function editProfileAction(data: EditProfileFormType) {
  const response = await apiServer.put<MemberEntityType>('/api/member/profile', data)
  if (response.success) {
    revalidatePath('/member/profile/edit')
    
    return {
      success: true,
      data: response.data,
      status: response.status,
    }
  }

  if (response.errors && response.status === HTTP_STATUS.BAD_REQUEST) {
    return {
      success: false,
      status: response.status,
      errors: response.errors,
    }
  }

  throw new Error(`変更に失敗しました。もう一度お試しください。`)
}
