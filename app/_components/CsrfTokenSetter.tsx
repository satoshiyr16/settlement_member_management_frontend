'use client'

import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/api/api-client'
/**
 * laravelのsanctumはspaを想定した設定のため、Clientでfetchすることで、
 * cookieにCSRF-TOKEN（XSRF-TOKEN）をセットする
 */
export const CsrfTokenSetter = () => {
  const [firstRender, setFirstRender] = useState(false)

  useEffect(() => {
    if (firstRender) return
    setFirstRender(true)

    const initializeCsrfToken = async () => {
      const response = await apiClient.get(`/api/init`)
      if (!response.success) {
        console.error('CSRF Token:', response.errors)
      }
    }

    initializeCsrfToken()
  }, [firstRender])

  return null
}
