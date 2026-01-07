// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Outlet } from 'react-router'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
