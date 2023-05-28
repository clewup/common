'use client'

import { UserType } from '@/lib/common/types/userTypes'
import React, { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from 'react'

interface LockrContextValues {
    user: UserType | null
    setUser: Dispatch<SetStateAction<UserType | null>>
    isAdmin: boolean
    setAdmin: Dispatch<SetStateAction<boolean>>
}

const LockrContext = createContext<LockrContextValues>({} as LockrContextValues)

interface LockrProviderProps {
    children: ReactNode
}

const LockrProvider: FC<LockrProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null)
    const [isAdmin, setAdmin] = useState(false)

    return <LockrContext.Provider value={{ user, setUser, isAdmin, setAdmin }}>{children}</LockrContext.Provider>
}

const useLockr = () => {
    const context = useContext(LockrContext)

    if (!context) {
        throw new Error('useLockr may only be used within the LockrContext')
    }

    return context
}

export { LockrContext, LockrProvider, useLockr }
