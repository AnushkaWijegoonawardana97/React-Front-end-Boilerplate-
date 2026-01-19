import { AppProvider } from '@/context/AppContext'
import { HomePage } from '@/components/pages/HomePage/HomePage'
import './App.css'

function App() {
  return (
    <AppProvider>
      <HomePage />
    </AppProvider>
  )
}

export default App
