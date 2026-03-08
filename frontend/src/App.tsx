import { Outlet, useLocation } from 'react-router'
import Navbar from './components/Navbar'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const App = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  
  return (
    <ThemeProvider defaultTheme="light" storageKey="url-shortener-theme">
      {!isDashboard && <Navbar />}
      <Outlet />
      <Toaster />
    </ThemeProvider>
  )
}

export default App
