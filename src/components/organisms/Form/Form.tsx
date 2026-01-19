import * as React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/atoms/Form/Form'
import { Input } from '@/components/atoms/Input/Input'
import { Button } from '@/components/atoms/Button/Button'
import { cn } from '@/utils/cn'

export interface FormFieldConfig {
  name: string
  label: string
  type?: string
  placeholder?: string
  validation?: z.ZodTypeAny
  defaultValue?: unknown
}

export interface FormProps {
  fields: FormFieldConfig[]
  onSubmit: (data: Record<string, unknown>) => void | Promise<void>
  submitLabel?: string
  className?: string
}

export const Form = ({
  fields,
  onSubmit,
  submitLabel = 'Submit',
  className,
}: FormProps) => {
  const schema = React.useMemo(
    () =>
      z.object(
        fields.reduce((acc, field) => {
          if (field.validation) {
            acc[field.name] = field.validation
          } else {
            acc[field.name] = z.string().min(1, `${field.label} is required`)
          }
          return acc
        }, {} as Record<string, z.ZodTypeAny>)
      ),
    [fields]
  )

  const defaultValues = React.useMemo(
    () =>
      fields.reduce((acc, field) => {
        if (field.defaultValue !== undefined) {
          acc[field.name] = field.defaultValue
        } else if (field.validation) {
          if (field.validation instanceof z.ZodNumber) {
            acc[field.name] = 0
          } else if (field.validation instanceof z.ZodBoolean) {
            acc[field.name] = false
          } else if (field.validation instanceof z.ZodArray) {
            acc[field.name] = []
          } else if (field.validation instanceof z.ZodObject) {
            acc[field.name] = {}
          } else {
            acc[field.name] = ''
          }
        } else {
          acc[field.name] = ''
        }
        return acc
      }, {} as Record<string, unknown>),
    [fields]
  )

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    await onSubmit(data)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={cn('space-y-4', className)}>
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    {...formField}
                    value={formField.value != null ? String(formField.value) : ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="w-full mt-4">
          {submitLabel}
        </Button>
      </form>
    </FormProvider>
  )
}
