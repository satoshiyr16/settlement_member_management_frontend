import { z } from 'zod'

export const registerSchema = z
  .object({
    email: z.email('有効なメールアドレスを入力してください'),
    password: z
      .string()
      .min(8, 'パスワードは8文字以上で入力してください')
      .max(32, 'パスワードは32文字以内で入力してください')
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, 'パスワードは英字と数字を含む必要があります'),
    password_confirmation: z
      .string()
      .min(8, 'パスワードは8文字以上で入力してください')
      .max(32, 'パスワードは32文字以内で入力してください'),
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
  .refine((data) => data.password === data.password_confirmation, {
    message: 'パスワードが一致しません',
    path: ['password_confirmation'],
  })

export type RegisterFormType = z.infer<typeof registerSchema>
