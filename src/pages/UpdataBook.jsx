import React from 'react'
import Header from '../components/Header/Header'
import MenuR from '../components/Menufootbar/MenuR/MenuR'
import Menufoot from '../components/Menufootbar/Menufoot'
import Footer from '../components/Footer/Footer'
import { useParams } from 'react-router-dom'
import useFetchDataToonOne from '../components/hooks/BookOne'
import UpdataBook from '../components/UpdataBook/UpdataBook'
const UpdataBooks = () => {
  const {bookid} = useParams()
  const {databookone} = useFetchDataToonOne(bookid)
  return (
    <>
       <header>
         <Header/>
      </header>
      <section>
         <div className="container">
             <UpdataBook DataBook={databookone} BookID={bookid}/>
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

export default UpdataBooks
