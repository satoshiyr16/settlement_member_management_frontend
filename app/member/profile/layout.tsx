import { MainTitle } from '@/app/member/_components/MainTitle'

export default async function MemberProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=''>
      <MainTitle title='PROFILE' subTitle='登録内容' />
      {children}
    </div>
  )
}
