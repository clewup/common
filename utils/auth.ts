import { type UserType } from '@/lib/common/types/userTypes'
import jwt from 'jsonwebtoken'

export function decodeAccessToken () {
  const accessToken = localStorage.getItem('lockr.at')

  if (!accessToken) return null

  return jwt.decode(accessToken) as UserType
}

export function withAuthHeaders (headers?: Record<string, string>) {
  const user = decodeAccessToken()
  const authedHeaders: HeadersInit & { 'x-user'?: string } = { ...headers }
  if (user?.email) authedHeaders['x-user'] = user.email

  return authedHeaders
}
