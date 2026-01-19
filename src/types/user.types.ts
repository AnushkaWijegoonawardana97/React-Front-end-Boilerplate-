export interface UserDto {
  id: number
  name: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
}

export interface CreateUserDto {
  name: string
  email: string
  role: string
}

export interface UpdateUserDto {
  name?: string
  email?: string
  role?: string
}

export interface UserResponseDto {
  data: UserDto
  message: string
  success: boolean
}

export interface UsersResponseDto {
  data: UserDto[]
  message: string
  success: boolean
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
