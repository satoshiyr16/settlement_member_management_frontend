import { z } from 'zod'

export const editMailSchema = z
  .object({
    current_email: z.email('有効なメールアドレスを入力してください'),
    new_email: z.email('有効なメールアドレスを入力してください'),
    new_email_confirmation: z.email('有効なメールアドレスを入力してください'),
  })
  .refine((data) => data.new_email === data.new_email_confirmation, {
    message: 'メールアドレスが一致しません',
    path: ['new_email_confirmation'],
  })

export type EditMailFormType = z.infer<typeof editMailSchema>
