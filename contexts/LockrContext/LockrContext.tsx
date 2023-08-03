'use client'

import { type UserType } from '@/lib/common/types/userTypes'
import React, { createContext, type Dispatch, type FC, type ReactNode, type SetStateAction, useContext, useState } from 'react'

interface LockrContextValues {
  user: UserType | null
  setUser: Dispatch<SetStateAction<UserType | null>>
  isAdmin: boolean
  setAdmin: Dispatch<SetStateAction<boolean>>
}

const LockrContext = createContext<LockrContextValues>({
  isAdmin: false,
  setAdmin: () => null,
  setUser: () => null,
  user: null
})

interface LockrProviderProps {
  children: ReactNode
}

const LockrProvider: FC<LockrProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null)
  const [isAdmin, setAdmin] = useState(false)

  return <LockrContext.Provider value={{ isAdmin, setAdmin, setUser, user }}>{children}</LockrContext.Provider>
}

const useLockr = () => {
  const context = useContext(LockrContext)

  if (context === null) {
    throw new Error('useLockr may only be used within the LockrContext')
  }

  return context
}

export { LockrContext, LockrProvider, useLockr }
