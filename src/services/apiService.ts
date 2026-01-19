import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import type { UserDto, CreateUserDto, UpdateUserDto } from '@/types/user.types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

class ApiService {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config)
    return response.data
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config)
    return response.data
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config)
    return response.data
  }
}

export const apiService = new ApiService()

export const userService = {
  getAll: () => apiService.get<UserDto[]>('/users'),
  getById: (id: number) => apiService.get<UserDto>(`/users/${id}`),
  create: (data: CreateUserDto) => apiService.post<UserDto>('/users', data),
  update: (id: number, data: UpdateUserDto) => apiService.put<UserDto>(`/users/${id}`, data),
  delete: (id: number) => apiService.delete<void>(`/users/${id}`),
}
