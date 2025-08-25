import { MemberCard } from '@/app/member/profile/_components/MemberCard'

export default function ProfilePage() {
  return (
    <div className='w-[90%] mx-auto mt-20'>
      <div className='grid grid-cols-2 gap-20'>
        <MemberCard
          title='BASIC'
          subTitle='基本情報 変更'
          profiles={[
            { key: 'メールアドレス', value: 'test@example.com' },
            { key: 'パスワード', value: '********' },
          ]}
          href='/member/profile/basic'
          color='pjSoftBlue'
        />
        <MemberCard
          title='PROFILE'
          subTitle='プロフィール 変更'
          profiles={[
            { key: '名前', value: '山田 太郎' },
            { key: '誕生日', value: '1990/01/01' },
            { key: '性別', value: '男性' },
          ]}
          href='/member/profile/edit'
          color='pjSoftYellow'
        />
      </div>
    </div>
  )
}
