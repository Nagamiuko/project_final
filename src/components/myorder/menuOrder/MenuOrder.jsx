import React from 'react'
import { NavLink } from 'react-router-dom'
import './MenuOrder.css'
const MenuOrder = () => {
  return (
    <div>
        <div className="menu-btn-order-send">
              <NavLink className='btn-link' to='/orders/waitpayment'><button>รอชำระเงิน</button></NavLink>
              <NavLink className='btn-link'to='/orders/preparing' ><button>กำลังเตรียมหนังสือ</button></NavLink>
              <NavLink className='btn-link' to='/orders/shipping' ><button>กำลังจัดส่ง</button></NavLink>
              <NavLink className='btn-link' to='/orders/shipped'><button>จัดส่งสำเร็จแล้ว</button></NavLink>
           </div>
    </div>
  )
}

export default MenuOrder
