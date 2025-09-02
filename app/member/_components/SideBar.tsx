'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SideBarItem {
  label: string
  href: string
  bgColor: string
  borderColor: string
  hover: string
  active: string
}

const SIDE_BAR_ITEMS: SideBarItem[] = [
  {
    label: 'HOME',
    href: '/member',
    bgColor: 'bg-pjGray',
    borderColor: 'border-pjGray',
    hover: 'hover:bg-pjSoftGray',
    active: 'bg-pjSoftGray',
  },
  {
    label: 'PROFILE',
    href: '/member/profile',
    bgColor: 'bg-pjYellow',
    borderColor: 'border-pjYellow',
    hover: 'hover:bg-pjSoftYellow',
    active: 'bg-pjSoftYellow',
  },
  {
    label: 'LEARNING PLAN',
    href: '/member/learning-plan',
    bgColor: 'bg-pjBlue',
    borderColor: 'border-pjBlue',
    hover: 'hover:bg-pjSoftBlue',
    active: 'bg-pjSoftBlue',
  },
]

export function SideBar() {
  const pathname = usePathname()
  const normalizePathname = (pathname: string) => {
    return pathname.endsWith('/') ? pathname : `${pathname}/`
  }
  const currentPath = normalizePathname(pathname)

  const isActivePath = (itemPath: string, currentPath: string) => {
    const normalizedItemPath = normalizePathname(itemPath.split('?')[0])
    const normalizedCurrentPath = normalizePathname(currentPath.split('?')[0])

    if (itemPath === '/member') {
      return normalizedCurrentPath === '/member/'
    }

    return normalizedCurrentPath.startsWith(normalizedItemPath)
  }

  return (
    <aside className='min-h-[300px] w-[225px] sticky top-10'>
      <ul className='flex flex-col gap-4'>
        {SIDE_BAR_ITEMS.map((item, index) => {
          const isActive = isActivePath(item.href, currentPath)
          return (
            <li
              className={`shadow-md shadow-gray-300 text-sm cursor-pointer rounded-b-sm block border-t-3 text-start flex-grow  ${
                isActive ? 'bg-pjSoftGray' : 'hover:bg-pjSoftGray bg-white border-pjGray'
              }`}
              key={index}
            >
              <Link
                href={item.href}
                className='p-3 relative flex items-center flex-row gap-0 px-3 py-4'
              >
                <span
                  className={`w-2 h-2 rounded-full mr-3 ${isActive ? 'bg-black' : 'bg-pjGray/50'}`}
                ></span>
                <span
                  className={`flex justify-center h-full items-center font-bold ${isActive ? 'text-black text-md' : 'text-black/80'}`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
