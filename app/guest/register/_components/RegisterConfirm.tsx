'use client'

import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useAtomValue } from 'jotai'
import { FaArrowLeft } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { RegisterFormType } from '@/app/guest/register/_schemas/schema'
import { BasicButton } from '@/components/ui/button/BasicButton'
import { CustomModal } from '@/components/ui/modal/CustomModal'
import { getMasterDataAtom } from '@/app/_atoms/master-data-atom'

interface RegisterConfirmProps {
  methods: UseFormReturn<RegisterFormType>
  setFormMode: (mode: 'form' | 'confirm') => void
  onSubmit: (data: RegisterFormType) => void
}

export const RegisterConfirm = ({
  methods,
  setFormMode,
  onSubmit,
}: RegisterConfirmProps) => {
  const [showModal, setShowModal] = useState(false)
  const masterData = useAtomValue(getMasterDataAtom)

  return (
    <>
      <CustomModal showModal={showModal} closeModal={() => setShowModal(false)}>
        <div className='w-[80%] mx-auto'>
          <p className='text-2xl font-bold'>この内容で登録しますか？</p>
          <div className='mt-20 flex justify-center items-center gap-20'>
            <BasicButton
              type='button'
              buttonType='button'
              onClick={() => setShowModal(false)}
              variant='outlined'
              outerClassName='w-[30%]'
              innerClassName='w-full'
              leftIcon={<IoClose size={28} />}
            >
              キャンセル
            </BasicButton>
            <BasicButton
              type='button'
              buttonType='button'
              onClick={() => {
                onSubmit(methods.getValues())
              }}
              color='pjYellow'
              variant='contained'
              outerClassName='w-[30%]'
              innerClassName='w-full'
            >
              はい
            </BasicButton>
          </div>
        </div>
      </CustomModal>
      <div>
        <div className='my-6'>
          <p className='font-bold'>メールアドレス</p>
          <p className='text-gray-500 px-4 my-4'>{methods.getValues('email')}</p>
        </div>
        <div className='my-6'>
          <p className='font-bold'>パスワード</p>
          <p className='text-gray-500 px-4 my-4'>********</p>
        </div>
        <div className='my-6'>
          <p className='font-bold'>ニックネーム</p>
          <p className='text-gray-500 px-4 my-4'>{methods.getValues('nickname')}</p>
        </div>
        <div className='my-6'>
          <p className='font-bold'>生年月日</p>
          <p className='text-gray-500 px-4 my-4'>{methods.getValues('birth_date')}</p>
        </div>
        <div className='my-6'>
          <p className='font-bold'>性別</p>
          <p className='text-gray-500 px-4 my-4'>
            {
              masterData?.genders.find(
                (gender) => gender.value === Number(methods.getValues('gender')),
              )?.label
            }
          </p>
        </div>
      </div>
      <div className='mt-20 flex justify-center items-center gap-20'>
        <BasicButton
          type='button'
          buttonType='button'
          onClick={() => setFormMode('form')}
          variant='outlined'
          outerClassName='w-[30%]'
          innerClassName='w-full'
          leftIcon={<FaArrowLeft size={20} />}
        >
          戻る
        </BasicButton>
        <BasicButton
          type='button'
          buttonType='button'
          onClick={() => {
            setShowModal(true)
          }}
          variant='contained'
          outerClassName='w-[30%]'
          innerClassName='w-full'
        >
          登録する
        </BasicButton>
      </div>
    </>
  )
}
