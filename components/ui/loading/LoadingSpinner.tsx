export const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div className='flex justify-center items-center h-full w-full'>
      <div
        className={`animate-spin border-4 border-blue-500 rounded-full border-t-transparent ${sizeClasses[size]}`}
      ></div>
    </div>
  )
}
