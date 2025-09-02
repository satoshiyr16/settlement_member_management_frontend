import { FiAlertTriangle } from 'react-icons/fi'

export default async function MailEditSendCompletePage() {
  return (
    <div className='mt-30 p-10 rounded-lg shadow-md border-2 border-black'>
      <h1 className='text-3xl font-bold text-center mb-6'>メールアドレス送信完了</h1>
      <div className='mt-20 text-lg mb-16'>
        <p className='mb-4'>新しいメールアドレスに確認メールを送信しました。</p>
        <p className='mb-2'>
          お届けしたメール内のURLをクリックしてメールアドレス変更を続けてください。
        </p>
      </div>

      <div className='flex items-center mt-20'>
        <FiAlertTriangle size={40} style={{ color: 'var(--color-pjOrange)' }} />
        <div>
          <p className='ml-4'>
            メールに記載された登録URLの有効期限は24時間です。有効期限が切れた場合は再度メールアドレスの入力を行ってください。
          </p>
          <p className='ml-4'>
            ドメイン設定により、受信が拒否されている場合があります。
            「@xxxxxxx.jp」からのメールが受信できるようご設定ください。
          </p>
          <p className='ml-4'>
            届いていない場合は、迷惑メールフォルダーをご確認ください。
          </p>
        </div>
      </div>
    </div>
  )
}
