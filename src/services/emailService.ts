import emailjs from '@emailjs/browser'

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''

export interface EmailParams {
  to_name?: string
  from_name?: string
  from_email?: string
  message?: string
  subject?: string
  [key: string]: unknown
}

export const initializeEmailJS = () => {
  if (EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAILJS_PUBLIC_KEY)
  }
}

export const sendEmail = async (
  templateParams: EmailParams
): Promise<{ success: boolean; message: string }> => {
  try {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      throw new Error('EmailJS configuration is missing')
    }

    initializeEmailJS()

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    )

    if (response.status === 200) {
      return { success: true, message: 'Email sent successfully' }
    } else {
      return { success: false, message: 'Failed to send email' }
    }
  } catch (error) {
    console.error('EmailJS error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}
