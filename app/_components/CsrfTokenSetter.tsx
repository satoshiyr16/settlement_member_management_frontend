'use client'

import { useEffect } from 'react'

/**
 * laravelのsanctumはspaを想定した設定のため、CSRでfetchすることで、
 * cookieにCSRF-TOKEN（XSRF-TOKEN）をセットする
 */
export const CsrfTokenSetter = () => {
  useEffect(() => {
    const initializeCsrfToken = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8888'

      await fetch(`${apiUrl}/api/init`, {
        credentials: 'include',
      })
    }

    initializeCsrfToken()
  }, [])

  return null
}
