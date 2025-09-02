'use client'

import { useState, useTransition } from 'react'
import { redirect } from 'next/navigation'
import { useAtomValue, useSetAtom } from 'jotai'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaArrowLeft, FaCheck, FaCheckDouble } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { Input } from '@/components/form/rhf/Input'
import { RadioButton } from '@/components/form/rhf/RadioButton'
import { BasicButton } from '@/components/ui/button/BasicButton'
import { CustomModal } from '@/components/features/modal/CustomModal'
import { editProfileAction } from '@/app/member/profile/edit/_lib/action'
import { addFlashMessageAtom } from '@/app/member/_atoms/flash-message-atom'
import { getMasterDataAtom } from '@/app/_atoms/master-data-atom'
import {
  getMemberAuthAtom,
  updateMemberAuthAtom,
} from '@/app/member/_atoms/member-data-atom'
import {
  editProfileSchema,
  type EditProfileFormType,
} from '@/app/member/profile/edit/_schemas/edit-profile-schema'
import { HTTP_STATUS } from '@/constants/api-status'

export const ProfileEditForm = () => {
  const [isPending, startTransition] = useTransition()
  const [showModal, setShowModal] = useState(false)

  const masterData = useAtomValue(getMasterDataAtom)
  const memberAuth = useAtomValue(getMemberAuthAtom)
  const updateMemberAuth = useSetAtom(updateMemberAuthAtom)
  const addFlashMessage = useSetAtom(addFlashMessageAtom)
  const methods = useForm<EditProfileFormType>({
    resolver: zodResolver(editProfileSchema),
    mode: 'all',
    defaultValues: {
      nickname: memberAuth?.member.nickname ?? '',
      birth_date: memberAuth?.member.birth_date ?? '',
      gender: memberAuth?.member.gender?.toString() ?? '',
    },
  })

  const onSubmit = async (data: EditProfileFormType) => {
    startTransition(async () => {
      const response = await editProfileAction(data)

      if (response?.errors && response.status === HTTP_STATUS.BAD_REQUEST) {
        Object.entries(response.errors).forEach(([field, messages]) => {
          methods.setError(field as keyof EditProfileFormType, {
            type: 'server',
            message: Array.isArray(messages) ? messages[0] : messages,
          })
        })
        return
      }

      if (response.success && response.data) {
        updateMemberAuth({
          nickname: response.data.nickname,
          birth_date: response.data.birth_date,
          gender: parseInt(response.data.gender.toString()),
        })
        addFlashMessage({
          type: 'success',
          message: 'プロフィールを変更しました。',
        })
        redirect('/member/profile')
      }
    })
  }
  return (
    <>
      <div className='mx-auto px-10 pt-16 pb-8'>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className=''>
              <Input
                name='nickname'
                label='ニックネーム'
                inputType='text'
                placeholder='ニックネーム'
              />
              <Input
                name='birth_date'
                label='誕生日'
                inputType='date'
                type='date'
                placeholder='誕生日'
              />
              <RadioButton
                name='gender'
                values={masterData?.genders || []}
                color='pjGray'
                label='性別'
              />
            </div>
            <div className='mt-35 flex justify-center gap-10'>
              <BasicButton
                type='link'
                href='/member/profile'
                variant='outlined'
                outerClassName='w-[30%]'
                innerClassName='w-full'
                leftIcon={<FaArrowLeft size={20} />}
                disabled={isPending}
              >
                戻る
              </BasicButton>
              <BasicButton
                type='button'
                buttonType='button'
                onClick={async () => {
                  const isValid = await methods.trigger()
                  if (isValid) {
                    setShowModal(true)
                  }
                }}
                variant='outlined'
                outerClassName='w-[30%]'
                innerClassName='w-full'
                rightIcon={<FaCheck size={20} />}
                disabled={isPending}
              >
                確認する
              </BasicButton>
            </div>
          </form>
        </FormProvider>
      </div>
      <CustomModal showModal={showModal} closeModal={() => setShowModal(false)}>
        <div>
          <p className='text-2xl font-bold'>プロフィールを変更しますか？</p>
          <div className='mt-10 flex justify-center gap-10'>
            <BasicButton
              type='button'
              onClick={() => setShowModal(false)}
              variant='outlined'
              outerClassName='w-[20%]'
              innerClassName='w-full'
              leftIcon={<IoClose size={28} />}
              disabled={isPending}
            >
              キャンセル
            </BasicButton>
            <BasicButton
              type='button'
              buttonType='button'
              onClick={() => {
                setShowModal(false)
                onSubmit(methods.getValues())
              }}
              variant='outlined'
              outerClassName='w-[20%]'
              innerClassName='w-full'
              rightIcon={<FaCheckDouble size={20} />}
              disabled={isPending}
            >
              変更する
            </BasicButton>
          </div>
        </div>
      </CustomModal>
    </>
  )
}
