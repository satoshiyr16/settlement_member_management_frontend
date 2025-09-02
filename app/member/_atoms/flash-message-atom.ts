import { atom } from 'jotai'

export interface FlashMessageType {
  id: string
  type: 'success' | 'error'
  message: string
  duration?: number
}

export const flashMessagesAtom = atom<FlashMessageType[]>([])

export const addFlashMessageAtom = atom(
  null,
  (_, set, message: Omit<FlashMessageType, 'id'>) => {
    const id = Date.now().toString()
    const newMessage: FlashMessageType = {
      id,
      duration: 8000, /** デフォルト 8秒 */
      ...message,
    }

    set(flashMessagesAtom, (prev) => [...prev, newMessage])

    if (newMessage.duration) {
      setTimeout(() => {
        set(flashMessagesAtom, (prev) => prev.filter(msg => msg.id !== id))
      }, newMessage.duration)
    }
  }
)

export const removeFlashMessageAtom = atom(
  null,
  (_, set, id: string) => {
    set(flashMessagesAtom, (prev) => prev.filter(msg => msg.id !== id))
  }
)

export const clearFlashMessagesAtom = atom(
  null,
  (_, set) => {
    set(flashMessagesAtom, [])
  }
)
