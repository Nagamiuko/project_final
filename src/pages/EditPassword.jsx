import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Menufoot from '../components/Menufootbar/Menufoot'
import MenuR from '../components/Menufootbar/MenuR/MenuR'
import './HomePage.css'
import EditPs from '../components/EditSetPassword/EditPs'
const EditPassword = () => {
  return (
    <div>
       <header>
         <Header/>
      </header>
      <section>
         <div className="container">
          <EditPs/>
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
         <Footer/>
      </footer>
    </div>
  )
}

export default EditPassword