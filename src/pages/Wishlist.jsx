import React from 'react'
import Header from '../components/Header/Header'
import MenuR from '../components/Menufootbar/MenuR/MenuR'
import Menufoot from '../components/Menufootbar/Menufoot'
import Footer from '../components/Footer/Footer'
import Favorite from '../components/Wishlist/Favorite'

const Wishlist = () => {
  return (
    <>
       <header>
         <Header/>
      </header>
      <section>
         <div className="container">
            <Favorite/>
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

export default Wishlist

