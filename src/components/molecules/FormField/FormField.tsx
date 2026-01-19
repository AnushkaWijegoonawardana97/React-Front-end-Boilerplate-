import { Label } from '@/components/atoms/Label/Label'
import { Input } from '@/components/atoms/Input/Input'
import { cn } from '@/utils/cn'

export interface FormFieldProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
  className?: string
}

export const FormField = ({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  error,
  className,
}: FormFieldProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={error ? 'border-destructive' : ''}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  )
}
