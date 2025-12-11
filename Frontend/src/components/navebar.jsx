import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'

const Navebar = () => {
  // const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between bg-gray-300 text-xl font-semibold p-4 px-8'>
        <div className='flex items-center space-x-8'>
          <Link to="/" className='hover:text-blue-600 cursor-pointer text-2xl font-bold'>LearnedUp</Link>
          {/* <Link to="/about" className='hover:text-blue-600 cursor-pointer'>About</Link> */}
          {/* <Link to="/pricing" className='hover:text-blue-600 cursor-pointer'>Pricing</Link> */}
          {/* {isAuthenticated && (
            <>
              <Link to="/learning" className='hover:text-blue-600 cursor-pointer'>Learning</Link>
              <Link to="/mentor" className='hover:text-blue-600 cursor-pointer'>Mentor</Link>
            </>
          )} */}
        </div>
        
        <div className='flex items-center space-x-4'>
          {/* {isAuthenticated ? (
            <div className='flex items-center space-x-4'>
              <span className='text-gray-700'>Welcome, {user?.name}!</span>
              <button 
                onClick={handleLogout}
                className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
            >
              Login
            </Link>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default Navebar
