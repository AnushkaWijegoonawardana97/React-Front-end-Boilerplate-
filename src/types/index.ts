export type Theme = 'light' | 'dark'

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ErrorResponse {
  message: string
  errors?: Record<string, string[]>
  statusCode: number
}

export * from './user.types'
