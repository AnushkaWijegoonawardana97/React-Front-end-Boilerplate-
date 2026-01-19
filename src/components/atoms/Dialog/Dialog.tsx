import * as React from 'react'

import { cn } from '@/utils/cn'

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const DialogContext = React.createContext<{
  titleId?: string
  descriptionId?: string
}>({})

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  const dialogRef = React.useRef<HTMLDivElement>(null)
  const previousActiveElementRef = React.useRef<HTMLElement | null>(null)
  const previousOverflowRef = React.useRef<string | null>(null)
  const titleId = React.useId()
  const descriptionId = React.useId()

  React.useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      previousOverflowRef.current = prev || null
      if (document.body.style.overflow !== 'hidden') {
        document.body.style.overflow = 'hidden'
      }
      previousActiveElementRef.current = document.activeElement as HTMLElement
    } else {
      if (previousOverflowRef.current !== null) {
        document.body.style.overflow = previousOverflowRef.current
        previousOverflowRef.current = null
      }
      previousActiveElementRef.current?.focus()
    }
    return () => {
      if (previousOverflowRef.current !== null) {
        document.body.style.overflow = previousOverflowRef.current
        previousOverflowRef.current = null
      }
      previousActiveElementRef.current?.focus()
    }
  }, [open])

  React.useEffect(() => {
    if (!open || !dialogRef.current) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange?.(false)
      }
    }

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialogRef.current) return

      const allFocusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const focusableElements = Array.from(allFocusableElements).filter(
        (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
      )

      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keydown', handleTabKey)

    const firstFocusable = dialogRef.current.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    firstFocusable?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keydown', handleTabKey)
    }
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <DialogContext.Provider value={{ titleId, descriptionId }}>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={() => onOpenChange?.(false)}
      >
        <div className="fixed inset-0 bg-black/50" />
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className="relative z-50"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </DialogContext.Provider>
  )
}

type ReactElementWithRef = React.ReactElement & {
  ref?: React.Ref<HTMLElement>
  props?: {
    onClick?: (e: React.MouseEvent<HTMLElement>) => void
  }
}

const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
  }
>(({ children, onClick, asChild, ...props }, ref) => {
  const childElementRef = React.useRef<ReactElementWithRef | null>(null)
  const childRefCallbackRef = React.useRef<((node: HTMLElement | null) => void) | null>(null)
  const childOnClickRef = React.useRef<((e: React.MouseEvent<HTMLElement>) => void) | undefined>(undefined)
  
  React.useLayoutEffect(() => {
    if (asChild && React.isValidElement(children)) {
      const childElement = children as ReactElementWithRef
      childElementRef.current = childElement
      childOnClickRef.current = childElement.props?.onClick
      const originalChildRef = childElement.ref
      if (typeof originalChildRef === 'function') {
        childRefCallbackRef.current = originalChildRef
      } else {
        childRefCallbackRef.current = null
      }
    } else {
      childElementRef.current = null
      childRefCallbackRef.current = null
      childOnClickRef.current = undefined
    }
  }, [asChild, children])
  
  const mergedRef = React.useCallback((node: HTMLElement | null) => {
    if (typeof ref === 'function') {
      ref(node as HTMLButtonElement)
    } else if (ref) {
      ref.current = node as HTMLButtonElement
    }
    const childRefCallback = childRefCallbackRef.current
    if (childRefCallback) {
      childRefCallback(node)
    }
  }, [ref])
  
  const mergedOnClick = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    onClick?.(e as React.MouseEvent<HTMLButtonElement>)
    const childOnClick = childOnClickRef.current
    if (childOnClick) {
      childOnClick(e)
    }
  }, [onClick])
  
  if (asChild && React.isValidElement(children)) {
    const childElement = children as ReactElementWithRef
    return React.cloneElement(
      childElement,
      {
        ref: mergedRef,
        ...props,
        onClick: mergedOnClick,
      } as React.HTMLAttributes<HTMLElement>
    )
  }
  return (
    <button ref={ref} onClick={onClick} {...props}>
      {children}
    </button>
  )
})
DialogTrigger.displayName = 'DialogTrigger'

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg',
      className
    )}
    {...props}
  >
    {children}
  </div>
))
DialogContent.displayName = 'DialogContent'

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = 'DialogHeader'

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, id, ...props }, ref) => {
  const context = React.useContext(DialogContext)
  return (
    <h2
      ref={ref}
      id={id ?? context.titleId}
      className={cn(
        'text-lg font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    />
  )
})
DialogTitle.displayName = 'DialogTitle'

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, id, ...props }, ref) => {
  const context = React.useContext(DialogContext)
  return (
    <p
      ref={ref}
      id={id ?? context.descriptionId}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
})
DialogDescription.displayName = 'DialogDescription'

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
}
