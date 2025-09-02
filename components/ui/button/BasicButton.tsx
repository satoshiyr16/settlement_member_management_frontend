'use client'

import Image from 'next/image'
import Link from 'next/link'
// import { clsx } from 'clsx'
import React from 'react'
import { ColorOptionTypes, VariantOptionTypes } from '@/types/color'

interface BasicButtonProps {
  onClick?: () => void
  type: 'button' | 'link'
  buttonType?: 'button' | 'submit'
  href?: string
  variant?: VariantOptionTypes
  color?: ColorOptionTypes
  leftIcon?: React.ReactNode
  leftIconSrc?: string
  rightIcon?: React.ReactNode
  rightIconSrc?: string
  iconSize?: number
  children?: React.ReactNode
  outerClassName?: string
  innerClassName?: string
  disabled?: boolean
}

export function BasicButton({
  type,
  buttonType = 'button',
  href,
  color = 'pjGray',
  variant = 'contained',
  leftIcon,
  leftIconSrc,
  rightIcon,
  rightIconSrc,
  iconSize = 24,
  disabled,
  outerClassName,
  innerClassName,
  children,
  onClick,
}: BasicButtonProps) {
  const colorClasses: Record<ColorOptionTypes, Record<VariantOptionTypes, string>> = {
    pjGray: {
      contained:
        'bg-pjGray text-black hover:bg-pjGray/80 active:bg-pjGray/70 rounded border-2 border-black',
      outlined:
        'border-2 border-black text-black hover:bg-pjGray/10 active:bg-pjGray/20 rounded',
    },
    pjYellow: {
      contained:
        'bg-yellow-200 text-black hover:bg-yellow-200/80 active:bg-yellow-200/70 rounded border-2 border-black',
      outlined:
        'border-2 border-yellow-300 text-black hover:bg-yellow-300/10 active:bg-yellow-300/20 rounded',
    },
    pjRed: {
      contained:
        'bg-pjRed text-white hover:bg-pjRed/80 active:bg-pjRed/70 rounded border-2 border-black',
      outlined: '',
    },
    pjSoftBlue: {
      contained:
        'bg-pjSoftBlue text-black hover:bg-pjSoftBlue/80 active:bg-pjSoftBlue/70 rounded border-2 border-black',
      outlined:
        'border-2 border-pjSoftBlue text-black hover:bg-pjSoftBlue/10 active:bg-pjSoftBlue/20 rounded',
    },
    pjSoftYellow: {
      contained:
        'bg-pjSoftYellow text-black hover:bg-pjSoftYellow/80 active:bg-pjSoftYellow/70 rounded border-2 border-black',
      outlined:
        'border-2 border-pjSoftYellow text-black hover:bg-pjSoftYellow/10 active:bg-pjSoftYellow/20 rounded',
    },
    white: {
      contained:
        'bg-white text-black hover:bg-white/80 active:bg-white/70 rounded border-2 border-black',
      outlined:
        'border-2 border-white text-black hover:bg-white/10 active:bg-white/20 rounded',
    },
  }

  const selectedClasses =
    colorClasses[color]?.[variant || 'contained'] || colorClasses.pjGray.contained

  const buttonContent = (
    <>
      {leftIcon || leftIconSrc ? (
        <span className='flex items-center justify-center mr-2'>
          {leftIcon ? (
            <span>{leftIcon}</span>
          ) : (
            <Image
              src={leftIconSrc!}
              alt='Button Icon'
              width={iconSize}
              height={iconSize}
            />
          )}
        </span>
      ) : null}

      <span className={`flex items-center justify-center font-bold ${innerClassName}`}>
        {children}
      </span>

      {rightIcon || rightIconSrc ? (
        <span className='flex items-center justify-center ml-2'>
          {rightIcon ? (
            <span>{rightIcon}</span>
          ) : (
            <Image
              src={rightIconSrc!}
              alt='Button Icon'
              width={iconSize}
              height={iconSize}
            />
          )}
        </span>
      ) : null}
    </>
  )

  if (type === 'button') {
    return (
      <button
        type={buttonType}
        className={`flex items-center justify-center px-4 py-2 cursor-pointer ${selectedClasses} ${outerClassName}`}
        onClick={onClick}
        disabled={disabled}
      >
        {buttonContent}
      </button>
    )
  }

  if (type === 'link' && href) {
    return (
      <Link
        href={href}
        className={`flex items-center justify-center px-4 py-2 cursor-pointer ${selectedClasses} ${outerClassName}`}
      >
        {buttonContent}
      </Link>
    )
  }

  return null
}
