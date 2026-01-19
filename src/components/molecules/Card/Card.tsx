import {
  Card as ShadcnCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/atoms/Card/Card'

export interface CardProps {
  title?: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export const Card = ({
  title,
  description,
  children,
  footer,
  className,
}: CardProps) => {
  return (
    <ShadcnCard className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </ShadcnCard>
  )
}
