import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

export const Header = () => {
  return (
    <>
      <div>Header</div>
      <Link to="/tasks"><button>Back to My Tasks</button></Link>
      <hr/>
    </>
    
  )
}
