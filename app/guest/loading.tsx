import { LoadingSpinner } from '@/components/ui/loading/LoadingSpinner'

export default function Loading() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <LoadingSpinner size='lg' />
    </div>
  )
}
