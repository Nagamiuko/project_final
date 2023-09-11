import React from 'react'
import './Header.css'
import {Link } from 'react-router-dom'
import Logo from '../../assets/icon/Logo.png'
const Header = () => {
  return (
    <div>
      <div className="box-h">
       <Link className='logo' to='/'><img src={Logo} alt="" width={48} height={48}/> ComicBook Novels</Link>
      </div>
    </div>
  )
}

export default Header
