import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Setting from './pages/Setting'
import Profile from './pages/Profile'

const App : React.FC= () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<Login />}/>
        <Route path="/login" element={<SignUp />}/>
        <Route path="/settings" element={<Setting />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </div>
  )
}

export default App