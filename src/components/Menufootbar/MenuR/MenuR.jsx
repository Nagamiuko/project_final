import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import  bookshelf from '../../../assets/icon/bookshelf.png'
import  serach  from '../../../assets/icon/search.png'
import  Plus   from '../../../assets/icon/plus.png'
import './MenuR.css'
import Pop from '../PopupAdd/Pop'
import PopLis from '../PopupLis/PopLis'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
const MenuR = () => {
  const [openPopadd, setOpenAdd] = useState(false)
  const [openPopLis, setOpenLis] = useState(false)
  const {cart} = useSelector((state) => state.cart)
  const {user} = useContext(AuthContext)
  const navigator = useNavigate()
  return (
    <div>
      <div>
         {openPopLis && <PopLis setOpenLis={setOpenLis}/>}
      </div>
       <div>
          {openPopadd && <Pop setPopAdd={setOpenAdd}/>}
       </div>
      <div className="box-r-b">
         <button onClick={()=> navigator('/Search')} title='ค้นหาหนังสือ' className="menu-r-m-book ">
            <div className="box">
               <img src={serach} alt="" />
            </div>
         </button>
        { user !== null ? (
          <>
            <button onClick={setOpenLis.bind(this,true)} title='หนังสือของฉัน'className="menu-r-m-book">
              <div className="box">
              { cart.length === 0 ?'' : (
              <small data-num={cart && cart.length}/>
              )}
                <img src={bookshelf} alt="" />
              </div>
            </button>
            <button onClick={setOpenAdd.bind(this,true)} title='เพิ่มหนังสือของฉัน' className="menu-r-m-book ">
              <div className="box">
                  <img src={Plus} alt="" />
              </div>
            </button>
          </>
        ):''
      }
      </div>
    </div>
  )
}

export default MenuR