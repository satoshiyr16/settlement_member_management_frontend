export interface UserEntityType {
  user_id: number
  email: string
  role: number
  suspended_at: string | null
  created_at: string
  updated_at: string
}

export interface MemberEntityType {
  member_id: number
  nickname: string
  gender: number
  birth_date: string
  enrollment_date: string
  created_at: string
  updated_at: string
}
