import { TbMailCog } from 'react-icons/tb'
import { RiLockPasswordFill } from 'react-icons/ri'
import { IconCard } from '@/app/member/profile/basic/_components/IconCard'
import { SubTitleCard } from '@/app/member/profile/_components/SubTitleCard'

export default function BasicPage() {
  return (
    <div className=''>
      <SubTitleCard title='BASIC' subTitle='基本情報 変更' color='pjSoftBlue' />
      <div className='grid grid-cols-2 gap-20 mt-10'>
        <IconCard
          icon={
            <TbMailCog
              size={250}
              className='group-hover:animate-[spin_0.5s_ease-in-out] transition-transform duration-500 mx-auto'
            />
          }
          title='メールアドレス変更'
          href='/member/profile/basic/mail-edit'
        />
        <IconCard
          icon={
            <RiLockPasswordFill
              size={230}
              className='group-hover:animate-[spin_0.5s_ease-in-out] transition-transform duration-500 mx-auto'
            />
          }
          title='パスワード変更'
          href='/member/profile/basic/password-edit'
        />
      </div>
    </div>
  )
}
