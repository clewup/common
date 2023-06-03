'use client'

import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'

enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export default function useApi () {
  const { user } = useLockr()

  async function makeRequest<T = unknown> (url: string, method: RequestMethod, body?: unknown, options?: RequestInit) {
    const headers: HeadersInit & { 'x-user'?: string } = {
      ...options?.headers
    }
    if (user?.email) headers['x-user'] = user.email

    const response = await fetch(url, {
      ...options,
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers
    })

    if (response.status === 400 || response.status === 500) throw new Error(response.statusText)

    return await response.json() as T
  }

  async function get<T> (url: string, options?: RequestInit) {
    return await makeRequest<T>(url, RequestMethod.GET, undefined, options)
  }

  async function post<T> (url: string, body: unknown, options?: RequestInit) {
    return await makeRequest<T>(url, RequestMethod.POST, body, options)
  }

  async function patch<T> (url: string, body: unknown, options?: RequestInit) {
    return await makeRequest<T>(url, RequestMethod.PATCH, body, options)
  }

  async function put<T> (url: string, body: unknown, options?: RequestInit) {
    return await makeRequest<T>(url, RequestMethod.PUT, body, options)
  }

  async function del<T> (url: string, options?: RequestInit) {
    return await makeRequest<T>(url, RequestMethod.DELETE, undefined, options)
  }

  return {
    get,
    post,
    patch,
    put,
    del
  }
}
