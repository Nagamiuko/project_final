import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faIdCard , faLocationArrow , faKey} from '@fortawesome/free-solid-svg-icons'
import './MenuE.css'
const MenuEdit = () => {
  return (
    <div>
      <div className="m-li-pf">
            <li><NavLink to={`/my-account/user`} className='btn-ev-m-pf'><FontAwesomeIcon icon={faIdCard} /> บันญีของฉัน </NavLink></li>
            {/* <li><NavLink to={``} className='btn-ev-m-pf'>-------</NavLink></li> */}
            <li><NavLink to={`/my-account/security`} className='btn-ev-m-pf'><FontAwesomeIcon icon={faKey} /> รหัสผ่าน และ ความปลอดภัย</NavLink></li>
            <li><NavLink to={`/my-account/addresses`} className='btn-ev-m-pf'><FontAwesomeIcon icon={faLocationArrow} /> ที่อยู่ของฉัน</NavLink></li>
      </div>
    </div>
  )
}

export default MenuEdit