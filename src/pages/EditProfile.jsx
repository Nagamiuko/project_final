import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Menufoot from '../components/Menufootbar/Menufoot'
import MenuR from '../components/Menufootbar/MenuR/MenuR'
import './HomePage.css'
import EditP from '../components/EditProfile/EditP'
const EditProfile = () => {
  return (
    <div>
       <header>
         <Header/>
      </header>
      <section>
         <div className="container">
            <EditP/>
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

export default EditProfile