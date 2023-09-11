import React ,{useState}from 'react'
import {Link} from 'react-router-dom'
import Login from '../../components/Login/Login'
import imha from './1966242.gif'
import './User.css'
import Header from '../../components/Header/Header'
import Lottie from 'lottie-react'
import animationData from '../../assets/icon/animation_llhlrttv.json'
const UserNull = () => {
   const [open ,setLoginpop] = useState(false)
  return (
    <>
      <header>
          <Header/>
      </header>
        {open&& <Login setLoginpopup={setLoginpop}/>}
      <div className="login-not-user">
          <div className="box-ap">
            <div className="lo-lo">
              <Lottie 
                animationData={animationData} 
                loop={false}
                autoPlay={true}
              />
            </div>
            <div className="title-login">
            <Link onClick={() => setLoginpop(true)}>LOGIN & CREATE ACCUOND</Link>    
            </div>
          </div>
      </div>
    </>
  )
}

export default UserNull