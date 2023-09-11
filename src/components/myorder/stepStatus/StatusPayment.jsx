import React from 'react'
import './status.css'
const StatusPayment = ({active}) => {
    const typePayment ="succeeded"
    const typeIncomplete ="incomplete"
    const type = "current-item"
  return (
    <div className='step-wizard'>
        <ul className="step-wizard-list">
           { active === typePayment ? <>
            <li className={`step-wizard-item`} >
                <span className="progress-count">1</span>
                <span className="progress-label">รอชำระเงิน</span>
            </li>
            <li className={`step-wizard-item `}>
                <span className="progress-count">2</span>
                <span className="progress-label">เตรียมจัดส่ง</span>
            </li>
            <li className={`step-wizard-item `}>
                <span className="progress-count">3</span>
                <span className="progress-label">กำลังจัดส่ง</span>
            </li>
            <li className={`step-wizard-item ${type}`} >
                <span className="progress-count">4</span>
                <span className="progress-label">จัดส่งแล้ว</span>
            </li>
            <li className=""></li>
            </>
            :''
          }
        </ul>
    </div>
  )
}

export default StatusPayment
