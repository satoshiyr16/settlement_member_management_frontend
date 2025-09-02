import { z } from 'zod'

export const editPasswordSchema = z
  .object({
    current_password: z
      .string()
      .min(8, 'パスワードは8文字以上で入力してください')
      .max(32, 'パスワードは32文字以内で入力してください')
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, 'パスワードは英字と数字を含む必要があります'),
    new_password: z
      .string()
      .min(8, 'パスワードは8文字以上で入力してください')
      .max(32, 'パスワードは32文字以内で入力してください')
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, 'パスワードは英字と数字を含む必要があります'),
    new_password_confirmation: z
      .string()
      .min(8, 'パスワードは8文字以上で入力してください')
      .max(32, 'パスワードは32文字以内で入力してください')
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, 'パスワードは英字と数字を含む必要があります'),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: 'パスワードが一致しません',
    path: ['new_password_confirmation'],
  })

export type EditPasswordFormType = z.infer<typeof editPasswordSchema>
