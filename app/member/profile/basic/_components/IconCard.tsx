import Link from 'next/link'

interface IconCardProps {
  icon: React.ReactNode
  title: string
  href: string
}

export const IconCard = ({ icon, title, href }: IconCardProps) => {
  return (
    <div className='border-2 border-black rounded-md px-4 py-2 group cursor-pointer hover:scale-102 transition-all duration-300'>
      <Link href={href} className='w-full flex flex-col justify-between h-full'>
        {icon}
        <h3 className='text-center text-lg font-bold text-black mt-8'>{title}</h3>
        <div className='mt-3 text-right'>
          <span className='text-lg text-pjGray font-bold group-hover:text-black transition-all duration-300'>
            →
          </span>
        </div>
      </Link>
    </div>
  )
}
