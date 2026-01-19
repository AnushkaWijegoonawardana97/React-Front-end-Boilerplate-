import { DashboardLayout } from '@/components/templates/DashboardLayout/DashboardLayout'
import { DataTable } from '@/components/organisms/DataTable/DataTable'
import { Card } from '@/components/molecules/Card/Card'
import type { Column } from '@/components/organisms/DataTable/DataTable'

interface ExampleData {
  id: number
  name: string
  email: string
  role: string
}

export const ExamplePage = () => {
  const columns: Column<ExampleData>[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
  ]

  const sampleData: ExampleData[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  ]

  return (
    <DashboardLayout title="Example Page">
      <Card title="Data Table Example" description="Sample data table component">
        <DataTable columns={columns} data={sampleData} />
      </Card>
    </DashboardLayout>
  )
}
