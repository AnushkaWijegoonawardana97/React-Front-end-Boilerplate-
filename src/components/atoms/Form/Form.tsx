import * as React from 'react'
import {
  useFormContext,
  Controller,
  type FieldPath,
  type FieldValues,
  type ControllerProps,
} from 'react-hook-form'
import { Label } from '@/components/atoms/Label/Label'
import { cn } from '@/utils/cn'

const Form = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => (
  <form ref={ref} className={cn('space-y-4', className)} {...props} />
))
Form.displayName = 'Form'

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(
  null
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  id,
  ...props
}: ControllerProps<TFieldValues, TName> & { id?: string }) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller
        {...props}
        render={({ field, fieldState, formState }) => {
          const inputId = id ?? field.name ?? `field-${field.name}`
          
          if (props.render) {
            return props.render({ field, fieldState, formState })
          }

          return (
            <FormItem>
              <FormLabel />
              <FormControl>
                <input {...field} id={inputId} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )
        }}
      />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!itemContext) {
    throw new Error('useFormField should be used within <FormItem>')
  }

  if (!itemContext.id) {
    throw new Error('FormItemContext is missing required id property')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue | null>(
  null
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = 'FormItem'

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  const child = React.Children.only(children) as React.ReactElement

  return (
    <div ref={ref} {...props}>
      {React.cloneElement(child, {
        id: formItemId,
        'aria-describedby': !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`,
        'aria-invalid': !!error,
      } as React.HTMLAttributes<HTMLElement>)}
    </div>
  )
})
FormControl.displayName = 'FormControl'

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
})
FormDescription.displayName = 'FormDescription'

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error?.message != null ? String(error.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = 'FormMessage'

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

// eslint-disable-next-line react-refresh/only-export-components
export { useFormField }
