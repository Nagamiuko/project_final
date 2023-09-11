import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Menufoot from '../components/Menufootbar/Menufoot'
import './HomePage.css'
import LogoList from '../components/MyLogo/LogoList'
import ListToon from '../components/MyListToon/ListToon'
import MenuR from '../components/Menufootbar/MenuR/MenuR'
import useFetchDataToon from '../components/hooks/BooksAll'
const Cartoon = () => {
   const {datatoon , loadings} = useFetchDataToon()
  return (
    <div>
      <header>
         <Header/>
      </header>
      <section>
         <div className="container">
              <div className="logo-list">
                  <LogoList/>
              </div>
              <div className="list-toon-top">
                 <ListToon DataToon={datatoon} Loadings={loadings} TileTap={'การ์ตูนมาใหม่'}/>
              </div>
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

export default Cartoon
