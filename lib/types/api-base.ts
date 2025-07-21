/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiBaseResponse<T = any> {
  success: boolean
  status: number
  data?: T
  errors?: any
}
