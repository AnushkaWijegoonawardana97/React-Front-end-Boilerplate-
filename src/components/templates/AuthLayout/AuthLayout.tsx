import { Card } from '@/components/molecules/Card/Card'
import { cn } from '@/utils/cn'

export interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
  className?: string
}

export const AuthLayout = ({
  children,
  title,
  description,
  className,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <Card
        title={title}
        description={description}
        className={cn('w-full max-w-md', className)}
      >
        {children}
      </Card>
    </div>
  )
}
