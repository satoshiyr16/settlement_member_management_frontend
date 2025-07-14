import { z } from 'zod'

export const registerSchema = z.object({
  email: z.email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください').max(32, 'パスワードは32文字以内で入力してください'),
  name: z.string().min(1, '名前を入力してください'),
  phone: z.string().optional(),
})

export type RegisterFormType = z.infer<typeof registerSchema>
