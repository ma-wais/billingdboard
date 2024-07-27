import React from 'react'
import './change.scss'

const Change = () => {
  return (
    <div className='change'>
      <input type="password" placeholder="Old Password" />
      <input type="password" placeholder="New Password" />
      <input type="password" placeholder="Confirm Password" />
      <button>Change</button>
    </div>
  )
}

export default Change