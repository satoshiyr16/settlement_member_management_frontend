import { SubTitleCard } from '@/app/member/profile/_components/SubTitleCard'
import { MailEditForm } from '@/app/member/profile/basic/mail-edit/_components/MailEditForm'

export default function BasicMailEditPage() {
  return (
    <div className=''>
      <SubTitleCard title='BASIC' subTitle='基本情報 変更' color='pjSoftBlue' />
      <div>
        <MailEditForm email='test@example.com' />
      </div>
    </div>
  )
}
