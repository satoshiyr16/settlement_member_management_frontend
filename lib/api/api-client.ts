/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ApiBaseResponse } from '@/types/api-base'
import { HTTP_STATUS } from '@/constants/api-status'

class ApiClientBase {
  private axiosInstance: AxiosInstance
  private csrfTokenKeyName: string

  constructor() {
    this.csrfTokenKeyName = 'XSRF-TOKEN'

    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8888',
      timeout: 10000,
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    this.axiosInstance.interceptors.request.use(
      (config: any) => {
        const csrfToken = this.getCsrfToken()
        if (csrfToken) {
          config.headers['X-XSRF-TOKEN'] = csrfToken
        }

        return config
      },
      (error: any) => {
        return Promise.reject(error)
      },
    )

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error: any) => {
        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
          if (typeof window !== 'undefined') {
            window.location.replace('/guest/login')
          }
        }
        return Promise.reject(error)
      },
    )
  }

  /** クッキーからCSRFトークンを取得 */
  private getCsrfToken(): string | null {
    if (typeof document === 'undefined') return null

    const cookies = document.cookie.split(';')
    const xsrfCookie = cookies.find((cookie) =>
      cookie.trim().startsWith(`${this.csrfTokenKeyName}=`),
    )

    if (xsrfCookie) {
      const token = decodeURIComponent(xsrfCookie.split('=')[1])
      return token
    }

    return null
  }

  private handleError<T>(error: any): ApiBaseResponse<T> {
    if (error.response) {
      return {
        success: false,
        errors: error.response.data?.errors || {},
        status: error.response.status,
      } as ApiBaseResponse<T>
    } else if (error.request) {
      /** リクエストは送信されたがレスポンスがない場合 */
      throw new Error('ネットワークエラーが発生しました')
    } else {
      /** その他のエラー */
      throw new Error('予期しないエラーが発生しました')
    }
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig,
  ): Promise<ApiBaseResponse<T>> {
    try {
      const response = await this.axiosInstance.get(endpoint, {
        params,
        ...config,
      })

      return {
        success: true,
        data: response.data,
        status: response.status,
      } as ApiBaseResponse<T>
    } catch (error) {
      return this.handleError<T>(error)
    }
  }

  async post<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiBaseResponse<T>> {
    try {
      const response = await this.axiosInstance.post(endpoint, data, config)

      return {
        success: true,
        data: response.data,
        status: response.status,
      } as ApiBaseResponse<T>
    } catch (error) {
      return this.handleError<T>(error)
    }
  }

  async put<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiBaseResponse<T>> {
    try {
      const response = await this.axiosInstance.put(endpoint, data, config)

      return {
        success: true,
        data: response.data,
        status: response.status,
      } as ApiBaseResponse<T>
    } catch (error) {
      return this.handleError<T>(error)
    }
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiBaseResponse<T>> {
    try {
      const response = await this.axiosInstance.patch(endpoint, data, config)

      return {
        success: true,
        data: response.data,
        status: response.status,
      } as ApiBaseResponse<T>
    } catch (error) {
      return this.handleError<T>(error)
    }
  }

  async delete<T>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiBaseResponse<T>> {
    try {
      const response = await this.axiosInstance.delete(endpoint, config)

      return {
        success: true,
        data: response.data,
        status: response.status,
      } as ApiBaseResponse<T>
    } catch (error) {
      return this.handleError<T>(error)
    }
  }

  /** FormDataを使用したPOSTリクエスト */
  async postFormData<T>(
    endpoint: string,
    formData: FormData,
    config?: AxiosRequestConfig,
  ): Promise<ApiBaseResponse<T>> {
    try {
      const response = await this.axiosInstance.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...config,
      })

      return {
        success: true,
        data: response.data,
        status: response.status,
      } as ApiBaseResponse<T>
    } catch (error) {
      return this.handleError<T>(error)
    }
  }
}

export const apiClient = new ApiClientBase()
