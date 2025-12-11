import { Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from './pages/homepage'
import LoginSignup from './pages/loginSignup'
import Learningpage from './pages/learningpage'
import Mentorpage from './pages/mentorpage'
import Dictaphone from './pages/mentorpage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navebar from './components/navebar'
import Learncatagory from './pages/learncatagory'

function App() {
  return (
    <div>

    <AuthProvider></AuthProvider>
      <Navebar/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/mentor" element={<Dictaphone />} />
        <Route path = "/Check" element={<Learncatagory/>}/>
        <Route path="/learning" element={
          <ProtectedRoute>
            <Learningpage />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App
