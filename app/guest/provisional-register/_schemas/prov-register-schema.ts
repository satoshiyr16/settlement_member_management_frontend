import { z } from 'zod'

export const provRegisterSchema = z
  .object({
    email: z.email('有効なメールアドレスを入力してください'),
  })

export type ProvRegisterFormType = z.infer<typeof provRegisterSchema>
