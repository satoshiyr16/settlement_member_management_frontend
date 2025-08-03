import { redirect } from 'next/navigation'
import { RegisterBase } from '@/app/guest/register/_components/RegisterBase'
import { validateToken } from '@/app/guest/register/_lib/fetcher'

interface SearchParams {
  token?: string
  email?: string
}

interface RegisterPageProps {
  searchParams: Promise<SearchParams>
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams
  const token = params.token as string
  const email = params.email as string

  if (!token || !email) {
    throw new Error('エラーが発生しました。')
  }

  const isValid = await validateToken(token, email)
  if (!isValid?.success) {
    redirect('/guest/provisional-register')
  }

  return (
    <div className='mt-4 mx-6'>
      <div className='mx-auto p-6 bg-white rounded-lg shadow-md border-2 border-black'>
        <h1 className='text-3xl font-bold text-center mb-6'>新規登録</h1>
        <RegisterBase email={email} />
      </div>
    </div>
  )
}
