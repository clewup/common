'use client'

import { db, DexieTables } from '@/lib/dexie/db'
import React, { type FC, useEffect, useState } from 'react'

interface CookiePopupProps {
    customMessage?: string
}

const CookiePopup: FC<CookiePopupProps> = ({ customMessage }) => {
    const [isRendered, setRendered] = useState(false)

    async function checkCookieConsent() {
        const isExisting = await db.services.check(DexieTables.COOKIE_CONSENT)
        setRendered(!isExisting)
    }
    useEffect(() => {
        checkCookieConsent()
    }, [])

    async function updateCookieConsent(isConsenting: boolean) {
        await db.services.add(DexieTables.COOKIE_CONSENT, { isConsenting })
        setRendered(false)
    }

    return (
        <div>
            <input type="checkbox" id="my-modal" className="modal-toggle" checked={isRendered} onChange={() => null} />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl text-center">We value your privacy! 🍪</h3>
                    <p className="pt-4 text-center">
                        We use cookies to enhance your browsing experience and to improve our service. By clicking
                        &apos;Accept All&apos;, you consent to our use of cookies.
                    </p>
                    <div className="modal-action justify-center gap-10">
                        <button
                            className="btn btn-ghost"
                            onClick={async () => {
                                await updateCookieConsent(false)
                            }}>
                            Reject All
                        </button>
                        <button
                            className="btn btn-success"
                            onClick={async () => {
                                await updateCookieConsent(true)
                            }}>
                            Accept All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CookiePopup
