import {
  Alert as ShadcnAlert,
  AlertTitle,
  AlertDescription,
} from '@/components/atoms/Alert/Alert'
import { AlertCircle } from 'lucide-react'

export interface AlertProps {
  title?: string
  description: string
  variant?: 'default' | 'destructive'
  className?: string
}

export const Alert = ({
  title,
  description,
  variant = 'default',
  className,
}: AlertProps) => {
  return (
    <ShadcnAlert variant={variant} className={className}>
      <AlertCircle className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{description}</AlertDescription>
    </ShadcnAlert>
  )
}
