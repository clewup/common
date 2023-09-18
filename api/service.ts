type RequestMethod = 'get' | 'post' | 'patch' | 'put' | 'delete'

interface RequestOptions {
  headers?: Record<string, string>
  isAuthed?: boolean
  isFullResponse?: boolean
}

export default class ApiService {
  private readonly baseUrl: string
  private readonly accessTokenKey: string

  constructor (baseUrl: string, accessTokenKey: string) {
    this.baseUrl = baseUrl
    this.accessTokenKey = accessTokenKey
  }

  async makeRequest<T>(endpoint: string, method: RequestMethod, body: unknown, options?: RequestOptions) {
    const formattedUrl = `${this.baseUrl}/${endpoint}`

    let headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options?.headers
    }

    if (options?.isAuthed) {
      const accessToken = localStorage.getItem(this.accessTokenKey)

      if (!accessToken) {
        throw new Error('Missing access token')
      }

      headers = {
        ...headers,
        Authorization: `Bearer ${accessToken}`
      }
    }

    const response = await fetch(formattedUrl, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    })

    if (response.status === 500) {
      throw new Error('Internal server error')
    }

    if (options?.isFullResponse) {
      return response as T
    }

    return await response.json() as T
  }

  async get<T>(endpoint: string, options?: RequestOptions) {
    return await this.makeRequest<T>(endpoint, 'get', undefined, options)
  }

  async post<T>(endpoint: string, body: unknown, options?: RequestOptions) {
    return await this.makeRequest<T>(endpoint, 'post', body, options)
  }

  async patch<T>(endpoint: string, body: unknown, options?: RequestOptions) {
    return await this.makeRequest<T>(endpoint, 'patch', body, options)
  }

  async put<T>(endpoint: string, body: unknown, options?: RequestOptions) {
    return await this.makeRequest<T>(endpoint, 'put', body, options)
  }

  async del<T>(endpoint: string, options?: RequestOptions) {
    return await this.makeRequest<T>(endpoint, 'delete', undefined, options)
  }
}
