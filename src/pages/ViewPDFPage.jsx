import React from 'react'
import ViewPDF from '../components/ViewPDF/ViewPDF'
import Header from '../components/Header/Header'
import Menufoot from '../components/Menufootbar/Menufoot'

const ViewPDFPage = () => {
  return (
   <>
       <header>
         <Header/>
      </header>
      <section>
         <div className="container">
            <ViewPDF/>
         </div>
      </section>
         <div className="menu-foot">
             <Menufoot/>
         </div>
    </>
  )
}

export default ViewPDFPage