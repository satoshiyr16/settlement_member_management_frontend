import React from 'react'
import Link from 'next/link'
import { ColorOptionTypes } from '@/types/color'

interface KeyValue {
  key: string
  value: string
}

interface MemberCardProps {
  title: string
  subTitle: string
  profiles: KeyValue[]
  href: string
  color: ColorOptionTypes
}

export const MemberCard = ({
  title,
  subTitle,
  profiles,
  href,
  color,
}: MemberCardProps) => {
  return (
    <div className='bg-white rounded-lg p-4 border-2 border-black w-full shadow-md shadow-gray-300 hover:scale-102 transition-all duration-300 cursor-pointer group'>
      <Link href={href}>
        <div className='flex flex-col justify-between h-full'>
          <div className={`py-8 bg-${color} rounded-md`}>
            <h2 className='text-xl font-bold text-center text-black underline'>
              {title}
            </h2>
            <p className='text-center text-sm text-black mt-1'>{subTitle}</p>
          </div>
          <div className='py-4 mt-10'>
            <div className='flex flex-col gap-4'>
              {profiles.map((profile, index) => (
                <div className='flex flex-col gap-2 pb-2' key={index}>
                  <p className='text-sm font-bold ml-4'>{profile.key}</p>
                  <p className='text-center'>{profile.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='mt-3 text-right'>
            <span className='text-lg text-pjGray font-bold group-hover:text-black transition-all duration-300'>
              →
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
