'use client'

import { useAtomValue, useSetAtom } from 'jotai'
import { IoClose } from 'react-icons/io5'
import {
  flashMessagesAtom,
  removeFlashMessageAtom,
  type FlashMessageType,
} from '@/app/member/_atoms/flash-message-atom'

export const FlashMessage = () => {
  const messages = useAtomValue(flashMessagesAtom)
  const removeMessage = useSetAtom(removeFlashMessageAtom)

  if (messages.length === 0) return null

  return (
    <div className='fixed top-10 left-1/2 transform -translate-x-1/2 z-50 space-y-2 mt-2'>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`
            flex items-center justify-between px-20 py-4 rounded-lg shadow-lg max-w-md
            ${getMessageStyles(message.type)}
          `}
        >
          <span className='text-sm'>{message.message}</span>
          <button
            onClick={() => removeMessage(message.id)}
            className='ml-4 text-black hover:text-black/60 cursor-pointer'
          >
            <IoClose className='h-4 w-4' />
          </button>
        </div>
      ))}
    </div>
  )
}

function getMessageStyles(type: FlashMessageType['type']) {
  switch (type) {
    case 'success':
      return 'bg-pjSoftGreen border border-pjSoftGreen text-black'
    case 'error':
      return 'bg-pjSoftRed border border-pjSoftRed text-black'
    default:
      return 'bg-gray-50 border border-gray-200 text-gray-800'
  }
}
