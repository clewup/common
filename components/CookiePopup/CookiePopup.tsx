'use client'

import { db, DexieTables } from '@/lib/dexie/db'
import React, { type FC, useEffect, useState } from 'react'

interface CookiePopupProps {
  customMessage?: string
}

const CookiePopup: FC<CookiePopupProps> = ({ customMessage }) => {
  const [isRendered, setRendered] = useState(false)

  async function checkCookieConsent () {
    const isExisting = await db.services.check(DexieTables.COOKIE_CONSENT)
    setRendered(!isExisting)
  }
  useEffect(() => {
    void checkCookieConsent()
  }, [])

  async function updateCookieConsent (isConsenting: boolean) {
    await db.services.add(DexieTables.COOKIE_CONSENT, { isConsenting })
    setRendered(false)
  }

  if (!isRendered) return null

  return (
        <div className="rounded-md p-5 bg-white">
            <h3 className="font-bold text-2xl text-center">We value your privacy! 🍪</h3>
            <p className="pt-4 text-center">
                We use cookies to enhance your browsing experience and to improve our service. By clicking
                &apos;Accept All&apos;, you consent to our use of cookies.
            </p>
            <div className="flex mt-10 justify-center gap-10">
                <button
                    onClick={ () => {
                      void updateCookieConsent(false)
                    }}>
                    Reject All
                </button>
                <button
                    onClick={ () => {
                      void updateCookieConsent(true)
                    }}>
                    Accept All
                </button>
            </div>
        </div>
  )
}

export default CookiePopup
