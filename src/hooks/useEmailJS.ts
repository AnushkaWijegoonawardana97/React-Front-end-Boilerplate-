import { useState, useCallback } from 'react'
import { sendEmail, type EmailParams } from '@/services/emailService'

interface UseEmailJSReturn {
  send: (params: EmailParams) => Promise<void>
  loading: boolean
  error: string | null
  success: boolean
}

export const useEmailJS = (): UseEmailJSReturn => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const send = useCallback(async (params: EmailParams) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const result = await sendEmail(params)
      if (result.success) {
        setSuccess(true)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send email')
    } finally {
      setLoading(false)
    }
  }, [])

  return { send, loading, error, success }
}
