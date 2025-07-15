/* eslint-disable @typescript-eslint/no-explicit-any */
import 'server-only'
import { notFound } from 'next/navigation'
import { ApiBaseResponse } from '@/lib/types/api-base'
export class ApiBase {
  private baseURL: string

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  }

  private async getBaseRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    endpoint: string,
    params?: Record<string, unknown>,
  ): Promise<T> {
    const headers: Record<string, string> = {
      Accept: 'application/json',
    }
    const config: RequestInit = {
      method,
      headers,
      credentials: 'include',
    }

    if (method === 'GET') {
      const url = new URL(`${this.baseURL}${endpoint}`)
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value))
          }
        })
      }
      endpoint = url.pathname + url.search
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, config)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      if (method === 'GET' && response.status === 404) {
        notFound()
      }

      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  private async postBaseRequest<T>(
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    endpoint: string,
    data?: Record<string, unknown> | FormData,
  ): Promise<ApiBaseResponse<T>> {
    const headers: Record<string, string> = {
      Accept: 'application/json',
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
        error: errorData.message || `error! status: ${response.status}`,
        status: response.status,
      } as ApiBaseResponse<T>
    }

    const result = await response.json()
    return {
      success: true,
      data: result,
      status: response.status,
    } as ApiBaseResponse<T>
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.getBaseRequest<T>('GET', endpoint, params)
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

export const apiBase = new ApiBase()
