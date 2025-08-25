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
    label: 'ホーム',
    href: '/member',
    bgColor: 'bg-pjGray',
    borderColor: 'border-pjGray',
    hover: 'hover:bg-pjSoftGray',
    active: 'bg-pjSoftGray',
  },
  {
    label: 'プロフィール変更',
    href: '/member/profile',
    bgColor: 'bg-pjYellow',
    borderColor: 'border-pjYellow',
    hover: 'hover:bg-pjSoftYellow',
    active: 'bg-pjSoftYellow',
  },
  {
    label: '学習プラン設定',
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
              className={`shadow-md shadow-gray-300 text-sm cursor-pointer block border-t-2 text-start flex-grow  ${
                isActive ? `${item.borderColor} ${item.active}` : `${item.hover} bg-white ${item.borderColor}`
              }`}
              key={index}
            >
              <Link
                href={item.href}
                className='lg:p-3 relative flex items-center lg:flex-row lg:gap-0 gap-2 flex-col px-1 py-2'
              >
                <span
                  className={`w-2 h-2 rounded-full mr-3 ${isActive ? `${item.bgColor}` : `${item.bgColor}`}`}
                ></span>
                <span
                  className={`flex justify-center h-full items-center ${isActive ? 'text-black' : 'text-black/60'}`}
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
