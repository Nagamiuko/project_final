import React from 'react'
import Header from '../components/Header/Header'
import MenuR from '../components/Menufootbar/MenuR/MenuR'
import Menufoot from '../components/Menufootbar/Menufoot'
import CheckoutOrder from '../components/checkout/CheckoutOrder'
const Checkout = () => {
  return (
    <>
       <header>
         <Header/>
      </header>
      <section>
         <div className="container">
            <CheckoutOrder/>
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

export default Checkout
