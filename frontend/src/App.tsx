// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Outlet, useLocation } from 'react-router'
import Navbar from './components/Navbar'

const App = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  
  return (
    <>
      {!isDashboard && <Navbar />}
      <Outlet />
    </>
  )
}

export default App
