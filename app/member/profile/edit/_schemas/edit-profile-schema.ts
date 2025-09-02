import { z } from 'zod'

export const editProfileSchema = z
  .object({
    nickname: z
      .string()
      .min(1, 'ニックネームを入力してください')
      .max(50, 'ニックネームは50文字以内で入力してください'),
    birth_date: z.string().min(1, '生年月日を入力してください'),
    gender: z
      .string()
      .min(1, '性別を選択してください')
      .nullish()
      .refine((val) => val != null, {
        message: '性別を選択してください',
      }),
  })

export type EditProfileFormType = z.infer<typeof editProfileSchema>
