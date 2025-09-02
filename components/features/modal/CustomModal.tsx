import { useEffect, useRef, ReactNode } from 'react'
import { Box, Modal, IconButton } from '@mui/material'
import { IoCloseCircleOutline } from 'react-icons/io5'

interface CustomModalProps {
  showModal: boolean
  closeModal: () => Promise<void> | void
  children: ReactNode
  className?: string
  isFloatingCloseButton?: boolean
}

export const CustomModal = ({
  showModal,
  closeModal,
  children,
  className,
  isFloatingCloseButton = false,
}: CustomModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  // モーダル外クリックの検知
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal()
      }
    }

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showModal, closeModal])

  return (
    <Modal
      open={showModal}
      onClose={closeModal}
    >
      <Box
        ref={modalRef}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
        className={`text-center w-[95%] py-4 px-1 lg:max-w-[70%] lg:p-4 ${className} `}
      >
        {isFloatingCloseButton ? (
          <IconButton
            sx={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              zIndex: 10,
            }}
            onClick={closeModal}
          >
            <IoCloseCircleOutline
              className='bg-gray-200 hover:bg-gray-300/80 rounded-full p-1 cursor-pointer'
              size={40}
            />
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IoCloseCircleOutline
              className='bg-gray-200 hover:bg-gray-300/80 rounded-full p-1 cursor-pointer'
              size={40}
              onClick={closeModal}
            />
          </Box>
        )}
        {children}
      </Box>
    </Modal>
  )
}
