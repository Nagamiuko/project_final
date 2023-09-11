import React from 'react'
import Header from '../components/Header/Header'
import MenuR from '../components/Menufootbar/MenuR/MenuR'
import Menufoot from '../components/Menufootbar/Menufoot'
import ReceiptDetail from '../components/myorder/receiptDetail/ReceiptDetail'
import ReceiptList from '../components/shop/receiptList/ReceiptList'
const ReceiptListShopPage = () => {
  return (
    <>
       <header>
         <Header/>
      </header>
      <section>
         <div className="container">
           <ReceiptList/>
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

export default ReceiptListShopPage
