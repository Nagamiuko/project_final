import React from 'react'
import './PopLis.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping ,faBook } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
const PopLis = ({setOpenLis}) => {
  const {cart} = useSelector((state) => state.cart)
  return (
    <div>
        <div className="box-bg-pop-r-lis filter-drop">
            <div className="cor-r-btn-lis">
            <small onClick={setOpenLis.bind(this,false)}>x</small>
            <div className="title-pop-r">ชั้นวางหนังสือของฉัน</div>
            <div className="line-bar"></div>
                  <Link to='/Carts'>
                     <button>
                         <FontAwesomeIcon icon={faCartShopping} /> 
                          ตะกร้า
                          { cart.length === 0 ? '' :
                          <span className='box-span' data-num ={cart && cart.length} />
                          }
                      </button>
                   </Link>
                  <Link to='/MyBooks'><button><FontAwesomeIcon icon={faBook} /> Books & Novels</button></Link>
            </div>
        </div>
    </div>
  )
}

export default PopLis
