import React from 'react'
import Header from '../components/Header/Header'
import MenuR from '../components/Menufootbar/MenuR/MenuR'
import Menufoot from '../components/Menufootbar/Menufoot'
import ReceiptDetail from '../components/myorder/receiptDetail/ReceiptDetail'
const ReceiptPage = () => {
  return (
    <>
       <header>
         <Header/>
      </header>
      <section>
         <div className="container">
            <ReceiptDetail/>
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

export default ReceiptPage
