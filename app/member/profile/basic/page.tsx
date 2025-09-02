import { TbMailCog } from 'react-icons/tb'
import { RiLockPasswordFill } from 'react-icons/ri'
import { SubTitleCard } from '@/app/member/profile/_components/SubTitleCard'
import { IconCard } from '@/app/member/profile/basic/_components/IconCard'

export default function BasicPage() {
  return (
    <>
      <SubTitleCard title='BASIC' subTitle='基本情報 変更' color='pjSoftBlue' />
      <div className='grid grid-cols-2 gap-20 mt-20 w-[90%] mx-auto'>
        <IconCard
          icon={
            <TbMailCog
              size={200}
              className='group-hover:animate-[spin_0.5s_ease-in-out] transition-transform duration-500 mx-auto'
            />
          }
          title='メールアドレス変更'
          href='/member/profile/basic/mail'
        />
        <IconCard
          icon={
            <RiLockPasswordFill
              size={180}
              className='group-hover:animate-[spin_0.5s_ease-in-out] transition-transform duration-500 mx-auto'
            />
          }
          title='パスワード変更'
          href='/member/profile/basic/password'
        />
      </div>
    </>
  )
}
