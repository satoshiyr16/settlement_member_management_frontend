import { FiCheckCircle } from 'react-icons/fi'

export default async function PasswordEditCompletePage() {
  return (
    <div className='mt-10 p-10 rounded-lg shadow-md border-2 border-black'>
      <h1 className='text-3xl font-bold text-center mb-6'>パスワード変更完了</h1>
      <div className='flex flex-col items-center justify-center mt-20'>
        <FiCheckCircle size={120} style={{ color: 'var(--color-pjOrange)' }} />
        <p className='text-2xl font-bold mt-4'>完了</p>
      </div>
      <div className='mt-20 text-lg mb-16'>
        <p className='mb-1'>パスワードを変更しました。</p>
      </div>
    </div>
  )
}
