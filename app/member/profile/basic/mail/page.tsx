import { SubTitleCard } from '@/app/member/profile/_components/SubTitleCard'
import { MailEditForm } from '@/app/member/profile/basic/mail/_components/MailEditForm'

export default function BasicMailPage() {
  return (
    <>
      <SubTitleCard title='BASIC' subTitle='基本情報 変更' color='pjSoftBlue' />
      <MailEditForm />
    </>
  )
}
