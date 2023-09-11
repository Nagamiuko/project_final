import React from 'react'
import './orderdetail.css'
import MenuOr from '../menuOrder/MenuOrder'
const OrderPreparing = () => {
  return (
    <>
      <div className="box-container-order">
        <div className="title-order">การสั่งชื้อของฉัน</div>
        <div className="border-line-bar"></div>
        <div className="box-contant-order">
            <MenuOr/>
        </div>
        <div className="box-contant-order">
            ไม่รายการ
           {/* <div className="order-detail-bine">
              <div className="haed-order-detail">
                 <div className="number-order">
                   <label>หมายเลขสั่งชื้อ #</label>
                   <p>30032032</p>
                 </div>
                 <div className="date-order">
                    <label>DATE</label>
                    <p>06 / 03 / 2100 - 14:54:55 </p>
                 </div>
                 <div className="total-order">
                    <label>TOTAL</label>
                    <p>100 บาท</p>
                 </div>
                 <div className="btn-detail">
                   <button>รายละเอียด</button>
                 </div>
              </div>
              <div className="list-order-detail">
                  <div className="data-order">
                      <label>จำนวน</label>
                      <p>1</p>
                  </div>
                  <div className="detail-order-book">
                    <label>หนังสือ</label>
                    <p>เทพพระเจ้าลังสรรน</p>
                  </div>
             </div>
           </div> */}
        </div>
      </div>  
    </>
  )
}

export default OrderPreparing
