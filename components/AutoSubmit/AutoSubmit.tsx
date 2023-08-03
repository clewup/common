'use client'

import { useFormikContext } from 'formik'
import React, { useEffect } from 'react'

// should only be used in forms where text inputs are not being used
const AutoSubmit = () => {
  const { submitForm, values } = useFormikContext()

  useEffect(() => {
    void submitForm()
  }, [values])

  return <></>
}

export default AutoSubmit
