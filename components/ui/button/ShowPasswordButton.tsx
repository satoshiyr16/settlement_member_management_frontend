import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface ShowPasswordButtonProps {
  showPassword: boolean
  onClick: () => void
}

export const ShowPasswordButton = ({
  showPassword,
  onClick,
}: ShowPasswordButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='cursor-pointer underline hover:no-underline flex items-center'
    >
      {showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
      <span className='ml-2'>
        {showPassword ? 'パスワードを非表示にする' : 'パスワードを表示する'}
      </span>
    </button>
  )
}
