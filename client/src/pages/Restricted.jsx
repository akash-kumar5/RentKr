import React from 'react'
import { Link } from 'react-router-dom'

const Restricted = () => {
  return (  
    <div className='bg-dark m-auto text-center text-warning'>
        <h1>RESTRICTED AREA : NOT ALLOWED</h1>
        <span className='fs-1'>⚠️</span>
        <Link to='/' className='nav-link'>Back to Home </Link>
    </div>
  ) 
}

export default Restricted   