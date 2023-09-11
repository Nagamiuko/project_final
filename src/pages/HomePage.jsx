import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Menufoot from '../components/Menufootbar/Menufoot'
import './HomePage.css'
import LogoList from '../components/MyLogo/LogoList'
import ListToon from '../components/MyListToon/ListToon'
import MenuR from '../components/Menufootbar/MenuR/MenuR'
import useFetchDataToon from '../components/hooks/BooksAll'
import useFetchDataNovel from '../components/hooks/NovelAllCp'
import useFetchDataNovelTs from '../components/hooks/NovelAllTs'
import useFetchDataNovelAlls from '../components/hooks/NovelAlls'
import InternetOff from '../components/InternerOffine/InternetOff'
const HomePage = () => {
   const {datatoon , loadings} = useFetchDataToon()
   const {datanovel ,loadnovel} = useFetchDataNovel()
   const {datanovelTs} = useFetchDataNovelTs()
   const {datanovelAll} = useFetchDataNovelAlls()

   console.log(datanovel);
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
              <div className="list-toon-top">
                 <ListToon DataToon={datanovelAll} Loadings={loadings} TileTap={'นิยายมาใหม่'}/>
              </div>
              <div className="list-toon-top">
                     <ListToon DataToon={datanovel} Loadings={loadnovel} TileTap={'นิยายแต่ง'}/>
              </div> 
              <div className="list-toon-top">
                 <ListToon DataToon={datanovelTs} Loadings={loadings} TileTap={'นิยายแปล'}/>
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

export default HomePage
