import * as React from 'react'
import { Label } from '@/components/atoms/Label/Label'
import { Input, type InputProps } from '@/components/atoms/Input/Input'
import { cn } from '@/utils/cn'

export interface FormFieldProps extends InputProps {
  label: string
  error?: string
  containerClassName?: string
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      name,
      type = 'text',
      placeholder,
      required = false,
      error,
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const inputId = name || props.id

    return (
      <div className={cn('space-y-2', containerClassName)}>
        <Label htmlFor={inputId}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <Input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={cn(error ? 'border-destructive' : '', className)}
          aria-invalid={!!error}
          aria-describedby={error && inputId ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && inputId && (
          <p id={`${inputId}-error`} className="text-sm text-destructive mt-1">
            {error}
          </p>
        )}
      </div>
    )
  }
)
FormField.displayName = 'FormField'
