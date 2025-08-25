import React from 'react'

interface MainTitleProps {
  title: string
  subTitle: string
}

export const MainTitle = ({ title, subTitle }: MainTitleProps) => {
  return (
    <div className='flex flex-col text-start mb-6'>
      <h1 className='text-5xl font-bold pj-text-stroke-black'>{title}</h1>
      <p className='text-sm mt-2 ml-2 font-bold'>{subTitle}</p>
    </div>
  )
}
