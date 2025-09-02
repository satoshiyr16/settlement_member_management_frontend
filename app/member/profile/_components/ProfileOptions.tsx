'use client'

import { useAtomValue } from 'jotai'
import { MemberCard } from '@/app/member/profile/_components/MemberCard'
import { masterDataAtom } from '@/app/_atoms/master-data-atom'
import { getMemberAuthAtom } from '@/app/member/_atoms/member-data-atom'

export const ProfileOptions = () => {
  const masterData = useAtomValue(masterDataAtom)
  const memberAuth = useAtomValue(getMemberAuthAtom)
  const gender = masterData?.genders.find(
    (gender) => gender.value === memberAuth?.member.gender,
  )

  return (
    <div className='w-[90%] mx-auto mt-20'>
      <div className='grid grid-cols-2 gap-20'>
        <MemberCard
          title='BASIC'
          subTitle='基本情報 変更'
          profiles={[
            {
              key: 'メールアドレス',
              value: memberAuth?.user.email ?? 'メールアドレス取得エラー',
            },
            { key: 'パスワード', value: '********' },
          ]}
          href='/member/profile/basic'
          color='pjSoftBlue'
        />
        <MemberCard
          title='PROFILE'
          subTitle='プロフィール 変更'
          profiles={[
            { key: 'ニックネーム', value: memberAuth?.member.nickname ?? '名前取得エラー' },
            { key: '誕生日', value: memberAuth?.member.birth_date ?? '誕生日取得エラー' },
            { key: '性別', value: gender?.label ?? '性別取得エラー' },
          ]}
          href='/member/profile/edit'
          color='pjSoftYellow'
        />
      </div>
    </div>
  )
}
