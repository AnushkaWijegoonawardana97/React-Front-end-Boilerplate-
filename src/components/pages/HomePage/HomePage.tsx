import { DashboardLayout } from '@/components/templates/DashboardLayout/DashboardLayout'
import { Card } from '@/components/molecules/Card/Card'
import { Button } from '@/components/atoms/Button/Button'
import { Alert } from '@/components/molecules/Alert/Alert'

export const HomePage = () => {
  return (
    <DashboardLayout title="Home">
      <div className="space-y-6">
        <Alert
          title="Welcome"
          description="This is a sample home page component following Atomic Design principles."
        />
        <Card
          title="Getting Started"
          description="This boilerplate includes everything you need to start building."
        >
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This project follows Atomic Design structure with atoms, molecules,
              organisms, templates, and pages.
            </p>
            <Button>Get Started</Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
