import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Leaves from './pages/Leaves'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<Login />} />

        {/* Protected route with layout */}
        <Route path='' element={<MainLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/employees' element={<Employees />} />
          <Route path='/leaves' element={<Leaves />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
