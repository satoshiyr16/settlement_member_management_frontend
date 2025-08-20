/* eslint-disable @typescript-eslint/no-explicit-any */
'server-only'

import { cookies } from 'next/headers'
import { ApiBaseResponse } from '@/types/api-base'

class ApiServerBase {
  private baseURL: string
  private csrfTokenKeyName: string

  constructor() {
    this.baseURL = process.env.API_URL || 'http://localhost:8888'
    this.csrfTokenKeyName = 'XSRF-TOKEN'
  }

  private async getBaseRequest<T>(
    method: 'GET',
    endpoint: string,
    params?: Record<string, unknown>,
    configProps?: RequestInit,
  ): Promise<ApiBaseResponse<T>> {
    try {
      const headers: Record<string, string> = {
        Accept: 'application/json',
      }
      const cookieStore = await cookies()
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
      headers['Cookie'] = cookieStore.toString()
      headers['Referer'] = frontendUrl
      headers['Origin'] = frontendUrl

      const config: RequestInit = {
        method,
        headers,
        credentials: 'include',
        ...configProps,
      }

      const url = new URL(`${this.baseURL}${endpoint}`)
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value))
          }
        })
      }
      endpoint = url.pathname + url.search

      const response = await fetch(`${this.baseURL}${endpoint}`, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        return {
          success: false,
          errors: errorData.errors,
          status: response.status,
        } as ApiBaseResponse<T>
      }

      const result = await response.json()

      return {
        success: true,
        data: result,
        status: response.status,
      } as ApiBaseResponse<T>
    } catch (error) {
      console.error('API request failed:', error)

      throw new Error('不明なエラーが発生しました。')
    }
  }

  private async postBaseRequest<T>(
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    endpoint: string,
    data?: Record<string, unknown> | FormData,
  ): Promise<ApiBaseResponse<T>> {
    try {
      const headers: Record<string, string> = {
        Accept: 'application/json',
      }
      const cookieStore = await cookies()
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
      headers['Cookie'] = cookieStore.toString()
      headers['Referer'] = frontendUrl
      headers['Origin'] = frontendUrl

      const csrfCookie = cookieStore.get(this.csrfTokenKeyName)
      if (csrfCookie) {
        headers['X-XSRF-TOKEN'] = csrfCookie.value
      }
      if (data && !(data instanceof FormData)) {
        headers['Content-Type'] = 'application/json'
      }

      const config: RequestInit = {
        method,
        headers,
        credentials: 'include',
      }

      if (data) {
        config.body = data instanceof FormData ? data : JSON.stringify(data)
      }

      const response = await fetch(`${this.baseURL}${endpoint}`, config)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        return {
          success: false,
          errors: errorData.errors,
          status: response.status,
        } as ApiBaseResponse<T>
      }

      const result = await response.json()

      return {
        success: true,
        data: result,
        status: response.status,
      } as ApiBaseResponse<T>
    } catch (error) {
      console.error('API request failed:', error)

      throw new Error('不明なエラーが発生しました。')
    }
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, any>,
    configProps?: RequestInit,
  ): Promise<ApiBaseResponse<T>> {
    return this.getBaseRequest<T>('GET', endpoint, params, configProps)
  }

  async post<T>(endpoint: string, data: any): Promise<ApiBaseResponse<T>> {
    return this.postBaseRequest<T>('POST', endpoint, data)
  }

  async put<T>(endpoint: string, data: any): Promise<ApiBaseResponse<T>> {
    return this.postBaseRequest<T>('PUT', endpoint, data)
  }

  async patch<T>(endpoint: string, data: any): Promise<ApiBaseResponse<T>> {
    return this.postBaseRequest<T>('PATCH', endpoint, data)
  }

  async delete<T>(endpoint: string): Promise<ApiBaseResponse<T>> {
    return this.postBaseRequest<T>('DELETE', endpoint)
  }
}

export const apiServer = new ApiServerBase()
