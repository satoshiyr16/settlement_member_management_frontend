import { SubTitleCard } from '@/app/member/profile/_components/SubTitleCard'
import { ProfileEditForm } from '@/app/member/profile/edit/_components/ProfileEditForm'

export default function ProfileEditPage() {
  return (
    <div className=''>
      <SubTitleCard title='PROFILE' subTitle='プロフィール 変更' color='pjSoftYellow' />
      <ProfileEditForm />
    </div>
  )
}
