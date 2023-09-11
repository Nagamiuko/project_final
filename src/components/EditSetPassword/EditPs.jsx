import React from 'react'
import MenuEdit from '../MenuEdits/MenuEdit'
import './EditPs.css'
const EditPs = () => {
  return (
   <div className="box-e-bg">
            <div className="title-e-pf">
               My Account
            </div>
         <div className="flex-d-ma-dpf fil-d-s">
            <div className="box-e-m-pf-ps ">
                  <MenuEdit />
            </div>
            <div className="box-e-d-pf-ps">
                  <div className="m-li-d-ps"> 
                     <div className="title-ps">
                        Password and Security
                            <div className="smal-test-ps">
                              ตั้งค่ารหัสผ่านและความปลอดภัย
                               </div>
                           <div className="in-pass-ps">
                               <table>รหัสปัจจุบัน</table>
                               <input type="password" placeholder='Current password' />
                           </div>
                           <div className="in-pass-ps">
                               <table>รหัสผ่านใหม่ของฉัน</table>
                               <input type="password" placeholder='New password' />
                           </div>
                           <div className="in-pass-ps">
                               <table>ยืนยันรหัสผ่านใหม่ของฉัน</table>
                               <input type="password" placeholder='Confirm new password' />
                           </div>
                           <div className="in-pass-ps">
                              <div className="btn-ss">
                                <button>Reset Password</button>
                              </div>
                           </div>
                     </div>    
                  </div>
            </div>
      </div>
</div>
  )
}

export default EditPs