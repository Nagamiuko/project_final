import React, { useContext} from 'react'
import Header from '../components/Header/Header'
import MenuR from '../components/Menufootbar/MenuR/MenuR'
import Menufoot from '../components/Menufootbar/Menufoot'
import Footer from '../components/Footer/Footer'
import MyBookaNovel from '../components/MyBooks/MyBookaNovel'
import { AuthContext } from '../components/Context/AuthContext'
import useFetchAllUser from '../components/hooks/BookAllUser'
const MyBooks = () => {
   const {user} = useContext(AuthContext)
   const {datatoonalluser , loading } = useFetchAllUser(user?._id)
  return (
    <>
       <header>
         <Header/>
      </header>
      <section>
         <div className="container">
            <MyBookaNovel Datatoonalluser={datatoonalluser} Loading={loading}/>
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

export default MyBooks

