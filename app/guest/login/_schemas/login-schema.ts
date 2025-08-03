import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('有効なメールアドレスを入力してください'),
  password: z
    .string()
    .min(1, 'パスワードを入力してください')
    .max(32, 'パスワードは32文字以内で入力してください'),
})

export type LoginFormType = z.infer<typeof loginSchema>
