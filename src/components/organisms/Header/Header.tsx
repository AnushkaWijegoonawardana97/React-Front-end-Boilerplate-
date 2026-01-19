import { Button } from '@/components/atoms/Button/Button'
import { Menu } from 'lucide-react'

export interface HeaderProps {
  title?: string
  onMenuClick?: () => void
  actions?: React.ReactNode
}

export const Header = ({
  title = 'Application',
  onMenuClick,
  actions,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {onMenuClick && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="mr-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="mr-4 flex">
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {actions}
        </div>
      </div>
    </header>
  )
}
