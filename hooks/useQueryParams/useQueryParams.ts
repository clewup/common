'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function useQueryParams<T = unknown> () {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryParams = Object.fromEntries(searchParams.entries()) as Partial<T>
  const urlSearchParams = new URLSearchParams(searchParams.toString())

  function setQueryParams (params: Partial<T>, targetRoute?: string) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        urlSearchParams.set(key, String(value))
      } else {
        urlSearchParams.delete(key)
      }
    })

    const search = urlSearchParams.toString()
    const query = search !== null && search !== '' ? `?${search}` : ''

    targetRoute !== undefined ? router.push(`${targetRoute}${query}`) : router.push(`${pathname}${query}`)
  }

  return { queryParams, setQueryParams }
}
