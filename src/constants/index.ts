export const APP_NAME = 'React Frontend Boilerplate'

export const API_ENDPOINTS = {
  USERS: '/api/users',
  AUTH: '/api/auth',
  POSTS: '/api/posts',
} as const

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
} as const

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
} as const
