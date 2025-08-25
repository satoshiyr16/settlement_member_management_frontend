import { ColorOptionTypes } from '@/types/color'

interface SubTitleCardProps {
  title: string
  subTitle: string
  color: ColorOptionTypes
}

export const SubTitleCard = ({ title, subTitle, color }: SubTitleCardProps) => {
  return (
    <div className={`py-10 bg-${color} rounded-md`}>
      <h2 className='text-xl font-bold text-center text-black underline'>{title}</h2>
      <p className='text-center text-sm text-black mt-1'>{subTitle}</p>
    </div>
  )
}
