import { type UserType } from '@/lib/common/types/userTypes'
import jwt from 'jsonwebtoken'

export function decodeAccessToken () {
  const accessToken = localStorage.getItem('lockr.at')

  if (!accessToken) return null

  return jwt.decode(accessToken) as UserType
}
