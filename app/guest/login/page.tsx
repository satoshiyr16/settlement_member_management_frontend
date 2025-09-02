import { LoginForm } from '@/app/guest/login/_components/LoginForm'
import { fetchMemberAuthCheck } from '@/app/guest/login/_lib/fetcher'

export default async function LoginPage() {
  await fetchMemberAuthCheck()

  return (
    <div className='mt-4 mx-6'>
      <div className='mx-auto p-6 bg-white rounded-lg shadow-md border-2 border-black'>
        <h1 className='text-3xl font-bold text-center mb-6'>ログイン</h1>
        <LoginForm />
      </div>
    </div>
  )
}
