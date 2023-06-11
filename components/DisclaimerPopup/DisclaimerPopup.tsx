'use client'

import { db, DexieTables } from '@/lib/dexie/db'
import React, { type FC, useEffect, useState } from 'react'

interface DisclaimerPopupProps {
  message: string
}

const DisclaimerPopup: FC<DisclaimerPopupProps> = ({ message }) => {
  const [isRendered, setRendered] = useState(false)

  async function checkDisclaimer () {
    const isExisting = await db.services.check(DexieTables.DISCLAIMER)
    setRendered(!isExisting)
  }
  useEffect(() => {
    checkDisclaimer()
  }, [])

  async function updateDisclaimer () {
    await db.services.add(DexieTables.DISCLAIMER, { isRead: true })
    setRendered(false)
  }

  return (
      <div>
          <input type="checkbox" id="my-modal" className="modal-toggle" checked={isRendered} onChange={() => null} />
          <div className="modal">
              <div className="modal-box">
                  <h3 className="font-bold text-2xl text-center">DISCLAIMER</h3>
                  <div className="flex flex-col gap-2 mt-5">
                      {message.split('\n').map((text, index) => (<p key={index} className="text-center">
                          {text}
                      </p>))}
                  </div>
                  <div className="modal-action justify-center">
                      <button className="btn btn-primary" onClick={async () => { await updateDisclaimer() }}>
                          Okay!
                      </button>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default DisclaimerPopup
