// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Outlet } from 'react-router'

const App = () => {
  return (
    <>
      <h1>App Layout</h1>
      <Outlet />
    </>
  )
}

export default App
