export interface PageContext {
  params: Record<string, string>
  searchParams: Record<string, string>
}

export interface ErrorPageContext {
  error: Error
  reset: () => void
}
