import React from 'react'
import Header from '../components/Header/Header'
import MenuR from '../components/Menufootbar/MenuR/MenuR'
import Menufoot from '../components/Menufootbar/Menufoot'
import OrderWaitPayment from '../components/myorder/orderWaitPayment/OrderWaitPayment'
const OrderWhailPaymentPage = () => {
  return (
    <>
       <header>
         <Header/>
      </header>
      <section>
         <div className="container">
            <OrderWaitPayment/>
         </div>
      </section>
         <div className="menu-b-r-ao">
            <div className="menu-as">
             <MenuR/>
            </div>
         </div>
         <div className="menu-foot">
             <Menufoot/>
         </div>
      <footer>
         {/* <Footer/> */}
      </footer>
    </>
  )
}

export default OrderWhailPaymentPage
