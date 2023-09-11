import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Menufoot from '../components/Menufootbar/Menufoot'
import MenuR from '../components/Menufootbar/MenuR/MenuR'
import './HomePage.css'
import { useParams } from 'react-router-dom'
import SreachTN from '../components/SerachTN/SearchTN'
import imgsth from '../assets/bg/bg-sech.jpg'

const SearchT = () => {
  const {book_id} = useParams()

  return (
  <>
    <header>
         <Header />
      </header>
      <section>
         <div className='bg-img'>
            <img src={imgsth} alt="" />
         </div>
            <div className="container">
               <SreachTN  />
               {/* <SreachTN DataToon ={datatoonall} Loading={loadings} /> */}
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

export default SearchT