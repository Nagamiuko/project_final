import React from 'react'
import Header from '../components/Header/Header'
import './HomePage.css'
import './Ac.css'
import CAccount from '../components/CreateAccount/CAccount'
const CreateAccount = () => {
  return (
    <>
     <header>
        <Header/>
    </header>
    <section>
        <div className="container">
          <div className="con-c-t">
              <CAccount/>
          </div>
        </div>
    </section>
 </>
  )
}

export default CreateAccount