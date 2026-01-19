import { Header } from '@/components/organisms/Header/Header'
import { cn } from '@/utils/cn'

export interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
  sidebar?: React.ReactNode
  headerActions?: React.ReactNode
  className?: string
}

export const DashboardLayout = ({
  children,
  title,
  sidebar,
  headerActions,
  className,
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header title={title} actions={headerActions} />
      <div className="container flex">
        {sidebar && (
          <aside className="w-64 border-r p-4 hidden md:block">
            {sidebar}
          </aside>
        )}
        <main className={cn('flex-1 p-4', className)}>{children}</main>
      </div>
    </div>
  )
}
