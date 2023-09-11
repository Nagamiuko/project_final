import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Menufoot from '../components/Menufootbar/Menufoot'
import MenuR from '../components/Menufootbar/MenuR/MenuR'
import './HomePage.css'
import EditAd from '../components/EditAddress/EditAd'
import useFetchDataAddress from '../components/hooks/UserAddress'
import { AuthContext } from '../components/Context/AuthContext'

const EditAddress = () => {
  const {user} = useContext(AuthContext)
  const {data_address , loadings ,setDataFile} = useFetchDataAddress(user._id)
  const [data , setData] = useState()

  useEffect(() =>{
    setData(data_address)
  },[data_address])

  return (
    <div>
       <header>
         <Header/>
      </header>
      <section>
         <div className="container">
           <EditAd 
             DataAddress = {data} 
             Loading={loadings} 
             setDataFile={setDataFile}
             DataID = {user?._id}
             />
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

export default EditAddress