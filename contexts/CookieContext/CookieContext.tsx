'use client'

import CookiePopup from '@/lib/common/components/CookiePopup/CookiePopup'
import React, { createContext, type FC, type ReactNode } from 'react'

const CookieContext = createContext({})

interface CookieProviderProps {
  children: ReactNode
}

const CookieProvider: FC<CookieProviderProps> = ({ children }) => {
  return (
        <CookieContext.Provider value={{}}>
            <div>
                <div className="fixed bottom-5 z-50 right-5 w-1/5">
                    <CookiePopup/>
                </div>

                {children}
            </div>
        </CookieContext.Provider>
  )
}

export default CookieProvider
