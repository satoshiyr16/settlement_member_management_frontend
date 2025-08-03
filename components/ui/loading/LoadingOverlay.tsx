import { LoadingSpinner } from '@/components/ui/loading/LoadingSpinner'

interface LoadingOverlayProps {
  isVisible: boolean
  message?: string
}

export const LoadingOverlay = ({
  isVisible,
  message = '処理中...',
}: LoadingOverlayProps) => {
  if (!isVisible) return null

  return (
    <div className='fixed inset-0 min-h-screen min-w-screen bg-opacity-10 flex items-center justify-center z-[9999]'>
      <div className='bg-white rounded-lg p-8 flex flex-col items-center space-y-4 shadow-lg'>
        <LoadingSpinner size='lg' />
        <p className='text-gray-600 font-medium'>{message}</p>
      </div>
    </div>
  )
}
