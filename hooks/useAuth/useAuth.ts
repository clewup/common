'use client'

import { LockrContext } from '@/lib/common/contexts/LockrContext/LockrContext'
import { type UserType } from '@/lib/common/types/userTypes'
import jwt from 'jsonwebtoken'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

interface UseAuthProps {
  redirectUri?: string
  applicationId?: number
}

const useAuth = ({ redirectUri, applicationId }: UseAuthProps) => {
  const context = useContext(LockrContext)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const code = searchParams.get('code')

  const [isAuthing, setAuthing] = useState(false)

  if (!context) {
    throw new Error('useAuth may only be used within the LockrContext')
  }
  const { user, setUser, setAdmin } = context

  const router = useRouter()

  const LOCKR_BASE_URL = process.env.LOCKR_BASE_URL ?? 'https://lockr.clewup.co.uk'
  const REDIRECT_URI =
        redirectUri ??
        process.env.NEXT_PUBLIC_LOCKR_APP_URL ??
        process.env.LOCKR_APP_URL ??
        process.env.NEXT_PUBLIC_APP_URL ??
        process.env.APP_URL as string
  const APPLICATION_ID =
        applicationId ?? process.env.NEXT_PUBLIC_LOCKR_APPLICATION_ID ?? process.env.LOCKR_APPLICATION_ID as string

  function signIn () {
    router.push(`${LOCKR_BASE_URL}?redirect_uri=${REDIRECT_URI}&application_id=${APPLICATION_ID}`)
  }

  function signOut () {
    localStorage.removeItem('lockr.at')
    setUser(null)
    router.push('/')
  }

  async function fetchAccessToken (code: string): Promise<string> {
    const accessTokenResponse = await fetch(`${LOCKR_BASE_URL}/api/auth/token`, {
      method: 'POST',
      body: JSON.stringify({ authorization_code: code })
    })

    if (!accessTokenResponse.ok) throw new Error('An error occurred fetching the access token')

    const accessTokenData = await accessTokenResponse.json()
    return accessTokenData.access_token
  }

  async function handleAuthorization (code: string) {
    const accessToken = await fetchAccessToken(code)
    localStorage.setItem('lockr.at', accessToken)

    const decodedToken = jwt.decode(accessToken) as UserType
    setUser(decodedToken)
    setAdmin(decodedToken.role === 'Admin')

    router.push(pathname)
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('lockr.at')
    if (accessToken) {
      const decodedToken = jwt.decode(accessToken) as UserType
      setUser(decodedToken)
      setAdmin(decodedToken.role === 'Admin')
    }

    if (code && (user == null) && !isAuthing) {
      setAuthing(true)
      handleAuthorization(code)
      setAuthing(false)
    }
  }, [code])

  return {
    signIn,
    signOut,
    isAuthing
  }
}

export default useAuth
