import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate=useNavigate()
  return (
    <div className='flex justify-center items-center p-2 '>
      <p className='text-2xl' onClick={() => {
        localStorage.clear()
        navigate('/')
      }}>Header</p>
    </div>
  )
}

export default Header
