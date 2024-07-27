import React from 'react'
import { Link } from 'react-router-dom'
import './header.scss'
import { server } from '../App'
import axios from 'axios'

const Header = () => {

  const logoutHandler = () => {
    axios.post(`${server}/employees/logout`, {}, { withCredentials: true })
      .then((response) => {
        localStorage.removeItem("token2")
        window.location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div className='header'>
      <h1>Heal Pharmacy (Sales)</h1>
      <div>
        <Link to='/sales'>Sales</Link>
        <Link to='/sales/list'>List</Link>
        <Link to='/sales/return'>Sale Return</Link>
        <Link to='/sales/returnlist'>Return List</Link>
        <Link to='/sales/stock'>Stock</Link>
        {/* <Link to='/sales/reprint'>reprint</Link> */}
        <Link to='/sales/change'>Change Password</Link>
        <button style={{marginLeft:"5px"}} onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  )
}

export default Header