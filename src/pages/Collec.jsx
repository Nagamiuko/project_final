import React, { useContext} from 'react'
import Header from '../components/Header/Header'
import MenuR from '../components/Menufootbar/MenuR/MenuR'
import Menufoot from '../components/Menufootbar/Menufoot'
import Footer from '../components/Footer/Footer'
import Collection from '../components/mycollection/Collection'
const Collec = () => {
  return (
    <>
       <header>
         <Header/>
      </header>
      <section>
         <div className="container">
            <Collection/>
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
    </>
  )
}

export default Collec

