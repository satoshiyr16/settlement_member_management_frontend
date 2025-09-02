import { FiCheckCircle } from 'react-icons/fi'
import { validateToken } from '@/app/member/profile/basic/mail/update-complete/_lib/action'

interface SearchParams {
  token?: string
  email?: string
}
interface UpdateCompletePageProps {
  searchParams: Promise<SearchParams>
}
export default async function MailEditUpdateCompletePage({
  searchParams,
}: UpdateCompletePageProps) {
  const params = await searchParams
  const token = params.token as string
  const email = params.email as string

  if (!token || !email) {
    throw new Error('エラーが発生しました。')
  }

  const isValid = await validateToken(token, email)
  if (!isValid?.success) {
    return (
      <div className='mt-10 p-10 rounded-lg shadow-md border-2 border-black'>
        <h1 className='text-3xl font-bold text-center text-red-500 mb-6'>
          メールアドレスを変更できませんでした
        </h1>
        <div className='mt-20 text-lg mb-16'>
          <p className='mb-4'>
            メールアドレスの変更に失敗しました。以下の原因が考えられます。
          </p>
          <p className='text-sm mb-2'>・有効期限が切れている</p>
          <p className='text-sm mb-2'>・すでに変更されている</p>
          <p className='text-sm mb-2'>・変更後に再度リロードを行った</p>
        </div>
        <p className='mt-6'>
          変更されているか確認し、変更されていない場合はお手数ですが、再度メールアドレスの変更を行ってください。
        </p>
      </div>
    )
  }

  return (
    <div className='mt-30 p-10 rounded-lg shadow-md border-2 border-black'>
      <h1 className='text-3xl font-bold text-center mb-6'>メールアドレス変更完了</h1>
      <div className='flex flex-col items-center justify-center mt-10'>
        <FiCheckCircle size={120} style={{ color: 'var(--color-pjOrange)' }} />
        <p className='text-2xl font-bold mt-4'>完了</p>
      </div>
      <div className='mt-20 text-lg mb-16'>
        <p className='mb-1'>メールアドレスを変更しました。</p>
        <p className='mb-4'>プロフィール画面からご確認ください。</p>
      </div>
    </div>
  )
}
