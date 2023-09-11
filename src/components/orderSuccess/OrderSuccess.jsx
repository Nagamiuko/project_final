import React from 'react'
import Success from '../../assets/icon/success.gif'
import animationData from '../../assets/icon/animation_ll3x0ps7.json'
import Lottie from 'lottie-react'
import './ordersuccess.css'
import { useNavigate } from 'react-router-dom'
const OrderSuccess = () => {
  return (
     <>
      <SuccessPayment/>
     </>
  )
}

const SuccessPayment = () => {
  const navigator = useNavigate()
  return(
    <div className="container-order-success">
      <div className="center-box-content">
          <div className="img-content-success">
          <Lottie 
             animationData={animationData} 
             loop={false}
             autoPlay={true}
          />
          </div>
          <div className="detail-order-success">
               ทำรายการสำเร็จ 😍
             <div className="detail-a-link">
                <p>ขอบคุณที่สั่งหนังสือกับ CommicBook Novels</p>
             </div>
                <button onClick={() => navigator('/orders/shipped')}>ดูรายละเอียดการสั่งชื้อ</button>
          </div>
      </div>
    </div>  
  )
} 
export default OrderSuccess