import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form as ShadcnForm,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/atoms/Form/Form'
import { Input } from '@/components/atoms/Input/Input'
import { Button } from '@/components/atoms/Button/Button'

export interface FormFieldConfig {
  name: string
  label: string
  type?: string
  placeholder?: string
  validation?: z.ZodTypeAny
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
  const schema = z.object(
    fields.reduce((acc, field) => {
      if (field.validation) {
        acc[field.name] = field.validation
      } else {
        acc[field.name] = z.string().min(1, `${field.label} is required`)
      }
      return acc
    }, {} as Record<string, z.ZodTypeAny>)
  )

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = ''
      return acc
    }, {} as Record<string, string>),
  })

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    await onSubmit(data)
  }

  return (
    <ShadcnForm onSubmit={form.handleSubmit(handleSubmit)} className={className}>
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
    </ShadcnForm>
  )
}
