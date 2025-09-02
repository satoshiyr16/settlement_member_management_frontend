import { SubTitleCard } from '@/app/member/profile/_components/SubTitleCard'
import { PasswordEditForm } from '@/app/member/profile/basic/password/_components/PasswordEditForm'

export default function BasicPasswordPage() {
  return (
    <>
      <SubTitleCard title='BASIC' subTitle='基本情報 変更' color='pjSoftBlue' />
      <PasswordEditForm />
    </>
  )
}
